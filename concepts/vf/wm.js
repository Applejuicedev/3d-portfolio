import { play } from './sound.js'

// The window manager. A window is opened *from* something — a word, a row, a picture, a button —
// and stays tied to it by a hairline drawn every frame from that thing to the nearest point of the
// window's edge. Windows can be picked up by their bar, brought to the front, tidied into rows and
// closed (the hairline goes with them; a window whose source closed keeps going without one).
const svg = document.getElementById('threads')
export const wins = new Map() // id → { id, w, body, from, line, dot, onClose }
let z = 10, made = 0
const listeners = new Set()
export const onChange = (fn) => listeners.add(fn)
const changed = () => listeners.forEach((fn) => fn(wins))

const clampX = (x, W) => Math.max(8, Math.min(innerWidth - W - 8, x))
// windows stay between the two grid lines under the top bar and over the bottom one
export const TOP = 42, BOTTOM = 42
const clampY = (y, H) => Math.max(TOP, Math.min(innerHeight - H - BOTTOM, y))

// skin: a class that gives the window the look of the tool it stands for (see apps.css)
export function open(id, from, { title, width = 360, height, skin = '', place: spot, build, onClose, minW = 300, minH = 200 }) {
  if (wins.has(id)) { const it = wins.get(id); it.from = from; front(it); play('click'); return it }
  const w = document.createElement('section')
  w.className = 'win' + (skin ? ' skin-' + skin : '')
  w.setAttribute('role', 'dialog'); w.setAttribute('aria-label', title)
  // every window keeps a size below which it would stop making sense (its minW / minH)
  w.dataset.minW = minW; w.dataset.minH = minH
  w.style.minWidth = Math.min(minW, innerWidth - 16) + 'px'; w.style.minHeight = Math.min(minH, innerHeight - 110) + 'px'
  w.style.width = Math.min(Math.max(width, minW), innerWidth - 16) + 'px'; if (height) w.style.height = Math.min(height, innerHeight - 110) + 'px'
  w.innerHTML = `<div class="bar mono"><span class="t"><span class="n">${String(++made).padStart(2, '0')}</span>${title}</span><button class="x" aria-label="Close ${title}"></button></div><div class="body"></div><i class="grip" aria-hidden="true"></i>`
  document.body.appendChild(w)
  const body = w.querySelector('.body')
  const it = { id, w, body, from, onClose }
  w.__build = build // the code that made it (shown by the x-ray lens)
  build?.(body, it)
  place(w, from, spot)
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line'), dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  dot.setAttribute('r', 2.5); svg.append(line, dot); it.line = line; it.dot = dot
  wins.set(id, it); front(it); changed(); play('open')
  w.querySelector('.x').onclick = () => close(id)
  w.addEventListener('pointerdown', () => front(it))
  drag(it); resize(it)
  w.querySelector('.x').focus({ preventScroll: true })
  return it
}

function place(w, from, spot) {
  const r = from.getBoundingClientRect(), W = w.offsetWidth, H = w.offsetHeight
  let x, y
  if (spot) { x = innerWidth * spot[0] - W * spot[0]; y = innerHeight * spot[1] - H * spot[1] }
  else {
    const k = wins.size % 4
    x = r.left + r.width / 2 - W / 2 + (k - 1.5) * 34; y = r.bottom + 34 + k * 14
    if (y + H > innerHeight - 60) y = r.top - H - 34
  }
  x = clampX(x, W); y = clampY(y, H)
  w.style.left = x + 'px'; w.style.top = y + 'px'
  w.style.setProperty('--ox', `${r.left + r.width / 2 - x}px`); w.style.setProperty('--oy', `${r.top + r.height / 2 - y}px`)
}

export function close(id) {
  const it = wins.get(id); if (!it) return
  wins.delete(id); it.line.remove(); it.dot.remove(); it.onClose?.()
  it.w.classList.add('closing'); setTimeout(() => it.w.remove(), 220)
  play('close'); changed()
  if (it.from?.isConnected && !it.from.closest('.win')) it.from.focus?.({ preventScroll: true })
}
export const closeAll = () => [...wins.keys()].forEach(close)
// the window in front is marked, so it can stand a little closer than the rest
export function front(it) { it.w.style.zIndex = ++z; wins.forEach((o) => o.w.classList.toggle('front', o === it)) }
export const topmost = () => [...wins.values()].sort((a, b) => b.w.style.zIndex - a.w.style.zIndex)[0]

export function drag({ w }) {
  const bar = w.querySelector('.bar')
  bar.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button') || e.button > 0) return
    e.preventDefault(); bar.setPointerCapture(e.pointerId); w.classList.remove('glide'); play('grab')
    document.documentElement.classList.add('dragging') // no text gets selected on the way
    const sx = e.clientX - w.offsetLeft, sy = e.clientY - w.offsetTop
    bar.onpointermove = (m) => {
      w.style.left = Math.max(-w.offsetWidth + 70, Math.min(innerWidth - 70, m.clientX - sx)) + 'px'
      w.style.top = Math.max(TOP, Math.min(innerHeight - BOTTOM - 32, m.clientY - sy)) + 'px'
    }
    bar.onpointerup = () => { bar.onpointermove = null; bar.onpointerup = null; play('drop'); document.documentElement.classList.remove('dragging') }
  })
}

// resize: the corner grip pulls the window larger or smaller; with the keyboard, Alt + arrows
export function resize({ w }) {
  const MIN_W = Math.min(+w.dataset.minW, innerWidth - 16), MIN_H = Math.min(+w.dataset.minH, innerHeight - 110)
  const grip = w.querySelector('.grip')
  const set = (W, H) => {
    w.style.width = Math.max(MIN_W, Math.min(innerWidth - w.offsetLeft - 8, W)) + 'px'
    w.style.height = Math.max(MIN_H, Math.min(innerHeight - w.offsetTop - BOTTOM, H)) + 'px'
    w.style.maxHeight = 'none'
  }
  grip.addEventListener('pointerdown', (e) => {
    e.stopPropagation(); e.preventDefault(); grip.setPointerCapture(e.pointerId); w.classList.remove('glide'); play('grab')
    document.documentElement.classList.add('dragging')
    const sx = e.clientX, sy = e.clientY, W = w.offsetWidth, H = w.offsetHeight
    grip.onpointermove = (m) => set(W + m.clientX - sx, H + m.clientY - sy)
    grip.onpointerup = () => { grip.onpointermove = null; grip.onpointerup = null; play('drop'); document.documentElement.classList.remove('dragging') }
  })
  w.addEventListener('keydown', (e) => {
    if (!e.altKey || !e.key.startsWith('Arrow')) return
    e.preventDefault(); const d = e.shiftKey ? 80 : 24
    set(w.offsetWidth + (e.key === 'ArrowRight' ? d : e.key === 'ArrowLeft' ? -d : 0), w.offsetHeight + (e.key === 'ArrowDown' ? d : e.key === 'ArrowUp' ? -d : 0))
  })
}

// tidy: every window glides into rows along the top, in the order they were opened
export function tidy() {
  let x = 10, y = TOP, rowH = 0
  ;[...wins.values()].forEach(({ w }) => {
    const W = w.offsetWidth, H = Math.min(w.offsetHeight, innerHeight * 0.55)
    if (x + W > innerWidth - 10 && x > 10) { x = 10; y += rowH + 12; rowH = 0 }
    w.classList.add('glide'); w.style.left = x + 'px'; w.style.top = clampY(y, H) + 'px'
    x += W + 12; rowH = Math.max(rowH, H)
  })
  if (wins.size) play('tidy')
}

// the hairlines, every frame
;(function threads() {
  wins.forEach(({ w, from, line, dot }) => {
    const gone = !from || !from.isConnected || from.closest('.win.closing') || from.getClientRects().length === 0
    line.style.display = dot.style.display = gone ? 'none' : ''
    if (gone) return
    const s = from.getBoundingClientRect(), b = w.getBoundingClientRect()
    const ax = s.left + s.width / 2, ay = b.top > s.bottom ? s.bottom - 1 : b.bottom < s.top ? s.top + 1 : s.top + s.height / 2
    const bx = Math.max(b.left, Math.min(b.right, ax)), by = Math.max(b.top, Math.min(b.bottom, ay))
    line.setAttribute('x1', ax); line.setAttribute('y1', ay); line.setAttribute('x2', bx); line.setAttribute('y2', by)
    dot.setAttribute('cx', ax); dot.setAttribute('cy', ay)
  })
  requestAnimationFrame(threads)
})()
