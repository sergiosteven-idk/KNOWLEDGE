import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface Props {
  text: string;
}

const TextToSpeechButton: React.FC<Props> = ({ text }) => {
  const { ttsEnabled } = useAccessibility();

  const speak = () => {
    if (!ttsEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className="ml-2 px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
    >
      🔊 Leer
    </button>
  );
};

export default TextToSpeechButton;
