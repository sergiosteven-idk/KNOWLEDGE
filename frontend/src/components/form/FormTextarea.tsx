import React from "react";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
  label?: string;
}

export default function FormTextarea({
  icon,
  error,
  helperText,
  label,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div className="mb-5">
      {label && (
        <label className="flex items-center gap-2 text-white font-semibold mb-3 text-sm md:text-base cursor-pointer">
          {icon && (
            <span className="text-xl md:text-2xl flex-shrink-0" aria-hidden>
              {icon}
            </span>
          )}
          <span>{label}</span>
        </label>
      )}
      <div className={`relative ${error ? "mb-2" : ""}`}>
        <textarea
          {...props}
          className={`w-full px-4 py-3 rounded-xl bg-white text-black text-base font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-knowledge-purple transition-all duration-200 shadow-sm hover:shadow-md resize-none ${
            error
              ? "border-2 border-red-400 focus:ring-red-500"
              : "border border-gray-200 focus:border-knowledge-purple"
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
