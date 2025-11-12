// ==============================
// 🧭 NAVBAR — KNOWLEDGE (PROFESSIONAL GRADIENT)
// ==============================
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import Container from "../ui/Container";
import Logo from "../Logo";
import TextToSpeechHover from "../accessibility/TextToSpeechHover";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { ttsEnabled, darkMode, highContrast } = useAccessibility();
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

  // Gradient dinámico según modo
  const getNavbarGradient = () => {
    if (highContrast) {
      return "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b-4 border-white";
    }
    if (darkMode) {
      return "bg-gradient-to-r from-knowledge-purple/40 via-knowledge-purple/30 to-purple-900/40 text-white backdrop-blur-md border-b border-purple-700/40";
    }
    return "bg-gradient-to-r from-knowledge-purple via-purple-600 to-indigo-600 text-white shadow-lg";
  };

  // Base text and link helpers to guarantee contrast across modes
  const baseNavText = highContrast ? "text-white" : "text-white"; // navbar uses white text on gradients

  const linkColorClass = () => {
    if (highContrast) return "text-white font-semibold";
    if (darkMode) return "text-white font-medium";
    return "text-gray-900 font-medium"; // Dark text on light gradient background
  };

  const hoverColorClass = () => "hover:text-knowledge-green hover:opacity-95 transition-colors duration-200";

  return (
    <nav 
      className={`sticky top-0 z-50 ${getNavbarGradient()} transition-all duration-300`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Home */}
          <TextToSpeechHover text="Ir a Knowledge">
            <Link
              to="/"
              onMouseEnter={() => speak("Ir a Knowledge")}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green rounded-lg px-2 py-1"
              aria-label="Knowledge - Ir a inicio"
            >
              <Logo size={40} />
              <span className="hidden sm:inline text-lg font-extrabold tracking-wider">Knowledge</span>
            </Link>
          </TextToSpeechHover>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <TextToSpeechHover key={`tts-${link.path}`} text={link.label}>
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => {
                    const activeClass = isActive
                      ? highContrast
                        ? "bg-white text-gray-900 font-bold"
                        : "bg-white/30 shadow-md backdrop-blur-sm"
                      : "";
                    return `px-4 py-2 rounded-lg text-sm transition-all duration-200 ${linkColorClass()} ${hoverColorClass()} ${activeClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`;
                  }}
                >
                  {link.label}
                </NavLink>
              </TextToSpeechHover>
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
                className={`w-full py-2 pl-4 pr-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-knowledge-green ${
                  highContrast
                    ? "bg-white text-gray-900 placeholder-gray-600 hover:bg-white/90"
                    : darkMode
                    ? "bg-white/10 text-white placeholder-white/50 hover:bg-white/20"
                    : "bg-white/20 text-white placeholder-white/70 hover:bg-white/30"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value.trim();
                    if (q) navigate(`/buscar?q=${encodeURIComponent(q)}`);
                  }
                }}
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className={`hidden sm:inline text-sm px-3 py-2 font-medium ${
                  highContrast ? "text-white" : "opacity-90"
                }`}>
                  {user.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                    highContrast
                      ? "bg-white text-red-600 hover:bg-white/90 focus:ring-white"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-400 text-white"
                  }`}
                  aria-label="Cerrar sesión"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <TextToSpeechHover text="Entrar">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm transition-all duration-200 ${linkColorClass()} ${hoverColorClass()} ${
                        isActive
                          ? highContrast
                            ? "bg-white text-gray-900"
                            : "bg-white/30 shadow-md backdrop-blur-sm"
                          : ""
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`
                    }
                  >
                    Entrar
                  </NavLink>
                </TextToSpeechHover>
                <TextToSpeechHover text="Registrarse">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-knowledge-green ${
                        highContrast
                          ? "bg-white text-gray-900 hover:bg-white/90"
                          : darkMode
                          ? "bg-knowledge-green/90 text-white hover:bg-knowledge-green"
                          : "bg-white text-knowledge-purple hover:bg-white/90"
                      } ${isActive ? "ring-2" : ""}`
                    }
                  >
                    Registrarse
                  </NavLink>
                </TextToSpeechHover>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-knowledge-green transition-all duration-200 ${
                highContrast ? "hover:bg-white/20" : "hover:bg-white/10"
              }`}
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
          <div className={`md:hidden mt-4 pt-4 space-y-2 animate-fade-in ${
            highContrast
              ? "border-t-2 border-white"
              : darkMode
              ? "border-t border-purple-700/40"
              : "border-t border-white/20"
          }`}>
            {navLinks.map((link, idx) => (
              <TextToSpeechHover key={`mb-tts-${link.path}`} text={link.label}>
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-all duration-200 animate-fade-in-delay-${idx + 1} ${linkColorClass()} ${hoverColorClass()} ${
                      isActive
                        ? highContrast
                          ? "bg-white text-gray-900"
                          : "bg-white/20"
                        : ""
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`
                  }
                >
                  {link.label}
                </NavLink>
              </TextToSpeechHover>
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
                className={`w-full py-2 pl-4 pr-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-knowledge-green ${
                  highContrast
                    ? "bg-white text-gray-900 placeholder-gray-600 hover:bg-white/90"
                    : darkMode
                    ? "bg-white/10 text-white placeholder-white/50 hover:bg-white/20"
                    : "bg-white/20 text-white placeholder-white/70 hover:bg-white/30"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value.trim();
                    if (q) {
                      navigate(`/buscar?q=${encodeURIComponent(q)}`);
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
