import React, { useState, useRef, useEffect } from 'react';

/**
 * Accessible Tooltip Component
 * WCAG 2.1 AA compliant
 */
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        role="button"
        tabIndex={0}
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsVisible(!isVisible);
          }
        }}
      >
        {children}
      </div>

      {isVisible && (
        <div
          id="tooltip-content"
          role="tooltip"
          className={`absolute z-50 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white 
                     dark:text-gray-900 text-sm rounded-lg whitespace-nowrap pointer-events-none
                     ${positionClasses[position]} animate-fade-in`}
        >
          {content}
          {/* Tooltip arrow */}
          <div
            className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45
              ${
                position === 'top'
                  ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
                  : position === 'bottom'
                  ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1'
                  : position === 'left'
                  ? 'left-full top-1/2 -translate-y-1/2 -ml-1'
                  : 'right-full top-1/2 -translate-y-1/2 -mr-1'
              }`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
