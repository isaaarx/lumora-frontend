const ticketDetails = {
  1042: {
    openedAt: '18/11/2026 às 14:32',
    requester: 'Isabela Oliveira',
    description:
      'Minha impressora não está funcionando desde hoje de manhã. Já tentei reiniciar, mas o erro continua aparecendo na tela. A luz de Wi-Fi fica piscando e o computador não reconhece o dispositivo.\n\nPreciso da ajuda de vocês o mais rápido possível, por favor!',
  },
};

// Dados de demonstração enquanto a API de detalhes do chamado não está integrada.
export function getTicketDetails(ticket) {
  return ticketDetails[ticket.id] || {
    openedAt: 'Não informado no protótipo',
    requester: 'Não informado no protótipo',
    description: 'Descrição não disponível no protótipo.',
  };
}

export default ticketDetails;
