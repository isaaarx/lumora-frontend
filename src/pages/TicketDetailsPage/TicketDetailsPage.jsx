import {
  ArrowLeft,
  CalendarDays,
  UserRound,
  Hash,
  FileText,
  History,
  Clock3,
  AlertTriangle,
  Check,
  RefreshCw,
  CircleAlert,
} from 'lucide-react';

import './TicketDetailsPage.css';
import Button from '../../components/Button/Button';
import { getTicketDetails } from '../../mocks/ticketDetails';

function TicketDetailsPage({ ticket, onBack, onUpdateTicket }) {
  const details = getTicketDetails(ticket);
  const history = ticket.history || details.history;

  function handleChange(field, value) {
    const previousValue = ticket[field];

    if (previousValue === value) return;

    const label = field === 'status' ? 'Status' : 'Prioridade';
    const newEntry = {
      type: field,
      title: `${label} alterada para ${value}`,
      date: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).replace(',', ' às'),
      author: 'Suporte Lumora',
    };

    onUpdateTicket({
      ...ticket,
      [field]: value,
      history: [newEntry, ...history],
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
              <label className="ticket-select-card ticket-status-select">
                <Clock3 size={25} />
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

              <label className="ticket-select-card ticket-priority-select">
                <AlertTriangle size={25} />
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
              const Icon = item.type === 'priority'
                ? CircleAlert
                : item.title.includes('Aberto')
                  ? RefreshCw
                  : Check;

              return (
                <article className="ticket-history-item" key={`${item.title}-${index}`}>
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
