Param(
  [Parameter(Mandatory=$false)] [string]$ServiceId,
  [Parameter(Mandatory=$false)] [string]$ApiKey,
  [Parameter(Mandatory=$false)] [int]$PollSeconds = 6,
  [Parameter(Mandatory=$false)] [int]$TimeoutMinutes = 20
)

$ErrorActionPreference = 'Stop'

if (-not $ApiKey) { $ApiKey = $env:RENDER_API_KEY }
if (-not $ServiceId) { $ServiceId = $env:RENDER_SERVICE_ID }

if (-not $ApiKey) { throw 'Missing Render API key. Pass -ApiKey or set RENDER_API_KEY env.' }
if (-not $ServiceId) { throw 'Missing Render Service ID. Pass -ServiceId or set RENDER_SERVICE_ID env.' }

$headers = @{ 'Authorization' = "Bearer $ApiKey"; 'Content-Type' = 'application/json' }
$deployUrl = "https://api.render.com/v1/services/$ServiceId/deploys"

Write-Host "Triggering deploy for service: $ServiceId" -ForegroundColor Cyan
$resp = Invoke-RestMethod -Method Post -Uri $deployUrl -Headers $headers -Body '{}' 
$deployId = $resp.id
if (-not $deployId) { throw "Failed to start deploy: $($resp | ConvertTo-Json -Depth 5)" }
Write-Host "Deploy id: $deployId" -ForegroundColor Green

# Poll status
$deadline = (Get-Date).AddMinutes($TimeoutMinutes)
do {
  Start-Sleep -Seconds $PollSeconds
  $d = Invoke-RestMethod -Method Get -Uri "https://api.render.com/v1/deploys/$deployId" -Headers $headers
  $status = $d.status
  $phase  = $d.phase
  $commit = $null
  if ($d -and $d.PSObject.Properties.Match('commit').Count -gt 0 -and $d.commit) {
    if ($d.commit.PSObject.Properties.Match('id').Count -gt 0) {
      $commit = $d.commit.id
    }
  }
  Write-Host ("[{0:HH:mm:ss}] {1} / {2} / {3}" -f (Get-Date), $status, $phase, $commit)
  if ($status -in 'live','succeeded','updated') { 
    Write-Host "Deploy succeeded." -ForegroundColor Green
    exit 0
  }
  if ($status -in 'failed','canceled') {
    throw "Deploy $status"
  }
} while (Get-Date) -lt $deadline

throw "Deploy timed out after $TimeoutMinutes minutes"


