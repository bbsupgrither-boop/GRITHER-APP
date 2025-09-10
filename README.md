# Grither App - Full Stack Application

Полнофункциональное веб-приложение, объединяющее фронтенд на React и бэкенд на Node.js с базой данных PostgreSQL.

## 🚀 Технологии

### Frontend
- **React 18** с TypeScript
- **Vite** для сборки и разработки
- **Tailwind CSS** для стилизации
- **Radix UI** компоненты
- **React Hook Form** для форм

### Backend
- **Node.js** с Express
- **PostgreSQL** база данных
- **CORS** для кросс-доменных запросов
- **JWT-подобные токены** для аутентификации

### Деплой
- **Render** для хостинга
- **PostgreSQL** на Render
- **GitHub** для версионирования

## 📁 Структура проекта

```
grither-app/
├── frontend/          # React приложение
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Node.js API
│   ├── src/
│   ├── index.js
│   ├── package.json
│   └── init.sql
├── package.json       # Корневой package.json
├── render.yaml        # Конфигурация Render
└── README.md
```

## 🛠 Локальная разработка

### Предварительные требования
- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL (для локальной разработки)

### Установка

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/ваш-аккаунт/grither-app.git
cd grither-app
```

2. **Установите зависимости:**
```bash
npm run install:all
```

3. **Настройте переменные окружения:**

Создайте файл `backend/.env`:
```env
BOT_TOKEN=ваш_telegram_bot_token
DATABASE_URL=postgresql://username:password@localhost:5432/grither_db
PORT=3001
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:3000
```

4. **Инициализируйте базу данных:**
```bash
# Подключитесь к PostgreSQL и выполните:
psql -d grither_db -f backend/init.sql
```

5. **Запустите приложение:**
```bash
# Запуск фронтенда и бэкенда одновременно
npm run dev

# Или по отдельности:
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

## 🚀 Деплой на Render

### 1. Создание базы данных

1. Войдите в [Render Dashboard](https://dashboard.render.com/)
2. Нажмите **"New +"** → **"PostgreSQL"**
3. Заполните:
   - **Name**: `grither-database`
   - **Database**: `grither_db`
   - **User**: `grither_user`
   - **Region**: выберите ближайший
4. Нажмите **"Create Database"**
5. Скопируйте **Internal Database URL**

### 2. Инициализация базы данных

1. Подключитесь к базе данных через psql или pgAdmin
2. Выполните SQL из файла `backend/init.sql`

### 3. Деплой приложения

1. **Загрузите код в GitHub:**
```bash
git add .
git commit -m "Initial commit: объединение фронтенда и бэкенда"
git push origin main
```

2. **В Render Dashboard:**
   - Нажмите **"New +"** → **"Blueprint"**
   - Подключите ваш репозиторий `grither-app`
   - Render автоматически создаст сервисы согласно `render.yaml`

### 4. Настройка переменных окружения

После создания сервисов добавьте переменные:

**Для бэкенда (`grither-backend`):**
- `BOT_TOKEN` - токен вашего Telegram бота
- `DATABASE_URL` - Internal Database URL из Render
- `NODE_ENV=production`
- `PORT=3001`
- `CORS_ORIGIN=https://grither-frontend.onrender.com`

**Для фронтенда (`grither-frontend`):**
- `VITE_API_URL=https://grither-backend.onrender.com`

## 📱 API Endpoints

### Аутентификация
- `POST /api/twa/auth` - Авторизация через Telegram WebApp
- `GET /api/whoami` - Получение информации о текущем пользователе

### Контент
- `GET /api/content/:slug` - Получение контентного блока по slug

### Система
- `GET /api/health` - Проверка здоровья API
- `GET /api/diag/env` - Диагностика окружения
- `POST /api/logs` - Логирование событий

## 🔧 Скрипты

```bash
# Разработка
npm run dev              # Запуск фронтенда и бэкенда
npm run dev:frontend     # Только фронтенд
npm run dev:backend      # Только бэкенд

# Сборка
npm run build            # Сборка всего проекта
npm run build:frontend   # Сборка фронтенда
npm run build:backend    # Сборка бэкенда

# Установка
npm run install:all      # Установка всех зависимостей
```

## 🌐 URL после деплоя

- **Frontend**: `https://grither-frontend.onrender.com`
- **Backend API**: `https://grither-backend.onrender.com`
- **Database**: Внутренняя база данных Render

## 🐛 Отладка

### Логи
- **Frontend**: Проверьте консоль браузера
- **Backend**: Логи в Render Dashboard
- **Database**: Логи PostgreSQL в Render

### Частые проблемы

1. **CORS ошибки**: Проверьте настройки `CORS_ORIGIN`
2. **База данных**: Убедитесь, что `DATABASE_URL` правильный
3. **Telegram Bot**: Проверьте `BOT_TOKEN`

## 📝 Дальнейшая разработка

1. **Добавление новых API endpoints** в `backend/index.js`
2. **Создание новых компонентов** в `frontend/src/`
3. **Обновление базы данных** через миграции
4. **Настройка CI/CD** через GitHub Actions

## 🤝 Поддержка

Если у вас возникли вопросы или проблемы:
1. Проверьте логи в Render Dashboard
2. Убедитесь, что все переменные окружения настроены
3. Проверьте подключение к базе данных

---

**Удачной разработки! 🚀**
