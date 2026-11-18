@echo off
title CodeQuest - Belajar Coding
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js belum tersedia. Instal Node.js LTS terlebih dahulu.
  pause
  exit /b 1
)
if not exist node_modules\vite\bin\vite.js (
  echo Dependensi belum tersedia. Jalankan npm install di folder ini.
  pause
  exit /b 1
)
echo Menyiapkan CodeQuest PWA...
call npm run build
if errorlevel 1 (
  pause
  exit /b 1
)
echo CodeQuest: http://localhost:5174
echo HP di Wi-Fi yang sama dapat memakai alamat Network yang ditampilkan.
echo Pemasangan PWA dan offline di HP memerlukan hosting HTTPS.
echo Tutup jendela ini untuk menghentikan server.
call npm run preview -- --host 0.0.0.0 --port 5174 --open
pause
