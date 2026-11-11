import './Pagination.css';

import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const firstItem = totalItems === 0
    ? 0
    : (currentPage - 1) * pageSize + 1;

  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="pagination">
      <span className="pagination-info">
        Mostrando {firstItem}–{lastItem} de {totalItems} chamados
      </span>
    <div className="pagination-controls">
        <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
        >
            <ChevronLeft size={18} />
        </button>

        <span className="pagination-current">
            {currentPage}
        </span>

        <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Próxima página"
        >
            <ChevronRight size={18} />
        </button>
        </div>

    </div>
  );
}

export default Pagination;
