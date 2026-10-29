# Sorella — Landing Page

## Sobre
Landing page de moda feminina para a **Sorella** ([@sorella.sorella](https://www.instagram.com/sorella.sorella/)). Ela apresenta a marca, destaca os produtos e leva a cliente da descoberta ao atendimento. Foi estruturada para evoluir para um e-commerce funcional.
- **Público:** mulheres que buscam elegância acessível, principalmente no celular, vindas do Instagram.
- **CTA principal:** "Conheça a coleção", que leva à vitrine.
- **Conversão atual:** sem checkout conectado, a cliente monta a **Minha seleção** e envia pelo WhatsApp.

## Decisões de projeto
- **Direção visual:** "Elegância natural contemporânea", uma boutique editorial com estrutura de e-commerce.
  - Off-white como fundo.
  - **Marrom `#684638` como cor principal:** títulos, navegação, botões, barra do topo e rodapé.
  - Verde-floresta como cor secundária: rótulos, ícones e a faixa da campanha.
  - Areia e oliva em fundos de apoio.
  - Dourado só em filetes, como a linha antes dos rótulos.
  - Sem gradientes chamativos e com sombras mínimas.
- **Tipografia:**
  - *Sacramento*: fonte manuscrita monolinear, a mais próxima do logotipo da marca entre as do Google Fonts. Usada no nome da loja (cabeçalho, menu e rodapé), no destaque "sua essência." e no título da campanha.
  - *Cormorant Garamond*: títulos de seção.
  - *DM Sans*: textos, navegação e botões.
- **Contraste (WCAG AA):**
  - Marrom sobre off-white ≈ 7,6:1 e off-white sobre marrom (botões) ≈ 7,6:1.
  - Verde-floresta sobre off-white ≈ 11:1.
  - Areia sobre marrom (rodapé) ≈ 4,8:1.
  - Texto `#6A5E55` sobre off-white ≈ 6:1.
  - O oliva `#A2A078` **não** é usado em texto, porque não atinge AA.
- **Composição variada entre seções:**
  - **Hero:** dividido em texto e foto.
  - **Categorias:** grade com legenda editorial.
  - **Vitrine:** filtros e busca.
  - **Campanha:** faixa verde com foto ampla.
  - **Looks:** foto com lista de peças.
  - **Essência:** duas colunas.
  - **Instagram:** mosaico.
  - **Atendimento:** acordeão com card de contato.
- **Honestidade das funções:**
  - Não há carrinho nem checkout fingidos. A "Minha seleção" guarda as peças no navegador e envia a lista pelo WhatsApp.
  - Enquanto o número não estiver configurado, os botões de WhatsApp aparecem **desativados**, com o aviso "WhatsApp em configuração".
  - Não há conta de cliente nem cálculo de frete.
  - O feed do Instagram não é simulado: as imagens são cadastradas manualmente.
- **Referências:** a afroditestore40 (estrutura comercial), a bluv/the-finds (limpeza visual, mobile-first, looks) e a usevitbrand/quem-somos (narrativa) foram usadas como orientação de estrutura, sem copiar layout, textos ou marca. Neste ambiente, o acesso a esses sites e ao Instagram estava bloqueado.

## Imagens enviadas e onde foram usadas
| Imagem enviada | Origem aparente | Onde está |
|---|---|---|
| Post "Esquenta Black Friday" (conjunto em 4 cores, R$ 99,00) | **Sorella (real)** | Produto *Conjunto Cropped Babado + Pantalona Pala*, categoria Conjuntos, look "Um conjunto, quatro cores", Instagram 01 |
| Cliente na loja com vestido longo verde e dourado | **Sorella (real)** | Produto *Vestido Longo Verde Estampado*, categoria Vestidos, look "Verde com detalhes dourados", Instagram 02 |
| Modelo com vestido verde floral (alta resolução) | Não parece ser peça da Sorella | Hero e imagem de compartilhamento (OG), só como ambientação |
| Arara com vestidos em tons naturais | Parece imagem gerada por IA ou de banco | Categoria Novidades, campanha "Tons da natureza" e produto de demonstração *Vestido de Linho Tons Naturais* |
| Vitrine com manequins e vestidos bordados | Parece imagem gerada por IA ou de outra loja | Categoria Mais vendidos, Nossa essência e produtos de demonstração *Vestido Longo Bordado Dourado* e *Conjunto Bordado Verde* |
| Modelo com vestido verde floral | — | Também no produto de demonstração *Vestido Longo Estampa Botânica* |
| Logotipo (foto do perfil) | **Sorella (real)** | Referência da tipografia. É um print de baixa resolução com o anel do Instagram, por isso não foi usado como arquivo de logo. O nome aparece em *Sacramento* até a loja enviar o logo em SVG ou PNG |

A vitrine usa essas imagens **apenas para apresentação do site**. Os quatro produtos de demonstração mantêm o selo "Demonstração" e o preço `[PRECO]`.

Cuidados antes de publicar:
- **Imagens de ambientação:** não representam produtos da loja. Substitua por fotos próprias da Sorella e confirme o direito de uso de cada imagem.
- **Fotos reais da Sorella:** vieram de capturas de tela pequenas (cerca de 280px). Envie os arquivos originais para não perder nitidez.
- **Preço:** o R$ 99,00 é da campanha **Esquenta Black Friday**. O card mostra essa observação (`nota` no `config.js`). Confirme a validade e o preço regular.

## Tecnologias
HTML5, CSS3 e JavaScript puro, sem build e sem dependências. O único recurso externo é o Google Fonts (Cormorant Garamond e DM Sans).

## Estrutura
```
sorella/
├── index.html            estrutura semântica de todas as seções
├── css/style.css         tokens, componentes e seções (mobile first)
├── js/config.js          DADOS DA LOJA: textos, produtos, preços, links, políticas
├── js/script.js          comportamento (menu, busca, filtros, detalhes, seleção…)
├── assets/images/        fotos (placeholders com o nome final de cada arquivo)
├── assets/icons/         favicon.svg (monograma provisório "S", em marrom)
├── README.md
└── .gitignore
```

## Como executar
Abra o `index.html` no navegador com um duplo clique. Opcionalmente, use a extensão "Live Server" do VS Code.

## Como publicar
- **GitHub Pages:** em Settings → Pages, escolha "Deploy from a branch", depois `main` e `/ (root)`. Todos os caminhos são relativos, então funciona em subpasta.
- **Hostinger:** envie o conteúdo desta pasta para o `public_html`. O `index.html` precisa ficar direto no `public_html`. Depois, ative o SSL.

## Personalização (tudo em `js/config.js`)
| O quê | Onde |
|---|---|
| Nome, logo, Instagram, WhatsApp, e-mail, endereço, CNPJ | `loja` |
| Barra de benefícios (lista vazia = barra oculta) | `beneficios` |
| Menu, filtros e categorias em destaque | `menu`, `filtros`, `categoriasDestaque` |
| Produtos (nome, foto, preço, preço anterior, nota, cores, tamanhos, categorias, esgotado) | `produtos`. Use `demo: false` quando o produto for real |
| Parcelamento (só se confirmado) | `parcelamento` |
| Campanha sazonal (liga/desliga e período) | `campanha.ativa`, `campanha.inicio`, `campanha.fim` |
| Complete o look | `looks` (lista de ids de produtos) |
| Nossa essência | `essencia` (mude `provisorio` para `false` com o texto real) |
| Posts do Instagram | `instagramPosts` (foto, descrição e link da publicação) |
| Pagamento, frete, trocas, privacidade, atendimento, dúvidas | `atendimento` |
| Cores e fontes | tokens em `css/style.css` (`:root`) |
| Fotos | substitua os arquivos em `assets/images/` mantendo o nome |

Os comportamentos derivam desses dados:
- **Promoções:** um produto entra no filtro "Promoções" quando tem `precoAnterior` maior que `preco`. Sem promoções, o filtro mostra "Não há promoções ativas no momento".
- **Indisponível:** `esgotado: true` mostra o selo "Indisponível" e desativa o botão "Adicionar à seleção".

## Integrações necessárias para compras reais
1. **Plataforma de e-commerce** (ex.: Nuvemshop, Shopify ou WooCommerce) para catálogo, estoque e páginas de produto. Preencha `link` em cada produto para apontar à página real.
2. **Carrinho e checkout** da plataforma. Eles substituem a "Minha seleção" pelo WhatsApp.
3. **Gateway de pagamento** (cartão, Pix, boleto) e as condições de parcelamento.
4. **Cálculo de frete** (Correios ou transportadora, via plataforma).
5. **Conta de cliente**, se a plataforma oferecer.
6. **Instagram:** opcionalmente, a API oficial (Instagram Graph) para feed automático. Hoje o feed é manual.
7. **Analytics** (GA4, Meta Pixel), se desejado, com os IDs da loja.
8. **Domínio próprio**, para ativar o `canonical`/`og:url` no `<head>`.

## Pendências (dados da loja)
| Placeholder | Onde | O que inserir |
|---|---|---|
| Nome oficial | `loja.nome` | Confirmar se é "Sorella" |
| Logo | `loja.logo` | Arquivo do logotipo em SVG ou PNG com fundo transparente. Hoje aparece o nome em *Sacramento* |
| `[WHATSAPP_NUMBER]` | `loja.whatsapp` | 55 + DDD + número, só dígitos. Libera todos os botões de WhatsApp |
| `[EMAIL]`, `[ENDERECO]`, `[CNPJ]` | `loja` | Dados institucionais (use `''` no endereço se a loja for só online) |
| `[HORARIO_ATENDIMENTO]` | `loja` e `atendimento` | Horário de atendimento |
| `[BENEFICIO_01..03]` | `beneficios` | Só benefícios confirmados (ex.: entrega para todo o Brasil) |
| Produtos de demonstração (`demo: true`) | `produtos` p02, p03, p04, p06 | Nomes, fotos, preços, cores, tamanhos e estoque reais |
| Nome do vestido verde | `produtos` p05 | Confirmar o nome oficial e o preço |
| `[PRECO]` | `produtos[].preco` | Preço de cada produto (número, ex.: `189.9`) |
| `[TAMANHOS]` | `produtos[].tamanhos` | Grade de tamanhos |
| Parcelamento | `parcelamento` | Só se confirmado |
| `[TEXTO_ESSENCIA]` | `essencia.texto` | Texto institucional real |
| `[FORMAS_DE_PAGAMENTO]`, `[REGRAS_DE_FRETE]`, `[POLITICA_DE_TROCAS]`, `[POLITICA_DE_PRIVACIDADE]`, `[DUVIDAS_FREQUENTES]` | `atendimento` | Políticas e informações confirmadas |
| `[ALT_POST_03..06]` | `instagramPosts` | Fotos, descrições e links das publicações (01 e 02 já são posts reais; falta o link de cada publicação) |
| Hero | `assets/images/hero.webp` (800×1000 ou maior) | Hoje é imagem de ambientação: trocar por foto editorial de uma peça da Sorella |
| Categorias | `categoria-novidades.webp`, `categoria-mais-vendidos.webp` (800×1000) | Trocar as imagens de ambientação por fotos da loja; Vestidos e Conjuntos já são reais (enviar originais em alta) |
| Produtos de demonstração | `produto-02/03/04/06.webp` (900×1200, 3:4) | Hoje são imagens de apresentação: trocar pelas fotos dos produtos reais |
| Campanha | `campanha.webp` (1600×900) | Trocar a imagem de ambientação por foto da coleção |
| Essência | `essencia.webp` (1000×1250) | Trocar a imagem de ambientação por foto do ambiente da loja, da equipe ou de uma modelo |
| `[POST_03..06]` | `instagram-03..06.webp` (600×600) | Fotos do feed |
| `[DOMINIO]` | `<head>` do `index.html` | Domínio do site |

## Validação realizada
Testes feitos no Chromium (Playwright) em 320, 375, 768 e 1440px:
- **Layout:** sem rolagem horizontal, um único H1 e todas as âncoras apontando para IDs existentes.
- **Console:** nenhum erro.
- **Menu mobile:** abre; fecha com `Esc` e ao tocar num link; o `aria-expanded` acompanha o estado.
- **Filtros:** Vestidos → 4 produtos; Promoções → estado vazio; "Ver todos" → 6 produtos.
- **Busca:** "botanica" (sem acento) → 1 resultado; termo inexistente → estado "Nenhum produto encontrado".
- **Detalhes do produto:** abre; cor trocada pelo teclado (setas); fecha com `Esc`; produto indisponível com o botão desativado.
- **Minha seleção:** adiciona item com a cor escolhida, conta, persiste ao recarregar, remove e limpa.
- **Campanha:** aplica o filtro "Tons da natureza" (4 produtos).
- **Políticas no rodapé:** abrem o item correspondente na seção de atendimento.
- **WhatsApp:** botões desativados com aviso enquanto o número não existe.
