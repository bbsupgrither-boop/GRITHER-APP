Param(
  [Parameter(Mandatory=$true)] [ValidateSet('InstallFrontend','BuildFrontend','InstallBackend','StartBackend','BuildAll','DevAll','GitStatus','GitPushMain')]
  [string]$Task
)

$ErrorActionPreference = 'Stop'

function Ensure-Node {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js is not available in PATH. Please install Node 18+ and restart the terminal.'
  }
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw 'npm is not available in PATH. Please install Node 18+ (with npm) and restart the terminal.'
  }
}

function Install-Frontend {
  Ensure-Node
  Push-Location frontend
  try {
    npm ci --no-audit --no-fund
  } finally { Pop-Location }
}

function Build-Frontend {
  Ensure-Node
  Push-Location frontend
  try {
    npm run build
  } finally { Pop-Location }
}

function Install-Backend {
  Ensure-Node
  Push-Location backend
  try {
    npm ci --no-audit --no-fund
  } finally { Pop-Location }
}

function Start-Backend {
  Ensure-Node
  Push-Location backend
  try {
    $env:PORT = if ($env:PORT) { $env:PORT } else { '3001' }
    node index.js
  } finally { Pop-Location }
}

function Build-All {
  Install-Frontend
  Build-Frontend
  Install-Backend
}

function Dev-All {
  Ensure-Node
  Write-Host 'Starting dev (frontend + backend) in two windows...' -ForegroundColor Cyan
  Start-Process powershell -ArgumentList '-NoProfile','-Command','Set-Location frontend; npm run dev'
  Start-Process powershell -ArgumentList '-NoProfile','-Command','Set-Location backend; npm run dev'
}

function Git-Status {
  git status
}

function Git-PushMain {
  git add -A
  git commit -m 'chore: windows task runner and stability'
  git push origin main
}

switch ($Task) {
  'InstallFrontend' { Install-Frontend }
  'BuildFrontend'   { Build-Frontend }
  'InstallBackend'  { Install-Backend }
  'StartBackend'    { Start-Backend }
  'BuildAll'        { Build-All }
  'DevAll'          { Dev-All }
  'GitStatus'       { Git-Status }
  'GitPushMain'     { Git-PushMain }
}


