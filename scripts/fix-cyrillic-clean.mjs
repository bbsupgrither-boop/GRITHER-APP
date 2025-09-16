import { promises as fs } from 'fs';
import { glob } from 'glob';
import iconv from 'iconv-lite';

// Функция для определения кракозябр
function hasCyrillicGarbled(text) {
  return /Р В Р'В/g.test(text) || 
         /РЎСљ/g.test(text) || 
         /РІР‚Сњ/g.test(text) ||
         /Р РЋР/g.test(text) ||
         /Р С—Р'В»РЎвЂ"import/g.test(text);
}

// Функция для исправления текста
function fixCyrillicText(text) {
  let fixed = text;
  
  // Исправляем испорченные импорты
  const brokenImport = 'Р С—Р'В»РЎвЂ"import';
  if (fixed.includes(brokenImport)) {
    fixed = fixed.replace(brokenImport, 'import');
  }
  
  // Пытаемся восстановить кодировку
  if (hasCyrillicGarbled(fixed)) {
    try {
      const recoded = iconv.decode(iconv.encode(fixed, 'win1251'), 'utf8');
      const originalCyrillic = (fixed.match(/[А-Яа-яЁё]/g) || []).length;
      const recodedCyrillic = (recoded.match(/[А-Яа-яЁё]/g) || []).length;
      
      if (recodedCyrillic > originalCyrillic) {
        fixed = recoded;
      }
    } catch (error) {
      console.warn('Ошибка восстановления кодировки:', error.message);
    }
  }
  
  return fixed;
}

async function main() {
  console.log('🔧 Исправление кракозябр...');
  
  const files = await glob('**/*.{ts,tsx,js,jsx,html,css,json,md}', {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    nodir: true
  });
  
  let fixedCount = 0;
  
  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      
      if (hasCyrillicGarbled(content)) {
        const fixed = fixCyrillicText(content);
        
        if (fixed !== content) {
          await fs.writeFile(file, fixed, 'utf8');
          console.log(`✅ Исправлен: ${file}`);
          fixedCount++;
        }
      }
    } catch (error) {
      console.error(`❌ Ошибка ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Исправлено файлов: ${fixedCount}`);
}

main().catch(console.error);
