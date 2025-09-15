# PowerShell script to remove BOM from all files
Set-Location C:\Users\GIS\grither-app

$patterns = @("*.ts","*.tsx","*.js","*.jsx")
$files = Get-ChildItem -Recurse -Include $patterns | Where-Object { -not $_.PSIsContainer }

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
  $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
  
  # Check if file starts with BOM
  if ($content.StartsWith("п»ї")) {
    # Remove BOM
    $content = $content.Substring(3)
    
    # Write back without BOM
    [System.IO.File]::WriteAllText($f.FullName, $content, $utf8NoBom)
    Write-Host "Removed BOM from: $($f.FullName)"
  }
}

Write-Host "BOM removal completed"
