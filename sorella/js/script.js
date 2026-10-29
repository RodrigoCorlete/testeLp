/* =============================================================
   SORELLA — comportamento da página
   Todos os dados vêm de js/config.js (window.SORELLA_CONFIG).
   ============================================================= */
(function () {
  'use strict';

  var C = window.SORELLA_CONFIG;
  if (!C) return;

  var STORAGE_KEY = 'sorella-selecao';
  var state = { filter: 'todos', query: '' };
  var brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  /* ---------- utilidades ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function isPh(v) { return typeof v === 'string' && /\[[^\]]*\]/.test(v); }
  function has(v) { return v != null && v !== '' && !isPh(v); }
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }

  function icon(id) {
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS(ns, 'use');
    u.setAttribute('href', '#' + id);
    s.appendChild(u);
    return s;
  }

  // Valor de configuração: placeholder aparece destacado com o nome do campo
  function valueNode(v) {
    return isPh(v) ? el('span', { class: 'ph', text: v }) : document.createTextNode(v);
  }

  function media(src, alt, ratio, w, h, eager) {
    var box = el('div', { class: 'media media--' + ratio, 'data-fallback': alt });
    var img = el('img', { src: src, alt: alt, width: w, height: h, decoding: 'async', loading: eager ? false : 'lazy' });
    img.addEventListener('error', function () { box.classList.add('is-missing'); });
    box.appendChild(img);
    return box;
  }

  function priceNode(p) {
    var wrap = el('p', { class: 'price' });
    var atual = typeof p.preco === 'number' ? brl.format(p.preco) : p.preco;
    if (typeof p.precoAnterior === 'number' && typeof p.preco === 'number' && p.precoAnterior > p.preco) {
      wrap.appendChild(el('del', { text: brl.format(p.precoAnterior) }));
      wrap.appendChild(el('span', { class: 'visually-hidden', text: 'Preço promocional:' }));
    }
    wrap.appendChild(valueNode(atual));
    return wrap;
  }

  function isPromo(p) { return typeof p.precoAnterior === 'number' && typeof p.preco === 'number' && p.precoAnterior > p.preco; }
  function findProduct(id) { return C.produtos.filter(function (p) { return p.id === id; })[0]; }

  var toastTimer;
  function toast(msg) {
    var t = $('[data-toast]');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-visible'); }, 2600);
  }

  /* ---------- WhatsApp ---------- */
  var waOk = /^\d{12,13}$/.test(C.loja.whatsapp || '');
  function waUrl(msg) { return 'https://wa.me/' + C.loja.whatsapp + '?text=' + encodeURIComponent(msg); }

  // Renderiza um botão real de WhatsApp, ou um botão desativado com aviso honesto
  function waAction(slot, label, getMsg, style) {
    if (!slot) return;
    slot.textContent = '';
    var cls = 'btn btn--block ' + (style || 'btn--primary');
    if (waOk) {
      var a = el('a', { class: cls, href: waUrl(getMsg()), target: '_blank', rel: 'noopener noreferrer' }, [icon('i-wa'), label]);
      a.appendChild(el('span', { class: 'visually-hidden', text: ' (abre o WhatsApp)' }));
      a.addEventListener('click', function () { a.href = waUrl(getMsg()); });
      slot.appendChild(a);
    } else {
      slot.appendChild(el('button', { class: cls, type: 'button', disabled: true }, [icon('i-wa'), label]));
      slot.appendChild(el('p', { class: 'wa-note' }, ['WhatsApp em configuração: ', el('span', { class: 'ph', text: C.loja.whatsapp })]));
    }
  }

  /* ---------- marca, campos e textos ---------- */
  $$('[data-brand]').forEach(function (n) {
    if (has(C.loja.logo)) {
      n.textContent = '';
      n.appendChild(el('img', { src: C.loja.logo, alt: C.loja.nome, width: 140, height: 40 }));
    } else {
      n.textContent = C.loja.nome;
    }
  });
  $$('[data-store-name]').forEach(function (n) { n.textContent = C.loja.nome; });
  $$('[data-instagram]').forEach(function (a) { a.href = C.loja.instagram; });
  $$('[data-insta-user]').forEach(function (n) { n.textContent = C.loja.instagramUsuario; });
  $$('[data-field]').forEach(function (n) {
    var v = C.loja[n.getAttribute('data-field')];
    n.textContent = '';
    if (v) n.appendChild(valueNode(v));
  });
  $$('[data-field-row]').forEach(function (n) { if (!C.loja[n.getAttribute('data-field-row')]) n.hidden = true; });
  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* ---------- 1. benefícios ---------- */
  (function () {
    var bar = $('#beneficios');
    var list = (C.beneficios || []).filter(Boolean);
    if (!bar || !list.length) return;
    var ul = $('ul', bar);
    list.forEach(function (b) { ul.appendChild(el('li', null, [valueNode(b)])); });
    bar.hidden = false;
  })();

  /* ---------- 2. menus ---------- */
  $$('[data-menu]').forEach(function (ul) {
    C.menu.forEach(function (item) {
      var a = item.filtro
        ? el('a', { href: '#lancamentos', 'data-filter-link': item.filtro, text: item.rotulo })
        : el('a', { href: item.ancora, text: item.rotulo });
      ul.appendChild(el('li', null, [a]));
    });
  });

  /* ---------- 4. categorias ---------- */
  (function () {
    var ul = $('[data-categories]');
    if (!ul) return;
    C.categoriasDestaque.forEach(function (c) {
      var a = el('a', { class: 'category', href: '#lancamentos', 'data-filter-link': c.filtro }, [
        media(c.foto, c.alt, '4x5', 800, 1000),
        el('span', { class: 'category__label' }, [c.rotulo, icon('i-arrow')])
      ]);
      ul.appendChild(el('li', null, [a]));
    });
  })();

  /* ---------- 5. vitrine: filtros, busca, produtos ---------- */
  var grid = $('[data-products]');
  var chipsBox = $('[data-filters]');

  if (C.produtosDemonstracao) { var dn = $('[data-demo-note]'); if (dn) dn.hidden = false; }

  if (chipsBox) {
    C.filtros.forEach(function (f) {
      var b = el('button', { class: 'chip', type: 'button', 'data-filter': f.id, 'aria-pressed': 'false', text: f.rotulo });
      chipsBox.appendChild(b);
    });
    chipsBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (b) setFilter(b.getAttribute('data-filter'));
    });
  }

  function filterLabel(id) {
    var f = C.filtros.filter(function (x) { return x.id === id; })[0];
    if (f) return f.rotulo;
    if (C.campanha && C.campanha.filtro === id) return C.campanha.titulo;
    return id;
  }

  function productCard(p) {
    var li = el('li', { class: 'product' + (p.esgotado ? ' is-soldout' : '') });
    var badges = el('div', { class: 'product__badges' });
    if (C.produtosDemonstracao) badges.appendChild(el('span', { class: 'tag', text: 'Demonstração' }));
    if (p.esgotado) badges.appendChild(el('span', { class: 'tag tag--dark', text: 'Indisponível' }));
    if (isPromo(p)) badges.appendChild(el('span', { class: 'tag tag--dark', text: 'Promoção' }));

    var m = media(p.foto, p.alt, '3x4', 900, 1200);
    m.appendChild(badges);
    li.appendChild(m);

    var body = el('div', { class: 'product__body' });
    body.appendChild(el('h3', { class: 'product__name' }, [
      el('button', { class: 'product__link', type: 'button', 'data-open-product': p.id, text: p.nome })
    ]));
    body.appendChild(priceNode(p));
    if (has(C.parcelamento)) body.appendChild(el('p', { class: 'installments', text: C.parcelamento }));
    if (p.cores && p.cores.length) {
      var dots = el('div', { class: 'dots' });
      dots.appendChild(el('span', { class: 'visually-hidden', text: p.cores.length + (p.cores.length > 1 ? ' cores: ' : ' cor: ') + p.cores.map(function (c) { return c.nome; }).join(', ') }));
      p.cores.forEach(function (c) {
        var d = el('span', { class: 'dot', title: c.nome, 'aria-hidden': 'true' });
        d.style.background = c.hex;
        dots.appendChild(d);
      });
      body.appendChild(dots);
    }
    body.appendChild(el('span', { class: 'product__more', 'aria-hidden': 'true' }, ['Ver produto', icon('i-arrow')]));
    li.appendChild(body);
    return li;
  }

  function renderProducts() {
    if (!grid) return;
    var q = norm(state.query.trim());
    var list = C.produtos.filter(function (p) {
      var okFilter = state.filter === 'todos' ||
        (state.filter === 'promocoes' ? isPromo(p) : (p.categorias || []).indexOf(state.filter) !== -1);
      if (!okFilter) return false;
      if (!q) return true;
      var hay = norm([p.nome, (p.categorias || []).join(' '), (p.cores || []).map(function (c) { return c.nome; }).join(' ')].join(' '));
      return q.split(/\s+/).every(function (t) { return hay.indexOf(t) !== -1; });
    });

    grid.textContent = '';
    list.forEach(function (p) { grid.appendChild(productCard(p)); });
    grid.setAttribute('aria-busy', 'false');

    $$('[data-filter]', chipsBox).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === state.filter)); });

    var status = $('[data-results-status]');
    var n = list.length + (list.length === 1 ? ' produto' : ' produtos');
    var parts = [];
    if (state.filter !== 'todos') parts.push(filterLabel(state.filter));
    if (state.query.trim()) parts.push('busca “' + state.query.trim() + '”');
    if (status) status.textContent = parts.length ? n + ' em ' + parts.join(' · ') : n;

    var empty = $('[data-empty]');
    if (empty) {
      empty.hidden = list.length > 0;
      var t = $('[data-empty-text]', empty);
      if (t) t.textContent = state.filter === 'promocoes' && !state.query
        ? 'Não há promoções ativas no momento.'
        : 'Tente outra categoria ou outro termo de busca.';
    }
  }

  function setFilter(id) {
    state.filter = id || 'todos';
    renderProducts();
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-filter-link]');
    if (link) {
      state.query = '';
      var input = $('#campo-busca');
      if (input) input.value = '';
      setFilter(link.getAttribute('data-filter-link'));
      closeMenu();
    }
    var open = e.target.closest('[data-open-product]');
    if (open) openProduct(open.getAttribute('data-open-product'));
  });

  var reset = $('[data-reset-filters]');
  if (reset) reset.addEventListener('click', function () {
    state.query = '';
    var input = $('#campo-busca');
    if (input) input.value = '';
    setFilter('todos');
  });

  /* ---------- busca ---------- */
  (function () {
    var panel = $('#busca');
    var btn = $('[data-open-search]');
    var form = $('[data-search-form]');
    var input = $('#campo-busca');
    if (!panel || !btn || !form || !input) return;

    function open() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); input.focus(); }
    function close() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); }

    btn.addEventListener('click', function () { panel.hidden ? open() : close(); });
    $('[data-close-search]').addEventListener('click', close);
    panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { state.query = input.value; renderProducts(); }, 200);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      state.query = input.value;
      state.filter = 'todos';
      renderProducts();
      var sec = $('#lancamentos');
      if (sec) sec.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      input.blur();
    });
  })();

  /* ---------- menu mobile ---------- */
  var drawer = $('#menu-mobile');
  var toggle = $('.menu-toggle');
  function openMenu() {
    if (!drawer) return;
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
    var first = $('a, button', $('.drawer__panel', drawer));
    if (first) first.focus();
  }
  function closeMenu() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
    toggle.focus({ preventScroll: true });
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', openMenu);
    $$('[data-close-menu]', drawer).forEach(function (b) { b.addEventListener('click', closeMenu); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('.drawer__list a')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) closeMenu(); });
  }

  /* ---------- seleção (sem checkout: envia pelo WhatsApp) ---------- */
  function loadBag() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
  }
  var bag = loadBag().filter(function (i) { return findProduct(i.id); });
  function saveBag() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bag)); } catch (e) { /* sem armazenamento */ } }

  function bagMessage() {
    var lines = bag.map(function (i) {
      var p = findProduct(i.id);
      return '• ' + p.nome + (i.cor ? ' (' + i.cor + ')' : '');
    });
    return 'Olá! Montei esta seleção no site da ' + C.loja.nome + ':\n' + lines.join('\n') + '\nPode me ajudar com disponibilidade, tamanhos e valores?';
  }

  function renderBag() {
    var count = $('[data-bag-count]');
    var btn = $('[data-open-bag]');
    if (count) { count.textContent = bag.length; count.hidden = bag.length === 0; }
    if (btn) btn.setAttribute('aria-label', 'Minha seleção, ' + bag.length + (bag.length === 1 ? ' item' : ' itens'));

    var list = $('[data-bag-list]');
    if (!list) return;
    list.textContent = '';
    bag.forEach(function (i, idx) {
      var p = findProduct(i.id);
      var rm = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Remover ' + p.nome }, [icon('i-close')]);
      rm.addEventListener('click', function () { bag.splice(idx, 1); saveBag(); renderBag(); });
      list.appendChild(el('li', { class: 'side__item' }, [
        el('img', { src: p.foto, alt: '', width: 64, height: 85, loading: 'lazy' }),
        el('p', null, [p.nome, i.cor ? el('small', { text: 'Cor: ' + i.cor }) : null]),
        rm
      ]));
    });
    $('[data-bag-empty]').hidden = bag.length > 0;
    $('[data-bag-clear]').hidden = bag.length === 0;
    var slot = $('[data-wa-slot="selecao"]');
    if (bag.length) waAction(slot, 'Enviar seleção pelo WhatsApp', bagMessage);
    else if (slot) slot.textContent = '';
  }

  var bagDialog = $('#selecao');
  var bagBtn = $('[data-open-bag]');
  if (bagBtn && bagDialog) bagBtn.addEventListener('click', function () { renderBag(); bagDialog.showModal(); });
  var clear = $('[data-bag-clear]');
  if (clear) clear.addEventListener('click', function () { bag = []; saveBag(); renderBag(); toast('Seleção limpa.'); });

  /* ---------- detalhes do produto ---------- */
  var qv = $('#produto');
  var current = null;

  function openProduct(id) {
    var p = findProduct(id);
    if (!p || !qv) return;
    current = { p: p, cor: p.cores && p.cores[0] ? p.cores[0].nome : '' };

    var img = $('[data-qv-img]', qv);
    img.src = p.foto; img.alt = p.alt;
    $('[data-qv-demo]', qv).hidden = !C.produtosDemonstracao;
    $('[data-qv-name]', qv).textContent = p.nome;
    var price = $('[data-qv-price]', qv);
    price.textContent = '';
    var pn = priceNode(p);
    while (pn.firstChild) price.appendChild(pn.firstChild);
    var inst = $('[data-qv-installments]', qv);
    inst.hidden = !has(C.parcelamento);
    inst.textContent = C.parcelamento || '';
    var sizes = $('[data-qv-sizes]', qv);
    sizes.textContent = '';
    sizes.appendChild(valueNode(p.tamanhos || '[TAMANHOS]'));
    $('[data-qv-status]', qv).hidden = !p.esgotado;

    // Cores: grupo de opções acessível (setas do teclado)
    var fs = $('[data-qv-colors]', qv);
    var list = $('[data-qv-swatches]', qv);
    list.textContent = '';
    list.setAttribute('role', 'radiogroup');
    list.setAttribute('aria-label', 'Cor');
    fs.hidden = !(p.cores && p.cores.length);
    (p.cores || []).forEach(function (c, i) {
      var b = el('button', { class: 'swatch', type: 'button', role: 'radio', 'aria-checked': String(i === 0), 'aria-label': c.nome, tabindex: i === 0 ? '0' : '-1' });
      var s = el('span');
      s.style.background = c.hex;
      b.appendChild(s);
      b.addEventListener('click', function () { selectColor(i); });
      list.appendChild(b);
    });
    list.onkeydown = function (e) {
      var items = $$('.swatch', list);
      var idx = items.indexOf(document.activeElement);
      if (idx < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); selectColor((idx + 1) % items.length, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); selectColor((idx - 1 + items.length) % items.length, true); }
    };
    $('[data-qv-color-name]', qv).textContent = current.cor;

    var add = $('[data-qv-add]', qv);
    add.disabled = !!p.esgotado;
    add.textContent = p.esgotado ? 'Indisponível' : 'Adicionar à seleção';

    waAction($('[data-wa-slot="produto"]', qv), 'Pedir pelo WhatsApp', function () {
      return 'Olá! Tenho interesse no produto ' + current.p.nome + (current.cor ? ' (cor: ' + current.cor + ')' : '') + '. Está disponível?';
    }, 'btn--outline');

    if (!qv.open) qv.showModal();
  }

  function selectColor(i, focus) {
    var items = $$('.swatch', qv);
    items.forEach(function (b, j) { b.setAttribute('aria-checked', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    if (focus) items[i].focus();
    current.cor = current.p.cores[i].nome;
    $('[data-qv-color-name]', qv).textContent = current.cor;
  }

  if (qv) {
    $('[data-qv-add]', qv).addEventListener('click', function () {
      if (!current || current.p.esgotado) return;
      bag.push({ id: current.p.id, cor: current.cor });
      saveBag(); renderBag();
      toast(current.p.nome + ' adicionado à seleção.');
    });
  }

  // Fechar diálogos: botão, clique fora
  $$('dialog').forEach(function (d) {
    $$('[data-close-dialog]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });

  /* ---------- 6. campanha ---------- */
  (function () {
    var c = C.campanha;
    var sec = $('#campanha');
    if (!sec || !c || !c.ativa) return;
    var hoje = new Date().toISOString().slice(0, 10);
    if ((c.inicio && hoje < c.inicio) || (c.fim && hoje > c.fim)) return;
    var img = $('[data-campaign-img]', sec);
    img.src = c.foto; img.alt = c.alt;
    img.addEventListener('error', function () { img.parentNode.classList.add('media', 'is-missing'); img.parentNode.setAttribute('data-fallback', c.alt); });
    $('[data-campaign-selo]', sec).textContent = c.selo;
    $('[data-campaign-title]', sec).textContent = c.titulo;
    $('[data-campaign-text]', sec).textContent = c.texto;
    var btn = $('[data-campaign-btn]', sec);
    btn.textContent = c.botao;
    btn.appendChild(icon('i-arrow'));
    btn.setAttribute('data-filter-link', c.filtro || 'todos');
    sec.hidden = false;
  })();

  /* ---------- 7. looks ---------- */
  (function () {
    var ul = $('[data-looks]');
    if (!ul) return;
    (C.looks || []).forEach(function (look) {
      var items = el('div', { class: 'look__items' });
      look.produtos.map(findProduct).filter(Boolean).forEach(function (p) {
        var price = typeof p.preco === 'number' ? brl.format(p.preco) : p.preco;
        items.appendChild(el('button', { class: 'look__item', type: 'button', 'data-open-product': p.id }, [
          el('img', { src: p.foto, alt: '', width: 56, height: 75, loading: 'lazy' }),
          el('span', null, [p.nome, el('small', null, [valueNode(price)])]),
          icon('i-arrow')
        ]));
      });
      var head = el('div', null, [
        C.produtosDemonstracao ? el('p', { class: 'tag-demo', text: 'Demonstração' }) : null,
        el('h3', { text: look.titulo })
      ]);
      ul.appendChild(el('li', { class: 'look' }, [media(look.foto, look.alt, '3x4', 900, 1200), head, items]));
    });
  })();

  /* ---------- 8. essência ---------- */
  (function () {
    var e = C.essencia;
    if (!e) return;
    var img = $('[data-essence-img]');
    if (img) {
      img.src = e.foto; img.alt = e.alt;
      img.addEventListener('error', function () { img.parentNode.classList.add('media', 'is-missing'); img.parentNode.setAttribute('data-fallback', e.alt); });
    }
    $('[data-essence-title]').textContent = e.titulo;
    $('[data-essence-flag]').hidden = !e.provisorio;
    var box = $('[data-essence-text]');
    (e.texto || []).forEach(function (t) { box.appendChild(el('p', null, [valueNode(t)])); });
  })();

  /* ---------- 9. instagram (imagens cadastradas, sem API) ---------- */
  (function () {
    var ul = $('[data-insta]');
    if (!ul) return;
    (C.instagramPosts || []).forEach(function (post, i) {
      var alt = has(post.alt) ? post.alt : 'Publicação ' + (i + 1) + ' do Instagram ' + C.loja.instagramUsuario;
      var a = el('a', { href: has(post.link) ? post.link : C.loja.instagram, target: '_blank', rel: 'noopener noreferrer', 'aria-label': alt + ' (abre o Instagram)' },
        [media(post.foto, alt, '1x1', 600, 600)]);
      ul.appendChild(el('li', null, [a]));
    });
  })();

  /* ---------- 10. atendimento + políticas no rodapé ---------- */
  (function () {
    var box = $('[data-service]');
    var icons = { pagamento: 'i-card', entrega: 'i-truck', trocas: 'i-swap', privacidade: 'i-lock', horario: 'i-chat', duvidas: 'i-help' };
    var footer = $('[data-footer-policies]');
    (C.atendimento || []).forEach(function (item) {
      var d = el('details', { class: 'service__item', id: 'info-' + item.id }, [
        el('summary', null, [icon(icons[item.id] || 'i-help'), item.titulo]),
        el('p', null, [valueNode(item.texto)])
      ]);
      if (box) box.appendChild(d);
      if (footer) {
        var b = el('button', { type: 'button', text: item.titulo });
        b.addEventListener('click', function () {
          d.open = true;
          d.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
          $('summary', d).focus({ preventScroll: true });
        });
        footer.appendChild(el('li', null, [b]));
      }
    });

    waAction($('[data-wa-slot="atendimento"]'), 'Falar no WhatsApp', function () {
      return 'Olá! Vim pelo site da ' + C.loja.nome + ' e gostaria de atendimento.';
    });

    var wf = $('[data-wa-footer]');
    if (wf) {
      if (waOk) {
        var d = C.loja.whatsapp.replace(/^55/, '');
        wf.appendChild(el('a', { href: waUrl('Olá! Vim pelo site da ' + C.loja.nome + '.'), target: '_blank', rel: 'noopener noreferrer' },
          [icon('i-wa'), '(' + d.slice(0, 2) + ') ' + d.slice(2, -4) + '-' + d.slice(-4)]));
      } else {
        wf.appendChild(document.createTextNode('WhatsApp: '));
        wf.appendChild(valueNode(C.loja.whatsapp));
      }
    }
  })();

  /* ---------- início ---------- */
  renderProducts();
  renderBag();
})();
