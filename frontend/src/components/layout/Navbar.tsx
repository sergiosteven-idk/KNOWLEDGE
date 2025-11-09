import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { ttsEnabled } = useAccessibility();

  const speak = (txt) => {
    if (!ttsEnabled) return;
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = "es-ES";
    speechSynthesis.speak(u);
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-blue-500 hover:text-white"}`;

  return (
    <nav className="w-full bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          onMouseEnter={() => speak("Ir a inicio")}
          className="text-xl font-bold text-blue-400"
        >
          Knowledge
        </Link>

        <button
          className="md:hidden border rounded-lg px-3 py-2"
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className={`md:flex gap-2 items-center ${open ? "block mt-3" : "hidden md:block"}`}>
          <NavLink to="/" className={linkClass} onMouseEnter={() => speak("Inicio")}>Inicio</NavLink>
          <NavLink to="/dashboard" className={linkClass} onMouseEnter={() => speak("Panel de usuario")}>Usuario</NavLink>
          <NavLink to="/eventos" className={linkClass} onMouseEnter={() => speak("Eventos")}>Eventos</NavLink>
          <NavLink to="/donaciones" className={linkClass} onMouseEnter={() => speak("Donaciones")}>Donaciones</NavLink>
          <NavLink to="/feedback" className={linkClass} onMouseEnter={() => speak("Feedback")}>Feedback</NavLink>
          {user?.tipo_usuario === "docente" || user?.tipo_usuario === "super_admin" ? (
            <NavLink to="/admin" className={linkClass} onMouseEnter={() => speak("Administración")}>Admin</NavLink>
          ) : null}
          {user ? (
            <>
              <span className="mx-2 text-sm opacity-80">{user.nombre}</span>
              <button className="btn" onClick={logout}>Salir</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onMouseEnter={() => speak("Iniciar sesión")}>Login</NavLink>
              <NavLink to="/register" className={linkClass} onMouseEnter={() => speak("Registrarse")}>Registro</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
