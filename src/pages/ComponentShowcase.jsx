import { 
  Send, 
  SlidersHorizontal, 
  ArrowDown, 
  Archive, 
  Clock, 
  Play,
  Check,
  CircleExclamationPoint,
  TriangleExclamationPoint,
  ArrowDown,
} from 'lucide-react';

import Button from '../components/Button/Button';
import StatCard from '../components/Card/StatCard';
import StatusBadge from '../components/StatusBadge/StatusBadge';
import PriorityBadge from '../components/PriorityBadge/PriorityBadge';

function ComponentShowcase() {
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

        <Button variant="primary">
          Confirmar
        </Button>

        <Button variant="outline">
          Cancelar
        </Button>

        <Button variant="outline">
          Visualizar
        </Button>
      </section>

      <section>
        <h2>StatCard</h2>

        <StatCard
          icon={Archive}
          value={0}
          label="Total"
        />
        <StatCard
          icon={Clock}
          value={0}
          label="Abertos"
        />
        <StatCard
          icon={Play}
          value={0}
          label="Em andamento"
        />
        <StatCard
          icon={Check}
          value={0}
          label="Resolvidos"
        />
      </section>

      <section>
        <h2>StatusBadge</h2>

        <StatusBadge 
          icon={Clock}
          status="Aberto"
        />

        <StatusBadge 
          icon={Play}
          status="Em andamento"
        />

        <StatusBadge 
          icon={Check}
          status="Resolvido"
        />
      </section>

      <section>
        <h2>PriorityBadge</h2>

        <PriorityBadge 
          icon={ArrowDown}
          priority="Baixa"
        />

        <PriorityBadge 
          icon={TriangleExclamationPoint}
          priority="Média"
        />

        <PriorityBadge 
          icon={CircleExclamationPoint}
          priority="Alta"
        />
      </section>
    </main>
  );
}

export default ComponentShowcase;
