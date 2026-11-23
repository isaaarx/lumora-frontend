const ticketDetails = {
  1042: {
    openedAt: '18/11/2026 às 14:32',
    requester: 'Isabela Oliveira',
    description:
      'Minha impressora não está funcionando desde hoje de manhã. Já tentei reiniciar, mas o erro continua aparecendo na tela. A luz de Wi-Fi fica piscando e o computador não reconhece o dispositivo.\\n\\nPreciso da ajuda de vocês o mais rápido possível, por favor!',
  },
};

function getInitialHistory(ticket, openedAt) {
  const date = openedAt === 'Não informado no protótipo'
    ? 'Data não informada no protótipo'
    : openedAt;

  const history = [
    {
      type: 'status',
      title: 'Status alterado para Aberto',
      date,
      author: 'Sistema Lumora',
    },
  ];

  if (ticket.status !== 'Aberto') {
    history.push({
      type: 'status',
      title: `Status alterado para ${ticket.status}`,
      date,
      author: 'Suporte Lumora',
    });
  }

  history.push({
    type: 'priority',
    title: `Prioridade alterada para ${ticket.priority}`,
    date,
    author: 'Suporte Lumora',
  });

  return history;
}

export function getTicketDetails(ticket) {
  const details = ticketDetails[ticket.id] || {
    openedAt: 'Não informado no protótipo',
    requester: 'Não informado no protótipo',
    description: 'Descrição não disponível no protótipo.',
  };

  return {
    ...details,
    history: getInitialHistory(ticket, details.openedAt),
  };
}

export default ticketDetails;
