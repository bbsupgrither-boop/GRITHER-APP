# GRITHER - Deployment Setup Guide

## рџљЂ Р­С‚Р°РїС‹ СЂР°Р·РІРµСЂС‚С‹РІР°РЅРёСЏ

### Р­С‚Р°Рї 1: РџРѕРґРіРѕС‚РѕРІРєР° Frontend (Р“РћРўРћР’Рћ)
- вњ… React РїСЂРёР»РѕР¶РµРЅРёРµ РіРѕС‚РѕРІРѕ
- вњ… Р’СЃРµ РєРѕРјРїРѕРЅРµРЅС‚С‹ СЂР°Р±РѕС‚Р°СЋС‚
- вњ… РЎРёСЃС‚РµРјР° СѓРІРµРґРѕРјР»РµРЅРёР№ РЅР°СЃС‚СЂРѕРµРЅР°
- вњ… РђРґР°РїС‚РёРІРЅС‹Р№ РґРёР·Р°Р№РЅ

### Р­С‚Р°Рї 2: Frontend Deployment (РЎР•Р™Р§РђРЎ)
```bash
# 1. Р”РµРїР»РѕР№ РЅР° Vercel (СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ)
npm install -g vercel
vercel --prod

# 2. РР»Рё РЅР° Netlify
npm run build
# Р—Р°С‚РµРј Р·Р°РіСЂСѓР·РёС‚СЊ dist/ РЅР° netlify.com
```

### Р­С‚Р°Рї 3: Telegram Bot Setup
```bash
# РЎРѕР·РґР°С‚СЊ Р±РѕС‚Р° С‡РµСЂРµР· @BotFather
/newbot
# РРјСЏ: GRITHER Bot
# Username: grither_app_bot

# РџРѕР»СѓС‡РёС‚СЊ Bot Token
# РќР°СЃС‚СЂРѕРёС‚СЊ Web App URL РїРѕСЃР»Рµ РґРµРїР»РѕСЏ
/setmenubutton
```

### Р­С‚Р°Рї 4: Backend Development
```
Backend Stack:
- Node.js + Express/Fastify
- PostgreSQL (РёР»Рё Supabase)
- Telegram Bot API
- JWT Authentication
```

### Р­С‚Р°Рї 5: Database Schema
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  balance INTEGER DEFAULT 1000,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Р РѕСЃС‚Р°Р»СЊРЅС‹Рµ С‚Р°Р±Р»РёС†С‹ РґР»СЏ Р·Р°РґР°С‡, РґРѕСЃС‚РёР¶РµРЅРёР№, Р±Р°С‚С‚Р»РѕРІ...
```

### Р­С‚Р°Рї 6: CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
```

## рџ› пёЏ Immediate Next Steps

1. **Deploy Current Version**
   - РџРѕР»СѓС‡РёС‚СЊ HTTPS URL
   - РќР°СЃС‚СЂРѕРёС‚СЊ Telegram Web App

2. **Create Bot**
   - РџРѕР»СѓС‡РёС‚СЊ Bot Token
   - РќР°СЃС‚СЂРѕРёС‚СЊ РєРѕРјР°РЅРґС‹

3. **Setup Database**
   - РЎРѕР·РґР°С‚СЊ Supabase РїСЂРѕРµРєС‚
   - РќР°СЃС‚СЂРѕРёС‚СЊ СЃС…РµРјСѓ Р‘Р”

4. **Backend API**
   - РЎРѕР·РґР°С‚СЊ API endpoints
   - РРЅС‚РµРіСЂРёСЂРѕРІР°С‚СЊ СЃ Telegram

5. **Real-time Updates**
   - WebSockets РёР»Рё Server-Sent Events
   - РЎРёРЅС…СЂРѕРЅРёР·Р°С†РёСЏ РјРµР¶РґСѓ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё

## рџ“± Telegram Web App Integration

РџРѕСЃР»Рµ РґРµРїР»РѕСЏ:
```javascript
// РџРѕР»СѓС‡РµРЅРёРµ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РёР· Telegram
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;
  
  // РћС‚РїСЂР°РІРёС‚СЊ РґР°РЅРЅС‹Рµ РЅР° Р±СЌРєРµРЅРґ РґР»СЏ Р°РІС‚РѕСЂРёР·Р°С†РёРё
  fetch('/api/auth/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData: tg.initData,
      user: user
    })
  });
}
```

## рџ”„ Development Workflow

Р”Р»СЏ Р±С‹СЃС‚СЂРѕРіРѕ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ Р±РµР· РїРѕР»РЅРѕР№ РїРµСЂРµР·Р°РіСЂСѓР·РєРё:

1. **Git-based workflow**
   ```bash
   git add .
   git commit -m "Update features"
   git push origin main
   # Auto-deploy via Vercel/Netlify
   ```

2. **Admin Panel** (СѓР¶Рµ РµСЃС‚СЊ)
   - Р РµРґР°РєС‚РёСЂРѕРІР°РЅРёРµ Р·Р°РґР°С‡
   - РЈРїСЂР°РІР»РµРЅРёРµ С‚РѕРІР°СЂР°РјРё
   - РњРѕРґРµСЂР°С†РёСЏ РґРѕСЃС‚РёР¶РµРЅРёР№

3. **Hot Config**
   - РљРѕРЅС„РёРі РІ Р‘Р” РІРјРµСЃС‚Рѕ РєРѕРґР°
   - API РґР»СЏ РѕР±РЅРѕРІР»РµРЅРёСЏ РЅР°СЃС‚СЂРѕРµРє
   - Realtime РѕР±РЅРѕРІР»РµРЅРёСЏ С‡РµСЂРµР· WebSocket

## рџ’ѕ Data Migration Plan

localStorage в†’ Database:
1. Export current localStorage data
2. Create migration scripts
3. Import to PostgreSQL/Supabase
4. Update API calls
5. Remove localStorage dependencies