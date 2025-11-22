## 🎯 PRUEBA TU APLICACIÓN MÓVIL AHORA - 5 MINUTOS

### ⚡ OPCIÓN RÁPIDA (Windows)

1. **Abre una terminal en la raíz del proyecto**

2. **Ejecuta el script automático:**
   ```bash
   setup-mobile.bat
   ```

3. **Abre DOS terminales:**

   **Terminal 1:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2:**
   ```bash
   cd frontend
   npm run mobile
   ```

4. **En tu móvil:**
   - Abre el navegador
   - Ve a la URL que te mostró el script (ejemplo: `http://192.168.1.10:5173`)
   - ¡Listo! 🎉

---

### 🔍 VERIFICACIÓN RÁPIDA

Si el script no funcionó, hazlo manualmente:

#### Paso 1: Obtén tu IP
```bash
ipconfig
```
Busca "Dirección IPv4" (ejemplo: `192.168.1.10`)

#### Paso 2: Crea el archivo .env.local
Crea el archivo: `frontend/.env.local`

Contenido:
```
VITE_API_URL=http://192.168.1.10:5000/api
```
(Reemplaza `192.168.1.10` con tu IP)

#### Paso 3: Inicia todo
**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Paso 4: Prueba
En tu móvil (misma WiFi), abre: `http://192.168.1.10:5173`

---

### ✅ CHECKLIST DE FUNCIONAMIENTO

Una vez que la app cargue en tu móvil:

- [ ] La página carga correctamente
- [ ] El menú hamburguesa funciona (toca las 3 líneas)
- [ ] Puedes hacer login/registro
- [ ] Las transiciones son suaves
- [ ] Los botones tienen buen tamaño (fácil tocar)
- [ ] Puedes "instalar app" desde el menú del navegador

---

### 🐛 PROBLEMAS COMUNES

#### ❌ No carga la página
- Verifica que PC y móvil están en la **misma WiFi**
- Desactiva VPN en ambos dispositivos
- Verifica firewall de Windows (debe permitir puerto 5173)

#### ❌ "Cannot connect to server"
- Verifica que el backend esté corriendo (terminal 1)
- Asegúrate de haber creado el `.env.local` con tu IP

#### ❌ La IP no funciona
- Usa `ipconfig` y busca la IPv4 que NO sea 127.0.0.1
- Si tienes varias, usa la de tu adaptador WiFi

---

### 📱 INSTALAR COMO APP

#### Android (Chrome/Edge):
1. Toca los 3 puntos arriba a la derecha
2. "Agregar a pantalla de inicio" o "Instalar app"
3. Confirma

#### iOS (Safari):
1. Toca el botón compartir (cuadrado con flecha)
2. "Agregar a pantalla de inicio"
3. Confirma

---

### 🎯 SIGUIENTE PASO

Una vez que funcione en tu móvil local:

1. **Para producción**: Lee `MOBILE_DEPLOYMENT_GUIDE.md`
2. **Para más opciones**: Consulta `MOBILE_CONVERSION_SUMMARY.md`
3. **Para deploy real**: Secciones de Vercel/Netlify en la guía

---

### 💡 TIPS

- Mantén ambas terminales abiertas mientras desarrollas
- Los cambios en el código se actualizan automáticamente (hot reload)
- Puedes usar Chrome DevTools en PC para debuggear el móvil:
  - Chrome en PC → Menú → More tools → Remote devices
  - Conecta tu Android con USB

---

**¿Problemas? Revisa:** `MOBILE_DEPLOYMENT_GUIDE.md` (sección "Solución de problemas")
