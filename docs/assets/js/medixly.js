/* ==========================================================================
   Medixly — shared front-end behaviour
   Plain ES module, no build step, no dependencies.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Icon sprite — injected once, referenced with <svg><use href="#i-name"></use>
   -------------------------------------------------------------------------- */
const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
<symbol id="i-house" viewBox="0 0 24 24"><path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></symbol>
<symbol id="i-pill" viewBox="0 0 24 24"><path d="M10.5 20.5a5.66 5.66 0 0 1-8-8l7-7a5.66 5.66 0 0 1 8 8z"/><path d="m8.5 8.5 7 7"/></symbol>
<symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M4 3v6a5 5 0 0 0 10 0V3"/><path d="M4 3h2M12 3h2"/><path d="M9 14v2a5 5 0 0 0 10 0v-1"/><circle cx="19" cy="12" r="2.5"/></symbol>
<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>
<symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></symbol>
<symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></symbol>
<symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3"/></symbol>
<symbol id="i-paperclip" viewBox="0 0 24 24"><path d="M20 11.5 12 19.4a5 5 0 0 1-7-7l8.2-8.1a3.3 3.3 0 0 1 4.7 4.7L9.6 17.2a1.7 1.7 0 0 1-2.4-2.4l7.6-7.5"/></symbol>
<symbol id="i-pencil" viewBox="0 0 24 24"><path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16z"/></symbol>
<symbol id="i-receipt" viewBox="0 0 24 24"><path d="M5 3h14v18l-2.3-1.6-2.4 1.6-2.3-1.6L9.7 21l-2.4-1.6L5 21z"/><path d="M9 8h6M9 12h6"/></symbol>
<symbol id="i-message-circle" viewBox="0 0 24 24"><path d="M21 11.5A8.4 8.4 0 0 1 12 20a8.9 8.9 0 0 1-4-.9L3 20l1-4.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></symbol>
<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></symbol>
<symbol id="i-repeat" viewBox="0 0 24 24"><path d="M4 9V7a2 2 0 0 1 2-2h11l-3-3m6 9v2a2 2 0 0 1-2 2H7l3 3"/></symbol>
<symbol id="i-syringe" viewBox="0 0 24 24"><path d="m14 4 6 6M17 7l-9 9-4 1 1-4 9-9z"/><path d="m10 11 3 3"/></symbol>
<symbol id="i-file-text" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></symbol>
<symbol id="i-heart-pulse" viewBox="0 0 24 24"><path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.5 2.8c0 5.8-8.5 11.3-8.5 11.3z"/><path d="M4 12h3l2-3 2.5 5 2-3h4.5"/></symbol>
</svg>`;

function injectSprite() {
  if (document.getElementById('mx-sprite')) return;
  const host = document.createElement('div');
  host.id = 'mx-sprite';
  host.innerHTML = SPRITE;
  const svg = host.firstElementChild;
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  document.body.prepend(host);
}

/** Build an <svg> that references a sprite symbol. */
export function icon(name, size = 22) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

/* --------------------------------------------------------------------------
   Nav — rendered from one definition so every page stays in sync
   -------------------------------------------------------------------------- */
const NAV = [
  { id: 'home', href: 'index.html', label: 'Home', icon: 'house' },
  { id: 'prescriptions', href: 'prescriptions.html', label: 'Prescriptions', icon: 'pill' },
  { id: 'clinic', href: 'clinic.html', label: 'Clinic', icon: 'stethoscope' },
  { id: 'account', href: 'profile.html', label: 'Account', icon: 'user' }
];

function renderNav() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;
  const current = nav.dataset.nav;
  nav.innerHTML =
    `<span class="nav__brand">Medixly</span>` +
    NAV.map(item => `
      <a class="nav__link" href="${item.href}"${item.id === current ? ' aria-current="page"' : ''}>
        ${icon(item.icon, 22)}<span>${item.label}</span>
      </a>`).join('');
}

/* --------------------------------------------------------------------------
   Detail sheet — one sheet element per page, filled on demand
   -------------------------------------------------------------------------- */
const TONE_CLASS = {
  sand: 'card--sand', sage: 'card--sage', amber: 'card--amber',
  mist: 'card--mist', clay: 'card--clay', slate: 'card--slate'
};

let sheetEl = null;
let lastFocus = null;
let sourceCard = null;
let sheetAnimations = [];
let closingSheet = false;
let backgroundState = [];
let bodyStyle = null;
let scrollPosition = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sheetMotion = { duration: 620, easing: 'cubic-bezier(.22, 1, .36, 1)' };

function cancelSheetAnimations() {
  sheetAnimations.forEach(animation => animation.cancel());
  sheetAnimations = [];
}

// FLIP the detail surface from the tapped card's actual on-screen rectangle.
// Re-read on close so returning still works after rotation or a viewport resize.
function cardTransform(panel) {
  if (!sourceCard?.isConnected) return null;
  const card = sourceCard.getBoundingClientRect();
  const target = panel.getBoundingClientRect();
  if (!card.width || !card.height || !target.width || !target.height) return null;
  return `translate(${card.left - target.left}px, ${card.top - target.top}px) scale(${card.width / target.width}, ${card.height / target.height})`;
}

function lockBackground() {
  scrollPosition = window.scrollY;
  const properties = ['position', 'top', 'width', 'overflow'];
  bodyStyle = properties.map(name => [name, document.body.style.getPropertyValue(name)]);
  Object.assign(document.body.style, { position: 'fixed', top: `-${scrollPosition}px`, width: '100%', overflow: 'hidden' });
  backgroundState = [...document.body.children]
    .filter(el => el !== sheetEl && !['SCRIPT', 'STYLE'].includes(el.tagName))
    .map(el => [el, el.inert]);
  backgroundState.forEach(([el]) => { el.inert = true; });
}

function unlockBackground() {
  backgroundState.forEach(([el, inert]) => { el.inert = inert; });
  backgroundState = [];
  bodyStyle?.forEach(([name, value]) => {
    if (value) document.body.style.setProperty(name, value);
    else document.body.style.removeProperty(name);
  });
  bodyStyle = null;
  window.scrollTo({ top: scrollPosition, behavior: 'instant' });
}

function ensureSheet() {
  if (sheetEl) return sheetEl;
  sheetEl = document.createElement('div');
  sheetEl.className = 'sheet';
  sheetEl.dataset.open = 'false';
  sheetEl.setAttribute('role', 'dialog');
  sheetEl.setAttribute('aria-modal', 'true');
  sheetEl.setAttribute('aria-labelledby', 'service-detail-title');
  sheetEl.hidden = true;
  sheetEl.innerHTML = `<div class="sheet__panel"><span class="grain-overlay"></span><div class="sheet__content"></div></div>`;
  sheetEl.addEventListener('click', e => { if (e.target === sheetEl) closeSheet(); });
  document.addEventListener('keydown', e => {
    if (sheetEl.dataset.open !== 'true') return;
    if (e.key === 'Escape') { e.preventDefault(); closeSheet(); }
    if (e.key !== 'Tab') return;
    const controls = [...sheetEl.querySelectorAll('button, a[href]')];
    const first = controls[0];
    const last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  document.body.appendChild(sheetEl);
  return sheetEl;
}

export function openSheet(detail, card = null) {
  const el = ensureSheet();
  if (el.dataset.open === 'true') return;
  const panel = el.querySelector('.sheet__panel');
  lastFocus = card || document.activeElement;
  sourceCard = card;
  closingSheet = false;
  cancelSheetAnimations();

  panel.className = 'sheet__panel ' + (TONE_CLASS[detail.tone] || 'card--sand');
  panel.querySelector('.sheet__content').innerHTML = `
    <div class="sheet__head">
      <span class="overline" style="color:inherit;opacity:.7">${detail.kicker}</span>
      <button class="icon-btn btn--on-color" data-close aria-label="Close">${icon('x', 18)}</button>
    </div>
    <h2 class="sheet__title" id="service-detail-title">${detail.title}</h2>
    <p class="sheet__meta">${detail.meta}</p>
    <div class="sheet__rows">
      ${detail.rows.map(([l, v]) => `<div class="sheet__row"><span>${l}</span><span>${v}</span></div>`).join('')}
    </div>
    <div class="sheet__foot">
      <a class="btn btn--on-color btn--full" href="${detail.href || '#'}">${detail.actionLabel} ${icon('arrow-right', 18)}</a>
      <div class="trust">${icon('lock', 14)}<span>Sent securely via Hushmail for Healthcare</span></div>
    </div>`;

  panel.querySelector('[data-close]').addEventListener('click', closeSheet);
  el.hidden = false;
  el.dataset.closing = 'false';
  el.dataset.open = 'true';
  lockBackground();
  panel.scrollTop = 0;
  const from = cardTransform(panel);
  sourceCard?.classList.add('card--expanded');
  if (!reducedMotion.matches && typeof panel.animate === 'function') {
    sheetAnimations.push(panel.animate([
      { transform: from || 'translateY(24px)', borderRadius: '22px' },
      { transform: 'none', borderRadius: getComputedStyle(panel).borderRadius }
    ], sheetMotion));
    sheetAnimations.push(panel.querySelector('.sheet__content').animate([
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'none' }
    ], { duration: 300, delay: 140, fill: 'backwards', easing: sheetMotion.easing }));
  }
  panel.querySelector('[data-close]').focus({ preventScroll: true });
}

export async function closeSheet() {
  if (!sheetEl || sheetEl.dataset.open !== 'true' || closingSheet) return;
  closingSheet = true;
  const panel = sheetEl.querySelector('.sheet__panel');
  const currentTransform = getComputedStyle(panel).transform;
  const currentRadius = getComputedStyle(panel).borderRadius;
  const content = panel.querySelector('.sheet__content');
  const currentOpacity = getComputedStyle(content).opacity;
  cancelSheetAnimations();
  const to = cardTransform(panel);
  sheetEl.dataset.closing = 'true';
  if (!reducedMotion.matches && typeof panel.animate === 'function') {
    const collapse = panel.animate([
      { transform: currentTransform, borderRadius: currentRadius },
      { transform: to || 'translateY(24px)', borderRadius: '22px' }
    ], { ...sheetMotion, duration: 480, fill: 'forwards' });
    sheetAnimations.push(collapse, content.animate([
      { opacity: currentOpacity }, { opacity: 0 }
    ], { duration: 130, fill: 'forwards' }));
    await collapse.finished.catch(() => {});
  }
  sheetEl.dataset.open = 'false';
  sheetEl.hidden = true;
  cancelSheetAnimations();
  sourceCard?.classList.remove('card--expanded');
  unlockBackground();
  if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  sourceCard = null;
  closingSheet = false;
}

/* --------------------------------------------------------------------------
   Card grids — build from data so markup stays short and consistent
   -------------------------------------------------------------------------- */
function wireWallet(host) {
  const viewport = host.closest('.wallet-scroll');
  if (!viewport) return;
  const cards = [...host.querySelectorAll('.card')];
  const stage = document.createElement('div');
  stage.className = 'wallet-stage';
  stage.append(...cards);
  host.appendChild(stage);
  host.dataset.motion = 'ready';
  let stride = 86;
  let peek = 12;
  let range = 0;
  let frame = 0;

  function draw() {
    frame = 0;
    const scroll = Math.max(0, Math.min(range, viewport.scrollTop));
    cards.forEach((card, index) => {
      const natural = index * stride - scroll;
      const tucked = index * peek;
      const y = Math.max(tucked, natural);
      const depth = Math.max(0, (tucked - natural) / stride);
      card.style.setProperty('--wallet-y', `${y}px`);
      card.style.setProperty('--wallet-scale', reducedMotion.matches ? '1' : String(1 - Math.min(.06, depth * .012)));
    });
  }

  function measure() {
    const progress = range ? viewport.scrollTop / range : 0;
    const height = viewport.clientHeight;
    if (!height) return;
    const cardHeight = Math.max(160, Math.min(300, viewport.clientWidth * .68, height * .7));
    // Leave a readable title strip on every card before it tucks into the deck.
    const titleHeight = Math.max(...cards.map(card => card.querySelector('.card__title').offsetHeight));
    stride = Math.max(78, titleHeight + 34);
    peek = Math.max(0, Math.min(12, (height - cardHeight - 16) / Math.max(1, cards.length - 1)));
    range = Math.max(0, (cards.length - 1) * (stride - peek));
    stage.style.height = `${height}px`;
    host.style.height = `${height + range}px`;
    host.style.setProperty('--wallet-card-height', `${cardHeight}px`);
    viewport.scrollTop = Math.min(range, progress * range);
    draw();
  }

  viewport.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(draw);
  }, { passive: true });
  cards.forEach((card, index) => card.addEventListener('focus', () => {
    if (!card.matches(':focus-visible') || sheetEl?.dataset.open === 'true') return;
    viewport.scrollTo({ top: index * (stride - peek), behavior: 'instant' });
    draw();
  }));
  new ResizeObserver(measure).observe(viewport);
  reducedMotion.addEventListener('change', draw);
  document.fonts.ready.then(measure);
  measure();
}

export function renderCards(host, items) {
  if (!host) return;
  host.innerHTML = items.map((it, i) => `
    <button type="button" class="card ${TONE_CLASS[it.tone] || ''}" style="--card-index:${i}" data-i="${i}"${it.detail ? ' aria-haspopup="dialog"' : ''}>
      <span class="grain-overlay"></span>
      ${it.icon ? `<span class="card__icon">${icon(it.icon, 24)}</span>` : ''}
      <span class="card__title">${it.title}</span>
      <span class="card__meta">${it.meta}</span>
    </button>`).join('');

  host.querySelectorAll('.card').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items[Number(btn.dataset.i)];
      if (item.detail) openSheet({ tone: item.tone, ...item.detail }, btn);
      else if (item.href) window.location.href = item.href;
    });
  });
  if (host.classList.contains('stack--wallet')) wireWallet(host);
}

/* --------------------------------------------------------------------------
   Toggle switches
   -------------------------------------------------------------------------- */
function wireSwitches() {
  document.querySelectorAll('.switch').forEach(sw => {
    sw.addEventListener('click', () => {
      sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
  });
}

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
function boot() {
  injectSprite();
  renderNav();
  wireSwitches();
  document.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = icon(el.dataset.icon, Number(el.dataset.iconSize) || 22) + el.innerHTML;
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
