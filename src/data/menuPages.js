// Conteúdo de exemplo para estruturar as páginas enquanto não há uma API.
export const menuPages = {
  sessoes: {
    title: 'Sessões',
    eyebrow: 'Agenda da campanha',
    icon: 'event',
    description: 'Organize os encontros, acompanhe presenças e revisite o que aconteceu na mesa.',
    stats: [
      { label: 'Próximas sessões', value: '2', icon: 'event_available' },
      { label: 'Sessões realizadas', value: '12', icon: 'history' },
      { label: 'Participantes', value: '5', icon: 'groups' },
    ],
    groups: [
      {
        title: 'Próximas sessões',
        subtitle: 'Encontros planejados pelo grupo',
        items: [
          {
            title: 'O segredo da torre',
            meta: 'Sábado, 14 nov. · 19h',
            description: 'Exploração da torre abandonada e encontro com o guardião.',
            icon: 'event',
            tag: 'Confirmada',
            color: 'positive',
          },
          {
            title: 'Caminhos de Valdora',
            meta: 'Sábado, 21 nov. · 19h',
            description: 'Planejamento da viagem e preparação dos suprimentos.',
            icon: 'event',
            tag: 'Planejada',
            color: 'primary',
          },
        ],
      },
      {
        title: 'Registros recentes',
        subtitle: 'Resumo das últimas aventuras',
        items: [
          {
            title: 'A chegada à cidade',
            meta: 'Sessão 12 · 31 out.',
            description: 'O grupo encontrou pistas sobre a guilda dos corvos.',
            icon: 'description',
            tag: 'Concluída',
            color: 'grey-7',
          },
        ],
      },
    ],
  },
  campanhas: {
    title: 'Campanhas e personagens',
    eyebrow: 'Seu grupo',
    icon: 'groups',
    description: 'Acompanhe campanhas, participantes, fichas e a evolução dos personagens.',
    stats: [
      { label: 'Campanhas ativas', value: '1', icon: 'auto_stories' },
      { label: 'Personagens', value: '5', icon: 'person' },
      { label: 'Nível médio', value: '4', icon: 'trending_up' },
    ],
    groups: [
      {
        title: 'Campanhas',
        subtitle: 'Histórias em andamento',
        items: [
          {
            title: 'Crônicas de Valdora',
            meta: 'Fantasia · 5 participantes',
            description: 'Uma jornada pelas ruínas de um reino esquecido.',
            icon: 'auto_stories',
            tag: 'Ativa',
            color: 'positive',
          },
        ],
      },
      {
        title: 'Personagens',
        subtitle: 'Heróis do grupo',
        items: [
          {
            title: 'Lyra Ventosul',
            meta: 'Elfa · Patrulheira · Nível 4',
            description: 'Exploradora que conhece os caminhos da floresta.',
            icon: 'person',
            tag: 'Jogadora',
            color: 'primary',
          },
          {
            title: 'Borin Marteloferro',
            meta: 'Anão · Guerreiro · Nível 4',
            description: 'Defensor do grupo e guardião de antigas promessas.',
            icon: 'person',
            tag: 'Jogador',
            color: 'primary',
          },
        ],
      },
    ],
  },
  biblioteca: {
    title: 'Biblioteca',
    eyebrow: 'Conhecimento da campanha',
    icon: 'menu_book',
    description: 'Reúna anotações, mapas, personagens, locais, itens e histórias do seu mundo.',
    stats: [
      { label: 'Anotações', value: '18', icon: 'notes' },
      { label: 'Locais', value: '7', icon: 'place' },
      { label: 'NPCs', value: '9', icon: 'face' },
    ],
    groups: [
      {
        title: 'Explorar biblioteca',
        subtitle: 'Conteúdo organizado por tema',
        items: [
          {
            title: 'Anotações e wiki',
            meta: '18 entradas',
            description: 'Pistas, acontecimentos e conhecimento descoberto.',
            icon: 'notes',
            tag: 'Wiki',
            color: 'primary',
          },
          {
            title: 'Mapas e locais',
            meta: '7 locais',
            description: 'Regiões conhecidas e lugares importantes.',
            icon: 'map',
            tag: 'Mundo',
            color: 'primary',
          },
          {
            title: 'NPCs e itens',
            meta: '9 personagens · 6 itens',
            description: 'Aliados, rivais e objetos encontrados pelo grupo.',
            icon: 'inventory_2',
            tag: 'Coleção',
            color: 'primary',
          },
        ],
      },
    ],
  },
  missoes: {
    title: 'Missões',
    eyebrow: 'Jornada do grupo',
    icon: 'flag',
    description: 'Visualize objetivos, progresso, recompensas e o histórico das missões.',
    stats: [
      { label: 'Em andamento', value: '3', icon: 'pending_actions' },
      { label: 'Concluídas', value: '8', icon: 'task_alt' },
      { label: 'Recompensas', value: '2', icon: 'workspace_premium' },
    ],
    groups: [
      {
        title: 'Em andamento',
        subtitle: 'Objetivos atuais',
        items: [
          {
            title: 'O segredo da torre',
            meta: 'Missão principal · 2 de 4 objetivos',
            description: 'Investigar a origem das luzes na torre ao norte.',
            icon: 'flag',
            tag: 'Principal',
            color: 'secondary',
          },
          {
            title: 'A carta desaparecida',
            meta: 'Missão secundária · 1 de 3 objetivos',
            description: 'Encontrar a mensagem perdida antes da próxima lua.',
            icon: 'outlined_flag',
            tag: 'Secundária',
            color: 'primary',
          },
        ],
      },
      {
        title: 'Histórico',
        subtitle: 'Conquistas recentes',
        items: [
          {
            title: 'Os portões de Valdora',
            meta: 'Concluída na sessão 11',
            description: 'O grupo conquistou a confiança da guarda local.',
            icon: 'task_alt',
            tag: 'Concluída',
            color: 'positive',
          },
        ],
      },
    ],
  },
  votacoes: {
    title: 'Votações',
    eyebrow: 'Decisões do grupo',
    icon: 'how_to_vote',
    description: 'Centralize escolhas sobre datas, logística e rumos da aventura.',
    stats: [
      { label: 'Abertas', value: '2', icon: 'how_to_vote' },
      { label: 'Encerradas', value: '6', icon: 'done_all' },
      { label: 'Votos pendentes', value: '1', icon: 'notifications_active' },
    ],
    groups: [
      {
        title: 'Votações abertas',
        subtitle: 'Escolhas aguardando o grupo',
        items: [
          {
            title: 'Data da próxima sessão',
            meta: 'Encerra em 10 nov. · 3 de 5 votos',
            description: 'Escolha o melhor dia para o próximo encontro.',
            icon: 'calendar_month',
            tag: 'Aberta',
            color: 'positive',
          },
          {
            title: 'Próximo destino',
            meta: 'Encerra em 14 nov. · 2 de 5 votos',
            description: 'O grupo seguirá para a torre ou para o porto?',
            icon: 'alt_route',
            tag: 'Aberta',
            color: 'positive',
          },
        ],
      },
      {
        title: 'Decisões anteriores',
        subtitle: 'Resultados recentes',
        items: [
          {
            title: 'Formato da sessão',
            meta: 'Encerrada em 30 out.',
            description: 'Resultado: encontro presencial.',
            icon: 'done_all',
            tag: 'Encerrada',
            color: 'grey-7',
          },
        ],
      },
    ],
  },
  ferramentas: {
    title: 'Ferramentas',
    eyebrow: 'Recursos de jogo',
    icon: 'casino',
    description: 'Acesse utilitários para conduzir encontros e preparar aventuras.',
    stats: [
      { label: 'Ferramentas', value: '4', icon: 'build' },
      { label: 'Para a mesa', value: '2', icon: 'sports_esports' },
      { label: 'Para preparar', value: '2', icon: 'edit_note' },
    ],
    groups: [
      {
        title: 'Durante a sessão',
        subtitle: 'Apoio rápido para a mesa',
        items: [
          {
            title: 'Rolador de dados',
            meta: 'Dados de RPG',
            description: 'Espaço reservado para rolagens e histórico de resultados.',
            icon: 'casino',
            tag: 'Em breve',
            color: 'grey-7',
          },
          {
            title: 'Controle de iniciativa',
            meta: 'Combate',
            description: 'Espaço reservado para a ordem de turnos.',
            icon: 'format_list_numbered',
            tag: 'Em breve',
            color: 'grey-7',
          },
        ],
      },
      {
        title: 'Preparação',
        subtitle: 'Ideias para o mestre',
        items: [
          {
            title: 'Temporizador',
            meta: 'Controle de tempo',
            description: 'Espaço reservado para intervalos e desafios cronometrados.',
            icon: 'timer',
            tag: 'Em breve',
            color: 'grey-7',
          },
          {
            title: 'Geradores de conteúdo',
            meta: 'Inspiração',
            description: 'Espaço reservado para nomes, encontros e ideias.',
            icon: 'auto_awesome',
            tag: 'Em breve',
            color: 'grey-7',
          },
        ],
      },
    ],
  },
}
