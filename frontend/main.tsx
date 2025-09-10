import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'


// Р¤СѓРЅРєС†РёСЏ РґР»СЏ СЃРєСЂС‹С‚РёСЏ РїСЂРµР»РѕР°РґРµСЂР°
const hideLoader = () => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => loader.remove(), 500);
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// РЎРєСЂС‹РІР°РµРј РїСЂРµР»РѕР°РґРµСЂ РїРѕСЃР»Рµ СЂРµРЅРґРµСЂР°
setTimeout(hideLoader, 500);
