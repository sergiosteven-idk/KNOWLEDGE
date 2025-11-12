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
    <div className={`min-h-screen bg-gradient-to-b from-knowledge-purple via-purple-600 to-purple-700 flex items-center justify-center py-8 px-4 relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400 rounded-full opacity-10 -ml-36 -mb-36"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-purple-100 text-sm md:text-base drop-shadow">
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
