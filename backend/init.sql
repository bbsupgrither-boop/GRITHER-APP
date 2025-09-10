-- Инициализация базы данных для Grither App

-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы логов
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    type VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL DEFAULT 'info',
    message TEXT,
    extra JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы контентных блоков
CREATE TABLE IF NOT EXISTS content_blocks (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_content_blocks_slug ON content_blocks(slug);

-- Вставка тестовых данных
INSERT INTO content_blocks (slug, title, body) VALUES 
('welcome', 'Добро пожаловать!', 'Добро пожаловать в Grither App! Это ваше первое приложение.'),
('about', 'О приложении', 'Grither App - это современное веб-приложение, созданное с использованием React, Node.js и PostgreSQL.'),
('features', 'Возможности', '• Современный UI/UX дизайн\n• Telegram WebApp интеграция\n• База данных PostgreSQL\n• Деплой на Render')
ON CONFLICT (slug) DO NOTHING;
