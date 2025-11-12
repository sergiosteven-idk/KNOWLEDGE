import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Breadcrumb Navigation Component
 * Mejora la navegación y accesibilidad WCAG
 */
interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  const location = useLocation();

  // Generar breadcrumbs automáticos si no se proporcionan
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Inicio', path: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Navegación de ruta"
      className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <ol className="flex items-center gap-2 text-sm max-w-6xl mx-auto">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-400" aria-hidden="true">›</span>
            )}
            {item.path ? (
              <Link
                to={item.path}
                className="text-knowledge-purple hover:text-knowledge-purple/80 
                           font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
