// ==============================
// 🌐 KNOWLEDGE FRONTEND APP — RUTAS Y ACCESIBILIDAD
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
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AccessibilityProvider, useAccessibility } from "./contexts/AccessibilityContext";
import { AuthProvider } from "./contexts/AuthContext";
import AccessibilityPanel from "./components/accessibility/AccessibilityPanel";

// ==============================
// 🎧 TTS Announcer: anuncia cambios de página
// ==============================
const ScreenReaderAnnouncer = () => {
  const { ttsEnabled } = useAccessibility();
  const location = useLocation();

  useEffect(() => {
    const map: Record<string, string> = {
      "/": "Inicio – Knowledge",
      "/dashboard": "Panel de usuario – Knowledge",
      "/admin": "Administración – Knowledge",
      "/eventos": "Eventos – Knowledge",
      "/donaciones": "Donaciones – Knowledge",
      "/feedback": "Feedback – Knowledge",
      "/perfil": "Perfil de usuario – Knowledge",
      "/login": "Iniciar sesión – Knowledge",
      "/register": "Registro – Knowledge",
    };

    document.title = map[location.pathname] || "Knowledge";

    if (!ttsEnabled) return;
    const msg = new SpeechSynthesisUtterance(`Navegaste a ${document.title}`);
    msg.lang = "es-ES";
    speechSynthesis.speak(msg);
  }, [location, ttsEnabled]);

  return null;
};

// ==============================
// 📍 RUTAS PRINCIPALES
// ==============================
function AppRoutes() {
  return (
    <Routes>
      {/* 🏠 Página principal */}
      <Route path="/" element={<Home />} />

      {/* 👤 Panel del usuario */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 👥 Perfil del usuario */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 🧑‍💼 Panel del administrador */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["docente", "super_admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🌍 Comunidad */}
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/donaciones" element={<Donaciones />} />
      <Route path="/feedback" element={<Feedback />} />

      {/* 🔐 Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ❌ 404 */}
      <Route
        path="*"
        element={<div className="p-10 text-center">404 • Página no encontrada</div>}
      />
    </Routes>
  );
}

// ==============================
// 🚀 APLICACIÓN PRINCIPAL
// ==============================
export default function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <BrowserRouter>
          <Navbar />
          <ScreenReaderAnnouncer />

          <main className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition">
            <AppRoutes />
          </main>

          <AccessibilityPanel />
        </BrowserRouter>
      </AccessibilityProvider>
    </AuthProvider>
  );
}
