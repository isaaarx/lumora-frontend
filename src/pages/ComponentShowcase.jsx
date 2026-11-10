import { 
  Send, 
  SlidersHorizontal, 
  ArrowDown, 
  Archive, 
  Clock, 
  Play, 
  Check } from 'lucide-react';

import Button from '../components/Button/Button';
import StatCard from '../components/Card/StatCard';

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
          value={1}
          label="Total"
        />
        <StatCard
          icon={Clock}
          value={0}
          label="Abertos"
        />
        <StatCard
          icon={Play}
          value={1}
          label="Em andamento"
        />
        <StatCard
          icon={Check}
          value={0}
          label="Resolvidos"
        />
      </section>
    </main>
  );
}

export default ComponentShowcase;
