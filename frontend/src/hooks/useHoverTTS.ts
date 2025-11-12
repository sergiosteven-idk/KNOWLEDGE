import { useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

/**
 * Hook para activar lectura de texto (TTS) al pasar el cursor
 * Cancela la lectura anterior si el usuario se mueve rápidamente
 */
export const useHoverTTS = () => {
  const { ttsEnabled } = useAccessibility();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleMouseEnter = (text: string) => {
    if (!ttsEnabled || !text.trim()) return;

    // Cancelar cualquier lectura anterior
    speechSynthesis.cancel();

    // Crear nueva utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    // Opcional: cancelar lectura al salir
    // speechSynthesis.cancel();
  };

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
