import React from 'react';

// Simple test component
function TestPage() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1>GRITHER App Test</h1>
      <p>Если вы видите это сообщение, приложение работает!</p>
      <p>Время: {new Date().toLocaleString()}</p>
      <p>URL: {window.location.href}</p>
    </div>
  );
}

function App() {
  return <TestPage />;
}

export default App;
