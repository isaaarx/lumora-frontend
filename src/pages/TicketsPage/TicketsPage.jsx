
import { useState } from 'react';
import './TicketsPage.css';

import StatCard from '../../components/Card/StatCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';

import tickets from '../../mocks/tickets';

import {
  Ticket,
  CircleAlert,
  Clock,
  CircleCheck,
  SlidersHorizontal,
} from 'lucide-react';

function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');
  const [showFilters, setShowFilters] = useState(false);

  // Quantidade de chamados
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === 'Aberto'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === 'Em andamento'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === 'Resolvido'
  ).length;

  // Busca e filtros
  const filteredTickets = tickets.filter((ticket) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      ticket.protocol.toLowerCase().includes(search) ||
      ticket.subject.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'Todos' ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'Todas' ||
      ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="tickets-page">

      {/* Cabeçalho */}
      <div className="tickets-header">
        <h1>Meus Chamados</h1>
        <p>Acompanhe e gerencie seus chamados.</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="tickets-stats">
        <StatCard
          icon={Ticket}
          value={totalTickets}
          label="Total de chamados"
        />

        <StatCard
          icon={CircleAlert}
          value={openTickets}
          label="Abertos"
        />

        <StatCard
          icon={Clock}
          value={inProgressTickets}
          label="Em andamento"
        />

        <StatCard
          icon={CircleCheck}
          value={resolvedTickets}
          label="Resolvidos"
        />
      </div>

      {/* Busca e filtro */}
      <div className="tickets-toolbar">
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Pesquisar por protocolo ou assunto..."
        />

        <div className="tickets-filter">
          <Button
            variant="outline"
            icon={SlidersHorizontal}
            iconOnly
            className="button-filter"
            ariaLabel="Filtrar chamados"
            onClick={() => setShowFilters(!showFilters)}
          />

          {showFilters && (
            <div className="tickets-filter-menu">

              {/* Filtro de status */}
              <div className="filter-group">
                <span className="filter-group-title">Status</span>

                {['Todos', 'Aberto', 'Em andamento', 'Resolvido'].map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      className={
                        statusFilter === status
                          ? 'filter-option-active'
                          : ''
                      }
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>

              <div className="filter-divider"></div>

              {/* Filtro de prioridade */}
              <div className="filter-group">
                <span className="filter-group-title">Prioridade</span>

                {['Todas', 'Alta', 'Média', 'Baixa'].map(
                  (priority) => (
                    <button
                      key={priority}
                      type="button"
                      className={
                        priorityFilter === priority
                          ? 'filter-option-active'
                          : ''
                      }
                      onClick={() => setPriorityFilter(priority)}
                    >
                      {priority}
                    </button>
                  )
                )}
              </div>

              {/* Limpar filtros */}
              <div className="filter-divider"></div>

              <button
                type="button"
                className="filter-clear"
                onClick={() => {
                  setStatusFilter('Todos');
                  setPriorityFilter('Todas');
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabela */}
      <Table tickets={filteredTickets} />

    </div>
  );
}

export default TicketsPage;
