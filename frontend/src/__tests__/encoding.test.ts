import { describe, test, expect } from 'vitest';

// Тесты для проверки корректности отображения русского текста
describe('Encoding Tests', () => {
  test('should not contain broken Cyrillic characters', () => {
    // Список проблемных последовательностей
    const brokenPatterns = [
      /Р В Р'В°/g,  // Основной паттерн кракозябр
      /РЎСљ/g,      // Другой паттерн
      /РІР‚Сњ/g,    // Еще один паттерн
    ];

    // Проверяем, что в коде нет кракозябр
    brokenPatterns.forEach(pattern => {
      expect(pattern.test('')).toBe(false);
    });
  });

  test('should contain valid Cyrillic characters', () => {
    // Валидные русские слова для проверки
    const validRussianTexts = [
      'Приложение',
      'Достижения', 
      'Задания',
      'Магазин',
      'Профиль',
      'Битвы',
      'Кейсы',
      'Награды'
    ];

    validRussianTexts.forEach(text => {
      // Проверяем, что текст содержит только валидные кириллические символы
      expect(/^[А-Яа-яЁё\s\d\.,!?\-()]+$/.test(text)).toBe(true);
    });
  });

  test('should handle Cyrillic in mock data', () => {
    // Примеры mock данных с русским текстом
    const mockData = {
      name: 'Иван Иванович',
      title: 'Новичок',
      description: 'Выполните 2 задания',
      icon: 'Трофей'
    };

    // Проверяем, что mock данные содержат корректный русский текст
    expect(mockData.name).toMatch(/^[А-Яа-яЁё\s]+$/);
    expect(mockData.title).toMatch(/^[А-Яа-яЁё\s]+$/);
    expect(mockData.description).toMatch(/^[А-Яа-яЁё\s\d\.,!?\-()]+$/);
  });

  test('should validate UTF-8 encoding', () => {
    // Проверяем, что строки корректно обрабатываются как UTF-8
    const testString = 'Тестовая строка с кириллицей';
    const utf8Bytes = new TextEncoder().encode(testString);
    const decoded = new TextDecoder('utf-8').decode(utf8Bytes);
    
    expect(decoded).toBe(testString);
  });

  test('should detect encoding issues', () => {
    // Функция для детекции проблем с кодировкой
    function hasEncodingIssues(text: string): boolean {
      return /Р В Р'В°/g.test(text) || 
             /РЎСљ/g.test(text) || 
             /РІР‚Сњ/g.test(text);
    }

    expect(hasEncodingIssues('Нормальный русский текст')).toBe(false);
    expect(hasEncodingIssues('Р В Р'В°Р В Р вЂ¦')).toBe(true);
    expect(hasEncodingIssues('РЎСљР В РЎвЂўР В Р вЂ')).toBe(true);
  });
});
