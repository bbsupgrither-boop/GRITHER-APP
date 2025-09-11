# PowerShell script to fix encoding issues
$files = Get-ChildItem -Path "frontend" -Recurse -Include "*.tsx", "*.ts", "*.js", "*.jsx" | Where-Object { $_.Name -notlike "*node_modules*" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Fix common encoding issues
    $content = $content -replace "РђРЅРЅР° РРІР°РЅРѕРІР°", "Анна Иванова"
    $content = $content -replace "РџРµС‚СЂ РџРµС‚СЂРѕРІ", "Петр Петров"
    $content = $content -replace "РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°", "Мария Сидорова"
    $content = $content -replace "Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°", "Елена Морозова"
    $content = $content -replace "РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ", "Алексей Козлов"
    
    # Fix common words
    $content = $content -replace "РџСЂРёРіР»Р°С€РµРЅРёСЏ", "Приглашения"
    $content = $content -replace "РІС‹Р·С‹РІР°РµС‚", "вызывает"
    $content = $content -replace "РµС‰Рµ", "еще"
    $content = $content -replace "Р'СЃРµРіРѕ", "Всего"
    $content = $content -replace "Р±Р°С‚С‚Р»", "баттл"
    $content = $content -replace "Р±Р°С‚С‚Р»РѕРІ", "баттлов"
    $content = $content -replace "РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ", "Нет активных баттлов"
    $content = $content -replace "РќР°Р¶РјРёС‚Рµ \+ С‡С‚РѕР±С‹ СЃРѕР·РґР°С‚СЊ РІС‹Р·РѕРІ", "Нажмите + чтобы создать вызов"
    
    # Fix comments
    $content = $content -replace "РџСѓСЃС‚РѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ", "Пустое состояние"
    $content = $content -replace "РЎС‡РµС‚С‡РёРє РІРЅРёР·Сѓ", "Счетчик внизу"
    
    # Write back to file
    Set-Content $file.FullName -Value $content -Encoding UTF8
    Write-Host "Fixed: $($file.FullName)"
}

Write-Host "Encoding fix completed!"
