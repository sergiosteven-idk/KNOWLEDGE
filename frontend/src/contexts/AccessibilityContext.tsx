import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number; // 1 = normal, 1.25 = grande, etc.
  darkMode: boolean;
  ttsEnabled: boolean;
  toggleContrast: () => void;
  toggleDarkMode: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  toggleTTS: () => void;
}

const AccessibilityContext = createContext<AccessibilitySettings | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  const toggleContrast = () => setHighContrast(!highContrast);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleTTS = () => setTtsEnabled(!ttsEnabled);
  const increaseFont = () => setFontSize((f) => Math.min(f + 0.25, 2));
  const decreaseFont = () => setFontSize((f) => Math.max(f - 0.25, 0.75));

  const value: AccessibilitySettings = {
    highContrast,
    fontSize,
    darkMode,
    ttsEnabled,
    toggleContrast,
    toggleDarkMode,
    increaseFont,
    decreaseFont,
    toggleTTS
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div
        className={`
          ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}
          ${highContrast ? 'contrast-200' : ''}
        `}
        style={{ fontSize: `${fontSize}em`, minHeight: '100vh' }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
