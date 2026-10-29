# Sorella — Landing Page

## Sobre
Landing page de moda feminina para a **Sorella** ([@sorella.sorella](https://www.instagram.com/sorella.sorella/)). Ela apresenta a marca, destaca os produtos e leva a cliente da descoberta ao atendimento. Foi estruturada para evoluir para um e-commerce funcional.
- **Público:** mulheres que buscam elegância acessível, principalmente no celular, vindas do Instagram.
- **CTA principal:** "Conheça a coleção", que leva à vitrine.
- **Conversão atual:** sem checkout conectado, a cliente monta a **Minha seleção** e envia pelo WhatsApp.

## Decisões de projeto
- **Direção visual:** "Elegância natural contemporânea", uma boutique editorial com estrutura de e-commerce.
  - Off-white como fundo.
  - Verde-floresta para títulos, navegação e botões.
  - Areia e oliva em fundos de apoio.
  - Marrom em detalhes.
  - Dourado só em filetes, como a linha antes dos rótulos.
  - Sem gradientes chamativos e com sombras mínimas.
- **Tipografia:** *Cormorant Garamond* nos títulos (personalidade e sofisticação) e *DM Sans* em textos, navegação e botões.
- **Contraste (WCAG AA):**
  - Verde-floresta sobre off-white ≈ 11:1.
  - Marrom sobre off-white ≈ 8:1.
  - Texto `#6A5E55` sobre off-white ≈ 6:1.
  - Areia sobre verde-floresta ≈ 6:1.
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
- **Referências:** a afroditestore40 (estrutura comercial), a bluv/the-finds (limpeza visual, mobile-first, looks) e a usevitbrand/quem-somos (narrativa) foram usadas como orientação de estrutura, sem copiar layout, textos ou marca. Neste ambiente, o acesso a esses sites e ao Instagram estava bloqueado, e as fotos do Instagram não chegaram anexadas. Por isso, todas as imagens são placeholders com o nome do arquivo final.

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
├── assets/icons/         favicon.svg (monograma provisório "S")
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
| Produtos (nome, foto, preço, preço anterior, cores, tamanhos, categorias, esgotado) | `produtos`. Mude `produtosDemonstracao` para `false` quando os dados forem reais |
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
| Logo | `loja.logo` | Arquivo do logotipo (SVG ou PNG). Hoje aparece o nome em texto |
| `[WHATSAPP_NUMBER]` | `loja.whatsapp` | 55 + DDD + número, só dígitos. Libera todos os botões de WhatsApp |
| `[EMAIL]`, `[ENDERECO]`, `[CNPJ]` | `loja` | Dados institucionais (use `''` no endereço se a loja for só online) |
| `[HORARIO_ATENDIMENTO]` | `loja` e `atendimento` | Horário de atendimento |
| `[BENEFICIO_01..03]` | `beneficios` | Só benefícios confirmados (ex.: entrega para todo o Brasil) |
| Produtos de demonstração | `produtos` | Nomes, fotos, preços, cores, tamanhos e estoque reais |
| `[PRECO]` | `produtos[].preco` | Preço de cada produto (número, ex.: `189.9`) |
| `[TAMANHOS]` | `produtos[].tamanhos` | Grade de tamanhos |
| Parcelamento | `parcelamento` | Só se confirmado |
| `[TEXTO_ESSENCIA]` | `essencia.texto` | Texto institucional real |
| `[FORMAS_DE_PAGAMENTO]`, `[REGRAS_DE_FRETE]`, `[POLITICA_DE_TROCAS]`, `[POLITICA_DE_PRIVACIDADE]`, `[DUVIDAS_FREQUENTES]` | `atendimento` | Políticas e informações confirmadas |
| `[ALT_POST_01..06]` | `instagramPosts` | Descrição de cada foto e link da publicação |
| `[FOTO_HERO]` | `assets/images/hero.webp` (1200×1500) | Foto editorial de uma modelo com uma peça da loja |
| `[FOTO_CATEGORIA_*]` | `categoria-vestidos/conjuntos/novidades/mais-vendidos.webp` (800×1000) | Uma foto por categoria |
| `[FOTO_PRODUTO_01..06]` | `produto-01..06.webp` (900×1200, 3:4) | Fotos dos produtos |
| `[FOTO_CAMPANHA]` | `campanha.webp` (1600×900) | Foto ampla da campanha |
| `[FOTO_LOOK_01..02]` | `look-01..02.webp` (900×1200) | Fotos de looks completos |
| `[FOTO_ESSENCIA]` | `essencia.webp` (1000×1250) | Ambiente da loja, equipe ou modelo |
| `[POST_01..06]` | `instagram-01..06.webp` (600×600) | Fotos do feed |
| `[OG_IMAGE]` | `og-image.jpg` (1200×630) | Imagem de compartilhamento |
| `[DOMINIO]` | `<head>` do `index.html` | Domínio do site |

## Validação realizada
Testes feitos no Chromium (Playwright) em 320, 375, 768 e 1440px:
- **Layout:** sem rolagem horizontal, um único H1 e todas as âncoras apontando para IDs existentes.
- **Console:** nenhum erro.
- **Menu mobile:** abre; fecha com `Esc` e ao tocar num link; o `aria-expanded` acompanha o estado.
- **Filtros:** Vestidos → 3 produtos; Promoções → estado vazio; "Ver todos" → 6 produtos.
- **Busca:** "botanica" (sem acento) → 2 resultados; termo inexistente → estado "Nenhum produto encontrado".
- **Detalhes do produto:** abre; cor trocada pelo teclado (setas); fecha com `Esc`; produto indisponível com o botão desativado.
- **Minha seleção:** adiciona item com a cor escolhida, conta, persiste ao recarregar, remove e limpa.
- **Campanha:** aplica o filtro "Tons da natureza" (3 produtos).
- **Políticas no rodapé:** abrem o item correspondente na seção de atendimento.
- **WhatsApp:** botões desativados com aviso enquanto o número não existe.
