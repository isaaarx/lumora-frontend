const chats = [
  {
    id: 1,
    title: 'Diagnóstico de impressora',
    pinned: true,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Minha impressora não está funcionando.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Olá! Vamos tentar resolver isso. Sua impressora está ligada e conectada ao computador?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Sim, está ligada, mas aparece como offline.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Entendi! Verifique se a impressora e o computador estão conectados à mesma rede Wi-Fi. Depois, tente reiniciar a impressora.',
      },
    ],
  },

  {
    id: 2,
    title: 'Análise de problemas de rede',
    pinned: true,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Estou sem acesso à internet no computador.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Vamos verificar! Outros dispositivos também estão sem conexão ou o problema acontece apenas nesse computador?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Apenas nesse computador. Meu celular e o computador de outra pessoa estão funcionando normalmente.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Entendi! Isso indica que o problema pode estar relacionado às configurações de rede desse computador. Vamos começar verificando a conexão Wi-Fi ou o cabo de rede.',
      },
      {
        id: 5,
        sender: 'user',
        message: 'Estou conectado pelo Wi-Fi.',
      },
      {
        id: 6,
        sender: 'lumi',
        message: 'Certo! Clique no ícone de rede próximo ao relógio do computador. Verifique se sua rede aparece como conectada.',
      },
      {
        id: 7,
        sender: 'user',
        message: 'Aparece conectada, mas diz que não tem acesso à internet.',
      },
      {
        id: 8,
        sender: 'lumi',
        message: 'Vamos tentar executar o diagnóstico de rede. Nas configurações do computador, procure a opção de solução de problemas de rede e execute a verificação.',
      },
      {
        id: 9,
        sender: 'user',
        message: 'Executei, mas ele não encontrou nenhum problema.',
      },
      {
        id: 10,
        sender: 'lumi',
        message: 'Tudo bem! Vamos verificar se o computador está recebendo um endereço IP corretamente. Você consegue abrir o Prompt de Comando?',
      },
      {
        id: 11,
        sender: 'user',
        message: 'Sim, consegui abrir.',
      },
      {
        id: 12,
        sender: 'lumi',
        message: 'Ótimo! Digite ipconfig e pressione Enter. Procure o adaptador de rede sem fio e verifique se ele apresenta um endereço IPv4.',
      },
      {
        id: 13,
        sender: 'user',
        message: 'Aparece um endereço IPv4 começando com 192.168.',
      },
      {
        id: 14,
        sender: 'lumi',
        message: 'Isso significa que o computador recebeu um endereço da rede local. Vamos testar agora se ele consegue alcançar um endereço externo.',
      },
      {
        id: 15,
        sender: 'user',
        message: 'Como faço esse teste?',
      },
      {
        id: 16,
        sender: 'lumi',
        message: 'No mesmo Prompt de Comando, digite ping 8.8.8.8 e pressione Enter. Observe se aparecem respostas ou mensagens de tempo esgotado.',
      },
      {
        id: 17,
        sender: 'user',
        message: 'Apareceram quatro mensagens de tempo esgotado.',
      },
      {
        id: 18,
        sender: 'lumi',
        message: 'Entendi. Como outros dispositivos estão funcionando, pode existir alguma restrição ou falha de configuração nesse computador. Recomendo encaminhar o caso à equipe de TI para uma análise mais detalhada.',
      },
      {
        id: 19,
        sender: 'user',
        message: 'Certo. Obrigada pela ajuda!',
      },
      {
        id: 20,
        sender: 'lumi',
        message: 'Por nada! Se precisar de mais alguma coisa, estarei por aqui para ajudar.',
      },
    ],
  },

  {
    id: 3,
    title: 'Computador muito lento',
    pinned: false,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Meu computador está demorando muito para abrir os programas.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Isso pode estar relacionado à memória ou ao excesso de programas em execução. Você percebe lentidão desde que liga o computador?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Sim, principalmente quando inicio o sistema.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Podemos verificar os programas que iniciam automaticamente e o uso de memória.',
      },
    ],
  },

  {
    id: 4,
    title: 'Problema ao acessar o sistema',
    pinned: false,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Não estou conseguindo acessar o sistema da empresa.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Qual mensagem aparece quando você tenta fazer login?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Aparece uma mensagem dizendo que a senha está incorreta.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Verifique se o Caps Lock está ativado e confirme se está utilizando suas credenciais corretas.',
      },
    ],
  },

  {
    id: 5,
    title: 'Configuração de e-mail',
    pinned: false,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Preciso configurar meu e-mail corporativo no computador.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Claro! Você está utilizando qual aplicativo para acessar seu e-mail?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Estou utilizando o Outlook.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Perfeito! Será necessário adicionar sua conta corporativa e inserir as credenciais de acesso fornecidas pela empresa.',
      },
    ],
  },

  {
    id: 6,
    title: 'Instalação de programa',
    pinned: false,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Preciso instalar um programa para realizar minhas atividades.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Qual programa você precisa instalar?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Preciso do Microsoft Excel.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Entendi! A instalação de softwares deve seguir as permissões e os procedimentos de TI da empresa. Posso ajudar a encaminhar essa solicitação.',
      },
    ],
  },

  {
    id: 7,
    title: 'Erro ao conectar à internet',
    pinned: false,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'A conexão com a internet cai várias vezes durante o dia.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Isso acontece em horários específicos ou de forma aleatória?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Acontece de forma aleatória.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Podemos investigar a estabilidade da conexão e verificar possíveis falhas no roteador ou na rede.',
      },
    ],
  },

  {
    id: 8,
    title: 'Solicitação de suporte técnico',
    pinned: false,
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'Preciso de ajuda para conectar um segundo monitor.',
      },
      {
        id: 2,
        sender: 'lumi',
        message: 'Claro! Você já conectou o cabo HDMI ou DisplayPort ao computador e ao monitor?',
      },
      {
        id: 3,
        sender: 'user',
        message: 'Sim, mas o segundo monitor não aparece.',
      },
      {
        id: 4,
        sender: 'lumi',
        message: 'Vamos verificar as configurações de tela do sistema operacional e identificar se o monitor está sendo reconhecido.',
      },
    ],
  },
];

export default chats;