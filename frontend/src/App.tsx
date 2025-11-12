// ==============================
// 🌐 KNOWLEDGE FRONTEND APP — RUTAS Y ACCESIBILIDAD
// ==============================
import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AccessibilityProvider, useAccessibility } from "./contexts/AccessibilityContext";
import { AuthProvider } from "./contexts/AuthContext";
import AccessibilityPanel from "./components/accessibility/AccessibilityPanel";
import ProtectedRoute from "./components/ProtectedRoute";

// 📦 Lazy load de páginas para optimizar bundle
const Home = lazy(() => import("./pages/Home"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Eventos = lazy(() => import("./pages/community/Eventos"));
const Donaciones = lazy(() => import("./pages/community/Donaciones"));
const Feedback = lazy(() => import("./pages/community/Feedback"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile"));

// ⚠️ Fallback mientras carga
const PageSkeleton = () => (
  <div className="p-10 text-center text-gray-500 dark:text-gray-400">
    Cargando...
  </div>
);

// 🚫 Página 404
const NotFound = () => (
  <div className="p-10 text-center text-gray-700 dark:text-gray-300">
    404 • Página no encontrada
  </div>
);

// ==============================
// 🎧 Mapa de rutas y títulos
// ==============================
const ROUTE_TITLES: Record<string, string> = {
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

// ==============================
// 🎧 TTS Announcer: anuncia cambios de página
// ==============================
const ScreenReaderAnnouncer = React.memo(() => {
  const { ttsEnabled } = useAccessibility();
  const location = useLocation();

  useEffect(() => {
    const pageTitle = ROUTE_TITLES[location.pathname] || "Knowledge";
    document.title = pageTitle;

    if (!ttsEnabled) return;

    // Cancelar anuncios anteriores
    speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance(`Navegaste a ${pageTitle}`);
    msg.lang = "es-ES";
    msg.rate = 0.9;
    speechSynthesis.speak(msg);
  }, [location.pathname, ttsEnabled]);

  return null;
});

ScreenReaderAnnouncer.displayName = "ScreenReaderAnnouncer";

// ==============================
// 📍 CONFIGURACIÓN DE RUTAS
// ==============================
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  roles?: string[];
}

const ROUTES: RouteConfig[] = [
  // Públicas
  { path: "/", element: <Home /> },
  { path: "/buscar", element: <SearchResults /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/olvide-contrasena", element: <ForgotPassword /> },
  { path: "/eventos", element: <Eventos /> },
  { path: "/donaciones", element: <Donaciones /> },
  { path: "/feedback", element: <Feedback /> },

  // Protegidas
  { path: "/dashboard", element: <Dashboard />, protected: true },
  { path: "/perfil", element: <Profile />, protected: true },
  { path: "/admin", element: <AdminDashboard />, protected: true, roles: ["docente", "super_admin"] },
];

// ==============================
// 📍 RUTAS PRINCIPALES
// ==============================
const AppRoutes = React.memo(() => {
  const routeElements = useMemo(() => 
    ROUTES.map((route) => {
      const element = (
        <Suspense fallback={<PageSkeleton />}>
          {route.element}
        </Suspense>
      );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.protected ? (
              <ProtectedRoute roles={route.roles}>
                {element}
              </ProtectedRoute>
            ) : (
              element
            )
          }
        />
      );
    }),
    []
  );

  return (
    <Routes>
      {routeElements}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});

AppRoutes.displayName = "AppRoutes";

// ==============================
// 🚀 APLICACIÓN PRINCIPAL
// ==============================
export default function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <BrowserRouter>
            {/* Skip link for keyboard users */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-white focus:rounded-md focus:shadow focus:ring-2 focus:ring-knowledge-green"
            >
              Saltar al contenido
            </a>

            <Navbar />
            <ScreenReaderAnnouncer />

            <main
              id="main-content"
              role="main"
              className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition"
              aria-label="Contenido principal"
            >
              <div className="max-w-7xl mx-auto px-4 py-8">
                <AppRoutes />
              </div>
            </main>

            <Footer />

            <AccessibilityPanel />
        </BrowserRouter>
      </AccessibilityProvider>
    </AuthProvider>
  );
}