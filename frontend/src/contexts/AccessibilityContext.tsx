// ==============================
// ♿ CONTEXTO DE ACCESIBILIDAD — KNOWLEDGE
// ==============================
import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityContextType {
  darkMode: boolean;
  highContrast: boolean;
  ttsEnabled: boolean;
  toggleDarkMode: () => void;
  toggleContrast: () => void;
  toggleTTS: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("highContrast") === "true");
  const [ttsEnabled, setTTSEnabled] = useState(() => localStorage.getItem("ttsEnabled") === "true");

  // 🌙 Alternar modo oscuro
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", String(newValue));
  };

  // 🟨 Alternar contraste alto
  const toggleContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem("highContrast", String(newValue));
  };

  // 🗣️ Alternar lector de voz
  const toggleTTS = () => {
    const newValue = !ttsEnabled;
    setTTSEnabled(newValue);
    localStorage.setItem("ttsEnabled", String(newValue));
  };

  // Aplicar modo oscuro al body
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const value = {
    darkMode,
    highContrast,
    ttsEnabled,
    toggleDarkMode,
    toggleContrast,
    toggleTTS,
  };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

// Hook personalizado para acceder al contexto
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility debe usarse dentro de AccessibilityProvider");
  return context;
};
