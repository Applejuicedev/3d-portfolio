import { play } from './sound.js'
import { ME, RESUME, STORY, ytId } from './data.js'
import { SHEETS } from './wm.js'

// The story: what the résumé doesn't say. The desk dims, and scrolling (wheel, swipe, ↓ / ↑, space)
// pulls one window after another up from below into a cascade, each the same step further on, so
// every title bar stays in sight and can be clicked; the small ones land elsewhere on the screen. These are the hard ones — black,
// steel, silver, white, in turn, on the graphite desk. Scroll back and they go down again; Esc or the close button and the desk returns.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const QUESTIONS = ['Why does every portfolio look the same?', 'Can a sentence be a homepage?', 'What if you could see the code?', 'How small can an interface get?', 'What does a click sound like?', 'Who decided websites scroll down?']

function slot(s, ratio = '16 / 9', bare = false) {
  const id = s.youtube ? ytId(s.youtube) : ''
  if (id) return `<div class="st-media" style="aspect-ratio:${ratio}" data-yt="${id}" data-start="${s.start ?? 0}"></div>`
  if (s.video) return `<video class="st-media" style="aspect-ratio:${ratio};object-fit:cover" src="${s.video}"${s.poster ? ` poster="${s.poster}"` : ''} data-label="${esc(s.label ?? s.title)}" muted loop playsinline controls preload="metadata" data-autoplay></video>${bare ? '' : `<p class="st-cap mono">${esc(s.label)}</p>`}`
  if (s.image) return `<img class="st-media" style="aspect-ratio:${ratio};object-fit:contain;background:#000" src="${s.image}" alt="">`
  if (bare) return `<div class="st-media st-empty" style="aspect-ratio:${ratio}" title="${esc(s.note)}"></div>`
  return `<div class="st-media st-empty" style="aspect-ratio:${ratio}"><span>${esc(s.label ?? s.title)}</span><small>${esc(s.note)}</small></div>`
}
const service = RESUME.find((r) => /soldier/i.test(r[1]))

const CARDS = [
  { title: 'story.txt', w: 420, html: `<p class="eyebrow">story.txt</p><p class="title">What the résumé <i>doesn't say.</i></p><p class="lead text">Keep scrolling — every turn of the wheel brings one more window up.</p>` },
  { title: 'questions.mov', w: 560, bg: '#0a0b0c', ink: '#eef0f1', bare: true, html: `<div class="st-player"><canvas></canvas><div class="st-ctl mono"><button class="st-pp" aria-label="Pause">❚❚</button><i class="st-bar"><b></b></i></div></div>`, build: questions },
  { title: STORY.music.title, w: 520, bg: '#b9bec2', ink: '#121416', bare: true, html: slot(STORY.music, '16 / 9', true) },
  { title: STORY.service.title, w: 460, bg: '#2a2e31', ink: '#eef0f1', html: `<p class="eyebrow">${esc(service?.[0] ?? '')}</p><p class="title">${esc(service?.[1] ?? '')}</p><p class="lead text">${esc(service?.[2] ?? '')} — ${esc(service?.[3] ?? '')}</p>${slot(STORY.service, '16 / 10')}` },
  { title: STORY.discipline.title, w: 520, bg: '#eef0f1', ink: '#121416', bare: true, html: slot(STORY.discipline, '4 / 3', true) },
  { title: STORY.heroes.title, w: 480, bg: '#4b5054', ink: '#eef0f1', html: `<p class="eyebrow">people whose work I look at</p><div class="st-grid">${STORY.heroes.images.map((h) => (h.src ? `<figure><img src="${h.src}" alt="${esc(h.name)}" title="${esc(h.name)}${h.credit ? ` — photo: ${esc(h.credit)}, ${esc(h.license)}` : ''}"><figcaption class="mono">${esc(h.name)}</figcaption></figure>` : `<figure><i></i><figcaption class="mono">${esc(h.name)}</figcaption></figure>`)).join('')}</div><p class="st-note">Photos: ${STORY.heroes.images.filter((h) => h.page).map((h) => `<a href="${h.page}" target="_blank" rel="noopener">${esc(h.credit)}</a> (${esc(h.license)})`).join(', ')} — via Wikimedia Commons.</p>` },
  { title: 'end.txt', w: 400, html: `<p class="eyebrow">end.txt</p><p class="title">That's the story.</p><p class="lead text">Click a window to bring it forward, double-click to look closer. Esc or “close story” — and you're back at the desk.</p><p style="margin-top:14px"><a class="btn" href="mailto:${ME.email}">say hello →</a></p>` },
]
export function story() {
  if (document.getElementById('story')) return
  const el = document.createElement('div')
  el.id = 'story'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Story')
  el.innerHTML = `<p class="st-hint mono">${SHEETS.matches ? 'swipe up for the next window · down to go back · tap one to bring it forward' : 'scroll ↓ · drag a window by its bar · click to bring it forward · double-click to look closer · esc'}</p><button class="st-close mono">close story</button>` + CARDS.map((c, i) =>
    `<section class="win st-card" data-i="${i}" tabindex="0" style="${c.bg ? `--surface-win:${c.bg};--text-primary:${c.ink};--text-secondary:color-mix(in srgb, ${c.ink} 80%, transparent);--text-tertiary:color-mix(in srgb, ${c.ink} 58%, transparent);--border:color-mix(in srgb, ${c.ink} 14%, transparent);--border-strong:color-mix(in srgb, ${c.ink} 26%, transparent);--ink:${c.ink};--mute:var(--text-tertiary);--line:var(--border);color:${c.ink}` : ''}">
      <div class="bar mono"><span class="t"><span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(c.title)}</span></div><div class="body ${c.bare ? 'st-bare' : 'pad'}">${c.html}</div></section>`).join('')
  document.body.appendChild(el)
  // media that isn't there (recordings of other people's work are kept off the public site): a
  // video becomes a quiet card with its title and a way to find it on YouTube; a missing portrait
  // simply leaves the grid
  const missing = (v) => {
    const label = v.dataset.label, d = document.createElement('div')
    d.className = 'st-media st-empty'; d.style.aspectRatio = v.style.aspectRatio
    d.innerHTML = `<span>${esc(label)}</span><small><a class="link" href="https://www.youtube.com/results?search_query=${encodeURIComponent(label)}" target="_blank" rel="noopener">watch on YouTube ↗</a></small>`
    v.replaceWith(d)
  }
  el.querySelectorAll('video.st-media').forEach((v) => { if (v.error) missing(v); else v.addEventListener('error', () => missing(v)) })
  el.querySelectorAll('.st-grid img').forEach((img) => { const gone = () => img.closest('figure')?.remove(); if (img.complete && !img.naturalWidth) gone(); else img.addEventListener('error', gone) })
  const cards = [...el.querySelectorAll('.st-card')]
  const cleanups = []
  cards.forEach((c, i) => CARDS[i].build && cleanups.push(CARDS[i].build(c)))
  requestAnimationFrame(() => el.classList.add('on'))
  play('open')

  // the arrangement, as a desktop would have it: the large windows cascade — each one the same step
  // further right and down than the last, so every title bar stays in sight and can be clicked —
  // while the small ones (the first and the last) turn up on their own elsewhere on the screen
  const SMALL = [0, CARDS.length - 1]
  let slots = []
  function layout() {
    // phones: a deck — every window full width, each one a title bar lower than the last, and
    // lifted (or scaled) just enough to stand wholly on the screen when it is the one on top
    if (SHEETS.matches) {
      const W = innerWidth, H = innerHeight, top = 64, step = 30, bottom = 56
      cards.forEach((c) => (c.style.width = W - 20 + 'px'))
      slots = cards.map((c, i) => {
        const h = c.offsetHeight, room = H - top - bottom, s = Math.min(1, room / h)
        return [(W - c.offsetWidth * s) / 2, Math.max(top, Math.min(top + i * step, H - bottom - h * s)), h, s]
      })
      return
    }
    const W = innerWidth, H = innerHeight, top = 96, bottom = 52 // (below the close button)
    const big = cards.filter((_, i) => !SMALL.includes(i)), n = big.length
    const dx = W < 700 ? 14 : 38, dy = 36
    const bw = Math.min(500, W - 32 - dx * (n - 1)), sw = Math.min(300, W - 32)
    cards.forEach((c, i) => (c.style.width = (SMALL.includes(i) ? sw : bw) + 'px'))
    const tallest = Math.max(...big.map((c) => c.offsetHeight))
    const spanW = bw + dx * (n - 1), spanH = tallest + dy * (n - 1)
    const ox = (W - spanW) / 2, oy = Math.max(top, (H - spanH) / 2)
    let k = 0
    slots = cards.map((c, i) => {
      if (i === SMALL[0]) return [Math.max(16, W * 0.04), top + 8, c.offsetHeight]
      if (i === SMALL[1]) return [W - sw - Math.max(16, W * 0.04), H - bottom - c.offsetHeight - 8, c.offsetHeight]
      const at = [ox + k * dx, oy + k * dy, c.offsetHeight]; k++; return at
    })
  }
  layout(); addEventListener('resize', layout)

  // like any desktop: a click brings a window to the front; a double click brings it up close in the
  // middle, another double click (or Esc) puts it back
  let focused = -1, z = 10
  const order = cards.map((_, i) => 10 + i)
  // and its title bar picks it up: a window dragged somewhere stays there (manual[i])
  const manual = []
  cards.forEach((c, i) => {
    c.addEventListener('pointerdown', (e) => { if (!e.target.closest('a, button, iframe, input, .st-ctl')) { order[i] = ++z + cards.length; play('click') } })
    const bar = c.querySelector('.bar')
    bar.addEventListener('pointerdown', (e) => {
      if (e.button > 0 || focused >= 0 || p - i < 0.95 || SHEETS.matches) return
      e.preventDefault(); bar.setPointerCapture(e.pointerId); document.documentElement.classList.add('dragging'); play('grab')
      const q = cur[i], ox = e.clientX - q.x, oy = e.clientY - q.y
      bar.onpointermove = (m) => {
        const x = Math.max(-c.offsetWidth + 80, Math.min(innerWidth - 80, m.clientX - ox)), y = Math.max(40, Math.min(innerHeight - 70, m.clientY - oy))
        manual[i] = [x, y]; q.x = x; q.y = y
      }
      bar.onpointerup = () => { bar.onpointermove = bar.onpointerup = null; document.documentElement.classList.remove('dragging'); play('drop') }
    })
    c.addEventListener('dblclick', (e) => { if (e.target.closest('a, button, iframe, input, .st-ctl')) return; focused = focused === i ? -1 : i; play(focused === i ? 'open' : 'close') })
  })

  let p = 0.35, want = 1, risen = 0
  const N = CARDS.length
  const go = (d) => { if (focused < 0) want = Math.max(0, Math.min(N, want + d)) }
  const wheel = (e) => { e.preventDefault(); go(e.deltaY / 520) }
  let ty = null
  const tstart = (e) => { ty = e.touches[0].clientY }
  const tmove = (e) => { e.preventDefault(); go((ty - e.touches[0].clientY) / 260); ty = e.touches[0].clientY }
  const key = (e) => {
    if (e.key === 'Escape') { if (focused >= 0) { focused = -1; play('close') } else shut(); return }
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1) }
    if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1) }
  }
  // the whole screen scrolls the story while it is open, wherever the pointer is
  addEventListener('wheel', wheel, { passive: false })
  addEventListener('touchstart', tstart, { passive: true }); addEventListener('touchmove', tmove, { passive: false })
  addEventListener('keydown', key, true)
  el.querySelector('.st-close').onclick = shut

  let alive = true
  const cur = cards.map(() => ({ x: 0, y: 0, s: 1 }))
  function frame() {
    if (!alive) return
    p += (want - p) * 0.1
    const W = innerWidth, H = innerHeight
    cards.forEach((c, i) => {
      const t = Math.max(0, Math.min(1, p - i)), e = 1 - Math.pow(1 - t, 3)
      const [sx, sy, sh] = manual[i] ? [...manual[i], slots[i][2]] : slots[i]
      let tx = sx, ty2 = sy + (1 - e) * H * 1.1, ts = (!manual[i] && slots[i][3]) || 1
      if (focused === i) { const cw = c.offsetWidth; ts = Math.min(1.9, (W * 0.62) / cw, (H * 0.78) / sh); tx = (W - cw * ts) / 2; ty2 = (H - sh * ts) / 2 }
      const q = cur[i]; q.x += (tx - q.x) * 0.16; q.y += (ty2 - q.y) * 0.16; q.s += (ts - q.s) * 0.16
      c.style.transform = `translate(${q.x}px, ${q.y}px) scale(${q.s})`
      c.style.zIndex = focused === i ? 10000 : order[i]
      c.style.opacity = focused >= 0 && focused !== i ? 0.35 : 1
      // YouTube players load only once their window has come up
      // a video file starts once its window has come up, muted (its controls unmute it)
      if (t > 0.6) c.querySelectorAll('video[data-autoplay]:not(.on)').forEach((v) => { v.classList.add('on'); v.play().catch(() => {}) })
      if (t > 0.6) c.querySelectorAll('[data-yt]:not(.on)').forEach((m) => { m.classList.add('on'); m.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${m.dataset.yt}?autoplay=1&mute=1&loop=1&playlist=${m.dataset.yt}&start=${m.dataset.start}&playsinline=1&rel=0&modestbranding=1" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` })
    })
    const up = Math.floor(p + 0.15)
    if (up > risen && up <= N) { risen = up; play('rise') } else if (up < risen) risen = up
    el.querySelector('.st-hint').style.opacity = p > N - 0.3 ? 0 : 1
    requestAnimationFrame(frame)
  }
  // all start below the screen, in their columns
  cards.forEach((c, i) => { cur[i].x = slots[i][0]; cur[i].y = slots[i][1] + innerHeight * 1.1 })
  frame()

  function shut() {
    if (!alive) return
    alive = false; play('close')
    removeEventListener('keydown', key, true); removeEventListener('wheel', wheel); removeEventListener('touchstart', tstart); removeEventListener('touchmove', tmove); removeEventListener('resize', layout)
    cleanups.forEach((f) => f?.())
    el.classList.remove('on'); setTimeout(() => el.remove(), 450)
  }
}

// questions.mov — not a file: a small generative film, drawn live. Three soft lights drift over
// graphite; one question after another fades through; a player bar runs along underneath.
function questions(card) {
  const cv = card.querySelector('canvas'), x = cv.getContext('2d'), bar = card.querySelector('.st-bar b'), pp = card.querySelector('.st-pp')
  const LOOP = QUESTIONS.length * 3200
  let t0 = performance.now(), paused = false, pausedAt = 0, alive = true
  pp.onclick = () => { paused = !paused; pp.textContent = paused ? '▶' : '❚❚'; pp.setAttribute('aria-label', paused ? 'Play' : 'Pause'); if (paused) pausedAt = performance.now(); else t0 += performance.now() - pausedAt; play('click') }
  const blobs = [['#5c6266', 0.31, 0.7], ['#3a3f43', 0.47, 1.3], ['#80868b', 0.23, 2.1]]
  function draw(now) {
    if (!alive) return
    const W = cv.clientWidth, H = cv.clientHeight, pr = Math.min(devicePixelRatio || 1, 2)
    if (cv.width !== Math.round(W * pr)) { cv.width = Math.round(W * pr); cv.height = Math.round(H * pr) }
    const t = ((((paused ? pausedAt : now) - t0) % LOOP) + LOOP) % LOOP, s = t / 1000 // (the first frame can stamp a hair before t0)
    x.setTransform(pr, 0, 0, pr, 0, 0)
    x.fillStyle = '#0a0b0c'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'lighter'
    blobs.forEach(([c, sp, ph]) => {
      const bx = W * (0.5 + 0.38 * Math.sin(s * sp + ph)), by = H * (0.5 + 0.34 * Math.cos(s * sp * 1.3 + ph * 2)), r = Math.max(W, H) * 0.42
      const g = x.createRadialGradient(bx, by, 0, bx, by, r); g.addColorStop(0, c + 'aa'); g.addColorStop(1, c + '00'); x.fillStyle = g; x.fillRect(0, 0, W, H)
    })
    x.globalCompositeOperation = 'source-over'
    // the question of the moment, fading in and out within its three seconds
    const qi = Math.floor(t / 3200), qt = (t % 3200) / 3200, a = Math.min(1, qt * 5, (1 - qt) * 5)
    x.globalAlpha = a; x.fillStyle = '#eef0f1'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `500 ${Math.round(W * 0.052)}px -apple-system, BlinkMacSystemFont, Inter, system-ui, sans-serif`
    const words = QUESTIONS[qi].split(' '), lines = []; let line = ''
    words.forEach((w) => { const tryL = line ? line + ' ' + w : w; if (x.measureText(tryL).width > W * 0.78) { lines.push(line); line = w } else line = tryL }); lines.push(line)
    lines.forEach((l, i) => x.fillText(l, W / 2, H / 2 + (i - (lines.length - 1) / 2) * W * 0.064))
    x.globalAlpha = 1
    bar.style.width = (t / LOOP) * 100 + '%'
    requestAnimationFrame(draw)
  }
  requestAnimationFrame(draw)
  return () => { alive = false }
}
