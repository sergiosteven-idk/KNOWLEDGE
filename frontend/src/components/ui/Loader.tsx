import React from "react";

export default function Loader({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center" aria-live="polite">
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        className="animate-spin text-knowledge-purple"
        aria-hidden
>      
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" strokeOpacity="0.2" fill="none" />
        <path d="M45 25a20 20 0 0 1-20 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
