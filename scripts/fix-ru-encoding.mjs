import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import iconv from 'iconv-lite';

// эвристика: если в файле много символов Р, В, С или Ð, Ñ, считаем текст испорченным
const looksBroken = s => /[РВСÐÑ][\s\u00A0-]/.test(s) || s.includes('Р') || s.includes('Ð');

async function main() {
  const exts = ['ts','tsx','js','jsx','css','html','md','json'];
  const files = await glob(`frontend/**/*.{${exts.join(',')}}`, { nodir: true });

  let fixed = 0;
  for (const f of files) {
    const buf = await fs.readFile(f);
    let txt = buf.toString('utf8');

    if (!looksBroken(txt)) continue;

    // попытка восстановления: текст когда-то был UTF-8, но его прочитали как CP1251
    // кодируем текущее "мусорное" юникод-представление в cp1251 и снова декодируем как utf8
    const recoded = iconv.decode(iconv.encode(txt, 'win1251'), 'utf8');

    // сохраняем, только если после преобразования русских букв стало больше и пропали "Р В"
    const gain = (recoded.match(/[А-Яа-яЁё]/g)?.length || 0) - (txt.match(/[А-Яа-яЁё]/g)?.length || 0);
    if (gain > 0 && !/[РВСÐÑ]\s?В?/.test(recoded)) {
      await fs.writeFile(f, recoded, 'utf8');
      fixed++;
      console.log('fixed:', f);
    }
  }
  console.log('Total fixed files:', fixed);
}

main().catch(console.error);
