/* =============================================================
   SORELLA — CONFIGURAÇÃO DA LOJA
   Edite este arquivo para trocar textos, fotos, produtos, preços,
   links e políticas sem mexer no HTML.
   Regra: valores entre [COLCHETES] são placeholders. Enquanto
   estiverem assim, a página mostra o nome do campo e desativa a
   função correspondente (ex.: botão de WhatsApp).
   ============================================================= */
window.SORELLA_CONFIG = {

  loja: {
    nome: 'Sorella',                 // confirmar nome oficial (vem do @sorella.sorella)
    logo: '',                        // ex.: './assets/images/logo.svg' — vazio = nome em texto
    instagram: 'https://www.instagram.com/sorella.sorella/',
    instagramUsuario: '@sorella.sorella',
    whatsapp: '5521969910844',       // 55 + DDD + número, só dígitos
    email: '[EMAIL]',
    endereco: '[ENDERECO]',          // deixe '' se a loja for só online
    cnpj: '[CNPJ]',
    horarioAtendimento: '[HORARIO_ATENDIMENTO]'
  },

  // Barra fina do topo. Só benefícios CONFIRMADOS. Lista vazia = barra oculta.
  beneficios: [],

  // Categorias: aparecem no menu, nos filtros e nos cards de destaque.
  // "filtro" aplica o filtro na vitrine; "ancora" leva a uma seção da página.
  menu: [
    { rotulo: 'Início', ancora: '#inicio' },
    { rotulo: 'Novidades', filtro: 'novidades' },
    { rotulo: 'Vestidos', filtro: 'vestidos' },
    { rotulo: 'Conjuntos', filtro: 'conjuntos' },
    { rotulo: 'Mais vendidos', filtro: 'mais-vendidos' },
    { rotulo: 'Promoções', filtro: 'promocoes' },
    { rotulo: 'Contato', ancora: '#atendimento' }
  ],

  filtros: [
    { id: 'todos', rotulo: 'Todos' },
    { id: 'novidades', rotulo: 'Novidades' },
    { id: 'vestidos', rotulo: 'Vestidos' },
    { id: 'conjuntos', rotulo: 'Conjuntos' },
    { id: 'mais-vendidos', rotulo: 'Mais vendidos' },
    { id: 'promocoes', rotulo: 'Promoções' }
  ],

  categoriasDestaque: [
    { rotulo: 'Vestidos', filtro: 'vestidos', foto: './assets/images/categoria-vestidos.webp', alt: 'Cliente na loja usando vestido longo verde estampado' },
    { rotulo: 'Conjuntos', filtro: 'conjuntos', foto: './assets/images/categoria-conjuntos.webp', alt: 'Conjuntos cropped com babado e pantalona nas cores preto, marrom, verde-oliva e bege' },
    { rotulo: 'Novidades', filtro: 'novidades', foto: './assets/images/categoria-novidades.webp', alt: 'Arara com vestidos em tons naturais' }, // imagem de ambientação — substituir por foto da loja
    { rotulo: 'Mais vendidos', filtro: 'mais-vendidos', foto: './assets/images/categoria-mais-vendidos.webp', alt: 'Vitrine com vestidos em manequins' } // imagem de ambientação — substituir por foto da loja
  ],

  // Condições comerciais exibidas nos cards. Só preencha se confirmadas.
  parcelamento: '',                  // ex.: 'em até 3x sem juros' — vazio = não exibe

  // PRODUTOS. demo: true = produto de demonstração (mostra o selo "Demonstração").
  // p02, p03, p04 e p06 usam imagens de apresentação (não são peças da loja).
  // preco / precoAnterior: número (ex.: 189.9) ou '[PRECO]'.
  // nota: texto curto exibido abaixo do preço (ex.: condição da campanha).
  // categorias: ids dos filtros acima. esgotado: true mostra "Indisponível".
  produtos: [
    {
      id: 'p01', demo: false, nome: 'Conjunto Cropped Babado + Pantalona Pala', foto: './assets/images/produto-01.webp',
      alt: 'Conjunto cropped com babado e pantalona pala nas cores preto, marrom, verde-oliva e bege',
      preco: 99.00, precoAnterior: null,
      nota: 'Preço da campanha Esquenta Black Friday', // confirmar validade do preço
      categorias: ['conjuntos', 'tons-naturais'],
      cores: [
        { nome: 'Preto', hex: '#1E1E1E' },
        { nome: 'Marrom', hex: '#684638' },
        { nome: 'Verde-oliva', hex: '#7E7C55' },
        { nome: 'Bege', hex: '#D6C3A7' }
      ],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p02', demo: true, nome: 'Vestido Longo Bordado Dourado', foto: './assets/images/produto-02.webp',
      alt: 'Vestido longo dourado com bordado em manequim', preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'novidades'],
      cores: [{ nome: 'Dourado', hex: '#C9A66B' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p03', demo: true, nome: 'Vestido Longo Estampa Botânica', foto: './assets/images/produto-03.webp',
      alt: 'Modelo usando vestido longo verde com estampa floral', preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'novidades', 'tons-naturais'],
      cores: [{ nome: 'Verde floral', hex: '#7A9A4E' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p04', demo: true, nome: 'Vestido de Linho Tons Naturais', foto: './assets/images/produto-04.webp',
      alt: 'Arara com vestidos de linho em off-white, bege, verde-oliva e terracota', preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'tons-naturais'],
      cores: [
        { nome: 'Off-white', hex: '#EFE6D6' },
        { nome: 'Bege', hex: '#CDB89A' },
        { nome: 'Verde-oliva', hex: '#7E7C55' },
        { nome: 'Terracota', hex: '#B5583A' }
      ],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p05', demo: false, nome: 'Vestido Longo Verde Estampado', foto: './assets/images/produto-05.webp', // confirmar nome oficial
      alt: 'Cliente na loja usando vestido longo verde estampado com detalhes dourados e cinto dourado',
      preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'tons-naturais'],
      cores: [{ nome: 'Verde estampado', hex: '#4E7A3E' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p06', demo: true, nome: 'Conjunto Bordado Verde', foto: './assets/images/produto-06.webp',
      alt: 'Conjunto verde com bordado dourado em manequim', preco: '[PRECO]', precoAnterior: null,
      categorias: ['conjuntos', 'mais-vendidos'],
      cores: [{ nome: 'Verde-esmeralda', hex: '#145A4A' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    }
  ],

  // CAMPANHA EDITORIAL — ative/desative ou defina um período (AAAA-MM-DD).
  campanha: {
    ativa: true,
    inicio: '',                      // vazio = sem data de início
    fim: '',                         // vazio = sem data de término
    selo: 'Coleção',
    titulo: 'Tons da natureza',
    texto: 'Verde-oliva, marrom, bege e estampas botânicas em peças para usar do dia à noite.',
    foto: './assets/images/campanha.webp',
    alt: 'Arara com vestidos em tons de bege, verde-oliva e terracota', // imagem de ambientação — substituir por foto da loja
    botao: 'Ver a coleção',
    filtro: 'tons-naturais'          // filtro aplicado na vitrine ao clicar
  },

  // COMPLETE O LOOK. produtos: ids da lista acima. demo: true mostra o selo "Demonstração".
  looks: [
    { titulo: 'Verde com detalhes dourados', demo: false, foto: './assets/images/look-01.webp', alt: 'Cliente na loja com vestido longo verde, cinto e pulseira dourados', produtos: ['p05'] },
    { titulo: 'Um conjunto, quatro cores', demo: false, foto: './assets/images/look-02.webp', alt: 'Conjunto cropped com babado e pantalona pala em preto, marrom, verde-oliva e bege', produtos: ['p01'] }
  ],

  // NOSSA ESSÊNCIA — texto provisório até a loja enviar o texto oficial.
  essencia: {
    provisorio: true,
    titulo: 'Nossa essência',
    texto: [
      '[TEXTO_ESSENCIA] — Texto provisório: uma curadoria de moda feminina para acompanhar a sua rotina com elegância, conforto e personalidade.',
      'Substitua por um texto real sobre o propósito da loja e a relação com as clientes.'
    ],
    foto: './assets/images/essencia.webp',
    alt: 'Boutique com iluminação quente e vestidos em manequins' // imagem de ambientação — substituir por foto da loja
  },

  // INSTAGRAM — imagens cadastradas manualmente (sem API).
  // link: URL da publicação. Vazio = abre o perfil.
  instagramPosts: [
    { foto: './assets/images/instagram-01.webp', alt: 'Post Esquenta Black Friday: conjunto em quatro cores', link: '' },
    { foto: './assets/images/instagram-02.webp', alt: 'Cliente na loja com vestido longo verde estampado', link: '' },
    { foto: './assets/images/instagram-03.webp', alt: '[ALT_POST_03]', link: '' },
    { foto: './assets/images/instagram-04.webp', alt: '[ALT_POST_04]', link: '' },
    { foto: './assets/images/instagram-05.webp', alt: '[ALT_POST_05]', link: '' },
    { foto: './assets/images/instagram-06.webp', alt: '[ALT_POST_06]', link: '' }
  ],

  // CONFIANÇA E ATENDIMENTO — só informações confirmadas.
  atendimento: [
    { id: 'pagamento', titulo: 'Formas de pagamento', texto: '[FORMAS_DE_PAGAMENTO]' },
    { id: 'entrega', titulo: 'Entrega e frete', texto: '[REGRAS_DE_FRETE]' },
    { id: 'trocas', titulo: 'Trocas e devoluções', texto: '[POLITICA_DE_TROCAS]' },
    { id: 'privacidade', titulo: 'Política de privacidade', texto: '[POLITICA_DE_PRIVACIDADE]' },
    { id: 'horario', titulo: 'Atendimento', texto: '[HORARIO_ATENDIMENTO]' },
    { id: 'duvidas', titulo: 'Dúvidas frequentes', texto: '[DUVIDAS_FREQUENTES]' }
  ]
};
