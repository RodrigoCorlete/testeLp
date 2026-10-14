# Feirão Revenda — Landing Page

## Sobre
Página de uma seção para a **Feirão Revenda** (seminovos, Abolição – RJ). O objetivo é levar quem chega pelo Instagram a **iniciar uma conversa no WhatsApp** sobre um carro específico ou sobre a troca do usado.
- **Público:** quem compra seminovo na faixa de R$ 30 mil a R$ 85 mil, muitas vezes com um usado para a troca. Acessa principalmente pelo celular.
- **CTA principal:** "Chamar no WhatsApp". Os secundários são "Ver carros disponíveis" (âncora) e "Avaliar meu usado", ambos com estilo de menor peso ou mensagem específica.

## Decisões de projeto
- **Direção visual:** popular vibrante sobre fundo escuro, reinterpretando os posts "VENDE-SE" do Instagram (marinho + amarelo + dourado). O amarelo é reservado para ação e preço; o laranja aparece só em "REALIZADO".
- **Paleta:** fundo `#0E131C`/`#131A26`, superfícies `#1B2331`/`#232D3F`, primária `#FCD033`, dourado `#FDAE29`, laranja `#FC8F1F`, texto `#FFFFFF`/`#B9C1CE`. Todas as cores vêm da SPEC (medidas nos prints). Os pares principais passam no WCAG AA: amarelo sobre marinho ≈ 11:1, marinho sobre amarelo ≈ 11:1 e cinza `#B9C1CE` sobre o fundo ≈ 10:1.
- **Tipografia:** *Lilita One* (só no H1, no badge "VENDE-SE" e em "REALIZADO") lembra a letra grossa dos posts. *Poppins* 400/600/700/800 no resto.
- **Ícone do WhatsApp:** glifo verde dentro de um disco marinho, porque verde direto sobre amarelo ficaria ilegível.
- **Seções e por que existem:**
  - **Hero:** proposta em 3 s.
  - **Serviços:** mostra a amplitude da loja.
  - **Estoque:** responde a "tem carro no meu bolso?".
  - **Troca:** puxa quem tem um usado.
  - **Diferenciais:** reduz objeções.
  - **Sonhos realizados:** prova social com fotos reais.
  - **Visite a loja:** confiança física.
  - **CTA final.**
- **Não incluído por falta de dados reais:** FAQ, depoimentos em texto, notas, número de vendas, garantia e bancos parceiros.
- **Estrutura diferente do padrão (css/ js/ assets/):** a SPEC pede explicitamente **um único `index.html` + pasta `img/`** (CSS crítico inline, critério de aceite para a Hostinger). Por isso o CSS e o JS ficam dentro do próprio `index.html`, organizados em seções comentadas.

## Tecnologias
HTML5, CSS3 e JavaScript puro, sem build e sem dependências. Recursos externos usados:
- **Google Fonts:** Lilita One e Poppins.
- **Google Maps:** iframe carregado só quando a seção de contato aparece.

## Estrutura
```
feirao-revenda/
├── index.html      página completa (CSS e JS internos)
├── img/            logo, foto do hero, carros, entregas e imagem OG
├── README.md
└── .gitignore
```

## Como executar
Abra o `index.html` no navegador com um duplo clique. Opcionalmente, use a extensão "Live Server" do VS Code.

## Como publicar na Hostinger
1. No hPanel, vá em Sites → Gerenciar → Gerenciador de Arquivos.
2. Abra a pasta `public_html`.
3. Envie o conteúdo desta pasta (`index.html` + `img/`), ou envie o ZIP e use "Extrair". O `index.html` precisa ficar direto em `public_html`, não dentro de uma subpasta.
4. Se existir um `default.php` ou `index.php` padrão, remova.
5. Acesse o domínio e ative o SSL (HTTPS) no painel.

## Como publicar no GitHub Pages
1. Crie um repositório e envie o conteúdo desta pasta, pela interface web ou com `git push`.
2. Em Settings → Pages, escolha Source: "Deploy from a branch" → `main` / `/ (root)` e salve.
3. Acesse `https://USUARIO.github.io/REPOSITORIO/`. Todos os caminhos são relativos, então funciona em subpasta.

## Personalização
Tudo fica no `<script>` no fim do `index.html`, no bloco **CONFIGURAÇÃO**:
- **WhatsApp, endereço, horário e Instagram:** as constantes `WHATSAPP`, `ENDERECO`, `HORARIO` e `INSTAGRAM`. Todos os botões e o rodapé usam esses valores.
- **Estoque:** o array `carros` (modelo, ano, combustível, câmbio, preço e foto). Os cards são gerados a partir dele.
- **Entregas:** o array `entregas` (foto e @ do cliente).
- **Mensagens prontas do WhatsApp:** o objeto `MENSAGENS`. A mensagem do card de carro é montada automaticamente.
- **Cores e fontes:** os tokens em `:root`, no `<style>`.
- **Imagens:** substitua os arquivos em `img/` **mantendo o mesmo nome**. Se uma foto for apagada, aparece um bloco escuro com o nome do carro no lugar.
- **SEO:** fica no `<head>` (title, description, Open Graph e JSON-LD `AutoDealer`). Depois de definir o domínio, descomente o `canonical`/`og:url` e torne a `og:image` absoluta.
- **Analytics:** todo clique em WhatsApp dispara `dataLayer.push({event:"whatsapp_click", origem})` quando existir um `dataLayer` (GTM/GA4). Nenhum script de analytics foi instalado, porque a SPEC não traz IDs.

## Pendências (placeholders)
| Placeholder | Onde | O que inserir |
|---|---|---|
| `5521XXXXXXXXX` | `index.html` → `WHATSAPP` | Número completo do WhatsApp, só dígitos (55 + DDD + número). **Sem ele, os botões não abrem a conversa certa.** |
| `[WHATSAPP_NUMBER]` | Rodapé | Preenchido automaticamente quando `WHATSAPP` for corrigido |
| `[HORARIO]` | `HORARIO` (contato e rodapé) | Horário de funcionamento (destaque "HORÁRIO" do Instagram) |
| Endereço | `ENDERECO` | Confirmar complemento, cidade e CEP (Rio de Janeiro é inferência). Se confirmar, acrescente `addressLocality`/`postalCode` no JSON-LD |
| `[CNPJ]` | Rodapé | CNPJ da loja |
| `[DOMINIO]` | `<head>` (comentado) | Domínio do site ("www.fe…" aparece cortado num Reel) |
| `img/logo.png` | Header, rodapé e favicon | **Logo oficial** em alta resolução. O arquivo atual é provisório e mostra só o nome em texto |
| `img/hero.webp` | Hero (960×720) | Foto real do galpão ou de um carro do estoque |
| `img/city.webp`, `c3`, `spin`, `logan`, `etios`, `cobalt` | Estoque (800×600, 4:3) | Fotos dos 6 carros, recortados sobre fundo neutro como nos posts |
| `img/entrega-1..4.webp` | Sonhos realizados (800×1000, 4:5) | Fotos reais de entregas, **com autorização dos clientes** |
| `[@CLIENTE_01..04]` | Array `entregas` | @ do Instagram de cada cliente |
| `img/og-image.jpg` | Open Graph (1200×630) | Imagem de compartilhamento com o logo |
| Preços | Array `carros` | Confirmar preço e disponibilidade dos 6 carros. Os valores vieram dos posts e podem estar desatualizados |
| Financiamento | Card "Financiamento" | Condições (bancos, entrada), se quiserem divulgar. Hoje o card diz "Consulte as condições pelo WhatsApp" |
| Público taxista/app | — | Confirmar com a loja. Pode virar uma seção específica |
