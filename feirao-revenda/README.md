# Feirão Revenda — Landing Page

## Sobre
Página de uma seção para a **Feirão Revenda** (seminovos, Abolição – RJ). O objetivo é levar quem chega pelo Instagram a **iniciar uma conversa no WhatsApp** sobre um carro específico ou sobre a troca do usado.
- **Público:** quem compra seminovo na faixa de R$ 30 mil a R$ 85 mil, muitas vezes com um usado para a troca. Acessa principalmente pelo celular.
- **CTA principal:** "Chamar no WhatsApp". Os secundários são "Ver carros disponíveis" (âncora) e "Avaliar meu usado", ambos com estilo de menor peso ou mensagem específica.

## Decisões de projeto
- **Layout de marketplace, com a Webmotors como referência:**
  - fundo claro e header branco fixo;
  - hero em faixa marinho com um card branco de atalhos ("O que você precisa?": Comprar, Vender, Trocar, Financiar), inspirado no card de busca da Webmotors, mas sem busca nem filtros (a SPEC não pede);
  - grade de anúncios com contagem ("6 carros disponíveis").
- **Cards de anúncio (padrão marketplace):**
  - foto 4:3 com o selo "VENDE-SE";
  - **MARCA MODELO** em caixa alta e versão em cinza;
  - "Preço estimado*" com o valor em destaque;
  - linha de especificações (ano · combustível · câmbio · local);
  - checks "Documentação ok" e "Aceita seu usado na troca";
  - botão "Tenho interesse".
- **Identidade da marca:** marinho `#1B2331` nas faixas, nos textos e no rodapé; amarelo `#FCD033` para ação; dourado `#FDAE29` em detalhes sobre fundo escuro; laranja `#FC8F1F` só em "REALIZADO" (sobre marinho, para manter o contraste AA). Fontes: *Lilita One* (H1, "VENDE-SE", "REALIZADO") e *Poppins*.
- **Preços:** os valores dos anúncios do Instagram aparecem como **"Preço estimado\*"**, com uma nota abaixo da grade. A mensagem do WhatsApp diz "com preço estimado de R$ …".
- **Contraste:** marinho sobre branco ≈ 15:1, cinza `#5B6577` sobre branco ≈ 6:1, verde dos checks `#1E7F4F` sobre branco ≈ 5:1, amarelo sobre marinho ≈ 11:1.
- **Seções:**
  - **Hero com atalhos:** proposta de valor e serviços.
  - **Carros à venda:** o estoque.
  - **Troca:** passo a passo.
  - **Diferenciais.**
  - **Sonhos realizados:** prova social real.
  - **Visite a loja.**
  - **CTA final.**
- **Não incluído por falta de dados reais:** FAQ, depoimentos em texto, notas, número de vendas, garantia e bancos parceiros.
- **Estrutura:** a SPEC pede **um único `index.html` + pasta `img/`** (critério de aceite para a Hostinger), por isso o CSS e o JS ficam dentro do `index.html`, em seções comentadas.

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
- **Estoque:** o array `carros` (marca, modelo, versão, ano, combustível, câmbio, preço estimado e foto). Os cards são gerados a partir dele.
- **Entregas:** o array `entregas` (foto e @ do cliente).
- **Mensagens prontas do WhatsApp:** o objeto `MENSAGENS`. A mensagem do card de carro é montada automaticamente.
- **Cores e fontes:** os tokens em `:root`, no `<style>`.
- **Imagens:** substitua os arquivos em `img/` **mantendo o mesmo nome**. Se uma foto for apagada, aparece um bloco escuro com o nome do campo no lugar.
- **SEO:** fica no `<head>` (title, description, Open Graph e JSON-LD `AutoDealer`). Depois de definir o domínio, descomente o `canonical`/`og:url` e torne a `og:image` absoluta.
- **Analytics:** todo clique em WhatsApp dispara `dataLayer.push({event:"whatsapp_click", origem})` quando existir um `dataLayer` (GTM/GA4). Nenhum script de analytics foi instalado, porque a SPEC não traz IDs.

## Pendências (placeholders)
Na página aparece apenas o nome do campo entre colchetes. Para preencher, edite o bloco **CONFIGURAÇÃO** no fim do `index.html` ou substitua o arquivo em `img/` mantendo o mesmo nome.

| Placeholder | Onde | O que inserir |
|---|---|---|
| `[WHATSAPP_NUMBER]` | Constante `WHATSAPP` (e o `href` de fallback dos botões `data-wa`) | Número do WhatsApp, só dígitos (55 + DDD + número). **Sem ele, os botões não abrem a conversa.** |
| `[HORARIO]` | Constante `HORARIO` | Horário de funcionamento |
| `[ENDERECO]` | Constante `ENDERECO` (e o link "Como chegar" no HTML) | Endereço completo, com complemento, cidade e CEP. O mapa (`[MAPA]`) carrega sozinho quando o endereço é preenchido. Acrescente também o `address` no JSON-LD |
| `[CNPJ]` | Rodapé | CNPJ da loja |
| Preços estimados | Array `carros` → `preco` | Confirmar os 6 valores (vieram dos posts do Instagram). Se um preço não for confirmado, use `'[PRECO]'` |
| `[LOGO]` | `img/logo.png` (header, rodapé e favicon) | Logo oficial (PNG com fundo transparente ou SVG). Ele aparece sobre o fundo branco do header e do rodapé |
| `[IMAGEM_CARRO_01]`…`[IMAGEM_CARRO_06]` | `img/city.webp`, `c3`, `spin`, `logan`, `etios`, `cobalt` (800×600) | Fotos dos 6 carros, na ordem do array `carros` |
| `[IMAGEM_ENTREGA_01]`…`[IMAGEM_ENTREGA_04]` | `img/entrega-1..4.webp` (800×1000) | Fotos reais de entregas, **com autorização dos clientes** |
| `[@CLIENTE_01]`…`[@CLIENTE_04]` | Array `entregas` | @ do Instagram de cada cliente |
| `[OG_IMAGE]` | `img/og-image.jpg` (1200×630) | Imagem de compartilhamento |
| `[DOMINIO]` | `<head>` (comentado) | Domínio do site, para ativar o `canonical`/`og:url` e tornar a `og:image` absoluta |
