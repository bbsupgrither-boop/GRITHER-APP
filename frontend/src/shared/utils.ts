// Р В РІР‚ВР В Р’ВµР В Р’В·Р В РЎвЂўР В РЎвЂ”Р В Р’В°Р РЋР С“Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋРЎвЂњР РЋРІР‚С™Р В РЎвЂР В Р’В»Р В РЎвЂР РЋРІР‚С™Р РЋРІР‚в„– Р В РўвЂР В Р’В»Р РЋР РЏ Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р РЋРІР‚в„– Р РЋР С“ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В РЎВР В РЎвЂ

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
