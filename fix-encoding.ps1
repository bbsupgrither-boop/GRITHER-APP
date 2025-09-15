# PowerShell script to fix encoding issues
Set-Location C:\Users\GIS\grither-app

# Create backup and fix encoding for all problematic files
$patterns = @("*.ts","*.tsx","*.js","*.jsx","*.json","*.md","*.css")
$files = Get-ChildItem -Recurse -Include $patterns | Where-Object { -not $_.PSIsContainer }

$cp1251 = [System.Text.Encoding]::GetEncoding(1251)
$utf8   = New-Object System.Text.UTF8Encoding($false)

$fixedFiles = @()

foreach ($f in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $text1251 = $cp1251.GetString($bytes)
  
  # Check for mojibake patterns - simplified check
  if ($text1251 -match "Р|С|Т|У|Ф|Х|Ц|Ч|Ш|Щ|Ъ|Ы|Ь|Э|Ю|Я") {
    # Create backup
    Copy-Item $f.FullName "$($f.FullName).bak" -Force
    
    # Fix common mojibake patterns
    $fixedText = $text1251
    $fixedText = $fixedText -replace "Сначала", "Сначала"
    $fixedText = $fixedText -replace "Петр", "Петр"
    $fixedText = $fixedText -replace "Мария", "Мария"
    $fixedText = $fixedText -replace "Елена", "Елена"
    $fixedText = $fixedText -replace "Алексей", "Алексей"
    $fixedText = $fixedText -replace "Анна", "Анна"
    $fixedText = $fixedText -replace "Иванова", "Иванова"
    $fixedText = $fixedText -replace "Петров", "Петров"
    $fixedText = $fixedText -replace "Сидорова", "Сидорова"
    $fixedText = $fixedText -replace "Козлов", "Козлов"
    $fixedText = $fixedText -replace "Морозова", "Морозова"
    $fixedText = $fixedText -replace "Волков", "Волков"
    $fixedText = $fixedText -replace "Иванов", "Иванов"
    $fixedText = $fixedText -replace "Петрова", "Петрова"
    $fixedText = $fixedText -replace "Козлова", "Козлова"
    $fixedText = $fixedText -replace "Команда", "Команда"
    
    # Write fixed content as UTF-8
    [System.IO.File]::WriteAllText($f.FullName, $fixedText, $utf8)
    $fixedFiles += $f.FullName
    Write-Host "Fixed encoding: $($f.FullName)"
  }
}

Write-Host "Total files fixed: $($fixedFiles.Count)"
Write-Host "Fixed files:"
$fixedFiles | ForEach-Object { Write-Host "  $_" }
