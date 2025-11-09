// ==============================
// 🧭 NAVBAR — KNOWLEDGE
// ==============================
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { ttsEnabled, darkMode, highContrast } = useAccessibility();

  const speak = (text) => {
    if (!ttsEnabled) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    speechSynthesis.speak(u);
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-200 hover:bg-blue-500 hover:text-white"
    }`;

  return (
    <nav
      className={`w-full sticky top-0 z-50 border-b transition ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-white"
          : highContrast
          ? "bg-yellow-300 text-black border-black"
          : "bg-blue-900 text-white border-blue-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          onMouseEnter={() => speak("Ir a inicio")}
          className="text-xl font-extrabold tracking-wide text-blue-300 hover:text-white transition"
        >
          Knowledge
        </Link>

        {/* BOTÓN HAMBURGUESA (solo móvil) */}
        <button
          className="md:hidden border rounded-lg px-3 py-2 text-lg"
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* MENÚ PRINCIPAL */}
        <div
          className={`md:flex md:gap-3 md:items-center ${
            open ? "block mt-4 space-y-2" : "hidden md:flex"
          }`}
        >
          {/* Enlaces públicos */}
          <NavLink
            to="/"
            className={linkClass}
            onMouseEnter={() => speak("Inicio")}
          >
            Inicio
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={linkClass}
                onMouseEnter={() => speak("Panel de usuario")}
              >
                Panel
              </NavLink>
              <NavLink
                to="/perfil"
                className={linkClass}
                onMouseEnter={() => speak("Perfil de usuario")}
              >
                Perfil
              </NavLink>
            </>
          )}
          <NavLink
            to="/eventos"
            className={linkClass}
            onMouseEnter={() => speak("Eventos")}
          >
            Eventos
          </NavLink>
          <NavLink
            to="/donaciones"
            className={linkClass}
            onMouseEnter={() => speak("Donaciones")}
          >
            Donaciones
          </NavLink>
          <NavLink
            to="/feedback"
            className={linkClass}
            onMouseEnter={() => speak("Feedback")}
          >
            Feedback
          </NavLink>

          {/* Solo para roles elevados */}
          {user?.tipo_usuario === "docente" || user?.tipo_usuario === "super_admin" ? (
            <NavLink
              to="/admin"
              className={linkClass}
              onMouseEnter={() => speak("Administración")}
            >
              Administración
            </NavLink>
          ) : null}

          {/* LOGIN / LOGOUT */}
          {user ? (
            <>
              <span className="mx-2 text-sm opacity-90">{user.nombre}</span>
              <button
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition"
                onClick={() => {
                  logout();
                  speak("Sesión cerrada");
                }}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={linkClass}
                onMouseEnter={() => speak("Iniciar sesión")}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={linkClass}
                onMouseEnter={() => speak("Registrarse")}
              >
                Registro
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
