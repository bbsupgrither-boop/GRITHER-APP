// index.js — прод-версия (ESM) для Render с PostgreSQL

import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import pkg from 'pg';
const { Pool } = pkg;

// ───────────────────────────────────────────────────────────
// ENV
const {
  BOT_TOKEN,
  WEBHOOK_SECRET = 'hook',
  APP_URL,
  FRONTEND_ORIGIN,
  FRONTEND_ORIGINS = '',
  DATABASE_URL,
  PORT = 3001,
  NODE_ENV = 'production'
} = process.env;

if (!BOT_TOKEN) {
  console.error('[FATAL] BOT_TOKEN is required');
  process.exit(1);
}

// ───────────────────────────────────────────────────────────
// PostgreSQL
let pool = null;
if (DATABASE_URL) {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  console.log('[DB] Connected to PostgreSQL');
} else {
  console.warn('[WARN] DATABASE_URL is not set — DB operations will be skipped');
}

// ───────────────────────────────────────────────────────────
// Helpers: HMAC token (простой), проверка initData
const signHmac = (secret, data) =>
  crypto.createHmac('sha256', secret).update(data).digest('hex');

function makeSignedToken(payloadObj) {
  const secret = WEBHOOK_SECRET || 'devsecret';
  const body = JSON.stringify(payloadObj);
  const sig = signHmac(secret, body);
  const b64 = Buffer.from(body).toString('base64url');
  return `${sig}.${b64}`;
}

function verifySignedToken(token) {
  try {
    const secret = WEBHOOK_SECRET || 'devsecret';
    const [sig, b64] = (token || '').split('.');
    if (!sig || !b64) return null;
    const body = Buffer.from(b64, 'base64url').toString();
    const expected = signHmac(secret, body);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function verifyTgInitData(initData, botToken) {
  const pairs = (initData || '').split('&').map(p => p.split('='));
  const data = Object.fromEntries(
    pairs
      .filter(([k]) => k)
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );

  const providedHash = data.hash;
  delete data.hash;

  const checkString = Object.keys(data)
    .sort()
    .map(k => `${k}=${data[k]}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const calcHash = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

  const ok =
    providedHash &&
    crypto.timingSafeEqual(Buffer.from(calcHash, 'hex'), Buffer.from(providedHash, 'hex'));

  return { ok: !!ok, data };
}

// ───────────────────────────────────────────────────────────
// App
const app = express();

// Простой аудит запросов
app.use((req, res, next) => {
  const origin = req.headers.origin || '-';
  console.log(
    `[hit] ${new Date().toISOString()} ${req.method} ${req.originalUrl} origin=${origin}`
  );
  next();
});

// JSON парсер до роутов
app.use(express.json());

// CORS allowlist
const listFromEnv = (FRONTEND_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const allowlist = [
  ...new Set([ ...(FRONTEND_ORIGIN ? [FRONTEND_ORIGIN.trim()] : []), ...listFromEnv ]),
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

console.log('[cors] allowlist =', allowlist);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const ok = allowlist.some(a => origin === a || origin.startsWith(a));
      if (ok) return cb(null, true);
      console.warn('[cors] blocked origin:', origin, 'allowlist=', allowlist);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);
app.options('*', cors());

// ───────────────────────────────────────────────────────────
// Health / Ping / Diag
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/twa/ping', (req, res) => {
  const from = req.query.from || 'unknown';
  const wa = req.query.wa || '-';
  const init = req.query.init || '-';
  console.log(`[ping] from=${from} wa=${wa} init=${init}`);
  res.json({ ok: true });
});

app.get('/api/diag/env', (req, res) => {
  res.json({
    ok: true,
    DATABASE_URL: DATABASE_URL ? '***set***' : '',
    FRONTEND_ORIGIN: FRONTEND_ORIGIN || '',
    FRONTEND_ORIGINS: FRONTEND_ORIGINS || '',
    APP_URL: APP_URL || '',
  });
});

// ───────────────────────────────────────────────────────────
// WebApp auth
app.post('/api/twa/auth', async (req, res) => {
  try {
    const { initData } = req.body || {};
    console.log('[auth HIT]', {
      hasBody: !!req.body,
      len: req.headers['content-length'] || '0',
      origin: req.headers.origin || '-',
    });
    if (!initData) return res.status(400).json({ ok: false, error: 'no initData' });

    // 1) проверка подписи
    let verified = verifyTgInitData(initData, BOT_TOKEN);
    if (!verified.ok) {
      return res.status(401).json({ ok: false, error: 'bad signature' });
    }

    // 2) пользователь из initData
    const tgUser = JSON.parse(verified.data.user || '{}');
    console.log('[auth ok*]', {
      id: tgUser.id,
      username: tgUser.username || null,
      first_name: tgUser.first_name || null,
    });

    // 3) простая «сессия»: подписанный токен
    const payload = { id: tgUser.id, username: tgUser.username || null, ts: Date.now() };
    const token = makeSignedToken(payload);

    // 4) безопасно пишем в БД (если pool сконфигурен)
    if (pool) {
      try {
        // users (опционально, если есть таблица)
        await pool.query(`
          INSERT INTO users (id, username, first_name, last_name, photo_url, updated_at)
          VALUES ($1, $2, $3, $4, $5, NOW())
          ON CONFLICT (id) DO UPDATE SET
            username = EXCLUDED.username,
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            photo_url = EXCLUDED.photo_url,
            updated_at = NOW()
        `, [
          tgUser.id,
          tgUser.username || null,
          tgUser.first_name || null,
          tgUser.last_name || null,
          tgUser.photo_url || null
        ]);

        // лог авторизации
        await pool.query(`
          INSERT INTO logs (user_id, type, level, message, extra, created_at)
          VALUES ($1, $2, $3, $4, $5, NOW())
        `, [
          tgUser.id,
          'auth',
          'info',
          'twa auth ok',
          null
        ]);
        console.log('[auth->db] inserted for', tgUser.id);
      } catch (e) {
        console.warn('[auth->db failed]', e.message);
        // не падаем, просто логируем
      }
    }

    // 5) ответ фронту
    return res.json({
      ok: true,
      me: { id: tgUser.id, name: tgUser.first_name, username: tgUser.username || null },
      token,
    });
  } catch (e) {
    console.error('auth error', e);
    return res.status(500).json({ ok: false, error: 'server' });
  }
});

// Logs endpoint (с фронта)
app.post('/api/logs', async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.replace(/^Bearer\s+/i, '');
    const payload = verifySignedToken(token);
    if (!payload) return res.status(401).json({ ok: false, error: 'bad token' });

    const { type, message = null, extra = null, level = 'info' } = req.body || {};

    if (pool) {
      try {
        await pool.query(`
          INSERT INTO logs (user_id, type, level, message, extra, created_at)
          VALUES ($1, $2, $3, $4, $5, NOW())
        `, [
          payload.id,
          type,
          level,
          message,
          extra ? JSON.stringify(extra) : null
        ]);
        console.log('[log->db]', payload.id, type, message);
      } catch (e) {
        console.warn('[log->db failed]', e.message);
      }
    } else {
      console.log('[log] (skip db)', payload.id, type, message);
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error('log error', e);
    return res.status(500).json({ ok: false, error: 'server' });
  }
});

// Кто я — расшифровка токена
app.get('/api/whoami', (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.replace(/^Bearer\s+/i, '');
    const payload = verifySignedToken(token);
    if (!payload) return res.status(401).json({ ok: false, error: 'no/bad token' });
    return res.json({ ok: true, payload });
  } catch {
    return res.status(400).json({ ok: false, error: 'bad token' });
  }
});

// Content endpoint
app.get('/api/content/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    
    if (pool) {
      const result = await pool.query(`
        SELECT slug, title, body, updated_at
        FROM content_blocks
        WHERE slug = $1
      `, [slug]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Not found' });
      }
      
      res.json(result.rows[0]);
    } else {
      res.status(503).json({ error: 'Database not available' });
    }
  } catch (e) {
    console.error('content error', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// ───────────────────────────────────────────────────────────
// Автоматическая инициализация базы данных
async function initializeDatabase() {
  if (!pool) {
    console.log('[DB] No database connection, skipping initialization');
    return;
  }

  try {
    console.log('[DB] Initializing database...');
    
    // Создание таблицы пользователей
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT PRIMARY KEY,
        username VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        photo_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Создание таблицы логов
    await pool.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id),
        type VARCHAR(100) NOT NULL,
        level VARCHAR(20) NOT NULL DEFAULT 'info',
        message TEXT,
        extra JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Создание таблицы контентных блоков
    await pool.query(`
      CREATE TABLE IF NOT EXISTS content_blocks (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        body TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Создание индексов
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_content_blocks_slug ON content_blocks(slug)`);

    // Вставка тестовых данных
    await pool.query(`
      INSERT INTO content_blocks (slug, title, body) VALUES 
      ('welcome', 'Добро пожаловать!', 'Добро пожаловать в Grither App! Это ваше первое приложение.'),
      ('about', 'О приложении', 'Grither App - это современное веб-приложение, созданное с использованием React, Node.js и PostgreSQL.'),
      ('features', 'Возможности', '• Современный UI/UX дизайн\n• Telegram WebApp интеграция\n• База данных PostgreSQL\n• Деплой на Render')
      ON CONFLICT (slug) DO NOTHING
    `);

    console.log('[DB] Database initialized successfully!');
  } catch (error) {
    console.error('[DB] Initialization failed:', error.message);
  }
}

// ───────────────────────────────────────────────────────────
// Старт
app.listen(PORT, async () => {
  console.log('[server] listening on', PORT, 'APP_URL=', APP_URL || '(not set)');
  
  // Небольшая проверка окружения
  console.log('[env check] FRONTEND_ORIGIN=', FRONTEND_ORIGIN || '(none)');
  console.log('[env check] DATABASE_URL set =', !!DATABASE_URL);
  
  // Автоматическая инициализация базы данных
  await initializeDatabase();
});