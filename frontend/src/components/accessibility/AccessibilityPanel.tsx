// ==============================
// ♿ PANEL DE ACCESIBILIDAD — KNOWLEDGE
// ==============================
import React from "react";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export default function AccessibilityPanel() {
  const {
    darkMode,
    highContrast,
    ttsEnabled,
    toggleDarkMode,
    toggleContrast,
    toggleTTS,
  } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg p-4 text-sm w-56">
      <h3 className="text-lg font-bold text-blue-600 mb-2">Accesibilidad</h3>

      <div className="space-y-2">
        <button
          onClick={toggleDarkMode}
          className={`w-full py-2 rounded-lg font-semibold ${
            darkMode
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </button>

        <button
          onClick={toggleContrast}
          className={`w-full py-2 rounded-lg font-semibold ${
            highContrast
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {highContrast ? "🎨 Normal" : "🔆 Alto contraste"}
        </button>

        <button
          onClick={toggleTTS}
          className={`w-full py-2 rounded-lg font-semibold ${
            ttsEnabled
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {ttsEnabled ? "🔇 Desactivar voz" : "🔊 Activar voz"}
        </button>
      </div>
    </div>
  );
}
