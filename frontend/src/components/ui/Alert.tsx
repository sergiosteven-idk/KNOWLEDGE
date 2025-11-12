import React from 'react';

/**
 * Alert Component
 * Para mensajes importantes con soporte ARIA
 */
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
  icon?: string;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  icon,
}) => {
  const typeStyles = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-800 dark:text-emerald-200',
      title: 'text-emerald-900 dark:text-emerald-100',
      icon: '✅',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      title: 'text-red-900 dark:text-red-100',
      icon: '❌',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-200',
      title: 'text-amber-900 dark:text-amber-100',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      title: 'text-blue-900 dark:text-blue-100',
      icon: 'ℹ️',
    },
  };

  const style = typeStyles[type];

  return (
    <div
      role="alert"
      className={`border-l-4 rounded-lg p-4 md:p-6 flex gap-4 ${style.bg} ${style.border} 
                 animate-slide-in-down`}
    >
      <div className="flex-shrink-0 text-2xl mt-1">
        {icon || style.icon}
      </div>
      <div className="flex-1">
        <h3 className={`font-bold text-lg ${style.title} mb-1`}>{title}</h3>
        <p className={`text-sm md:text-base ${style.text}`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${style.text} hover:opacity-70 transition-opacity 
                     text-2xl leading-none`}
          aria-label="Cerrar alerta"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
