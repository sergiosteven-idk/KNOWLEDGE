// ==============================
// 🌐 KNOWLEDGE FRONTEND APP (Final)
// ==============================

import React from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Eventos from './pages/community/Eventos';
import Donaciones from './pages/community/Donaciones';
import Feedback from './pages/community/Feedback';
import AccessibilityPanel from './components/accessibility/AccessibilityPanel';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  return (
    <AccessibilityProvider>
      <main className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 transition">
        {/* Página principal */}
        <section id="home" className="w-full flex flex-col items-center justify-center py-16">
          <Home />
        </section>

        {/* Dashboard de progreso */}
        <section id="dashboard" className="w-full py-10">
          <Dashboard />
        </section>

        {/* Panel de administración */}
        <section id="admin" className="w-full py-10">
          <AdminDashboard />
        </section>

        {/* Eventos comunitarios */}
        <section id="eventos" className="w-full py-10">
          <Eventos />
        </section>

        {/* Donaciones */}
        <section id="donaciones" className="w-full py-10">
          <Donaciones />
        </section>

        {/* Feedback y comentarios */}
        <section id="feedback" className="w-full py-10">
          <Feedback />
        </section>

        {/* Panel de accesibilidad flotante */}
        <AccessibilityPanel />
      </main>
    </AccessibilityProvider>
  );
}

export default App;
