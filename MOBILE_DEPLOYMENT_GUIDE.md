# 📱 GUÍA DE DEPLOYMENT MÓVIL - KNOWLEDGE APP

## 🎯 Resumen
Tu aplicación Knowledge ahora está optimizada como una **Progressive Web App (PWA)** que puede ejecutarse en dispositivos móviles. Aunque mencionaste Expo Go, este es para aplicaciones React Native. Tu proyecto usa React con Vite, por lo que la mejor opción es acceder como PWA desde el navegador móvil.

---

## 🚀 OPCIÓN 1: Acceso Directo desde Navegador Móvil (Recomendado)

### Paso 1: Iniciar el Backend
```bash
cd backend
npm install
npm run dev
```

El servidor mostrará algo como:
```
🎓 Knowledge Backend Server
✅ Running on port: 5000
🌐 Local: http://localhost:5000
📱 Network: http://192.168.1.10:5000
```

**Anota la IP de Network** (ej: `192.168.1.10`)

### Paso 2: Configurar la URL del Backend en Frontend

Edita `frontend/src/services/api.js` o `api.ts` y actualiza la baseURL:

```javascript
const API_URL = 'http://192.168.1.10:5000/api'; // Usa tu IP local
```

### Paso 3: Iniciar el Frontend
```bash
cd frontend
npm install
npm run dev
```

El servidor mostrará:
```
VITE ready in 500ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.10:5173/
```

### Paso 4: Acceder desde tu Móvil

1. **Asegúrate** de que tu móvil y PC están en la **misma red WiFi**
2. Abre el navegador en tu móvil (Chrome, Safari, etc.)
3. Navega a: `http://192.168.1.10:5173` (usa tu IP Network)
4. ¡La app debería cargar completamente!

### Paso 5: Instalar como PWA (Opcional)

En **Android** (Chrome):
- Toca los 3 puntos → "Agregar a pantalla de inicio"
- La app se instalará como si fuera nativa

En **iOS** (Safari):
- Toca el botón de compartir → "Agregar a pantalla de inicio"
- Accede como una app independiente

---

## 🔧 OPCIÓN 2: Deployment con Ngrok (Si no están en la misma red)

Si tu PC y móvil no pueden estar en la misma red, usa **ngrok**:

### Instalar Ngrok
```bash
# Descargar desde https://ngrok.com/download
# O con npm:
npm install -g ngrok
```

### Exponer el Backend
```bash
ngrok http 5000
```

Obtendrás una URL pública como: `https://abc123.ngrok.io`

### Exponer el Frontend
```bash
ngrok http 5173
```

Obtendrás otra URL como: `https://xyz789.ngrok.io`

### Actualizar la configuración
En `frontend/src/services/api.js`:
```javascript
const API_URL = 'https://abc123.ngrok.io/api';
```

Ahora puedes acceder desde cualquier dispositivo a `https://xyz789.ngrok.io`

---

## 🌐 OPCIÓN 3: Build de Producción y Hosting

### Build del Frontend
```bash
cd frontend
npm run build
```

Esto genera la carpeta `dist/` lista para deploy.

### Opciones de Hosting Gratuito:

#### A) Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

#### B) Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

#### C) GitHub Pages
```bash
# En package.json añade:
{
  "homepage": "https://tuusuario.github.io/KNOWLEDGE",
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}

npm install --save-dev gh-pages
npm run deploy
```

Para el **Backend**, opciones gratuitas:
- **Render.com** (recomendado)
- **Railway.app**
- **Heroku** (con limitaciones)

---

## 📋 Checklist de Verificación

- ✅ Backend corriendo en `0.0.0.0` (accesible en red)
- ✅ Frontend configurado con la IP correcta del backend
- ✅ Móvil y PC en la misma red WiFi
- ✅ Firewall permite conexiones en el puerto 5173 y 5000
- ✅ URL del backend actualizada en `services/api.js`
- ✅ Service Worker registrado (revisa la consola del navegador)

---

## 🐛 Solución de Problemas

### El móvil no puede conectarse
```bash
# Windows: Verificar firewall
# Permitir puerto 5173 y 5000

# Verificar IP local:
ipconfig  # Windows
ifconfig  # Linux/Mac
```

### Error de CORS
El backend ya está configurado para aceptar conexiones de red local. Si hay problemas, verifica el array de `origin` en `backend/src/server.js`.

### La PWA no se instala
- Verifica que `manifest.json` esté accesible en `/manifest.json`
- Asegúrate de usar HTTPS o localhost
- Revisa la consola del navegador para errores del Service Worker

---

## 📱 Características PWA Implementadas

✅ **Responsive Design**: Adaptado a todos los tamaños de pantalla
✅ **Touch Optimization**: Targets de 44px, gestos optimizados
✅ **Offline Support**: Service Worker para caché
✅ **Installable**: Manifest.json con iconos
✅ **Safe Areas**: Soporte para notch/gestos iOS
✅ **Fast Loading**: Code splitting y optimizaciones Vite
✅ **Network Detection**: CORS configurado para red local

---

## 🎨 Optimizaciones Móviles Aplicadas

1. **Viewport optimizado**: `viewport-fit=cover` para pantallas con notch
2. **Meta tags PWA**: Soporte iOS y Android
3. **Touch actions**: Mejoras de táctil y prevención de zoom no deseado
4. **Menú hamburguesa**: Navegación móvil en Navbar
5. **Safe areas**: Padding para áreas seguras del dispositivo
6. **Performance**: Build optimizado con code splitting

---

## 📞 Siguientes Pasos Recomendados

1. **Testear en múltiples dispositivos**: Android e iOS
2. **Generar iconos**: Crea imágenes PNG de 192x192 y 512x512 para `manifest.json`
3. **HTTPS en producción**: Para full PWA features
4. **Analytics**: Añadir Google Analytics o similar
5. **Push Notifications**: Implementar si es necesario

---

## 💡 Nota sobre Expo Go

**Expo Go** es exclusivo para aplicaciones React Native (no React web). Si deseas una app nativa verdadera:

### Opción con Capacitor (Convertir a Nativa)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npm run build
npx cap copy
npx cap open android
```

Esto permite compilar tu PWA como app nativa para tiendas (Play Store, App Store).

---

**¡Tu app Knowledge ahora es móvil! 🎉**
