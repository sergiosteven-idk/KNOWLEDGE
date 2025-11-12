import React from "react";

interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export default function Card({ title, children, className = "", footer }: CardProps) {
  return (
    <article className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:border-knowledge-green dark:hover:border-knowledge-green bg-white dark:bg-gray-800 animate-fade-in hover-scale ${className}`}>
      {title ? <h3 className="font-bold text-lg text-knowledge-purple mb-3">{title}</h3> : null}
      <div className="text-sm text-gray-700 dark:text-gray-200">{children}</div>
      {footer ? <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">{footer}</div> : null}
    </article>
  );
}
