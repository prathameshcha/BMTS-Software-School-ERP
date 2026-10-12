$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem

$ProjectRoot = "c:\Users\lenovo\Downloads\BMTS-School-ERP-main\hostinger bmts erp"
$StagingDir  = "c:\Users\lenovo\Downloads\BMTS-School-ERP-main\hostinger-deploy-staging3"
$OutputZip   = "c:\Users\lenovo\Downloads\BMTS-School-ERP-main\BMTS-School-ERP-Hostinger.zip"

Write-Host "=== Building Hostinger Deployment ZIP (v3 - dotenv fix) ==="

# Clean
if (Test-Path $StagingDir) { Remove-Item -Recurse -Force $StagingDir }
if (Test-Path $OutputZip) { Remove-Item -Force $OutputZip }

New-Item -ItemType Directory -Path $StagingDir -Force | Out-Null

# UTF-8 WITHOUT BOM encoder
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

Write-Host "[1/9] Copying backend dist..."
robocopy "$ProjectRoot\backend\dist" "$StagingDir\dist" /E /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null

Write-Host "[2/9] Copying Prisma..."
New-Item -ItemType Directory -Path "$StagingDir\prisma" -Force | Out-Null
Copy-Item "$ProjectRoot\backend\prisma\schema.prisma" "$StagingDir\prisma\schema.prisma"
if (Test-Path "$ProjectRoot\backend\prisma\migrations") {
    robocopy "$ProjectRoot\backend\prisma\migrations" "$StagingDir\prisma\migrations" /E /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null
}

Write-Host "[3/9] Copying frontend build to public_html..."
robocopy "$ProjectRoot\frontend\dist" "$StagingDir\public_html" /E /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null

Write-Host "[4/9] Copying assets..."
if (Test-Path "$ProjectRoot\backend\assets") {
    robocopy "$ProjectRoot\backend\assets" "$StagingDir\assets" /E /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null
}

Write-Host "[5/9] Creating uploads dir..."
New-Item -ItemType Directory -Path "$StagingDir\uploads" -Force | Out-Null
[System.IO.File]::WriteAllText("$StagingDir\uploads\.gitkeep", "", $utf8NoBom)

Write-Host "[6/9] Creating root server.js (loads dotenv BEFORE everything else)..."
# CRITICAL FIX: The compiled server.js imports database.js (which creates PrismaClient)
# BEFORE dotenv.config() runs. So DATABASE_URL is undefined when Prisma connects.
# This wrapper loads dotenv FIRST, then requires the server.
$serverJs = @"
// Hostinger entry point
// Load environment variables BEFORE anything else
// This is critical because the compiled server.js imports database.js
// at the top level (before its own dotenv.config() call), and Prisma
// reads DATABASE_URL at import time.
require('dotenv').config();
require('./dist/server.js');
"@
[System.IO.File]::WriteAllText("$StagingDir\server.js", $serverJs, $utf8NoBom)

Write-Host "[7/9] Creating package.json (UTF-8 no BOM)..."
$pkgContent = @"
{
  "name": "school-erp",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "build": "npx prisma generate",
    "start": "node server.js",
    "postinstall": "npx prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "cron": "^2.4.4",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "express-rate-limit": "^7.4.1",
    "express-validator": "^7.2.0",
    "helmet": "^8.3.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^2.0.2",
    "prisma": "^5.22.0",
    "puppeteer": "^25.9.0",
    "qrcode": "^1.5.4",
    "uuid": "^11.0.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
"@
[System.IO.File]::WriteAllText("$StagingDir\package.json", $pkgContent.Trim(), $utf8NoBom)

Write-Host "[8/9] Creating .env..."
$envContent = @"
DATABASE_URL=mysql://u544715275_school:Savita%401313@srv1954.hstgr.io:3306/u544715275_school
JWT_SECRET=bd3aa7c6e0214268896d6cfbcd773437a9f2e81b5c6d4e0a82c1d9f3b7e54a12
JWT_REFRESH_SECRET=3e6ad51d04724d1b95376dc4905a37e5c8b2f46a19d74e5f93a8d1c6e2b70f84
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
REPORT_CARD_SECRET=f7c9a23d8e1b45069d3f7a8b2c4e6019d5a8f3b2e7c14d6089a3b5c7d2e4f601
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://bmtsschoolerp.com
TRUST_PROXY=1
COOKIE_SAMESITE=none
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
APP_URL=https://bmtsschoolerp.com
API_URL=https://bmtsschoolerp.com/api
"@
[System.IO.File]::WriteAllText("$StagingDir\.env", $envContent.Trim(), $utf8NoBom)

Write-Host "[9/9] Verifying..."
try {
    $testJson = Get-Content "$StagingDir\package.json" -Raw | ConvertFrom-Json
    Write-Host "  package.json valid: $($testJson.name), main=$($testJson.main)"
} catch {
    Write-Host "  ERROR: package.json invalid!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Creating ZIP ==="
[System.IO.Compression.ZipFile]::CreateFromDirectory($StagingDir, $OutputZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$sz = [math]::Round((Get-Item $OutputZip).Length / 1MB, 2)
Write-Host ""
Write-Host "=== SUCCESS ===" -ForegroundColor Green
Write-Host "ZIP: $OutputZip ($sz MB)"
Write-Host ""
Write-Host "=== Hostinger Settings ==="
Write-Host "  Framework preset:  Other"
Write-Host "  Node version:      22.x"
Write-Host "  Root directory:    (leave empty)"
Write-Host "  Build command:     npm run build"
Write-Host "  Entry file:        server.js"

Remove-Item -Recurse -Force $StagingDir
Write-Host ""
Write-Host "=== DONE ==="
