/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // soporte total modo oscuro
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta principal Knowledge
        knowledge: {
          blue: "#2563EB",       // Conocimiento
          green: "#22C55E",      // Accesibilidad / Educación
          purple: "#7C3AED",     // Inclusión / Innovación
          yellow: "#FACC15",     // Atención / Contraste
          dark: "#111827",       // Fondo oscuro accesible
          light: "#FFFFFF",      // Fondo claro (blanco limpio)
          gray: "#9CA3AF",       // Texto secundario
        },
      },
      fontFamily: {
        // Fuentes limpias y legibles para educación inclusiva
        sans: ["'Inter'", "system-ui", "Arial", "sans-serif"],
        display: ["'Poppins'", "system-ui", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 8px rgba(0, 0, 0, 0.05)", // Sombras suaves para enfoque visual
        focus: "0 0 0 3px rgba(37, 99, 235, 0.4)", // Enfoque accesible azul
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pop: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        pop: "pop 0.2s ease-out",
      },
    },
  },
  plugins: [
    // Plugin opcional: mejora de accesibilidad
    function ({ addUtilities }) {
      addUtilities({
        ".focus-visible-outline": {
          outline: "3px solid #2563EB",
          "outline-offset": "3px",
        },
        ".high-contrast": {
          filter: "contrast(1.4) saturate(1.2)",
        },
        ".text-readable": {
          "letter-spacing": "0.02em",
          "line-height": "1.6",
        },
      });
    },
  ],
};
