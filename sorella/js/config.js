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
    whatsapp: '[WHATSAPP_NUMBER]',   // 55 + DDD + número, só dígitos
    email: '[EMAIL]',
    endereco: '[ENDERECO]',          // deixe '' se a loja for só online
    cnpj: '[CNPJ]',
    horarioAtendimento: '[HORARIO_ATENDIMENTO]'
  },

  // Barra fina do topo. Só benefícios CONFIRMADOS. Lista vazia = barra oculta.
  beneficios: ['[BENEFICIO_01]', '[BENEFICIO_02]', '[BENEFICIO_03]'],

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
    { rotulo: 'Vestidos', filtro: 'vestidos', foto: './assets/images/categoria-vestidos.webp', alt: 'Modelo usando vestido longo da loja' },
    { rotulo: 'Conjuntos', filtro: 'conjuntos', foto: './assets/images/categoria-conjuntos.webp', alt: 'Modelo usando conjunto da loja' },
    { rotulo: 'Novidades', filtro: 'novidades', foto: './assets/images/categoria-novidades.webp', alt: 'Peças recém-chegadas na boutique' },
    { rotulo: 'Mais vendidos', filtro: 'mais-vendidos', foto: './assets/images/categoria-mais-vendidos.webp', alt: 'Peças mais procuradas da loja' }
  ],

  // Condições comerciais exibidas nos cards. Só preencha se confirmadas.
  parcelamento: '',                  // ex.: 'em até 3x sem juros' — vazio = não exibe

  // PRODUTOS — DEMONSTRAÇÃO. Substitua pelos dados reais.
  // preco / precoAnterior: número (ex.: 189.9) ou '[PRECO]'.
  // categorias: ids dos filtros acima. esgotado: true mostra "Indisponível".
  produtosDemonstracao: true,
  produtos: [
    {
      id: 'p01', nome: 'Conjunto Tons Naturais', foto: './assets/images/produto-01.webp',
      alt: 'Modelo usando conjunto verde-oliva', preco: '[PRECO]', precoAnterior: null,
      categorias: ['conjuntos', 'novidades', 'mais-vendidos', 'tons-naturais'],
      cores: [
        { nome: 'Verde-oliva', hex: '#7E7C55' },
        { nome: 'Marrom', hex: '#684638' },
        { nome: 'Bege', hex: '#D6C3A7' },
        { nome: 'Preto', hex: '#1E1E1E' }
      ],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p02', nome: 'Vestido Longo Preto', foto: './assets/images/produto-02.webp',
      alt: 'Modelo usando vestido longo preto', preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'novidades'],
      cores: [{ nome: 'Preto', hex: '#1E1E1E' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p03', nome: 'Vestido Longo Estampa Botânica', foto: './assets/images/produto-03.webp',
      alt: 'Modelo usando vestido longo com estampa botânica', preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'novidades', 'tons-naturais'],
      cores: [{ nome: 'Estampa botânica', hex: '#5E6B4A' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p04', nome: 'Conjunto Estampa Botânica', foto: './assets/images/produto-04.webp',
      alt: 'Modelo usando conjunto com estampa botânica', preco: '[PRECO]', precoAnterior: null,
      categorias: ['conjuntos', 'tons-naturais'],
      cores: [{ nome: 'Estampa botânica', hex: '#5E6B4A' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: false
    },
    {
      id: 'p05', nome: 'Vestido Estampado', foto: './assets/images/produto-05.webp',
      alt: 'Modelo usando vestido estampado', preco: '[PRECO]', precoAnterior: null,
      categorias: ['vestidos', 'mais-vendidos'],
      cores: [{ nome: 'Estampado', hex: '#A2A078' }],
      tamanhos: '[TAMANHOS]', link: '', esgotado: true   // demonstração do estado "Indisponível"
    },
    {
      id: 'p06', nome: 'Conjunto Preto', foto: './assets/images/produto-06.webp',
      alt: 'Modelo usando conjunto preto', preco: '[PRECO]', precoAnterior: null,
      categorias: ['conjuntos', 'mais-vendidos'],
      cores: [{ nome: 'Preto', hex: '#1E1E1E' }],
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
    alt: 'Campanha com peças em verde-oliva, marrom, bege e estampa botânica',
    botao: 'Ver a coleção',
    filtro: 'tons-naturais'          // filtro aplicado na vitrine ao clicar
  },

  // COMPLETE O LOOK — DEMONSTRAÇÃO. produtos: ids da lista acima.
  looks: [
    { titulo: 'Look tons naturais', foto: './assets/images/look-01.webp', alt: 'Modelo com look em tons naturais', produtos: ['p01', 'p03'] },
    { titulo: 'Look noite', foto: './assets/images/look-02.webp', alt: 'Modelo com look preto', produtos: ['p02', 'p06'] }
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
    alt: 'Ambiente da boutique com iluminação quente'
  },

  // INSTAGRAM — imagens cadastradas manualmente (sem API).
  // link: URL da publicação. Vazio = abre o perfil.
  instagramPosts: [
    { foto: './assets/images/instagram-01.webp', alt: '[ALT_POST_01]', link: '' },
    { foto: './assets/images/instagram-02.webp', alt: '[ALT_POST_02]', link: '' },
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
