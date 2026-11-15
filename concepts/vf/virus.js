import { play } from './sound.js'
import { closeAll } from './wm.js'
import { notify } from './notify.js'

// Too much clicking is contagious. Every real click and key press is counted; at 45 a warning
// arrives, at 60 the desk is infected. It stays in the desk's own material — no colour, only the
// system breaking: the screen tears and flips to negative, the light on the surface jumps about,
// the sentence decays into noise, and error windows pour down the screen in a cascade, graphite and
// inverted in turn. Then every window is closed, the screen goes still — "rebooting" — and the page
// loads again — and the count starts over. Nothing is lost but the open windows. Clicks inside a
// project preview count too (apps.js passes them on).
const WARN = 45, LIMIT = 60
let count = 0, done = false
const MSGS = [['virus.exe', 'is not responding'], ['input overflow', 'too many clicks in too little time'], ['desk compromised', 'please stop clicking'],
  ['window.exe', 'has stopped working'], ['segfault', 'at 0xDE5K'], ['memory', 'could not be read'], ['sentence.txt', 'is corrupted'], ['reboot', 'scheduled']]
const NOISE = '░▒▓/\\_|#01<>'

// the sentence decays: more of its letters turn to noise every frame
function decay() {
  const nodes = []
  const walk = (n) => n.nodeType === 3 ? nodes.push([n, n.data]) : n.childNodes.forEach(walk)
  walk(document.getElementById('sentence'))
  let k = 0
  const t = setInterval(() => {
    k += 0.07
    nodes.forEach(([n, s]) => { n.data = [...s].map((c) => (c !== ' ' && Math.random() < k ? NOISE[(Math.random() * NOISE.length) | 0] : c)).join('') })
    if (k > 1) clearInterval(t)
  }, 90)
}

function infect() {
  done = true
  const root = document.documentElement
  root.classList.add('infected'); decay()
  // the error windows: a cascade from a random corner, each one a step further down and across
  let n = 0, x = 40 + Math.random() * (innerWidth * 0.3), y = 60
  const spawn = setInterval(() => {
    const [t, m] = MSGS[n % MSGS.length], p = document.createElement('div')
    p.className = 'virus-pop' + (n % 2 ? ' neg' : '')
    p.style.left = x + 'px'; p.style.top = y + 'px'
    p.innerHTML = `<p class="vp-bar mono"><span>${t}</span><i></i></p><p class="vp-msg"><b>${m}.</b><span class="mono">${String(Math.random()).slice(2, 10)} · ${LIMIT} inputs</span></p>`
    document.body.appendChild(p); play('glitch', true)
    x += 26; y += 22
    if (x > innerWidth - 300 || y > innerHeight - 140) { x = 30 + Math.random() * innerWidth * 0.5; y = 50 + Math.random() * 80 }
    if (++n > 22) clearInterval(spawn)
  }, 95)
  setTimeout(() => closeAll(), 2600)
  setTimeout(() => {
    root.classList.remove('infected'); document.querySelectorAll('.virus-pop').forEach((p) => p.remove())
    const r = document.createElement('div'); r.id = 'reboot'; r.className = 'mono'
    r.innerHTML = '<p>rebooting desk…</p><i><b></b></i>'
    document.body.appendChild(r)
  }, 3300)
  setTimeout(() => location.reload(), 5700)
}
// one more input; at WARN the warning, at LIMIT the outbreak
export function tick() {
  if (done) return
  count++
  if (count === WARN) notify({ from: 'virus.exe', title: 'Something is spreading.', body: `${LIMIT - WARN} more clicks and it's out.`, life: 7000 })
  if (count >= LIMIT) infect()
}
const count1 = (e) => {
  // typing into a field (the terminal, a message) is writing, not clicking around: it doesn't count
  if (!e.isTrusted || (e.type === 'keydown' && e.target.closest?.('input, textarea'))) return
  tick()
}
addEventListener('pointerdown', count1, true)
addEventListener('keydown', count1, true)
