# Скрипт для удаления BOM символов из всех файлов
Write-Host "Удаление BOM символов из всех файлов..."

Get-ChildItem -Path "frontend" -Recurse -Include "*.tsx","*.ts","*.js","*.jsx" | ForEach-Object {
    try {
        $content = Get-Content $_.FullName -Raw -Encoding UTF8
        if ($content -and $content.StartsWith([char]0xFEFF)) {
            $content = $content.Substring(1)
            Set-Content $_.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Исправлен BOM в: $($_.Name)" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "Ошибка при обработке $($_.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Очистка BOM завершена!" -ForegroundColor Green
