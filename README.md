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
CHAT_BACKEND=real CHAT_RESPONSE_MODE=excerpts CHAT_CHARACTER_SOURCE=fixtures python -m uvicorn src.api.app:app --port 8000
```

Inicie `npm run dev` na raiz do Lumora. O Vite encaminha `/api` para `http://127.0.0.1:8000`. Para outra porta, configure `VITE_API_PROXY` no ambiente do Vite. Em produção, sirva `dist/` e encaminhe `/api` ao FastAPI na mesma origem. As credenciais do GLPI e do Gemini ficam no servidor.

Abra `http://localhost:5173`, clique no nome de um técnico na tela inicial e digite uma pergunta no campo inferior. Por exemplo, pergunte “Como configuro a VPN?”, escolha o sistema operacional se o chat pedir esclarecimento e veja os trechos com título, ID e referência. A consulta usa os artigos publicados e o MiniLM, sem Gemini. Se os técnicos não carregarem, confira se a API está acessível na porta 8000 e se o diretório GLPI do laboratório está disponível. Para exercitar estados simulados, use `CHAT_BACKEND=mock` no backend.

Se o diretório GLPI estiver indisponível, acrescente `CHAT_CHARACTER_SOURCE=fixtures` ao comando da API. O servidor oferecerá Ana, Bruno e Carla como técnicos fictícios e continuará consultando o índice de artigos publicado. A `.env` local do backend pode guardar essas opções; não coloque credenciais no frontend.

Os trechos encontrados não são uma resposta elaborada por IA. A lista de chamados e as telas de edição continuam com fixtures locais.

O backend real autoriza a conversa pelo cookie HttpOnly. Ao recarregar a aba, o cliente consulta a sessão lembrada e o servidor pode retomar o contexto. A API atual não devolve a transcrição anterior. Ao iniciar outro chat do mesmo técnico, a conversa anterior fica disponível para leitura na aba. Trocar de técnico limpa essa lista.

As telas de chamados usam fixtures locais. A API de conversa não expõe rotas de listagem, edição de prioridade ou edição de status de chamados.
