@echo off
for /f %%i in ('git rev-parse --short HEAD') do set GIT_COMMIT=%%i
cross-env VITE_APP_BUILD=%GIT_COMMIT% vite build
