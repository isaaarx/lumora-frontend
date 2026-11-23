import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  Hash,
  FileText,
  History,
  Clock,
  Play,
  Check,
  ArrowDown,
  TriangleExclamationPoint,
  CircleExclamationPoint,
} from 'lucide-react';

import './TicketDetailsPage.css';
import Button from '../../components/Button/Button';
import { getTicketDetails } from '../../mocks/ticketDetails';

function TicketDetailsPage({ ticket, onBack, onUpdateTicket }) {
  const details = getTicketDetails(ticket);
  // O histórico deve vir da API. Não criamos eventos fictícios no front-end.
  const history = ticket.history ?? [];

  // Mantém as cores dos seletores alinhadas às cores dos badges da listagem.
  const statusClass = {
    Aberto: 'ticket-status-open',
    'Em andamento': 'ticket-status-in-progress',
    Resolvido: 'ticket-status-solved',
  }[ticket.status] || '';

  const priorityClass = {
    Baixa: 'ticket-priority-low',
    Média: 'ticket-priority-medium',
    Alta: 'ticket-priority-high',
  }[ticket.priority] || '';

  // Reutiliza exatamente os ícones exibidos nos badges da tabela.
  const StatusIcon = {
    Aberto: Clock,
    'Em andamento': Play,
    Resolvido: Check,
  }[ticket.status] || Clock;

  const PriorityIcon = {
    Baixa: ArrowDown,
    Média: TriangleExclamationPoint,
    Alta: CircleExclamationPoint,
  }[ticket.priority] || ArrowDown;

  function handleChange(field, value) {
    if (ticket[field] === value) return;

    // Na integração, este callback deverá chamar o endpoint de atualização
    // e atualizar a tela com o chamado retornado pelo back-end.
    onUpdateTicket({
      ...ticket,
      [field]: value,
    });
  }

  return (
    <section className="ticket-details-page">
      <div className="ticket-details-heading">
        <div className="ticket-details-title-group">
          <Button
            variant="outline"
            icon={ArrowLeft}
            className="ticket-back-button"
            onClick={onBack}
          >
            Voltar para a lista
          </Button>

          <div className="ticket-title-row">
            <div>
              <h1>Chamado {ticket.protocol}</h1>
              <p>{ticket.subject}</p>
            </div>

            <div className="ticket-edit-fields">
              <label className={`ticket-select-card ticket-status-select ${statusClass}`}>
                <StatusIcon size={25} aria-hidden="true" />
                <span>
                  <small>Status</small>
                  <select
                    value={ticket.status}
                    onChange={(event) => handleChange('status', event.target.value)}
                    aria-label="Alterar status do chamado"
                  >
                    <option>Aberto</option>
                    <option>Em andamento</option>
                    <option>Resolvido</option>
                  </select>
                </span>
              </label>

              <label className={`ticket-select-card ticket-priority-select ${priorityClass}`}>
                <PriorityIcon size={25} aria-hidden="true" />
                <span>
                  <small>Prioridade</small>
                  <select
                    value={ticket.priority}
                    onChange={(event) => handleChange('priority', event.target.value)}
                    aria-label="Alterar prioridade do chamado"
                  >
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                  </select>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="ticket-metadata-card">
        <div className="ticket-metadata-item">
          <span className="ticket-metadata-icon"><CalendarDays size={25} /></span>
          <div>
            <small>Data de abertura</small>
            <strong>{details.openedAt}</strong>
          </div>
        </div>

        <div className="ticket-metadata-item">
          <span className="ticket-metadata-icon"><UserRound size={25} /></span>
          <div>
            <small>Solicitante</small>
            <strong>{details.requester}</strong>
          </div>
        </div>

        <div className="ticket-metadata-item">
          <span className="ticket-metadata-icon"><Hash size={28} /></span>
          <div>
            <small>Protocolo</small>
            <strong>{ticket.protocol}</strong>
          </div>
        </div>
      </div>

      <section className="ticket-description-card">
        <h2><FileText size={25} /> Descrição do chamado</h2>
        <p>{details.description}</p>
      </section>

      <section className="ticket-history-section">
        <h2><History size={24} /> Atualizações</h2>

        {history.length > 0 ? (
          <div className="ticket-history-list">
            {history.map((item, index) => {
              // O ícone do evento acompanha o novo valor, usando os mesmos
              // ícones dos badges de status e prioridade da tabela.
              const eventValue = item.value ?? item.status ?? item.priority ?? item.title ?? '';

              const statusHistoryIcons = {
                Aberto: Clock,
                'Em andamento': Play,
                Resolvido: Check,
              };

              const priorityHistoryIcons = {
                Baixa: ArrowDown,
                Média: TriangleExclamationPoint,
                Alta: CircleExclamationPoint,
              };

              const isPriorityEvent = item.type === 'priority';
              const iconMap = isPriorityEvent ? priorityHistoryIcons : statusHistoryIcons;
              const matchedValue = Object.keys(iconMap).find((value) => eventValue.includes(value));
              const Icon = iconMap[matchedValue] || (isPriorityEvent ? ArrowDown : Clock);

              return (
                <article className="ticket-history-item" key={item.id ?? `${item.type}-${index}`}>
                  <span className="ticket-history-icon"><Icon size={24} /></span>
                  <div className="ticket-history-content">
                    <strong>{item.title}</strong>
                    <small>{item.date} <span>•</span> por {item.author}</small>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="ticket-history-empty">Nenhuma atualização registrada.</p>
        )}
      </section>
    </section>
  );
}

export default TicketDetailsPage;
