import { drag, resize } from './wm.js'

// X-ray. Under the design lies the code. Rest the pointer on anything and a fine ring fills around
// it; once full, a round lens opens and shows — in place — the actual code that runs when you click
// that very thing: the function that builds a window, the one that drags it by its bar, the one that
// resizes it at the grip; on the empty desk, the code of this lens. While you rest, the code scrolls
// slowly past; move on and the lens closes. Nothing appears while you just move the pointer. On a
// touch screen a long press does the same (see below).
const sources = new Map() // key → function (its real source is what the lens shows)
export const sourceOf = (key, fn) => sources.set(key, fn)

const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
{
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  const R = 130, DELAY = 600, DWELL = 1200 // rest 0.6 s before the ring starts, 1.2 s more to fill it
  const root = document.createElement('div')
  root.id = 'xray'; root.setAttribute('aria-hidden', 'true')
  root.innerHTML = `<svg class="xr-ring" width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" /></svg>
    <div class="xr-lens"><pre></pre></div><p class="xr-cap"></p>`
  document.body.appendChild(root)
  const ring = root.querySelector('.xr-ring'), arc = ring.querySelector('circle'), lens = root.querySelector('.xr-lens'), pre = lens.querySelector('pre'), cap = root.querySelector('.xr-cap')
  const C = 2 * Math.PI * 18
  arc.style.strokeDasharray = C

  // what the thing under the pointer would run
  function find(el) {
    // the story is for looking at, not into: no lens there
    if (!el || el.tagName === 'IFRAME' || document.getElementById('story')) return null
    const win = el.closest('.win')
    if (el.closest('.grip')) return ['resize', resize]
    if (win && el.closest('.bar')) return ['drag', drag]
    const opener = el.closest('[data-open]')
    if (opener && sources.has('open:' + opener.dataset.open)) return [opener.dataset.open, sources.get('open:' + opener.dataset.open)]
    const keyed = el.closest('[data-src]')
    if (keyed && sources.has(keyed.dataset.src)) return [keyed.dataset.src, sources.get(keyed.dataset.src)]
    if (win?.__build) return [win.getAttribute('aria-label'), win.__build]
    if (el.closest('header, footer')) return null
    return ['x-ray', frame]
  }
  // a little colour: comments quiet, strings and keywords marked
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
  const paint = (code) => esc(code)
    .replace(/(\/\/[^\n]*)/g, '<i>$1</i>')
    .replace(/(`[^`]*`|'[^'\n]*')/g, '<s>$1</s>')
    .replace(/\b(const|let|return|if|else|function|new|for|of|await|async|export|import)\b/g, '<b>$1</b>')

  let x = -999, y = -999, restX = 0, restY = 0, restAt = 0, openKey = null, scroll = 0, over = true
  if (fine) {
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY; over = true
    if (Math.hypot(x - restX, y - restY) > 6) { restX = x; restY = y; restAt = performance.now(); if (openKey) close() }
  }, { passive: true })
  addEventListener('pointerdown', () => { restAt = performance.now() + 1e9; if (openKey) close() })
  document.addEventListener('pointerout', (e) => { if (!e.relatedTarget) { over = false; close() } })
  // a page inside a window (a project preview) takes the pointer with it: this page no longer hears it
  // move, so it must not think it is resting at the edge — the lens waits until it comes back
  document.addEventListener('pointerover', (e) => { if (e.target.tagName === 'IFRAME') { over = false; close() } })

  }

  // touch screens: there is no resting pointer, so the lens answers a long press instead. Hold a
  // finger on anything: the ring fills just above the finger, then the lens opens above it (where the
  // finger doesn't cover it) and stays; the next tap anywhere closes it — and does nothing else.
  let holdAt = 0, hx = 0, hy = 0, swallow = false
  const lensAt = (px, py) => {
    const W = innerWidth, H = innerHeight, r = Math.min(R, W / 2 - 12)
    lens.style.setProperty('--r', r + 'px')
    x = Math.max(r + 12, Math.min(W - r - 12, px)); y = Math.max(r + 60, Math.min(H - r - 70, py - r - 60))
  }
  if (!fine) {
    addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return
      if (openKey) { close(); swallow = true; return }
      if (document.getElementById('story') || e.target.closest('iframe, input, textarea, .ring, canvas')) return
      hx = e.clientX; hy = e.clientY; holdAt = performance.now(); x = hx; y = hy - 56
    }, true)
    addEventListener('pointermove', (e) => { if (holdAt && Math.hypot(e.clientX - hx, e.clientY - hy) > 10) holdAt = 0 }, true)
    ;['pointerup', 'pointercancel'].forEach((t) => addEventListener(t, () => { holdAt = 0 }, true))
    addEventListener('click', (e) => { if (swallow) { e.preventDefault(); e.stopPropagation(); swallow = false } }, true)
    addEventListener('contextmenu', (e) => { if (holdAt || openKey) e.preventDefault() }, true)
  }

  function show(key, fn) {
    openKey = key; scroll = 0
    pre.innerHTML = paint(String(fn))
    cap.textContent = key === 'x-ray' ? 'this lens — xray.js' : key === 'drag' || key === 'resize' ? `while you pull → ${fn.name}()` : `on click → ${fn.name || key}()`
    root.classList.add('open')
  }
  function close() { openKey = null; root.classList.remove('open') }

  function frame(now) {
    // a touch screen with nothing held and nothing open: look again in a moment, touch nothing
    if (!fine && !holdAt && !openKey) { ring.style.opacity = 0; return setTimeout(() => requestAnimationFrame(frame), 100) }
    // where the ring and the lens stand: on the pointer
    root.style.setProperty('--x', x + 'px'); root.style.setProperty('--y', y + 'px')
    const resting = fine ? over && !openKey && now - restAt > DELAY && !document.getElementById('story') : holdAt > 0 && !openKey
    const p = !resting ? 0 : fine ? Math.min(1, (now - restAt - DELAY) / DWELL) : Math.min(1, (now - holdAt - 120) / 480)
    arc.style.strokeDashoffset = C * (1 - p)
    ring.style.opacity = resting && p > 0 && p < 1 ? 1 : 0
    if (p >= 1 && !openKey) {
      const hit = find(document.elementFromPoint(fine ? x : hx, fine ? y : hy))
      if (hit && !fine) { holdAt = 0; swallow = true; lensAt(hx, hy); navigator.vibrate?.(8) }
      if (hit) show(...hit); else if (fine) restAt = now + 1e9; else holdAt = 0
    }
    if (openKey && !still) { scroll += 0.35; pre.style.transform = `translateY(${R * 0.55 - scroll}px)`; if (scroll > pre.scrollHeight) scroll = -R }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
  lens.style.setProperty('--r', R + 'px')
}
