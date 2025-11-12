import React from "react";

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export default function FormInput({
  icon,
  error,
  helperText,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="mb-5">
      <div className={`relative flex items-center ${error ? "mb-2" : ""}`}>
        {icon && (
          <span
            className="absolute left-4 text-gray-400 text-lg pointer-events-none"
            aria-hidden
          >
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full ${
            icon ? "pl-12" : "px-4"
          } py-3 rounded-xl bg-white text-black text-base font-medium placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-knowledge-purple focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg ${
            error
              ? "border-2 border-red-400 focus:ring-red-500 focus:ring-offset-red-50"
              : "border border-gray-200 focus:border-knowledge-purple hover:border-gray-300"
          } ${className || ""}`}
        />
      </div>
      {error && (
        <p className="text-red-300 text-xs md:text-sm font-medium mt-1 flex items-center gap-1">
          <span aria-hidden>⚠️</span> {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-purple-200 text-xs md:text-sm mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
