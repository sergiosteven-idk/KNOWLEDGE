// ==============================
// 🌐 KNOWLEDGE FRONTEND APP
// ==============================

import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AccessibilityPanel from './components/accessibility/AccessibilityPanel';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  return (
    <AccessibilityProvider>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition">
        {/* Página principal */}
        <Home />

        {/* Dashboard de progreso */}
        <section className="w-full mt-10">
          <Dashboard />
        </section>

        {/* Panel de accesibilidad flotante */}
        <AccessibilityPanel />
      </main>
    </AccessibilityProvider>
  );
}

export default App;
