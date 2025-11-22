#!/bin/bash

# Script para obtener la IP local y configurar el proyecto para móvil

echo "🔍 Detectando IP local..."

# Detectar sistema operativo
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows
    IP=$(ipconfig | grep -i "IPv4" | grep -v "127.0.0.1" | head -n 1 | awk '{print $NF}')
else
    # Mac/Linux
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
fi

if [ -z "$IP" ]; then
    echo "❌ No se pudo detectar la IP local"
    echo "Por favor, detecta tu IP manualmente:"
    echo "  Windows: ipconfig"
    echo "  Mac/Linux: ifconfig"
    exit 1
fi

echo "✅ IP Local detectada: $IP"
echo ""
echo "📱 CONFIGURACIÓN PARA MÓVIL"
echo "================================"
echo ""
echo "1️⃣ Backend estará disponible en:"
echo "   http://$IP:5000"
echo ""
echo "2️⃣ Frontend estará disponible en:"
echo "   http://$IP:5173"
echo ""
echo "3️⃣ Crear archivo .env.local con:"
cat > frontend/.env.local << EOF
VITE_API_URL=http://$IP:5000/api
EOF

echo "   ✅ Archivo frontend/.env.local creado"
echo ""
echo "4️⃣ Iniciar servicios:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "5️⃣ En tu móvil (misma WiFi):"
echo "   Abre: http://$IP:5173"
echo ""
echo "🎉 ¡Listo para desarrollo móvil!"
