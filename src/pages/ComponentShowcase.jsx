import { Send, SlidersHorizontal, ArrowDown} from 'lucide-react';
import Button from '../components/Button/Button';

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
    </main>
  );
}

export default ComponentShowcase;
