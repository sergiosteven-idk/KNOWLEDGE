import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FormContainer({
  children,
  title,
  subtitle,
  className = "",
}: FormContainerProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-knowledge-purple to-purple-700 flex items-center justify-center py-8 px-4 ${className}`}>
      <div className="w-full max-w-md">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-purple-100 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Form Content */}
        <div className="animate-fade-in-delay-1">
          {children}
        </div>
      </div>
    </div>
  );
}
