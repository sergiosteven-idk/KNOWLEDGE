@echo off
REM Script de Windows para configurar desarrollo móvil

echo 🔍 Detectando IP local...

REM Obtener IP local (Windows)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :found
)

:found
REM Limpiar espacios
set IP=%IP: =%

if "%IP%"=="" (
    echo ❌ No se pudo detectar la IP local
    echo Por favor, ejecuta 'ipconfig' manualmente
    pause
    exit /b 1
)

echo ✅ IP Local detectada: %IP%
echo.
echo 📱 CONFIGURACIÓN PARA MÓVIL
echo ================================
echo.
echo 1️⃣ Backend estará disponible en:
echo    http://%IP%:5000
echo.
echo 2️⃣ Frontend estará disponible en:
echo    http://%IP%:5173
echo.
echo 3️⃣ Creando archivo .env.local...

REM Crear .env.local
(
echo VITE_API_URL=http://%IP%:5000/api
) > frontend\.env.local

echo    ✅ Archivo frontend\.env.local creado
echo.
echo 4️⃣ Iniciar servicios:
echo    Terminal 1: cd backend ^&^& npm run dev
echo    Terminal 2: cd frontend ^&^& npm run dev
echo.
echo 5️⃣ En tu móvil ^(misma WiFi^):
echo    Abre: http://%IP%:5173
echo.
echo 🎉 ¡Listo para desarrollo móvil!
echo.
pause
