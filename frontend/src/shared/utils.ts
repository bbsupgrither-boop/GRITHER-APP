// Безопасные утилиты для работы с данными

export function safeDate(input?: string | number | Date): string {
  if (!input) return "";
  const d = new Date(input);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("ru-RU");
}

export function get<T, K extends keyof T>(obj: T | null | undefined, key: K, fallback: T[K]) {
  return obj && obj[key] !== undefined ? obj[key] : fallback;
}

export function safeString(input?: any): string {
  if (input === null || input === undefined) return "";
  return String(input);
}

export function safeNumber(input?: any, fallback: number = 0): number {
  if (input === null || input === undefined) return fallback;
  const num = Number(input);
  return isNaN(num) ? fallback : num;
}
