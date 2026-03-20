@echo off
REM EduSwipe Quick Setup Script for Windows

echo.
echo 🎓 EduSwipe Setup
echo ================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo 📥 Please download and install from https://nodejs.org/
    echo    (Download LTS version - 18.x or higher)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js %NODE_VERSION% found
echo ✅ npm %NPM_VERSION% found
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ npm install failed!
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo    npm run dev
echo.
echo 🔨 To build for production:
echo    npm run build
echo.
pause
