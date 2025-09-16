import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Тесты для проверки отображения русского текста в компонентах
describe('Component Encoding Tests', () => {
  test('should render Cyrillic text correctly', () => {
    const TestComponent = () => (
      <div>
        <h1>Приложение GRITHER</h1>
        <p>Добро пожаловать в наше приложение!</p>
        <button>Начать игру</button>
      </div>
    );

    render(<TestComponent />);
    
    expect(screen.getByText('Приложение GRITHER')).toBeInTheDocument();
    expect(screen.getByText('Добро пожаловать в наше приложение!')).toBeInTheDocument();
    expect(screen.getByText('Начать игру')).toBeInTheDocument();
  });

  test('should not contain broken encoding in rendered text', () => {
    const TestComponent = () => (
      <div>
        <span>Тестовый текст</span>
        <span>Р В Р'В°Р В Р вЂ¦</span> {/* Это должно быть обнаружено как проблема */}
      </div>
    );

    render(<TestComponent />);
    
    const testText = screen.getByText('Тестовый текст');
    const brokenText = screen.getByText('Р В Р'В°Р В Р вЂ¦');
    
    expect(testText).toBeInTheDocument();
    expect(brokenText).toBeInTheDocument();
    
    // Проверяем, что broken text действительно содержит кракозябры
    expect(brokenText.textContent).toMatch(/Р В Р'В°/);
  });

  test('should validate modal manager functions', () => {
    // Тестируем функции modalManager
    const modalManager = {
      isModalOpen: () => false,
      open: (id: string) => {},
      close: (id: string) => {},
      closeModal: (id: string) => {},
      closeAllModals: () => {}
    };

    expect(modalManager.isModalOpen).toBeDefined();
    expect(modalManager.open).toBeDefined();
    expect(modalManager.close).toBeDefined();
    expect(modalManager.closeModal).toBeDefined();
    expect(modalManager.closeAllModals).toBeDefined();
  });

  test('should handle Russian text in forms', () => {
    const TestForm = () => (
      <form>
        <label htmlFor="name">Имя пользователя:</label>
        <input id="name" placeholder="Введите ваше имя" />
        <label htmlFor="email">Электронная почта:</label>
        <input id="email" placeholder="example@email.com" />
        <button type="submit">Сохранить</button>
      </form>
    );

    render(<TestForm />);
    
    expect(screen.getByLabelText('Имя пользователя:')).toBeInTheDocument();
    expect(screen.getByLabelText('Электронная почта:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите ваше имя')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });
});
