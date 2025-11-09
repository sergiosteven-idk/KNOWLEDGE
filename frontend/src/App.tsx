// ==============================
// 🌐 KNOWLEDGE FRONTEND APP (Rutas reales)
// ==============================
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Eventos from "./pages/community/Eventos";
import Donaciones from "./pages/community/Donaciones";
import Feedback from "./pages/community/Feedback";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AccessibilityProvider, useAccessibility } from "./contexts/AccessibilityContext";
import { AuthProvider } from "./contexts/AuthContext";
import AccessibilityPanel from "./components/accessibility/AccessibilityPanel";

// Anuncia cambios de página con TTS si está activo y actualiza el título
const ScreenReaderAnnouncer = () => {
  const { ttsEnabled } = useAccessibility();
  const location = useLocation();

  useEffect(() => {
    // Título por ruta
    const map = {
      "/": "Inicio – Knowledge",
      "/dashboard": "Panel de usuario – Knowledge",
      "/admin": "Administración – Knowledge",
      "/eventos": "Eventos – Knowledge",
      "/donaciones": "Donaciones – Knowledge",
      "/feedback": "Feedback – Knowledge",
      "/login": "Iniciar sesión – Knowledge",
      "/register": "Registro – Knowledge",
    };
    document.title = map[location.pathname] || "Knowledge";

    if (!ttsEnabled) return;
    const u = new SpeechSynthesisUtterance(`Navegaste a ${document.title}`);
    u.lang = "es-ES";
    speechSynthesis.speak(u);
  }, [location, ttsEnabled]);

  return null;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["docente", "super_admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/eventos" element={<Eventos />} />
      <Route path="/donaciones" element={<Donaciones />} />
      <Route path="/feedback" element={<Feedback />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<div className="p-10 text-center">404 • Página no encontrada</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <BrowserRouter>
          <Navbar />
          <ScreenReaderAnnouncer />
          <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition">
            <AppRoutes />
          </div>
          <AccessibilityPanel />
        </BrowserRouter>
      </AccessibilityProvider>
    </AuthProvider>
  );
}
