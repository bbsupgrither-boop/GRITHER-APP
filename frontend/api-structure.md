# рџ”§ Backend API Structure РґР»СЏ GRITHER

## РћР±С‰Р°СЏ Р°СЂС…РёС‚РµРєС‚СѓСЂР°

```
Backend (Node.js + Express/Fastify)
в”њв”Ђв”Ђ Auth (Telegram Web App validation)
в”њв”Ђв”Ђ Database (PostgreSQL/Supabase)
в”њв”Ђв”Ђ Real-time (WebSockets/SSE)
в””в”Ђв”Ђ Telegram Bot API integration
```

## РћСЃРЅРѕРІРЅС‹Рµ API Endpoints

### рџ”ђ Authentication
```
POST /api/auth/telegram
- Р’Р°Р»РёРґР°С†РёСЏ initData РёР· Telegram
- РЎРѕР·РґР°РЅРёРµ/РѕР±РЅРѕРІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
- Р’С‹РґР°С‡Р° JWT С‚РѕРєРµРЅР°
```

### рџ‘¤ Users
```
GET    /api/users/me           - РџСЂРѕС„РёР»СЊ С‚РµРєСѓС‰РµРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
PUT    /api/users/me           - РћР±РЅРѕРІР»РµРЅРёРµ РїСЂРѕС„РёР»СЏ
GET    /api/users/leaderboard  - Р›РёРґРµСЂР±РѕСЂРґ
GET    /api/users/:id          - РџСЂРѕС„РёР»СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
POST   /api/users/avatar       - Р—Р°РіСЂСѓР·РєР° Р°РІР°С‚Р°СЂР°
```

### рџЏ† Achievements
```
GET    /api/achievements       - РЎРїРёСЃРѕРє РІСЃРµС… РґРѕСЃС‚РёР¶РµРЅРёР№
POST   /api/achievements       - РЎРѕР·РґР°РЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ (admin)
PUT    /api/achievements/:id   - РћР±РЅРѕРІР»РµРЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ (admin)
POST   /api/achievements/:id/unlock - Р Р°Р·Р±Р»РѕРєРёСЂРѕРІРєР° РґРѕСЃС‚РёР¶РµРЅРёСЏ
GET    /api/users/me/achievements - РњРѕРё РґРѕСЃС‚РёР¶РµРЅРёСЏ
```

### рџ“‹ Tasks
```
GET    /api/tasks             - РЎРїРёСЃРѕРє Р·Р°РґР°С‡ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
POST   /api/tasks             - РЎРѕР·РґР°РЅРёРµ Р·Р°РґР°С‡Рё (admin)
PUT    /api/tasks/:id         - РћР±РЅРѕРІР»РµРЅРёРµ Р·Р°РґР°С‡Рё (admin)
POST   /api/tasks/:id/complete - Р—Р°РІРµСЂС€РµРЅРёРµ Р·Р°РґР°С‡Рё
DELETE /api/tasks/:id         - РЈРґР°Р»РµРЅРёРµ Р·Р°РґР°С‡Рё (admin)
```

### вљ”пёЏ Battles
```
GET    /api/battles           - РЎРїРёСЃРѕРє Р±Р°С‚С‚Р»РѕРІ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
POST   /api/battles/invite    - РћС‚РїСЂР°РІРєР° РїСЂРёРіР»Р°С€РµРЅРёСЏ РЅР° Р±Р°С‚С‚Р»
POST   /api/battles/:id/accept - РџСЂРёРЅСЏС‚РёРµ РїСЂРёРіР»Р°С€РµРЅРёСЏ
POST   /api/battles/:id/decline - РћС‚РєР»РѕРЅРµРЅРёРµ РїСЂРёРіР»Р°С€РµРЅРёСЏ
POST   /api/battles/:id/complete - Р—Р°РІРµСЂС€РµРЅРёРµ Р±Р°С‚С‚Р»Р°
GET    /api/battles/history   - РСЃС‚РѕСЂРёСЏ Р±Р°С‚С‚Р»РѕРІ
```

### рџ›ЌпёЏ Shop
```
GET    /api/shop/items        - РЎРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ
POST   /api/shop/items        - Р”РѕР±Р°РІР»РµРЅРёРµ С‚РѕРІР°СЂР° (admin)
PUT    /api/shop/items/:id    - РћР±РЅРѕРІР»РµРЅРёРµ С‚РѕРІР°СЂР° (admin)
POST   /api/shop/purchase     - РџРѕРєСѓРїРєР° С‚РѕРІР°СЂР°
GET    /api/shop/orders       - РњРѕРё Р·Р°РєР°Р·С‹
PUT    /api/shop/orders/:id   - РћР±РЅРѕРІР»РµРЅРёРµ СЃС‚Р°С‚СѓСЃР° Р·Р°РєР°Р·Р° (admin)
```

### рџ“¦ Cases
```
GET    /api/cases             - РЎРїРёСЃРѕРє РєРµР№СЃРѕРІ
POST   /api/cases             - РЎРѕР·РґР°РЅРёРµ РєРµР№СЃР° (admin)
POST   /api/cases/:id/open    - РћС‚РєСЂС‹С‚РёРµ РєРµР№СЃР°
GET    /api/cases/history     - РСЃС‚РѕСЂРёСЏ РѕС‚РєСЂС‹С‚С‹С… РєРµР№СЃРѕРІ
PUT    /api/cases/:id         - РћР±РЅРѕРІР»РµРЅРёРµ РєРµР№СЃР° (admin)
```

### рџ”” Notifications
```
GET    /api/notifications     - РЎРїРёСЃРѕРє СѓРІРµРґРѕРјР»РµРЅРёР№
POST   /api/notifications/read - РџРѕРјРµС‚РєР° РєР°Рє РїСЂРѕС‡РёС‚Р°РЅРѕ
DELETE /api/notifications/:id - РЈРґР°Р»РµРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёСЏ
POST   /api/notifications/send - РћС‚РїСЂР°РІРєР° СѓРІРµРґРѕРјР»РµРЅРёСЏ (admin)
```

### рџ“Љ Analytics (Admin)
```
GET    /api/admin/stats       - РћР±С‰Р°СЏ СЃС‚Р°С‚РёСЃС‚РёРєР°
GET    /api/admin/users       - РЈРїСЂР°РІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё
GET    /api/admin/activity    - РђРєС‚РёРІРЅРѕСЃС‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
POST   /api/admin/announcement - РћР±СЉСЏРІР»РµРЅРёРµ РґР»СЏ РІСЃРµС…
```

## Database Schema (PostgreSQL)

### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  avatar_url TEXT,
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  balance INTEGER DEFAULT 1000,
  rating INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false,
  last_active TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Achievements
```sql
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  category VARCHAR(100),
  reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  achievement_id INTEGER REFERENCES achievements(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

### Tasks
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assignee_id INTEGER REFERENCES users(id),
  assigner_id INTEGER REFERENCES users(id),
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'pending',
  reward INTEGER DEFAULT 0,
  experience INTEGER DEFAULT 0,
  deadline TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Battles
```sql
CREATE TABLE battles (
  id SERIAL PRIMARY KEY,
  challenger_id INTEGER REFERENCES users(id),
  opponent_id INTEGER REFERENCES users(id),
  stake INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  winner_id INTEGER REFERENCES users(id),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Real-time Features (WebSockets)

### РЎРѕР±С‹С‚РёСЏ РґР»СЏ real-time РѕР±РЅРѕРІР»РµРЅРёР№:
```javascript
// Client РїРѕРґРїРёСЃРєРё
socket.on('battle_invitation', (data) => {
  // РќРѕРІРѕРµ РїСЂРёРіР»Р°С€РµРЅРёРµ РЅР° Р±Р°С‚С‚Р»
});

socket.on('achievement_unlocked', (data) => {
  // РќРѕРІРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ СЂР°Р·Р±Р»РѕРєРёСЂРѕРІР°РЅРѕ
});

socket.on('task_assigned', (data) => {
  // РќРѕРІР°СЏ Р·Р°РґР°С‡Р° РЅР°Р·РЅР°С‡РµРЅР°
});

socket.on('shop_item_added', (data) => {
  // РќРѕРІС‹Р№ С‚РѕРІР°СЂ РІ РјР°РіР°Р·РёРЅРµ
});

socket.on('notification', (data) => {
  // РќРѕРІРѕРµ СѓРІРµРґРѕРјР»РµРЅРёРµ
});
```

## Middleware

### Authentication
```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

### Telegram Init Data Validation
```javascript
const validateTelegramData = (req, res, next) => {
  const { initData } = req.body;
  
  if (!validateTelegramWebAppData(initData, process.env.TELEGRAM_BOT_TOKEN)) {
    return res.status(400).json({ error: 'Invalid Telegram data' });
  }
  
  next();
};
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/grither
REDIS_URL=redis://localhost:6379

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_WEBHOOK_URL=https://your-api.com/webhook

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# App
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-app.vercel.app

# External APIs
UNSPLASH_ACCESS_KEY=your_unsplash_key
CLOUDINARY_URL=your_cloudinary_url
```

## Deployment РґР»СЏ API

### Railway/Render
```yaml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
```

### Vercel Functions (Р°Р»СЊС‚РµСЂРЅР°С‚РёРІР°)
```javascript
// api/auth/telegram.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // РћР±СЂР°Р±РѕС‚РєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё С‡РµСЂРµР· Telegram
  }
}
```

## РРЅС‚РµРіСЂР°С†РёСЏ СЃ Frontend

```javascript
// utils/api.js
const API_BASE = process.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  async authenticateWithTelegram(initData) {
    const response = await fetch(`${API_BASE}/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData })
    });
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  }
  
  async getProfile() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    return response.json();
  }
}
```

Р­С‚Рѕ Р±Р°Р·РѕРІР°СЏ СЃС‚СЂСѓРєС‚СѓСЂР° РґР»СЏ РїРѕР»РЅРѕС†РµРЅРЅРѕРіРѕ backend API! рџљЂ