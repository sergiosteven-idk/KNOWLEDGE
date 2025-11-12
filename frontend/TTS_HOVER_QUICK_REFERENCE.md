# 🎯 REFERENCIA RÁPIDA - Sistema TTS Hover

## 📋 Cheat Sheet

### **Usar en cualquier componente:**

```tsx
import TextToSpeechHover from '../../components/accessibility/TextToSpeechHover';

// Simple
<TextToSpeechHover text="Texto a leer">
  Contenido visible
</TextToSpeechHover>

// Con tag personalizado
<TextToSpeechHover text="Pulsa para ir a inicio" tag="a">
  <Link to="/">Inicio</Link>
</TextToSpeechHover>

// Con estilos
<TextToSpeechHover 
  text="Comentario de usuario"
  tag="div"
  className="bg-blue-100 p-4"
>
  <p>Excelente contenido</p>
</TextToSpeechHover>
```

---

## 🎨 Tags Soportados

```tsx
<TextToSpeechHover tag="div">      // Contenedor
<TextToSpeechHover tag="span">     // Inline
<TextToSpeechHover tag="p">        // Párrafo
<TextToSpeechHover tag="h1">       // Títulos
<TextToSpeechHover tag="h2">       // ...
<TextToSpeechHover tag="h3">
<TextToSpeechHover tag="h4">
<TextToSpeechHover tag="h5">
<TextToSpeechHover tag="h6">
<TextToSpeechHover tag="a">        // Enlaces
<TextToSpeechHover tag="li">       // Items de lista
```

---

## 🔧 Personalización

### **Cambiar velocidad de lectura:**
En `src/hooks/useHoverTTS.ts`:
```typescript
utterance.rate = 1.5;  // Más rápido (default: 1)
```

### **Cambiar tono:**
```typescript
utterance.pitch = 1.2;  // Más agudo (default: 1)
```

### **Cancelar lectura al salir:**
```typescript
const handleMouseLeave = () => {
  speechSynthesis.cancel();
};
```

### **Cambiar idioma:**
```typescript
utterance.lang = 'en-US';  // Inglés (default: 'es-ES')
```

---

## 📁 Estructura de Archivos

```
src/
├─ hooks/
│  └─ useHoverTTS.ts ✨ NUEVO
├─ components/
│  └─ accessibility/
│     ├─ TextToSpeechButton.tsx (sin cambios - para clicks)
│     └─ TextToSpeechHover.tsx ✨ NUEVO
│  └─ layout/
│     └─ Footer.tsx ✏️ MODIFICADO (+35 elementos TTS)
└─ pages/
   └─ community/
      └─ Feedback.tsx ✏️ MODIFICADO (+comentarios TTS)
```

---

## 🧪 Testing Rápido

```javascript
// En consola del navegador:

// 1. Verificar TTS disponible
speechSynthesis.getVoices().filter(v => v.lang.includes('es'))

// 2. Test manual
const u = new SpeechSynthesisUtterance("Hola mundo");
u.lang = 'es-ES';
speechSynthesis.speak(u);

// 3. Verificar contexto
JSON.parse(localStorage.getItem('ttsEnabled'))
```

---

## 🚨 Troubleshooting

| Problema | Solución |
|----------|----------|
| No se escucha | Activar TTS en Accessibility Panel |
| Se corta la lectura | Es normal, se cancela al salir del hover |
| Lectura muy rápida/lenta | Ajusta `utterance.rate` en useHoverTTS.ts |
| Cursor no cambia | Espera a que el componente renderice |
| Error en TypeScript | Asegúrate de importar como `type ReactNode` |

---

## 📊 Comparativa

### **Antes (Click TTS)**
- ❌ Solo botones con click
- ❌ Requiere acción explícita
- ❌ Solo en componentes que incluyen TextToSpeechButton

### **Después (Hover TTS)**
- ✅ Cualquier elemento con hover
- ✅ Natural y pasivo
- ✅ Expandible a cualquier componente
- ✅ Footer completamente audible
- ✅ Comentarios audibles en Feedback

---

## 🎓 Ejemplos de Textos Enriched

### **Footer - Antes:**
```
Texto visible: "Eventos"
Lectura anterior: N/A (no existía)
```

### **Footer - Después:**
```
Texto visible: "Eventos"
Lectura nueva: "Ver eventos disponibles"
```

### **Feedback - Ejemplo:**
```
Datos: {
  nombre: "Juan",
  apellido: "García",
  calificacion: 5,
  comentario: "Excelente contenido"
}

Texto visible: ⭐ 5/5
                Juan García
                Excelente contenido

Texto leído: "Opinión de Juan García. Calificación: 5 de 5 estrellas. 
             Comentario: Excelente contenido"
```

---

## 🚀 Próximos Pasos Sugeridos

1. **Testing en desktop** (Task 11)
2. **Testing TTS específico** (Task 12)
3. **Expandir a Dashboard** - Lectura de contenido
4. **Expandir a Eventos** - Lectura de detalles
5. **Agregar control de velocidad** - UI para ajustar rate/pitch

---

## 📞 Referencia de Documentación

- **Implementación detallada:** `TTS_HOVER_DOCUMENTATION.md`
- **Resumen ejecutivo:** `TTS_HOVER_IMPLEMENTATION_SUMMARY.md`
- **Esta referencia:** `TTS_HOVER_QUICK_REFERENCE.md`

---

## ⚡ Estado Actual

✅ 2 nuevos archivos creados  
✅ 2 archivos existentes modificados  
✅ 0 errores de compilación  
✅ Listo para probar en dev server  

**Ejecuta:** `npm run dev`  
**Navega a:** `http://localhost:5173`  
**Prueba:** Pasa el cursor en Footer y Feedback 🎧
