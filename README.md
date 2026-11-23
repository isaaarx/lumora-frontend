# Lumora — Front-end

Interface do sistema Lumora, desenvolvida com React e Vite.

## Executar localmente

```bash
npm install
npm run dev
```

Verificações disponíveis:

```bash
npm run lint
npm run build
```

## Organização

- `src/components`: componentes reutilizáveis da interface.
- `src/layouts`: estrutura principal e navegação entre telas.
- `src/pages`: telas de chat, lista de chamados e detalhes do chamado.
- `src/mocks`: dados temporários usados para demonstrar a interface.
- `src/assets`: imagens e identidade visual.
- `src/styles`: variáveis e estilos globais.

## Situação da integração

A aplicação ainda utiliza dados locais de demonstração. O estado de chats e chamados é mantido em `MainLayout.jsx` com React state; alterações são perdidas ao atualizar a página. Não há chamadas HTTP nem camada de serviços/API implementada.

Pontos de integração:

- **Chamados:** substituir `src/mocks/tickets.js` e os dados de `src/mocks/ticketDetails.js` pelas respostas da API.
- **Detalhes:** a tela utiliza os campos `id`, `protocol`, `subject`, `status` e `priority` no chamado; os detalhes adicionais exibidos são data de abertura, solicitante e descrição.
- **Status e prioridade:** os seletores já disparam `onUpdateTicket`. Na integração, esse fluxo deve chamar o endpoint de atualização e atualizar a interface com o chamado retornado pelo servidor.
- **Histórico:** a tela espera `ticket.history` como uma lista de eventos. Cada item é exibido com `id` (opcional), `type` (por exemplo, `status` ou `priority`), `title`, `date` e `author`. O histórico deve ser criado e persistido pelo back-end; o front-end não gera eventos fictícios.
- **Chat:** a interface permite enviar mensagens e exibe as mensagens recebidas em `chat.messages`, mas atualmente só adiciona localmente a mensagem do usuário. A resposta da Lumi e a persistência das conversas dependem da integração com o serviço de chat/IA.

Os nomes acima descrevem o formato consumido pela interface. Caso a API utilize outros nomes ou estruturas, façam a conversão em uma camada de serviço/adapter, sem espalhar regras de mapeamento pelos componentes.

## Observações

- Os textos e registros em `src/mocks` são apenas dados de demonstração, não representam dados reais.
- Autenticação, autorização, persistência, regras de negócio e registro de auditoria/histórico devem ser responsabilidade do back-end.
- A interface não deve ser considerada integrada até que as chamadas à API, estados de carregamento/erro e testes com respostas reais estejam implementados.
