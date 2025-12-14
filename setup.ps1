# Timyo Setup Script for Windows PowerShell

Write-Host "🚀 Setting up Timyo Appointment System..." -ForegroundColor Green
Write-Host ""

# Backend Setup
Write-Host "📦 Setting up Laravel Backend..." -ForegroundColor Cyan
Set-Location timyo-app

Write-Host "Installing Composer dependencies..." -ForegroundColor Yellow
composer install

Write-Host "Setting up environment file..." -ForegroundColor Yellow
if (-Not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✅ .env file created" -ForegroundColor Green
}

Write-Host "Generating application key..." -ForegroundColor Yellow
php artisan key:generate

Write-Host "Running database migrations..." -ForegroundColor Yellow
php artisan migrate

Write-Host "Seeding database with sample data..." -ForegroundColor Yellow
php artisan db:seed

Write-Host "✅ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Write-Host "📦 Setting up React Frontend..." -ForegroundColor Cyan
Set-Location ../vite-project

Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install

Write-Host "✅ Frontend setup complete!" -ForegroundColor Green
Write-Host ""

# Final Instructions
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "1. Backend:  cd timyo-app && php artisan serve" -ForegroundColor White
Write-Host "2. Frontend: cd vite-project && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Default Admin Credentials:" -ForegroundColor Yellow
Write-Host "Email: admin@example.com" -ForegroundColor White
Write-Host "Password: password" -ForegroundColor White
Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
