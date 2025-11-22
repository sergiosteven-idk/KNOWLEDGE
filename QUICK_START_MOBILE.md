# 🚀 INICIO RÁPIDO - MÓVIL

## Para iniciar la app en móvil:

### 1️⃣ Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Anota la IP Network (ej: `http://192.168.1.10:5000`)

### 2️⃣ Actualizar API URL
En `frontend/src/services/api.js` cambia:
```javascript
const API_URL = 'http://192.168.1.10:5000/api'; // Tu IP aquí
```

### 3️⃣ Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Anota la IP Network (ej: `http://192.168.1.10:5173`)

### 4️⃣ En tu móvil
1. Conecta a la misma WiFi que tu PC
2. Abre el navegador
3. Ve a: `http://192.168.1.10:5173` (tu IP)
4. ¡Listo! 🎉

### 📱 Instalar como App
- **Android**: Menú → "Agregar a pantalla de inicio"
- **iOS**: Compartir → "Agregar a pantalla de inicio"

---

**Ver guía completa**: `MOBILE_DEPLOYMENT_GUIDE.md`
