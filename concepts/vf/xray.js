import { drag, resize } from './wm.js'

// X-ray. Under the design lies the code. Rest the pointer on anything and a fine ring fills around
// it; once full, a round lens opens and shows — in place — the actual code that runs when you click
// that very thing: the function that builds a window, the one that drags it by its bar, the one that
// resizes it at the grip; on the empty desk, the code of this lens. While you rest, the code scrolls
// slowly past; move on and the lens closes. Nothing appears while you just move the pointer.
const sources = new Map() // key → function (its real source is what the lens shows)
export const sourceOf = (key, fn) => sources.set(key, fn)

if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
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
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY; over = true
    if (Math.hypot(x - restX, y - restY) > 6) { restX = x; restY = y; restAt = performance.now(); if (openKey) close() }
  }, { passive: true })
  addEventListener('pointerdown', () => { restAt = performance.now() + 1e9; if (openKey) close() })
  document.addEventListener('pointerout', (e) => { if (!e.relatedTarget) { over = false; close() } })
  // a page inside a window (a project preview) takes the pointer with it: this page no longer hears it
  // move, so it must not think it is resting at the edge — the lens waits until it comes back
  document.addEventListener('pointerover', (e) => { if (e.target.tagName === 'IFRAME') { over = false; close() } })

  function show(key, fn) {
    openKey = key; scroll = 0
    pre.innerHTML = paint(String(fn))
    cap.textContent = key === 'x-ray' ? 'this lens — xray.js' : key === 'drag' || key === 'resize' ? `while you pull → ${fn.name}()` : `on click → ${fn.name || key}()`
    root.classList.add('open')
  }
  function close() { openKey = null; root.classList.remove('open') }

  function frame(now) {
    // where the ring and the lens stand: on the pointer
    root.style.setProperty('--x', x + 'px'); root.style.setProperty('--y', y + 'px')
    const resting = over && !openKey && now - restAt > DELAY && !document.getElementById('story')
    const p = resting ? Math.min(1, (now - restAt - DELAY) / DWELL) : 0
    arc.style.strokeDashoffset = C * (1 - p)
    ring.style.opacity = resting && p > 0 && p < 1 ? 1 : 0
    if (p >= 1 && !openKey) {
      const hit = find(document.elementFromPoint(x, y))
      if (hit) show(...hit); else restAt = now + 1e9
    }
    if (openKey && !still) { scroll += 0.35; pre.style.transform = `translateY(${R * 0.55 - scroll}px)`; if (scroll > pre.scrollHeight) scroll = -R }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
  lens.style.setProperty('--r', R + 'px')
}
