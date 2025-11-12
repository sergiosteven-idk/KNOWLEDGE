import React from "react";

interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export default function FormCheckbox({
  label,
  helperText,
  className,
  ...props
}: FormCheckboxProps) {
  return (
    <div className="mb-5">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          {...props}
          className={`mt-1 w-5 h-5 rounded-lg border-2 border-white bg-white text-knowledge-purple focus:outline-none focus:ring-2 focus:ring-knowledge-purple focus:ring-offset-2 focus:ring-offset-purple-600 transition-all duration-300 cursor-pointer hover:border-purple-200 ${className || ""}`}
        />
        <span className="text-white font-medium text-sm md:text-base group-hover:text-purple-100 transition-colors duration-200">
          {label}
        </span>
      </label>
      {helperText && (
        <p className="text-purple-200 text-xs md:text-sm mt-2 ml-8">
          {helperText}
        </p>
      )}
    </div>
  );
}
