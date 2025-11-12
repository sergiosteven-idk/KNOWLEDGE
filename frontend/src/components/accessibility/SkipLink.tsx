import React, { useEffect, useState } from 'react';

/**
 * SkipLink Component - Accesibilidad WCAG
 * Permite saltar a contenido principal con teclado
 */
const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-50 px-4 py-2 bg-knowledge-purple text-white font-bold 
                 transform -translate-y-full focus:translate-y-0 transition-transform duration-200"
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipLink;
