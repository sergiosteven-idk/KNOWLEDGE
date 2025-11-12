import React from "react";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export default function FormSelect({
  icon,
  error,
  helperText,
  label,
  options,
  className,
  ...props
}: FormSelectProps) {
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
        <select
          {...props}
          className={`w-full px-4 py-3 rounded-xl bg-white text-black text-base font-medium focus:outline-none focus:ring-2 focus:ring-knowledge-purple focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer ${
            error
              ? "border-2 border-red-400 focus:ring-red-500 focus:ring-offset-red-50"
              : "border border-gray-200 focus:border-knowledge-purple hover:border-gray-300"
          } ${className || ""}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
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
