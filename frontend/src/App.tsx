import React from 'react';
import './styles/globals.css';

function App() {
  return (
    <div className="container">
      <h1 className="title">🚀 Grither App</h1>
      <p className="subtitle">обро пожаловать в ваше приложение!</p>
      
      <div className="card">
        <h2>✨ Статус</h2>
        <div className="status">
          <span>Frontend:</span>
          <span className="status-good">✅ аботает</span>
        </div>
        <div className="status">
          <span>Backend:</span>
          <span className="status-warning">⏳ агружается...</span>
        </div>
        <div className="status">
          <span>Database:</span>
          <span className="status-warning">⏳ одключается...</span>
        </div>
      </div>

      <div className="card">
        <p>риложение успешно задеплоено на Render!</p>
        <p>Скоро здесь будет полный функционал.</p>
      </div>
    </div>
  );
}

export default App;
