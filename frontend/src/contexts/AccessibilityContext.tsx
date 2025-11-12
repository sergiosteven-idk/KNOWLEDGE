// ==============================
// ♿ CONTEXTO DE ACCESIBILIDAD — KNOWLEDGE ULTIMATE
// ==============================
import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityContextType {
  darkMode: boolean;
  highContrast: boolean;
  ttsEnabled: boolean;
  largeText: boolean;
  focusMode: boolean;
  toggleDarkMode: () => void;
  toggleContrast: () => void;
  toggleTTS: () => void;
  toggleLargeText: () => void;
  toggleFocusMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  // 🧠 Estados persistentes en localStorage
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("highContrast") === "true");
  const [ttsEnabled, setTTSEnabled] = useState(() => localStorage.getItem("ttsEnabled") === "true");
  const [largeText, setLargeText] = useState(() => localStorage.getItem("largeText") === "true");
  const [focusMode, setFocusMode] = useState(() => localStorage.getItem("focusMode") === "true");

  // 🌙 Alternar modo oscuro
  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", String(newValue));
  };

  // 🎨 Alternar alto contraste
  const toggleContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem("highContrast", String(newValue));
  };

  // 🔊 Alternar texto a voz
  const toggleTTS = () => {
    const newValue = !ttsEnabled;
    setTTSEnabled(newValue);
    localStorage.setItem("ttsEnabled", String(newValue));
  };

  // 🔍 Alternar texto grande
  const toggleLargeText = () => {
    const newValue = !largeText;
    setLargeText(newValue);
    document.documentElement.style.fontSize = newValue ? "120%" : "100%";
    localStorage.setItem("largeText", String(newValue));
  };

  // 👁️ Alternar modo enfoque
  const toggleFocusMode = () => {
    const newValue = !focusMode;
    setFocusMode(newValue);
    document.body.classList.toggle("focus-mode", newValue);
    localStorage.setItem("focusMode", String(newValue));
  };

  // 🧩 Aplicar estilos globales según el estado
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [darkMode, highContrast]);

  // 🔁 Aplicar texto grande y modo enfoque al cargar
  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "120%" : "100%";
    document.body.classList.toggle("focus-mode", focusMode);
  }, []);

  const value = {
    darkMode,
    highContrast,
    ttsEnabled,
    largeText,
    focusMode,
    toggleDarkMode,
    toggleContrast,
    toggleTTS,
    toggleLargeText,
    toggleFocusMode,
  };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

// 🧠 Hook personalizado para usar el contexto
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context)
    throw new Error("useAccessibility debe usarse dentro de un AccessibilityProvider de Knowledge");
  return context;
};
