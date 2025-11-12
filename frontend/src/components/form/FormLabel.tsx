import React from "react";

interface FormLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  required?: boolean;
}

export default function FormLabel({
  htmlFor,
  children,
  icon,
  required = false,
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-white font-semibold mb-3 text-sm md:text-base cursor-pointer"
    >
      {icon && (
        <span className="text-xl md:text-2xl flex-shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      <span>
        {children}
        {required && <span className="text-red-300 ml-1">*</span>}
      </span>
    </label>
  );
}
