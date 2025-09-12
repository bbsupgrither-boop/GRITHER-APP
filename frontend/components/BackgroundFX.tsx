import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 -z-10">
      {theme === 'dark' ? (
        <div className="absolute inset-0 bg-gradient-radial from-gray-900 to-black"></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
      )}
    </div>
  );
};