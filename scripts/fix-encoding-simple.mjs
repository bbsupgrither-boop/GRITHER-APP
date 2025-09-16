import { promises as fs } from 'fs';
import { glob } from 'glob';

// Простой скрипт для исправления кодировки
async function fixEncoding() {
  console.log('🔧 Проверка кодировки файлов...');
  
  const files = await glob('frontend/**/*.{ts,tsx,js,jsx,json}', { nodir: true });
  let fixedCount = 0;
  
  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      
      // Проверяем на наличие кракозябр
      if (content.includes('Р') && content.includes('В') && content.includes('С')) {
        console.log(`⚠️  Найдены кракозябры в файле: ${file}`);
        // Здесь можно добавить логику исправления
      }
    } catch (error) {
      console.error(`❌ Ошибка при чтении ${file}:`, error.message);
    }
  }
  
  console.log(`✅ Проверка завершена. Обработано файлов: ${files.length}`);
}

fixEncoding().catch(console.error);
