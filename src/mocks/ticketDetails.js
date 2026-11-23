const ticketDetails = {
  1042: {
    openedAt: '18/11/2026 às 14:32',
    requester: 'Isabela Oliveira',
    description:
      'Minha impressora não está funcionando desde hoje de manhã. Já tentei reiniciar, mas o erro continua aparecendo na tela. A luz de Wi-Fi fica piscando e o computador não reconhece o dispositivo.\n\nPreciso da ajuda de vocês o mais rápido possível, por favor!',
    history: [
      {
        type: 'status',
        title: 'Status alterado para Em andamento',
        date: '18/11/2026 às 15:10',
        author: 'Suporte Lumora',
      },
      {
        type: 'priority',
        title: 'Prioridade alterada para Alta',
        date: '18/11/2026 às 15:05',
        author: 'Suporte Lumora',
      },
      {
        type: 'status',
        title: 'Status alterado para Aberto',
        date: '18/11/2026 às 14:32',
        author: 'Isabela Oliveira',
      },
    ],
  },
};

export function getTicketDetails(ticket) {
  return (
    ticketDetails[ticket.id] || {
      openedAt: 'Não informado no protótipo',
      requester: 'Não informado no protótipo',
      description: 'Descrição não disponível no protótipo.',
      history: [],
    }
  );
}

export default ticketDetails;
