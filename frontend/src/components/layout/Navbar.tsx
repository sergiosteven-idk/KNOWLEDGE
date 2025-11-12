// ==============================
// 🧭 NAVBAR — KNOWLEDGE (OPTIMIZED)
// ==============================
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import Container from "../ui/Container";
import Logo from "../Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { ttsEnabled } = useAccessibility();
  const navigate = useNavigate();

  const speak = (text: string) => {
    if (!ttsEnabled) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "es-ES";
      speechSynthesis.speak(u);
    } catch (e) {
      // ignore
    }
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/eventos", label: "Eventos" },
    { path: "/donaciones", label: "Donaciones" },
    { path: "/feedback", label: "Opiniones" },
  ];

  const handleLogout = () => {
    logout();
    speak("Sesión cerrada");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-knowledge-purple to-knowledge-purple/95 text-white shadow-lg transition-shadow duration-300">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Home */}
          <Link
            to="/"
            onMouseEnter={() => speak("Ir a Knowledge")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-knowledge-green rounded-lg px-2 py-1"
            aria-label="Knowledge - Ir a inicio"
          >
            <Logo size={40} />
            <span className="hidden sm:inline text-lg font-extrabold tracking-wider">Knowledge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={() => speak(link.label)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-knowledge-green ${
                    isActive 
                      ? "bg-white/30 shadow-md" 
                      : "hover:bg-white/10 hover:shadow-sm"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Search (Desktop only) */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:max-w-xs">
            <div className="w-full relative">
              <label htmlFor="search-input" className="sr-only">
                Buscar
              </label>
              <input
                id="search-input"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar en Knowledge"
                className="w-full py-2 pl-4 pr-3 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-knowledge-green transition-all duration-200 hover:bg-white/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value.trim();
                    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                  }
                }}
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm px-3 py-2 opacity-90 font-medium">
                  {user.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Cerrar sesión"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-knowledge-green ${
                      isActive ? "bg-white/30 shadow-md" : "hover:bg-white/10"
                    }`
                  }
                >
                  Entrar
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-semibold bg-white text-knowledge-purple hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-knowledge-green transition-all duration-200 shadow-md hover:shadow-lg font-bold ${
                      isActive ? "ring-2" : ""
                    }`
                  }
                >
                  Registrarse
                </NavLink>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden px-3 py-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-knowledge-green transition-all duration-200"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
                className="transition-transform duration-300"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-2 animate-fade-in">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-knowledge-green animate-fade-in-delay-${idx + 1} ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Mobile Search */}
            <div className="px-3 py-2">
              <label htmlFor="mobile-search" className="sr-only">
                Buscar
              </label>
              <input
                id="mobile-search"
                type="search"
                placeholder="Buscar..."
                className="w-full py-2 pl-4 pr-3 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-knowledge-green transition-all duration-200 hover:bg-white/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value.trim();
                    if (q) {
                      navigate(`/search?q=${encodeURIComponent(q)}`);
                      setMenuOpen(false);
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
