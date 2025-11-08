import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const AccessibilityPanel = () => {
  const {
    toggleContrast,
    toggleDarkMode,
    increaseFont,
    decreaseFont,
    toggleTTS,
    ttsEnabled,
    darkMode,
    highContrast
  } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200">
      <h2 className="font-semibold mb-2">Accesibilidad</h2>
      <div className="flex flex-col gap-2">
        <button onClick={toggleContrast} className="btn">Contraste {highContrast ? '🔆' : '🌗'}</button>
        <button onClick={toggleDarkMode} className="btn">Modo oscuro {darkMode ? '🌙' : '☀️'}</button>
        <button onClick={increaseFont} className="btn">Aumentar tamaño A+</button>
        <button onClick={decreaseFont} className="btn">Reducir tamaño A-</button>
        <button onClick={toggleTTS} className="btn">Texto a voz {ttsEnabled ? '🗣️ ON' : '🔇 OFF'}</button>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
