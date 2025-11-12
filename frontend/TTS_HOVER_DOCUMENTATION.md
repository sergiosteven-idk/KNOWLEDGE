## 🔊 Lectura de Texto con Hover - TTS Mejorado

### Descripción
Se ha implementado una nueva funcionalidad de **lectura de texto al pasar el cursor (hover)** en complemento con el sistema de accesibilidad existente. Ahora los usuarios pueden escuchar contenido simplemente pasando el cursor sobre elementos específicos.

---

## 🎯 Características

### 1. **Hook `useHoverTTS`** 
- **Ubicación:** `src/hooks/useHoverTTS.ts`
- **Funcionalidad:**
  - Activa lectura TTS al hacer hover en elementos
  - Cancela automáticamente la lectura anterior si el usuario se mueve rápidamente
  - Respeta la configuración de TTS del contexto de accesibilidad
  - Configura automáticamente idioma español (es-ES)

```typescript
const { onMouseEnter, onMouseLeave } = useHoverTTS();
<element onMouseEnter={() => onMouseEnter(text)} />
```

### 2. **Componente `TextToSpeechHover`**
- **Ubicación:** `src/components/accessibility/TextToSpeechHover.tsx`
- **Props:**
  - `text` (string) - Texto a leer al hacer hover
  - `children` (ReactNode) - Contenido a mostrar
  - `className` (optional) - Estilos personalizados
  - `tag` (optional) - Etiqueta HTML (div, span, p, h1-h6, a, li)

- **Estilos automáticos:**
  - `cursor-help` - Cambia el cursor para indicar que es interactivo
  - `transition-colors duration-200` - Transición suave de colores
  - `title` - Tooltip descriptivo

**Ejemplo:**
```tsx
<TextToSpeechHover 
  text="Contenido a leer"
  tag="p"
  className="text-gray-600"
>
  Este es el contenido visible
</TextToSpeechHover>
```

---

## 📝 Implementaciones Actuales

### **1. Footer.tsx** ✅
Se agregó lectura con hover a:
- Logo y descripción principal
- Todos los títulos de secciones (Navegación, Comunidad, Contacto)
- Todos los enlaces de navegación con contexto descriptivo
- Email de contacto
- Redes sociales (Twitter, Facebook)
- Enlaces del pie de página

**Ejemplo de lectura descriptiva:**
- Enlace original: "Inicio"
- Texto a leer: "Ir a la página de inicio"

### **2. Feedback.tsx** ✅
Se agregó lectura con hover a:
- Cada comentario en la sección "Comentarios de la comunidad"
- Combina nombre del usuario, calificación y comentario en una sola lectura fluida

**Ejemplo de lectura:**
- "Opinión de Juan García. Calificación: 5 de 5 estrellas. Comentario: Excelente contenido, muy útil."

---

## 🔧 Configuración y Dependencias

### RequiereAccessibilityContext
```tsx
import { useAccessibility } from '../contexts/AccessibilityContext';
// El hook verificará automáticamente si TTS está habilitado
```

### API Web Speech
- Utiliza la **Web Speech API** nativa del navegador
- Soporta español con `lang='es-ES'`
- Cancelación automática de lectura anterior

---

## 🎨 Comportamiento Visual

### Estados del Cursor
- **Normal:** Cursor estándar
- **Hover:** `cursor-help` (interrogación)
- Indica interactividad sin necesidad de botón

### Retroalimentación
- **Tooltip automático:** "Pasa el cursor para escuchar este texto"
- **Transiciones suaves:** 200ms entre cambios de color
- **Sin interrupciones visuales:** El contenido permanece igual

---

## ⚙️ Opciones de Personalización

### Modificar velocidad de lectura
En `useHoverTTS.ts`, puedes ajustar:
```typescript
utterance.rate = 1; // Velocidad (0.5 - 2)
utterance.pitch = 1; // Tono (0.5 - 2)
```

### Cancelar lectura al salir del hover
Descomenta en `useHoverTTS.ts`:
```typescript
const handleMouseLeave = () => {
  speechSynthesis.cancel(); // Cancela al salir
};
```

### Cambiar etiqueta HTML
```tsx
<TextToSpeechHover tag="a"> {/* a, h3, li, etc. */}
  Contenido
</TextToSpeechHover>
```

---

## ✅ Casos de Uso

| Componente | Uso | Beneficio |
|-----------|-----|----------|
| **Footer** | Lectura de enlaces y secciones | Navegación accesible por voz |
| **Feedback** | Lectura de opiniones | Acceso auditivo a comentarios |
| **Futuro** | Tablas, listas, formularios | Accesibilidad universal |

---

## 🚀 Próximas Mejoras Sugeridas

1. **Dashboard/Contenido:** Lectura de títulos y descripciones
2. **Eventos:** Lectura de detalles de eventos
3. **Donaciones:** Lectura de montos y opciones
4. **Tablas:** Lectura de filas completas
5. **Notificaciones:** Lectura automática de mensajes

---

## 📊 Compatibilidad

- ✅ Chrome/Edge - Soporte completo
- ✅ Firefox - Soporte completo
- ✅ Safari - Soporte completo
- ✅ Navegadores móviles - Soporte parcial
- ❌ Se requiere TTS habilitado en Accessibility Panel

---

## 🔍 Debugging

Si la lectura no funciona:

1. **Verificar que TTS está habilitado:**
   - Abre Accessibility Panel
   - Activa toggle de "Lectura de Texto"

2. **Verificar en consola:**
   ```javascript
   speechSynthesis.getVoices().filter(v => v.lang.includes('es'))
   ```

3. **Probar manualmente:**
   ```javascript
   const utterance = new SpeechSynthesisUtterance("Prueba");
   utterance.lang = 'es-ES';
   speechSynthesis.speak(utterance);
   ```

---

## 📚 Archivos Modificados

- ✅ `src/hooks/useHoverTTS.ts` - Nuevo hook
- ✅ `src/components/accessibility/TextToSpeechHover.tsx` - Nuevo componente
- ✅ `src/components/layout/Footer.tsx` - Integración de lectura
- ✅ `src/pages/community/Feedback.tsx` - Integración de lectura

Total de cambios: **4 archivos** | Estado: **✅ Completado**
