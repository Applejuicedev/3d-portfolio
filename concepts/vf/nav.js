import { play } from './sound.js'

// The index: a ring with a point in it, small, in the lower right corner — an instrument rather than
// a menu bar. Opened, it lays out four strands (work, about, play, desk) along a spiral that winds up
// and to the left, each further out and higher than the last; they come out one after the other and
// go back in reverse. A strand, chosen, runs its few tools out to the left along a hairline; the other
// strands step back. Esc folds the strand first, then the index; a click elsewhere or choosing a tool
// folds everything. Opening it also brings up the meta layer that otherwise stays out of sight: the
// settings and the stack along the top, the local times along the bottom. The settings come up on
// their own, too, when the pointer goes near the top edge (or focus moves into them).
const root = document.documentElement, topBar = document.getElementById('top')
const box = document.getElementById('compass'), btn = document.getElementById('compass-btn')
const strands = [...document.querySelectorAll('#tools .strand')]
const heads = strands.map((s) => s.querySelector('.st-btn'))
const tools = [...document.querySelectorAll('#tools .subs button')]
const n = strands.length
strands.forEach((el, i) => {
  const a = ((196 + i * (64 / (n - 1))) * Math.PI) / 180, r = 120 + i * 22
  el.style.setProperty('--tx', `${(Math.cos(a) * r).toFixed(1)}px`)
  el.style.setProperty('--ty', `${(Math.sin(a) * r).toFixed(1)}px`)
  el.style.setProperty('--in', `${i * 40}ms`); el.style.setProperty('--out', `${(n - 1 - i) * 26}ms`)
  ;[...el.querySelectorAll('.subs button')].forEach((t, j) => t.style.setProperty('--j', j))
})
const focusable = () => {
  const open = box.classList.contains('open')
  heads.forEach((h) => (h.tabIndex = open ? 0 : -1))
  strands.forEach((s) => s.querySelectorAll('.subs button').forEach((t) => (t.tabIndex = open && s.classList.contains('on') ? 0 : -1)))
}

export function setStrand(i) {
  strands.forEach((s, k) => { s.classList.toggle('on', k === i); heads[k].setAttribute('aria-expanded', String(k === i)) })
  box.classList.toggle('deep', i >= 0); focusable()
}
export function setOpen(open) {
  if (open === box.classList.contains('open')) return
  box.classList.toggle('open', open); root.classList.toggle('reveal', open); btn.setAttribute('aria-expanded', String(open))
  btn.querySelector('span').textContent = open ? 'close' : 'index'
  if (!open) setStrand(-1)
  focusable(); play(open ? 'open' : 'close')
  if (open) heads[0].focus({ preventScroll: true })
}
// open the index on the strand that holds a tool (for the autopilot, which shows people the way)
export function reveal(tool) {
  setOpen(true); setStrand(strands.findIndex((s) => s.contains(tool)))
}
btn.addEventListener('click', () => setOpen(!box.classList.contains('open')))
heads.forEach((h, i) => h.addEventListener('click', () => {
  const on = strands[i].classList.contains('on')
  setStrand(on ? -1 : i); play(on ? 'close' : 'open')
  if (!on) strands[i].querySelector('.subs button').focus({ preventScroll: true })
}))
tools.forEach((el) => el.addEventListener('click', () => setTimeout(() => setOpen(false), 60)))
document.addEventListener('pointerdown', (e) => { if (!box.contains(e.target) && !e.target.closest('.meta')) setOpen(false) })
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !box.classList.contains('open')) return
  e.stopPropagation()
  const i = strands.findIndex((s) => s.classList.contains('on'))
  if (i >= 0) { setStrand(-1); heads[i].focus() } else { setOpen(false); btn.focus() }
}, true)
focusable()
addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch') root.classList.toggle('peek', e.clientY < 48 || topBar.contains(e.target)) }, { passive: true })
topBar.addEventListener('focusin', () => root.classList.add('peek'))
topBar.addEventListener('focusout', () => root.classList.remove('peek'))
