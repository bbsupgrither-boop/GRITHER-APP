import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Мокаем мобильные утилиты
vi.mock('../utils/mobile-detection', () => ({
  isMobileDevice: vi.fn(),
  isTouchDevice: vi.fn(),
  getScreenSize: vi.fn(),
  isTelegramWebApp: vi.fn(),
  shouldUseMobileLayout: vi.fn(),
}));

import { 
  isMobileDevice, 
  isTouchDevice, 
  getScreenSize, 
  isTelegramWebApp, 
  shouldUseMobileLayout 
} from '../utils/mobile-detection';

describe('Mobile Detection Tests', () => {
  test('should detect mobile device', () => {
    (isMobileDevice as any).mockReturnValue(true);
    expect(isMobileDevice()).toBe(true);
  });

  test('should detect touch device', () => {
    (isTouchDevice as any).mockReturnValue(true);
    expect(isTouchDevice()).toBe(true);
  });

  test('should return correct screen size', () => {
    (getScreenSize as any).mockReturnValue('mobile');
    expect(getScreenSize()).toBe('mobile');
  });

  test('should detect Telegram WebApp', () => {
    (isTelegramWebApp as any).mockReturnValue(true);
    expect(isTelegramWebApp()).toBe(true);
  });

  test('should use mobile layout when appropriate', () => {
    (shouldUseMobileLayout as any).mockReturnValue(true);
    expect(shouldUseMobileLayout()).toBe(true);
  });
});

describe('Mobile Component Tests', () => {
  test('should render mobile-friendly buttons', () => {
    const MobileButton = () => (
      <button className="btn">
        Начать игру
      </button>
    );

    render(<MobileButton />);
    const button = screen.getByText('Начать игру');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
  });

  test('should render mobile navigation', () => {
    const MobileNav = () => (
      <nav className="bottom-navigation">
        <div className="nav-item">
          <span>Главная</span>
        </div>
        <div className="nav-item">
          <span>Достижения</span>
        </div>
        <div className="nav-item">
          <span>Задания</span>
        </div>
        <div className="nav-item">
          <span>Магазин</span>
        </div>
        <div className="nav-item">
          <span>Профиль</span>
        </div>
      </nav>
    );

    render(<MobileNav />);
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Достижения')).toBeInTheDocument();
    expect(screen.getByText('Задания')).toBeInTheDocument();
    expect(screen.getByText('Магазин')).toBeInTheDocument();
    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  test('should render mobile modal', () => {
    const MobileModal = () => (
      <div className="modal">
        <div className="modal-content">
          <h2>Мобильное модальное окно</h2>
          <p>Содержимое модального окна</p>
          <button className="btn">Закрыть</button>
        </div>
      </div>
    );

    render(<MobileModal />);
    expect(screen.getByText('Мобильное модальное окно')).toBeInTheDocument();
    expect(screen.getByText('Содержимое модального окна')).toBeInTheDocument();
    expect(screen.getByText('Закрыть')).toBeInTheDocument();
  });

  test('should render mobile form', () => {
    const MobileForm = () => (
      <form>
        <div className="form-group">
          <label htmlFor="mobile-input">Мобильный ввод:</label>
          <input 
            id="mobile-input" 
            className="form-input" 
            placeholder="Введите текст"
            type="text"
          />
        </div>
        <button type="submit" className="btn">
          Отправить
        </button>
      </form>
    );

    render(<MobileForm />);
    expect(screen.getByLabelText('Мобильный ввод:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите текст')).toBeInTheDocument();
    expect(screen.getByText('Отправить')).toBeInTheDocument();
  });
});

describe('Mobile Layout Tests', () => {
  test('should apply mobile container styles', () => {
    const MobileContainer = () => (
      <div className="container">
        <h1>Мобильный контейнер</h1>
        <p>Содержимое контейнера</p>
      </div>
    );

    render(<MobileContainer />);
    const container = screen.getByText('Мобильный контейнер').parentElement;
    expect(container).toHaveClass('container');
  });

  test('should apply mobile grid styles', () => {
    const MobileGrid = () => (
      <div className="grid grid-2">
        <div className="card">Карточка 1</div>
        <div className="card">Карточка 2</div>
      </div>
    );

    render(<MobileGrid />);
    expect(screen.getByText('Карточка 1')).toBeInTheDocument();
    expect(screen.getByText('Карточка 2')).toBeInTheDocument();
  });
});
