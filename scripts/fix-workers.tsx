import { promises as fs } from 'fs';

async function fixWorkersFile() {
  const filePath = 'frontend/components/WorkersManagement.tsx';
  
  try {
    let content = await fs.readFile(filePath, 'utf8');
    
    // Исправляем основные проблемы
    content = content.replace(/Р С—Р'В»РЎвЂ"import/, 'import');
    content = content.replace(/Р В Р'ВР Р†Р вЂљРІвЂћСћР В Р Р‹Р В РЎвЂњР В Р'ВР вЂ™Р'Вµ Р В Р'ВР РЋРІР‚СњР В Р'ВР РЋРІР‚СћР В Р'ВР РЋР'ВР В Р'ВР вЂ™Р'В°Р В Р'ВР В РІР‚В¦Р В Р'ВР СћРІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ"/g, 'Активация команды');
    content = content.replace(/Р В Р'ВР В Р вЂ№Р В Р'ВР вЂ™Р'В°Р В Р'ВР РЋРІР‚вЂќР В Р'ВР РЋРІР‚вЂќР В Р'ВР РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†Р вЂљРЎв„ў/g, 'Выбрать команду');
    content = content.replace(/Р В Р'ВР вЂ™Р'ВР В Р Р‹Р РЋРІР‚СљР В Р'ВР РЋРІР‚СњР В Р'ВР РЋРІР‚СћР В Р'ВР В РІР‚В Р В Р'ВР РЋРІР‚СћР В Р'ВР СћРІР‚В¦Р В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р'ВР В РІР‚В Р В Р'ВР РЋРІР‚Сћ/g, 'Дополнительная команда');
    
    await fs.writeFile(filePath, content, 'utf8');
    console.log('✅ Fixed WorkersManagement.tsx');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixWorkersFile();
