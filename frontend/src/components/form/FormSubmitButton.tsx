import React from "react";

interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function FormSubmitButton({
  children,
  icon,
  loading = false,
  fullWidth = true,
  className,
  disabled,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${
        fullWidth ? "w-full" : ""
      } px-6 py-3 rounded-xl bg-white text-knowledge-purple font-extrabold text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-knowledge-purple disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg ${className || ""}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Procesando...
        </>
      ) : (
        <>
          {icon && <span aria-hidden>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
