import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <img
      src="/KNOWLEDGE_LOGO.JPG"
      alt="Knowledge Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
