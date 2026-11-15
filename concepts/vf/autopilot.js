import { play } from './sound.js'
import { wins } from './wm.js'
import { reveal } from './nav.js'

// Left alone, the desk uses itself. The old cursor of this portfolio — a point of light in a thin
// ring — comes back and plays it through: opens the ring of projects, turns it, opens one, drags the
// window, pulls its corner, asks the terminal who this is, tidies up. Any real input ends it at once
// (and leaves what it opened where it is).
const ghost = document.createElement('div')
ghost.id = 'ghost'; ghost.setAttribute('aria-hidden', 'true'); ghost.innerHTML = '<i class="g-ring"></i><i class="g-dot"></i>'
document.body.appendChild(ghost)
let gx = innerWidth / 2, gy = innerHeight / 2, running = false, stop = null, lastInput = performance.now(), lastRun = -1e9

const wait = (ms) => new Promise((ok, no) => { const t = setTimeout(ok, ms); stop = () => { clearTimeout(t); no(new Error('stopped')) } })
const place = () => { ghost.style.transform = `translate(${gx}px, ${gy}px)` }
function move(tx, ty, ms = 700) {
  const sx = gx, sy = gy, t0 = performance.now()
  return new Promise((ok, no) => {
    let raf
    stop = () => { cancelAnimationFrame(raf); no(new Error('stopped')) }
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms), e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      gx = sx + (tx - sx) * e; gy = sy + (ty - sy) * e; place()
      if (t < 1) raf = requestAnimationFrame(step); else ok()
    }
    raf = requestAnimationFrame(step)
  })
}
const to = async (el, ms) => { const r = el.getBoundingClientRect(); await move(r.left + r.width / 2, r.top + r.height / 2, ms) }
const press = async (el) => { ghost.classList.add('down'); await wait(120); el.click(); ghost.classList.remove('down'); await wait(260) }
// carry a window along with the cursor (by its bar, or by its corner)
async function carry(w, dx, dy, mode) {
  const L = w.offsetLeft, T = w.offsetTop, W = w.offsetWidth, H = w.offsetHeight, sx = gx, sy = gy, t0 = performance.now(), ms = 900
  ghost.classList.add('down'); play('grab')
  await new Promise((ok, no) => {
    let raf; stop = () => { cancelAnimationFrame(raf); no(new Error('stopped')) }
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      gx = sx + dx * e; gy = sy + dy * e; place()
      if (mode === 'move') { w.style.left = L + dx * e + 'px'; w.style.top = T + dy * e + 'px' } else { w.style.width = W + dx * e + 'px'; w.style.height = H + dy * e + 'px'; w.style.maxHeight = 'none' }
      if (t < 1) raf = requestAnimationFrame(step); else ok()
    }
    raf = requestAnimationFrame(step)
  })
  ghost.classList.remove('down'); play('drop')
}
const newest = () => [...wins.values()].sort((a, b) => b.w.style.zIndex - a.w.style.zIndex)[0]?.w

export async function autopilot() {
  if (running || document.getElementById('story')) return
  running = true; lastRun = performance.now()
  gx = innerWidth * 0.5; gy = innerHeight * 0.75; place(); ghost.classList.add('on')
  try {
    await wait(400)
    await to(document.querySelector('#sentence [data-open=projects]')); await press(document.querySelector('#sentence [data-open=projects]'))
    await wait(500)
    const ring = document.querySelector('.ring'); await to(ring, 600)
    for (let i = 0; i < 3; i++) { ring.dispatchEvent(new WheelEvent('wheel', { deltaY: 150, bubbles: true, cancelable: true })); await wait(380) }
    await wait(500)
    const openBtn = document.querySelector('#r-open'); await to(openBtn); await press(openBtn)
    await wait(700)
    const w = newest(); const bar = w.querySelector('.bar'), br = bar.getBoundingClientRect()
    await move(br.left + 140, br.top + 15); await carry(w, -innerWidth * 0.12, 40, 'move')
    await wait(300)
    const g = w.querySelector('.grip').getBoundingClientRect(); await move(g.left + 8, g.top + 8, 600); await carry(w, 110, 70, 'size')
    await wait(500)
    const role = document.querySelector('#sentence [data-open=role]'); await to(role, 800); await press(role)
    await wait(500)
    const input = newest()?.querySelector('input'); if (input) { await to(input, 500); for (const ch of 'whoami') { input.value += ch; play('key'); await wait(110) } input.form.requestSubmit(); await wait(1400) }
    const tidy = document.getElementById('tidy'); reveal(tidy); await wait(700); await to(tidy, 800); await press(tidy)
    await wait(1600)
    const clear = document.getElementById('clear'); reveal(clear); await wait(700); await to(clear, 500); await press(clear)
    await wait(400)
  } catch { /* someone took over */ }
  ghost.classList.remove('on', 'down'); running = false; stop = null
}

// any real input ends a run; a minute of quiet (and nothing open) starts one — at most every three
const real = (e) => { if (!e.isTrusted) return; lastInput = performance.now(); if (running) stop?.() }
;['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((t) => addEventListener(t, real, { capture: true, passive: true }))
setInterval(() => {
  const now = performance.now()
  if (!running && !wins.size && now - lastInput > 60000 && now - lastRun > 180000 && !document.hidden) autopilot()
}, 2000)
