# PowerShell script to remove BOM from all files
Set-Location C:\Users\GIS\grither-app\frontend

$patterns = @("*.ts","*.tsx","*.js","*.jsx")
$files = Get-ChildItem -Recurse -Include $patterns | Where-Object { -not $_.PSIsContainer }

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  
  # Check for BOM (EF BB BF)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    # Remove first 3 bytes (BOM)
    $contentWithoutBom = $bytes[3..($bytes.Length-1)]
    
    # Write back without BOM
    [System.IO.File]::WriteAllBytes($f.FullName, $contentWithoutBom)
    Write-Host "Removed BOM from: $($f.FullName)"
  }
}

Write-Host "BOM removal completed"
