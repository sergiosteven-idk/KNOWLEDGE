import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 text-black dark:text-gray-200 transition-colors duration-300">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding Column */}
          <div className="flex flex-col items-start gap-4 animate-fade-in">
            <Logo size={50} />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Educación abierta y colaborativa. Recursos, eventos y comunidad.
            </p>
          </div>

        {/* Navigation Column */}
        <nav aria-label="Enlaces principales" className="text-sm animate-fade-in-delay-1">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base">Navegación</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/eventos" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Eventos
              </Link>
            </li>
            <li>
              <Link to="/donaciones" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Donaciones
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Feedback
              </Link>
            </li>
          </ul>
        </nav>

        {/* Community Column */}
        <div className="text-sm animate-fade-in-delay-2">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base">Comunidad</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/register" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Únete
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Voluntariado
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-knowledge-green hover:underline transition-colors duration-200">
                Donar
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="text-sm animate-fade-in-delay-3">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base">Contacto</h4>
          <address className="not-italic text-gray-600 dark:text-gray-400 space-y-3">
            <a href="mailto:contacto@knowledge.org" className="hover:text-knowledge-green hover:underline transition-colors duration-200 block">
              contacto@knowledge.org
            </a>
            <p className="font-semibold text-gray-700 dark:text-gray-300">Síguenos</p>
            <div className="flex gap-4">
              <a aria-label="Twitter" href="#" className="text-gray-600 dark:text-gray-400 hover:text-knowledge-green hover:scale-110 transition-transform duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M19 7.5c-.5.2-1 .3-1.6.4.6-.4 1.1-1 1.3-1.8-.6.4-1.3.7-2 .9-.6-.6-1.5-1-2.4-1-1.8 0-3.2 1.6-2.9 3.3-2.4-.1-4.6-1.3-6-3.1-.8 1.3-.3 3 1 3.8-.5 0-1-.2-1.4-.4 0 1.5 1 2.9 2.5 3.2-.5.2-1 .3-1.6.1.5 1.4 1.9 2.4 3.5 2.5-1.3 1-3 1.6-4.7 1.6H5c1.7 1 3.7 1.6 5.8 1.6 7 0 10.8-5.8 10.8-10.8v-.5c.8-.6 1.5-1.4 2-2.2-.7.3-1.5.5-2.3.6z" fill="currentColor"/>
                </svg>
              </a>
              <a aria-label="Facebook" href="#" className="text-gray-600 dark:text-gray-400 hover:text-knowledge-green hover:scale-110 transition-transform duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22 12.1C22 6.5 17.5 2 11.9 2S2 6.5 2 12.1c0 5 3.6 9.2 8.2 9.9v-7H7.9v-2.9h2.3V9.7c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.3v1.7h2.4l-.4 2.9h-2v7C18.4 21.3 22 17.1 22 12.1z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </address>
        </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-6">
        <Container className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-600 dark:text-gray-400">
          <p className="animate-fade-in">© {new Date().getFullYear()} Knowledge — Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#main-content" className="hover:text-knowledge-green hover:underline transition-colors duration-200">Ir al contenido</a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-knowledge-green hover:underline transition-colors duration-200">Política de privacidad</a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-knowledge-green hover:underline transition-colors duration-200">Términos</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
