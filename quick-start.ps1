#!/usr/bin/env pwsh
# Quick Start Script for Agentic PPT AI

Write-Host "🚀 Agentic PPT AI - Quick Start`n" -ForegroundColor Cyan

# Set execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "✓ Project root: $projectRoot`n" -ForegroundColor Green

# Function to start backend
function Start-Backend {
    Write-Host "🔧 Starting Backend Server..." -ForegroundColor Cyan
    Write-Host "   Backend will run on: http://127.0.0.1:8000`n" -ForegroundColor Gray
    
    # Check if venv exists
    $venvPath = Join-Path $projectRoot "venv"
    if (-not (Test-Path $venvPath)) {
        Write-Host "⚠️  Virtual environment not found. Creating..." -ForegroundColor Yellow
        & python -m venv venv
        Write-Host "✓ Virtual environment created`n" -ForegroundColor Green
    }
    
    # Activate venv
    $activateScript = Join-Path $projectRoot "venv\Scripts\Activate.ps1"
    if (Test-Path $activateScript) {
        & $activateScript
        Write-Host "✓ Virtual environment activated`n" -ForegroundColor Green
    }
    
    # Install dependencies if needed
    $requirementsPath = Join-Path $projectRoot "requirements.txt"
    if (Test-Path $requirementsPath) {
        Write-Host "📦 Installing Python dependencies..." -ForegroundColor Cyan
        & pip install -q -r requirements.txt
        Write-Host "✓ Dependencies installed`n" -ForegroundColor Green
    }
    
    # Check .env file
    $envPath = Join-Path $projectRoot ".env"
    if (-not (Test-Path $envPath)) {
        Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
        Write-Host "   Please create .env with your HuggingFace API key:`n" -ForegroundColor Gray
        Write-Host "   HUGGINGFACE_API_KEY=hf_your_token_here`n" -ForegroundColor Gray
        Write-Host "   Get free token at: https://huggingface.co/settings/tokens`n" -ForegroundColor Gray
        Read-Host "   Press Enter after creating .env"
    }
    
    Write-Host "Starting server...`n" -ForegroundColor Cyan
    & uvicorn backend.app:app --reload
}

# Function to start frontend
function Start-Frontend {
    Write-Host "⚛️  Starting React Frontend..." -ForegroundColor Cyan
    Write-Host "   Frontend will run on: http://localhost:5173`n" -ForegroundColor Gray
    
    $webAppPath = Join-Path $projectRoot "web_app"
    
    # Check if node_modules exists
    $nodeModulesPath = Join-Path $webAppPath "node_modules"
    if (-not (Test-Path $nodeModulesPath)) {
        Write-Host "📦 Installing npm dependencies..." -ForegroundColor Cyan
        Push-Location $webAppPath
        & npm install -q
        Pop-Location
        Write-Host "✓ Dependencies installed`n" -ForegroundColor Green
    }
    
    Write-Host "Starting development server...`n" -ForegroundColor Cyan
    Push-Location $webAppPath
    & npm run dev
}

# Main menu
Write-Host "What would you like to start?`n" -ForegroundColor Yellow
Write-Host "1. Backend Server (FastAPI on port 8000)" -ForegroundColor White
Write-Host "2. Frontend Server (React on port 5173)" -ForegroundColor White
Write-Host "3. Both (Backend in new window, Frontend in current)" -ForegroundColor White
Write-Host "4. Exit" -ForegroundColor White

$choice = Read-Host "`nEnter your choice (1-4)"

switch ($choice) {
    "1" {
        Start-Backend
    }
    "2" {
        Start-Frontend
    }
    "3" {
        Write-Host "`n📋 Starting both servers..." -ForegroundColor Cyan
        Write-Host "   ℹ️  Backend will open in a new window`n" -ForegroundColor Gray
        
        # Start backend in new window
        $backendScript = @"
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
cd "$projectRoot"
`$activateScript = Join-Path "$projectRoot" "venv\Scripts\Activate.ps1"
if (Test-Path `$activateScript) { & `$activateScript }
Write-Host "📦 Installing Python dependencies..." -ForegroundColor Cyan
pip install -q -r requirements.txt 2>$null
& uvicorn backend.app:app --reload
"@
        
        $backendScriptPath = Join-Path $env:TEMP "launch_backend.ps1"
        $backendScript | Out-File -FilePath $backendScriptPath -Encoding UTF8
        Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "RemoteSigned", "-File", $backendScriptPath
        
        Start-Sleep -Seconds 3
        
        Write-Host "✓ Backend started in new window`n" -ForegroundColor Green
        Write-Host "Now starting Frontend..." -ForegroundColor Cyan
        Write-Host "   Open http://localhost:5173 in your browser`n" -ForegroundColor Gray
        Start-Sleep -Seconds 2
        Start-Frontend
    }
    "4" {
        Write-Host "`n👋 Goodbye!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "`n❌ Invalid choice. Please run again." -ForegroundColor Red
        exit 1
    }
}
