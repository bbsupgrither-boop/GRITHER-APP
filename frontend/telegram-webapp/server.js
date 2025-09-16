#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Файл не найден: ' + filePath);
      return;
    }

    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

function serveDirectory(dirPath, res) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Ошибка чтения директории');
      return;
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GRITHER Telegram WebApp - Демо</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0B0B0C;
            color: #fff;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        h1 {
            color: #FF5630;
            text-align: center;
            margin-bottom: 30px;
        }
        .file-list {
            display: grid;
            gap: 15px;
        }
        .file-item {
            background: #111216;
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 12px;
            padding: 20px;
            transition: transform .2s ease;
        }
        .file-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,.3);
        }
        .file-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #FF6A3A;
        }
        .file-description {
            color: rgba(255,255,255,.64);
            font-size: 14px;
            margin-bottom: 12px;
        }
        .file-link {
            display: inline-block;
            background: linear-gradient(90deg, #FF5630, #FF6A3A);
            color: white;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            transition: box-shadow .2s ease;
        }
        .file-link:hover {
            box-shadow: 0 0 20px rgba(255,86,48,.4);
        }
        .info {
            background: rgba(20,212,196,.1);
            border: 1px solid rgba(20,212,196,.2);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
        }
        .warning {
            background: rgba(255,167,38,.1);
            border: 1px solid rgba(255,167,38,.2);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 GRITHER Telegram WebApp</h1>
        
        <div class="info">
            <strong>💡 Информация:</strong> Это локальный сервер для тестирования Telegram WebApp. 
            Для полноценного тестирования используйте Telegram Bot с настроенным Web App URL.
        </div>
        
        <div class="file-list">
`;

    const fileDescriptions = {
      'index.html': {
        title: 'Основной интерфейс',
        description: 'Главная страница GRITHER с hero секцией, карточками действий, метриками и интеграциями'
      },
      'components.html': {
        title: 'Демо компонентов',
        description: 'Демонстрация всех UI компонентов: кнопки, карточки, формы, модальные окна'
      },
      'telegram-demo.html': {
        title: 'Telegram WebApp Demo',
        description: 'Полная демонстрация возможностей Telegram WebApp SDK с логом событий'
      }
    };

    htmlFiles.forEach(file => {
      const info = fileDescriptions[file] || { title: file, description: 'Файл для тестирования' };
      html += `
            <div class="file-item">
                <div class="file-title">${info.title}</div>
                <div class="file-description">${info.description}</div>
                <a href="${file}" class="file-link">Открыть →</a>
            </div>
      `;
    });

    html += `
        </div>
        
        <div class="warning">
            <strong>⚠️ Важно:</strong> Для тестирования Telegram WebApp SDK откройте файлы через Telegram Bot, 
            а не напрямую в браузере. В браузере многие функции будут недоступны.
        </div>
        
        <div class="info">
            <strong>🔧 Настройка Telegram Bot:</strong><br>
            1. Создайте бота через @BotFather<br>
            2. Добавьте Web App URL: <code>http://localhost:${PORT}/</code><br>
            3. Откройте бота в Telegram и нажмите на кнопку Web App
        </div>
    </div>
</body>
</html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Добавляем CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка корневого пути
  if (pathname === '/') {
    serveDirectory(__dirname, res);
    return;
  }

  // Убираем начальный слеш
  if (pathname.startsWith('/')) {
    pathname = pathname.substring(1);
  }

  const filePath = path.join(__dirname, pathname);

  // Проверяем безопасность пути
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Доступ запрещен');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Файл не найден');
      return;
    }

    if (stats.isDirectory()) {
      serveDirectory(filePath, res);
    } else {
      serveFile(filePath, res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 GRITHER Telegram WebApp сервер запущен!`);
  console.log(`📱 Откройте в браузере: http://localhost:${PORT}`);
  console.log(`🤖 Для Telegram Bot используйте URL: http://localhost:${PORT}`);
  console.log(`\n📁 Доступные файлы:`);
  console.log(`   • index.html - Основной интерфейс`);
  console.log(`   • components.html - Демо компонентов`);
  console.log(`   • telegram-demo.html - Telegram WebApp Demo`);
  console.log(`\n💡 Для остановки сервера нажмите Ctrl+C`);
});

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n👋 Сервер остановлен');
  process.exit(0);
});
