import React from 'react';

/**
 * Toast Notification Component
 * Para mostrar mensajes de éxito, error, advertencia e info
 */
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg border-l-4 
                   ${typeStyles[type]} animate-slide-in-up shadow-lg
                   max-w-sm md:max-w-md`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <p className="font-medium text-sm md:text-base">{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto text-xl hover:opacity-70 transition-opacity"
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
