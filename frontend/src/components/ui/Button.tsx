import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-knowledge-purple text-white hover:bg-knowledge-purple/95 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-knowledge-green disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-knowledge-green disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-knowledge-green disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed",
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ease-out focus:outline-none hover-scale";
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

  return (
    <button {...props} className={`${base} ${variantClass} ${className || ""}`}> 
      {children}
    </button>
  );
}
