import { play } from './sound.js'

// Notifications: small cards that slide in at the top right, from a "sender" (mail, the desk, a
// tool), with a line or two and, if there is one, the thing to do about it — a click on the card
// does it. They leave on their own after a while; × sends one away at once. Stacked, newest on top.
const box = document.createElement('div')
box.id = 'toasts'; box.setAttribute('aria-live', 'polite')
document.body.appendChild(box)
let dismissedInARow = 0

// everything that arrived, newest first — for the inbox; and who wants to hear about it
export const history = []
let unread = 0
const subs = new Set()
export const onInbox = (fn) => { subs.add(fn); fn(history, unread) }
const tell = () => subs.forEach((fn) => fn(history, unread))
export function markRead() { unread = 0; tell() }

export function notify({ from, title, body = '', action, color, life = 9000 }) {
  const n = document.createElement('div')
  n.className = 'toast'; if (color) n.style.setProperty('--tc', color)
  n.innerHTML = `<p class="mono t-from"><i></i>${from}<span>now</span></p><p class="t-title">${title}</p>${body ? `<p class="t-body">${body}</p>` : ''}<button class="t-x" aria-label="Dismiss">×</button>`
  box.prepend(n); play('notify')
  history.unshift({ from, title, body, action, color, at: new Date() }); unread++; tell()
  const go = (dismissed) => { n.classList.add('out'); setTimeout(() => n.remove(), 320); dismissedInARow = dismissed ? dismissedInARow + 1 : 0 }
  n.querySelector('.t-x').onclick = (e) => { e.stopPropagation(); go(true) }
  if (action) { n.classList.add('act'); n.onclick = () => { action(n); go(false) } }
  const t = setTimeout(() => n.isConnected && go(false), life)
  n.addEventListener('pointerenter', () => clearTimeout(t))
  return n
}

// tips, one now and then: what else the desk can do. They stop once two in a row were sent away.
export function schedule(tips) {
  let i = 0
  const next = () => {
    if (i >= tips.length || dismissedInARow >= 2) return
    const [wait, tip] = tips[i++]
    setTimeout(() => { if (document.hidden) { i--; return next() } notify(tip); next() }, wait)
  }
  next()
}
