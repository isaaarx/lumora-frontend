import { 
  Send, 
  SlidersHorizontal, 
  ArrowDown, 
  Archive, 
  Clock, 
  Play,
  Check,

} from 'lucide-react';
import { useState } from 'react';

import Button from '../components/Button/Button';
import StatCard from '../components/Card/StatCard';
import StatusBadge from '../components/StatusBadge/StatusBadge';
import PriorityBadge from '../components/PriorityBadge/PriorityBadge';
import Table from '../components/Table/Table';
import tickets from '../mocks/tickets';
import ChatInput from '../components/ChatInput/ChatInput';
import SearchInput from '../components/SearchInput/SearchInput';

function ComponentShowcase() {
  const totalTickets = tickets.length;
  
  const openTickets = tickets.filter(
    (ticket) => ticket.status === 'Aberto'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === 'Em andamento'
  ).length;

  const solvedTickets = tickets.filter(
    (ticket) => ticket.status === 'Resolvido'
  ).length;

  const [message, setMessage] = useState('');

  const [search, setSearch] = useState('');

  return (
    <main>
      <h1>Componentes Lumora</h1>
      <p>Teste de componentes reutilizáveis</p>

      <section>
        <h2>Button</h2>
        <Button icon={Send} iconOnly />

        <Button
          icon={ArrowDown}
          iconOnly
          className="button-scroll"
        />

        <Button
          icon={SlidersHorizontal}
          iconOnly
          variant="outline"
          className="button-filter"
          iconSize={22}
        />

        <Button variant="outline">
          Visualizar
        </Button>
      </section>

      <section>
        <h2>StatCard</h2>

        <StatCard
          icon={Archive}
          value={totalTickets}
          label="Total"
        />
        <StatCard
          icon={Clock}
          value={openTickets}
          label="Abertos"
        />
        <StatCard
          icon={Play}
          value={inProgressTickets}
          label="Em andamento"
        />
        <StatCard
          icon={Check}
          value={solvedTickets}
          label="Resolvidos"
        />
      </section>

      <section>
        <h2>StatusBadge</h2>

        <StatusBadge 
          status="Aberto"
        />

        <StatusBadge 
          status="Em andamento"
        />

        <StatusBadge 
          status="Resolvido"
        />
      </section>

      <section>
        <h2>PriorityBadge</h2>

        <PriorityBadge 
          priority="Baixa"
        />

        <PriorityBadge 
          priority="Média"
        />

        <PriorityBadge 
          priority="Alta"
        />
      </section>

      <section>
        <h2>Table</h2>

        <Table tickets={tickets} />
      </section>

      <section>
        <h2>ChatInput</h2>

        <ChatInput
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </section>

      <section>
        <h2>SearchInput</h2>
        
        <SearchInput 
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>
    </main>
  );
}

export default ComponentShowcase;
