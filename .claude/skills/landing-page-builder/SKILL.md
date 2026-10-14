---
name: landing-page-builder
description: Transforma um briefing ou SPEC em uma landing page estática profissional (HTML/CSS/JS), responsiva, acessível e pronta para GitHub Pages ou Hostinger.
---

# Landing Page Builder

Você atua como uma equipe completa: **Estrategista → Designer → Product Designer → Front-end → QA → Entrega**.
Não é "prompt → código". Cada decisão visual e estrutural precisa ter origem no briefing.

Prioridade absoluta: **qualidade da experiência > estética isolada > quantidade de funcionalidades.**

---

## 0. Quando usar

Use quando o usuário fornecer briefing, SPEC, dados de marca, produtos, textos, imagens, público, CTA ou referências e pedir uma landing page, site institucional de uma página, página de captura, página de produto ou página de vendas.

Não interrompa a implementação para pedir confirmação sobre detalhes secundários. Só pergunte antes de começar se faltar algo que muda a página inteira (ex.: não se sabe qual é o produto nem o objetivo). Todo o resto vira placeholder.

---

## 1. Fluxo obrigatório

Execute as fases em ordem. As fases 1–4 são raciocínio; registre o resultado de forma curta no topo do `README.md` (seção "Decisões de projeto"), não em texto longo na conversa.

### Fase 1 — Entendimento (leia a SPEC inteira)
Extraia e anote:
- **Objetivo** da página (vender, captar lead, gerar contato, agendar, apresentar).
- **Público-alvo** (quem é, nível de consciência do problema, dispositivo provável).
- **Proposta de valor** em uma frase.
- **CTA principal** (um só) e, no máximo, um CTA secundário de menor peso.
- **Conteúdo disponível** vs. **conteúdo faltante** (lista de placeholders).
- **Identidade visual** fornecida (cores, fontes, logo, tom de voz, referências).
- **Requisitos técnicos** (WhatsApp, formulário, analytics, idiomas, Schema.org).

### Fase 2 — Arquitetura da página
Defina as seções **a partir do objetivo**, nunca por template fixo. Cada seção precisa responder a uma objeção ou etapa da jornada. Catálogo possível:

| Seção | Use quando |
|---|---|
| Header / Navbar | Sempre (simples; em páginas de conversão pura, pode ter só logo + CTA) |
| Hero | Sempre: H1 + subtítulo + CTA principal + visual |
| Benefícios | O público precisa entender "o que ganho" |
| Produtos / Serviços | Há catálogo ou planos |
| Diferenciais | Mercado concorrido |
| Como funciona | Processo não é óbvio (3–4 passos) |
| Prova social | **Somente** se a SPEC fornecer depoimentos/clientes/números reais |
| Oferta | Há condição comercial definida na SPEC |
| FAQ | Há objeções previsíveis |
| CTA final | Sempre que a página tiver mais de ~3 seções |
| Contato | Há endereço, horário, mapa ou formulário |
| Footer | Sempre |

Regra: menos seções bem feitas > muitas seções rasas. Se uma seção não tem conteúdo real nem placeholder justificável, remova-a.

### Fase 3 — UX
- Jornada: atenção → interesse → confiança → ação.
- O CTA principal aparece no hero, é repetido em pontos naturais e no final. Mesmo texto e mesma cor em todas as ocorrências.
- CTAs secundários têm estilo visivelmente inferior (outline ou link).
- Leitura escaneável: headline curta, parágrafos de até ~3 linhas no mobile, listas quando houver enumeração.
- Em mobile, avalie um CTA fixo inferior (sticky) quando o objetivo for contato/WhatsApp.

### Fase 4 — UI e Design System
Defina **antes de codar**:

**Cores** (tokens): `primary`, `primary-contrast`, `secondary`, `accent`, `background`, `surface`, `text`, `muted`, `border`, `success`, `error`.
- Use as cores da marca se fornecidas. Se não, derive uma paleta coerente com o segmento e o público, e registre a escolha no README.
- Contraste mínimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande e componentes.

**Tipografia**: famílias de heading e body (no máximo 2 famílias), escala fluida com `clamp()`, pesos definidos para heading, body, button e caption.
- Prefira fontes do sistema ou Google Fonts com `display=swap` e somente os pesos usados.

**Componentes**: botão (primário, secundário, estados hover/focus/active/disabled), card, badge, input, navbar, footer, seção, FAQ, depoimento, card de produto.

**Direção visual**: escolha uma direção clara a partir da marca e do público (ex.: editorial sóbrio, tecnológico preciso, artesanal acolhedor, premium minimalista, popular vibrante). Ela guia layout, raio de borda, sombras, densidade e imagens.

Evite aparência de template: excesso de cards, gradientes gratuitos, ícones genéricos em toda seção, animações em tudo, blocos de texto centralizado longos, todas as seções com o mesmo layout. Varie a composição entre seções (texto + imagem alternados, grid, faixa de destaque, lista numerada).

### Fase 5 — Copy
- Texto fornecido na SPEC é preservado. Pode-se ajustar só pontuação/quebras, nunca informação.
- Copy faltante: escreva texto genérico **neutro** apenas para estrutura (ex.: títulos de seção como "Como funciona") e use placeholders para tudo que for afirmação comercial.
- Tom de voz conforme a marca e o público.

### Fase 6 — Implementação (ver seções 2–10)

### Fase 7 — Validação (ver seção 11). Corrija tudo que falhar antes de entregar.

### Fase 8 — Entrega (ver seção 14)

---

## 2. Regra contra invenção (inviolável)

Nunca invente: preços, promoções, prazos, avaliações, depoimentos, nomes de clientes, logos de parceiros, certificações, prêmios, números/estatísticas, resultados, garantias, telefone, e-mail, endereço, horário, redes sociais, CNPJ, imagens reais da marca.

Use placeholders em MAIÚSCULAS entre colchetes, padronizados:

```
[NOME_DA_MARCA] [HEADLINE] [SUBHEADLINE] [DESCRICAO] [CTA]
[PRECO] [PRODUTO_01_NOME] [PRODUTO_01_DESCRICAO]
[WHATSAPP_NUMBER] [EMAIL] [TELEFONE] [ENDERECO] [HORARIO]
[INSTAGRAM_URL] [FACEBOOK_URL] [LINKEDIN_URL]
[DEPOIMENTO_01_TEXTO] [DEPOIMENTO_01_NOME]
[IMAGEM_HERO] [IMAGEM_PRODUTO_01] [LOGO]
[FORM_ENDPOINT] [DOMINIO] [OG_IMAGE]
```

A página deve continuar funcional e bonita com placeholders: eles precisam caber no layout sem quebrar nada. Liste **todos** os placeholders usados no README, com o arquivo onde estão.

---

## 3. Estrutura do projeto

```
landing-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/      (imagens e placeholders)
│   ├── icons/       (favicon, SVGs)
│   └── fonts/       (só se houver fontes locais)
├── README.md
└── .gitignore
```

- Caminhos sempre relativos: `./css/style.css`, `./js/script.js`, `./assets/images/hero.webp`.
- Nada de caminho absoluto local (`C:\`, `/Users/`), nem dependência de Node, npm, build, backend, banco ou Docker.
- Bibliotecas externas só se realmente necessárias, via CDN, e documentadas no README.
- Pastas vazias recebem um `.gitkeep` para existirem no Git.
- Se a estrutura precisar mudar (ex.: páginas extras como `politica-de-privacidade.html`), justifique no README.

---

## 4. HTML

Base obrigatória (adapte o conteúdo, mantenha a estrutura de metadados):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[NOME_DA_MARCA] — [PROPOSTA_DE_VALOR_CURTA]</title>
  <meta name="description" content="[DESCRICAO_SEO_ATE_155_CARACTERES]">
  <meta name="theme-color" content="#......">
  <link rel="canonical" href="https://[DOMINIO]/">

  <meta property="og:type" content="website">
  <meta property="og:title" content="[TITULO_OG]">
  <meta property="og:description" content="[DESCRICAO_OG]">
  <meta property="og:image" content="https://[DOMINIO]/assets/images/og-image.jpg">
  <meta property="og:url" content="https://[DOMINIO]/">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="./assets/icons/favicon.svg" type="image/svg+xml">
  <!-- Fontes: preconnect + só os pesos usados + display=swap -->
  <link rel="stylesheet" href="./css/style.css">
  <!-- JSON-LD Schema.org quando apropriado -->
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header">…</header>
  <main id="conteudo">
    <section class="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">…</h1>
    </section>
    <!-- demais <section aria-labelledby="…"> com <h2> -->
  </main>
  <footer class="site-footer">…</footer>
  <script src="./js/script.js" defer></script>
</body>
</html>
```

Regras:
- Um único `<h1>`; `<h2>` por seção; `<h3>` dentro de cards. Sem pular níveis.
- `<a>` para navegação/links; `<button type="button">` para ações na página.
- Imagens: `alt` descritivo (ou `alt=""` se decorativa), `width` e `height` definidos, `loading="lazy"` e `decoding="async"` em tudo **abaixo da dobra** (nunca na imagem do hero; nela use `fetchpriority="high"`).
- Formulários com `<label for>` real, `autocomplete`, `type` correto (`email`, `tel`), `required` quando aplicável.
- Links externos: `target="_blank" rel="noopener noreferrer"`.
- Ícones SVG inline decorativos: `aria-hidden="true"`; botões só com ícone: `aria-label`.
- Sem `div` desnecessária; nada de estilo inline.

**Schema.org (JSON-LD)**: use `LocalBusiness` (ou subtipo) quando houver negócio físico, `Organization` para empresas, `Product` para página de produto, `FAQPage` quando houver FAQ. Inclua somente campos com dados reais; omita os que seriam placeholders.

---

## 5. CSS

Organize `style.css` nesta ordem, com comentários de seção:

1. Tokens (`:root`)
2. Reset moderno
3. Base (body, tipografia, links, imagens)
4. Layout (container, section, grid utilitário)
5. Componentes (button, card, badge, input, navbar, footer, faq, testimonial, product-card)
6. Seções específicas (hero, benefits, …)
7. Utilitários (visually-hidden, etc.)
8. Media queries (mobile first: `min-width`)
9. `prefers-reduced-motion`

Tokens mínimos:

```css
:root {
  /* Cores */
  --color-primary: #…;
  --color-primary-contrast: #…;
  --color-secondary: #…;
  --color-accent: #…;
  --color-background: #…;
  --color-surface: #…;
  --color-text: #…;
  --color-muted: #…;
  --color-border: #…;
  --color-success: #…;
  --color-error: #…;

  /* Tipografia */
  --font-heading: "…", system-ui, sans-serif;
  --font-body: "…", system-ui, sans-serif;
  --fs-sm: clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem);
  --fs-base: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --fs-lg: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --fs-xl: clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem);
  --fs-2xl: clamp(2.25rem, 1.6rem + 3vw, 4rem);
  --lh-tight: 1.15;
  --lh-base: 1.6;

  /* Espaçamento */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --section-padding: clamp(3.5rem, 2rem + 6vw, 7rem);

  /* Forma e profundidade */
  --radius-sm: …;
  --radius-md: …;
  --radius-lg: …;
  --radius-pill: 999px;
  --shadow-sm: …;
  --shadow-md: …;

  /* Layout e movimento */
  --container: 1200px;
  --gutter: 1rem;
  --transition: 200ms ease;
  --header-height: 4.5rem;
}
```

Regras:
- **Nenhuma** cor, espaçamento, raio ou sombra fora dos tokens.
- Container: `width: min(100% - 2 * var(--gutter), var(--container)); margin-inline: auto;`
- `img, svg, video { max-width: 100%; height: auto; display: block; }`
- `html { scroll-behavior: smooth; scroll-padding-top: var(--header-height); }` (desligado em reduced-motion).
- Flexbox para alinhamentos de uma dimensão, Grid para layouts de seção; prefira `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))` para cards.
- Breakpoints sugeridos: 600px, 900px, 1200px (`min-width`).
- Áreas clicáveis com no mínimo 44×44px.
- Foco visível: `:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }`
- Proíba overflow horizontal: textos longos com `overflow-wrap: anywhere` em títulos/placeholder, nada com largura fixa maior que a viewport.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. JavaScript

JS apenas onde HTML/CSS não resolvem. `script.js` com `defer`, sem dependências, sem variáveis globais (envolva em módulo/IIFE), e cada recurso protegido por verificação de existência do elemento (`if (!el) return;`), para nada quebrar se uma seção for removida.

Recursos comuns:
- **Menu mobile**: botão com `aria-expanded`, `aria-controls`; fecha com `Esc`, ao clicar num link e ao redimensionar para desktop; trava o scroll do body quando aberto.
- **Header**: classe ao rolar (sombra/fundo).
- **FAQ**: prefira `<details>/<summary>` nativo (zero JS). Use JS só para animação ou "um aberto por vez".
- **Reveal on scroll**: `IntersectionObserver`, adicionando classe; conteúdo visível por padrão se JS falhar (a classe que esconde é aplicada pelo JS, ex.: `html.js .reveal`). Respeitar `prefers-reduced-motion`.
- **Ano atual no footer**.
- **Formulário** e **tracking** (seções 8 e 9).

Sem `console.log` esquecidos e sem erros no console.

---

## 7. WhatsApp

Formato: `https://wa.me/55DDDNUMERO` (somente dígitos, com código do país).
Com mensagem: `https://wa.me/55DDDNUMERO?text=` + mensagem codificada com `encodeURIComponent` (ou já codificada no HTML: espaço = `%20`).

- Nunca invente número. Sem número: `https://wa.me/[WHATSAPP_NUMBER]?text=…` e liste no README.
- Centralize o número em **um lugar** (atributo `data-whatsapp` no `<body>` ou constante no topo do JS) quando houver vários botões, para trocar em um único ponto. Se o link for gerado por JS, mantenha também um `href` válido no HTML como fallback.
- Botão flutuante de WhatsApp: só quando o objetivo for contato; com `aria-label="Falar no WhatsApp"`, sem cobrir conteúdo nem o CTA sticky.
- Links abrem em nova aba com `rel="noopener noreferrer"`.

---

## 8. Formulários

Implemente:
- Validação no cliente (HTML5 + JS com `setCustomValidity` ou mensagens próprias), mensagens de erro junto ao campo ligadas por `aria-describedby`, região `aria-live="polite"` para feedback geral.
- Estados: padrão, erro, carregando (botão desabilitado + texto "Enviando…"), sucesso, falha.
- Começar a validar no `blur`/`submit`, não a cada tecla no primeiro preenchimento.

Envio:
- Se a SPEC definir endpoint (Formspree, Getform, Web3Forms, script próprio etc.), use `fetch` para ele.
- Se **não** houver backend definido: `action="[FORM_ENDPOINT]"`, e o JS detecta o placeholder e mostra uma mensagem honesta ("Formulário ainda não conectado") em vez de fingir sucesso. **Nunca simule envio bem-sucedido.**
- Alternativa honesta quando o objetivo é contato: o formulário monta a mensagem e abre o WhatsApp com os dados preenchidos (deixe claro no botão: "Enviar pelo WhatsApp").
- Inclua campo honeypot oculto contra spam e, se houver dados pessoais, um texto curto sobre uso dos dados com link para `[POLITICA_DE_PRIVACIDADE_URL]` (LGPD).

---

## 9. Analytics

Só quando a SPEC pedir. Não insira GA4, Meta Pixel, GTM, Hotjar ou similares sem especificação; se pedido mas sem ID, use `[GA4_MEASUREMENT_ID]` / `[META_PIXEL_ID]` / `[GTM_ID]`.

Prepare uma camada simples:

```js
function track(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
}
```

Marque elementos com `data-track="cta_click"` (e `data-track-label`) e use delegação de eventos. Eventos padrão: `page_view`, `cta_click`, `whatsapp_click`, `form_start`, `form_submit`, `product_click`, `scroll` (25/50/75/100%, disparando cada marco uma vez).

---

## 10. Performance e imagens

- Imagens reais fornecidas: salvar em `assets/images/`, nomes em kebab-case, preferir WebP/AVIF com fallback JPG/PNG via `<picture>` quando possível, `srcset`/`sizes` para imagens grandes.
- Imagens faltantes: **nunca** invente fotos da marca nem use banco de imagens apresentado como real. Crie um placeholder visual claramente identificado (bloco com proporção correta via `aspect-ratio`, cor de superfície e o rótulo `[IMAGEM_PRODUTO_01]`), ou um SVG placeholder em `assets/images/` com o nome que a imagem final deve ter, para a troca ser só substituir o arquivo.
- Ilustrações abstratas/decorativas em SVG/CSS podem ser criadas, desde que não se passem por foto real do produto/marca.
- `og-image`: placeholder 1200×630 indicado no README.
- Fontes: no máximo 2 famílias e os pesos usados; `preconnect`; `font-display: swap`.
- CSS e JS em um arquivo cada; sem bibliotecas grandes quando o nativo resolve.

---

## 11. Validação (QA) — obrigatória antes de entregar

Faça a revisão de verdade. Se houver um navegador headless disponível no ambiente (ex.: Playwright/Chromium), abra o `index.html`, capture screenshots em **375px, 768px e 1440px**, olhe as imagens e corrija o que estiver errado; verifique também o console. Se não houver, revise o código linha a linha contra a lista abaixo.

**HTML**: estrutura válida, tags fechadas, um `<h1>`, headings em ordem, links e âncoras apontando para IDs existentes, sem `href="#"` vazio em CTA, `lang` correto.

**CSS**: sem overflow horizontal em 320px, nenhum valor fora dos tokens, componentes consistentes, estados hover/focus presentes.

**JS**: zero erros no console, menu abre/fecha (clique, `Esc`, link), FAQ funciona, formulário cobre todos os estados, nada quebra se uma seção não existir.

**UX**: CTA principal óbvio em 3 segundos, um único CTA dominante, jornada lógica, nenhuma seção sem propósito.

**Mobile**: textos legíveis (≥16px no corpo), botões ≥44px, nada sobreposto, imagens sem deformação, menu funcional, CTA sticky sem cobrir conteúdo.

**SEO**: title (≤60 caracteres), description (≤155), H1, OG completo, canonical, alt nas imagens, JSON-LD válido e só com dados reais.

**Acessibilidade**: contraste AA verificado nos pares principais, labels, foco visível, navegação completa por teclado, skip link, `aria-expanded` no menu, reduced-motion.

**Anti-invenção**: varra o projeto procurando qualquer número, preço, nome, depoimento ou contato que não veio da SPEC. Tudo isso vira placeholder.

**Hospedagem**: todos os caminhos relativos, abre corretamente via `file://` e em subpasta (GitHub Pages serve em `/nome-do-repo/`, então nenhum caminho pode começar com `/`).

---

## 12. README.md (modelo)

```markdown
# [NOME_DA_MARCA] — Landing Page

## Sobre
Objetivo, público e CTA principal da página.

## Decisões de projeto
- Direção visual: …
- Paleta e tipografia: … (por quê)
- Seções e por que cada uma existe: …

## Tecnologias
HTML5, CSS3 e JavaScript puro. Sem build, sem dependências. (Listar CDNs, se houver.)

## Estrutura
Explicação de cada pasta/arquivo.

## Como executar
Abrir o `index.html` no navegador (duplo clique). Opcional: extensão "Live Server" do VS Code.

## Como publicar no GitHub Pages
1. Criar um repositório no GitHub.
2. Enviar os arquivos (`git init`, `git add .`, `git commit -m "Primeira versão"`, `git branch -M main`, `git remote add origin URL`, `git push -u origin main`) ou arrastar os arquivos pela interface web.
3. Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)` → Save.
4. Acessar `https://USUARIO.github.io/REPOSITORIO/` após alguns minutos.
5. Domínio próprio: Settings → Pages → Custom domain, e configurar o DNS no provedor; marcar "Enforce HTTPS".

## Como publicar na Hostinger
1. hPanel → Sites → Gerenciar → Gerenciador de Arquivos.
2. Abrir o diretório público `public_html`.
3. Enviar os arquivos (ou um ZIP e usar "Extrair"); o `index.html` deve ficar diretamente em `public_html`, não dentro de uma subpasta.
4. Remover um `default.php`/`index.php` padrão, se existir.
5. Acessar o domínio e ativar o SSL (HTTPS) no painel, se ainda não estiver ativo.

## Personalização
- Textos: `index.html` (seções comentadas).
- Cores, fontes e espaçamentos: tokens em `css/style.css` (`:root`).
- Imagens: substituir os arquivos em `assets/images/` mantendo o mesmo nome (ou atualizar o `src` e o `alt`).
- WhatsApp: onde o número está centralizado.
- Links e redes sociais: header/footer.
- SEO: `<head>` do `index.html` (title, description, OG, canonical, JSON-LD).
- Formulário: trocar `[FORM_ENDPOINT]`.

## Pendências (placeholders)
| Placeholder | Onde | O que inserir |
|---|---|---|
```

## 13. .gitignore

```gitignore
# Sistema
.DS_Store
Thumbs.db
desktop.ini

# Editores
.vscode/
.idea/
*.swp

# Logs e temporários
*.log
*.tmp
*.bak

# Segredos
.env
.env.*

# Dependências (caso alguém adicione ferramentas no futuro)
node_modules/
```

Nunca inclua credenciais, chaves de API ou arquivos privados no projeto.

---

## 14. Entrega

1. Gere todos os arquivos em `landing-page/` (incluindo `.gitkeep` nas pastas vazias e placeholders de imagem).
2. Rode a validação da seção 11 e corrija.
3. Compacte em `landing-page.zip` (pronto para upload na Hostinger ou para subir no GitHub) e entregue o ZIP; quando o ambiente permitir, entregue também uma visualização da página.
4. Resposta final curta:
   - uma frase sobre a direção escolhida;
   - lista de **pendências** (placeholders que o usuário precisa preencher), agrupadas;
   - um próximo passo natural (ex.: "envie as fotos dos produtos e eu substituo os placeholders").

Não despeje o código inteiro na conversa quando os arquivos foram entregues.
