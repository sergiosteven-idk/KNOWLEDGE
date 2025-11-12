import React, { type ReactNode } from 'react';
import { useHoverTTS } from '../../hooks/useHoverTTS';

interface TextToSpeechHoverProps {
  text: string;
  children: ReactNode;
  className?: string;
  tag?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a' | 'li';
}

/**
 * Componente que activa lectura TTS al pasar el cursor
 * Envuelve cualquier elemento y lo hace "audible" en hover
 */
const TextToSpeechHover: React.FC<TextToSpeechHoverProps> = ({
  text,
  children,
  className = '',
  tag: Tag = 'div',
}) => {
  const ttsHandlers = useHoverTTS();

  return (
    <Tag
      {...ttsHandlers}
      onMouseEnter={() => ttsHandlers.onMouseEnter(text)}
      onMouseLeave={ttsHandlers.onMouseLeave}
      className={`cursor-help transition-colors duration-200 ${className}`}
      title="Pasa el cursor para escuchar este texto"
    >
      {children}
    </Tag>
  );
};

export default TextToSpeechHover;
