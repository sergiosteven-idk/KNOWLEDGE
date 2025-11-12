import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Logo from "../Logo";
import TextToSpeechHover from "../accessibility/TextToSpeechHover";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export default function Footer() {
  const { darkMode, highContrast } = useAccessibility();

  // Gradient dinámico según modo (complementario al navbar)
  const getFooterGradient = () => {
    if (highContrast) {
      return "bg-gradient-to-b from-gray-900 to-gray-800 text-white border-t-4 border-white";
    }
    if (darkMode) {
      // Stronger dark gradient so text reads without relying on hover
      return "bg-gradient-to-b from-gray-900 via-purple-900 to-gray-800 text-gray-100 backdrop-blur-sm border-t border-purple-700/40";
    }
    return "bg-gradient-to-b from-purple-100 via-indigo-100 to-purple-200 text-gray-900 shadow-lg shadow-purple-200/20";
  };

  const textColorClass = () => {
    if (highContrast) return "text-white";
    if (darkMode) return "text-gray-100 dark:text-gray-200";
    return "text-gray-900 dark:text-gray-200";
  };

  // Base text color to ensure consistent contrast across all elements
  const baseTextClass = highContrast ? "text-white" : darkMode ? "text-gray-100" : "text-gray-900";
  const headingColorClass = () => {
    if (highContrast) return "text-white font-bold";
    if (darkMode) return "text-white dark:text-white";
    return "text-gray-900 dark:text-white";
  };

  const borderColorClass = () => {
    if (highContrast) return "border-white";
    if (darkMode) return "border-purple-700/30 dark:border-purple-700/40";
    return "border-purple-200 dark:border-gray-700";
  };

  // Hover style for links
  const hoverColorClass = () => "hover:text-knowledge-green hover:underline transition-colors duration-200";

  // Link color: in dark mode we use a distinct green to stand out; in HC mode links are white
  const linkColorClass = () => {
    if (highContrast) return "text-white font-semibold";
    if (darkMode) return "text-knowledge-green font-medium"; // use design token
    return "text-gray-700";
  };
  return (
    <footer className={`${getFooterGradient()} border-t transition-all duration-300`}>
  <Container className={`py-12 ${baseTextClass}`}>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Branding Column */}
          <div className="flex flex-col items-start gap-4 animate-fade-in">
            <TextToSpeechHover text="Knowledge - Educación abierta y colaborativa">
              <Logo size={50} />
            </TextToSpeechHover>
            <TextToSpeechHover
              text="Educación abierta y colaborativa. Recursos, eventos y comunidad."
              tag="p"
              className={`text-sm leading-relaxed ${baseTextClass}`}
            >
              Educación abierta y colaborativa. Recursos, eventos y comunidad.
            </TextToSpeechHover>
          </div>

        {/* Navigation Column */}
  <nav aria-label="Enlaces principales" className="text-sm animate-fade-in-delay-1">
          <TextToSpeechHover text="Navegación" tag="h4" className={`font-bold mb-4 text-base ${headingColorClass()}`}>
            Navegación
          </TextToSpeechHover>
          <ul className="space-y-2">
            <li>
              <TextToSpeechHover text="Ir a la página de inicio" tag="a">
                <Link to="/" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Inicio
                </Link>
              </TextToSpeechHover>
            </li>
            <li>
              <TextToSpeechHover text="Ver eventos disponibles" tag="a">
                <Link to="/eventos" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Eventos
                </Link>
              </TextToSpeechHover>
            </li>
            <li>
              <TextToSpeechHover text="Realizar una donación" tag="a">
                <Link to="/donaciones" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Donaciones
                </Link>
              </TextToSpeechHover>
            </li>
            <li>
              <TextToSpeechHover text="Dejar tu opinión y calificación" tag="a">
                <Link to="/feedback" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Feedback
                </Link>
              </TextToSpeechHover>
            </li>
          </ul>
        </nav>

        {/* Community Column */}
  <div className="text-sm animate-fade-in-delay-2">
          <TextToSpeechHover text="Únete a nuestra comunidad" tag="h4" className={`font-bold mb-4 text-base ${headingColorClass()}`}>
            Comunidad
          </TextToSpeechHover>
          <ul className="space-y-2">
            <li>
              <TextToSpeechHover text="Crear una nueva cuenta en Knowledge" tag="a">
                <Link to="/register" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Únete
                </Link>
              </TextToSpeechHover>
            </li>
            <li>
              <TextToSpeechHover text="Participa como voluntario en Knowledge" tag="a">
                <a href="#" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Voluntariado
                </a>
              </TextToSpeechHover>
            </li>
            <li>
              <TextToSpeechHover text="Realiza una donación para apoyar Knowledge" tag="a">
                <a href="#" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  Donar
                </a>
              </TextToSpeechHover>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
  <div className="text-sm animate-fade-in-delay-3">
          <TextToSpeechHover text="Información de contacto" tag="h4" className={`font-bold mb-4 text-base ${headingColorClass()}`}>
            Contacto
          </TextToSpeechHover>
          <address className={`not-italic space-y-3 ${baseTextClass}`}>
            <TextToSpeechHover text="Enviar correo a contacto arroba knowledge punto org" tag="a">
              <a href="mailto:contacto@knowledge.org" className={`${linkColorClass()} ${hoverColorClass()} block focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                contacto@knowledge.org
              </a>
            </TextToSpeechHover>
            <TextToSpeechHover text="Síguenos en nuestras redes sociales" tag="p" className={`font-semibold ${baseTextClass}`}>
              Síguenos
            </TextToSpeechHover>
            <div className="flex gap-4">
              <TextToSpeechHover text="Síguenos en Twitter" tag="a">
                <a aria-label="Twitter" href="#" className={`${linkColorClass()} hover:text-knowledge-green hover:scale-110 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M19 7.5c-.5.2-1 .3-1.6.4.6-.4 1.1-1 1.3-1.8-.6.4-1.3.7-2 .9-.6-.6-1.5-1-2.4-1-1.8 0-3.2 1.6-2.9 3.3-2.4-.1-4.6-1.3-6-3.1-.8 1.3-.3 3 1 3.8-.5 0-1-.2-1.4-.4 0 1.5 1 2.9 2.5 3.2-.5.2-1 .3-1.6.1.5 1.4 1.9 2.4 3.5 2.5-1.3 1-3 1.6-4.7 1.6H5c1.7 1 3.7 1.6 5.8 1.6 7 0 10.8-5.8 10.8-10.8v-.5c.8-.6 1.5-1.4 2-2.2-.7.3-1.5.5-2.3.6z" fill="currentColor"/>
                  </svg>
                </a>
              </TextToSpeechHover>
              <TextToSpeechHover text="Síguenos en Facebook" tag="a">
                <a aria-label="Facebook" href="#" className={`${linkColorClass()} hover:text-knowledge-green hover:scale-110 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M22 12.1C22 6.5 17.5 2 11.9 2S2 6.5 2 12.1c0 5 3.6 9.2 8.2 9.9v-7H7.9v-2.9h2.3V9.7c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.3v1.7h2.4l-.4 2.9h-2v7C18.4 21.3 22 17.1 22 12.1z" fill="currentColor"/>
                  </svg>
                </a>
              </TextToSpeechHover>
            </div>
          </address>
        </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className={`border-t transition-all duration-300 py-6 ${highContrast ? "bg-gray-800 border-white/50" : darkMode ? "bg-gray-900/80 border-purple-700/40" : "bg-purple-50 border-purple-200"}`}>
        <Container className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs ${highContrast ? "text-white" : darkMode ? "text-gray-200" : "text-gray-700"}`}>
          <TextToSpeechHover text={`Todos los derechos reservados ${new Date().getFullYear()}`} tag="p" className="animate-fade-in">
            © {new Date().getFullYear()} Knowledge — Todos los derechos reservados.
          </TextToSpeechHover>
          <div className="flex flex-wrap items-center gap-4">
            <TextToSpeechHover text="Ir al contenido principal" tag="a">
              <a href="#main-content" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>Ir al contenido</a>
            </TextToSpeechHover>
            <span className={highContrast ? "text-white/50" : darkMode ? "text-gray-600" : "text-gray-400"}>•</span>
            <TextToSpeechHover text="Leer nuestra política de privacidad" tag="a">
              <a href="#" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>Política de privacidad</a>
            </TextToSpeechHover>
            <span className={highContrast ? "text-white/50" : darkMode ? "text-gray-600" : "text-gray-400"}>•</span>
            <TextToSpeechHover text="Leer nuestros términos de servicio" tag="a">
              <a href="#" className={`${linkColorClass()} ${hoverColorClass()} focus:outline-none focus-visible:ring-2 focus-visible:ring-knowledge-green focus-visible:ring-offset-2`}>Términos</a>
            </TextToSpeechHover>
          </div>
        </Container>
      </div>
    </footer>
  );
}
