import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Simple test component to check if React is working
const TestPage = ({ title }: { title: string }) => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: '#f0f0f0', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
      {title}
    </h1>
    <p style={{ color: '#666', fontSize: '1.2rem' }}>
      Страница работает! React загружен успешно.
    </p>
    <div style={{ 
      marginTop: '20px', 
      padding: '10px', 
      backgroundColor: '#e0e0e0', 
      borderRadius: '8px' 
    }}>
      <p>Если вы видите этот текст, значит приложение работает.</p>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
  };

  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<TestPage title="Главная страница" />} />
          <Route path="/achievements" element={<TestPage title="Достижения" />} />
          <Route path="/tasks" element={<TestPage title="Задачи" />} />
          <Route path="/shop" element={<TestPage title="Магазин" />} />
          <Route path="/profile" element={<TestPage title="Профиль" />} />
        </Routes>
      </div>
    </HashRouter>
  );
}