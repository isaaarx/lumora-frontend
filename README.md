# Lumora — Front-end

Interface do sistema Lumora, desenvolvida com React e Vite.

## Executar localmente

```bash
npm ci
npm run dev
```

Verificações disponíveis:

```bash
npm test
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

## Conversa com o backend do Squad 13

Com o ambiente do [backend](https://github.com/Arthurbatalha/Squad-13-agente) ativo, execute na raiz dele:

```bash
CHAT_BACKEND=real python -m uvicorn src.api.app:app --port 8000
```

Inicie `npm run dev` na raiz do Lumora. O Vite encaminha `/api` para `http://127.0.0.1:8000`. Para outra porta, configure `VITE_API_PROXY` no ambiente do Vite. Em produção, sirva `dist/` e encaminhe `/api` ao FastAPI na mesma origem. As credenciais do GLPI e do Gemini ficam no servidor.

Escolha um técnico e pergunte “Como configuro a VPN?”. Selecione o sistema na resposta de esclarecimento. Com o índice e o provedor configurados, a conversa exibe a resposta e as fontes. Para exercitar a interface com dados simulados, use `CHAT_BACKEND=mock` no backend.

O backend real autoriza a conversa pelo cookie HttpOnly. Ao recarregar a aba, o cliente consulta a sessão lembrada e o servidor pode retomar o contexto. A API atual não devolve a transcrição anterior. Ao iniciar outro chat do mesmo técnico, a conversa anterior fica disponível para leitura na aba. Trocar de técnico limpa essa lista.

As telas de chamados usam fixtures locais. A API de conversa não expõe rotas de listagem, edição de prioridade ou edição de status de chamados.
