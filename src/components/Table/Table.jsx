import { useState } from 'react';

import './Table.css';

import Button from '../Button/Button';
import StatusBadge from '../StatusBadge/StatusBadge';
import PriorityBadge from '../PriorityBadge/PriorityBadge';
import Pagination from '../Pagination/Pagination';

function Table({ tickets }) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  // Organiza os chamados, deixando os resolvidos no final.
  const sortedTickets = [...tickets].sort((a, b) => {
    if (a.status === 'Resolvido' && b.status !== 'Resolvido') return 1;
    if (a.status !== 'Resolvido' && b.status === 'Resolvido') return -1;
    return 0;
  });

  // Calcula quais chamados serão exibidos na página atual.
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentTickets = sortedTickets.slice(startIndex, endIndex);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Assunto</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.protocol}</td>
                <td>{ticket.subject}</td>
                <td>
                  <StatusBadge status={ticket.status} />
                </td>
                <td>
                  <PriorityBadge priority={ticket.priority} />
                </td>
                <td>
                  <Button variant="outline">Visualizar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={sortedTickets.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Table;

