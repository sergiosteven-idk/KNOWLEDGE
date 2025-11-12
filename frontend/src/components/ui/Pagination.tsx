import React from 'react';

/**
 * Pagination Component
 * Para navegar entre múltiples páginas de contenido
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfWindow = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - halfWindow);
    let end = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage <= halfWindow) {
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage > totalPages - halfWindow) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-2 my-8"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        ← Anterior
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`w-10 h-10 rounded-lg font-semibold transition-all
                ${
                  page === currentPage
                    ? 'bg-knowledge-purple text-white shadow-md'
                    : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="w-10 h-10 flex items-center justify-center text-gray-400"
            >
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente →
      </button>

      {/* Info */}
      <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
        Página {currentPage} de {totalPages}
      </span>
    </nav>
  );
};

export default Pagination;
