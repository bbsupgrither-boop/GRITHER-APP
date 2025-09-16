Param(
  [Parameter(Mandatory=$true)] [ValidateSet('InstallFrontend','BuildFrontend','InstallBackend','StartBackend','BuildAll','DevAll','GitStatus','GitPushMain')]
  [string]$Task
)

$ErrorActionPreference = 'Stop'

function Test-NodeEnvironment {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js is not available in PATH. Please install Node 18+ and restart the terminal.'
  }
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw 'npm is not available in PATH. Please install Node 18+ (with npm) and restart the terminal.'
  }
}

function Install-Frontend {
  Test-NodeEnvironment
  Push-Location frontend
  try {
    npm ci --no-audit --no-fund
  } finally { Pop-Location }
}

function Invoke-FrontendBuild {
  Test-NodeEnvironment
  Push-Location frontend
  try {
    npm run build
  } finally { Pop-Location }
}

function Install-Backend {
  Test-NodeEnvironment
  Push-Location backend
  try {
    npm ci --no-audit --no-fund
  } finally { Pop-Location }
}

function Start-Backend {
  Test-NodeEnvironment
  Push-Location backend
  try {
    $env:PORT = if ($env:PORT) { $env:PORT } else { '3001' }
    node index.js
  } finally { Pop-Location }
}

function Invoke-BuildAll {
  Install-Frontend
  Invoke-FrontendBuild
  Install-Backend
}

function Start-DevAll {
  Test-NodeEnvironment
  Write-Host 'Starting dev (frontend + backend) in two windows...' -ForegroundColor Cyan
  Start-Process powershell -ArgumentList '-NoProfile','-Command','Set-Location frontend; npm run dev'
  Start-Process powershell -ArgumentList '-NoProfile','-Command','Set-Location backend; npm run dev'
}

function Get-GitStatus {
  git status
}

function Publish-GitMain {
  git add -A
  git commit -m 'chore: windows task runner and stability'
  git push origin main
}

switch ($Task) {
  'InstallFrontend' { Install-Frontend }
  'BuildFrontend'   { Invoke-FrontendBuild }
  'InstallBackend'  { Install-Backend }
  'StartBackend'    { Start-Backend }
  'BuildAll'        { Invoke-BuildAll }
  'DevAll'          { Start-DevAll }
  'GitStatus'       { Get-GitStatus }
  'GitPushMain'     { Publish-GitMain }
}


