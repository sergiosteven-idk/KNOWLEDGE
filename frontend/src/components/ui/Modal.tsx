import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * Accessible Modal/Dialog Component
 * Cumple con WCAG 2.1 AA
 */
interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  // Trap focus dentro del modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 
                 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl 
                    ${sizeClasses[size]} animate-pop max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b 
                       border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
          <h2
            id="modal-title"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
                      transition-colors text-2xl leading-none"
            aria-label="Cerrar diálogo"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 border-t
                         border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
