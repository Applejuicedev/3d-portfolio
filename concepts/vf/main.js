import './apps.css'
import { wins, close, closeAll, tidy, topmost, onChange } from './wm.js'
import { play, isMuted, setMuted } from './sound.js'
import { ZONES } from './data.js'
import * as A from './apps.js'
import { sourceOf } from './xray.js'
import { notify, schedule, history, onInbox, markRead } from './notify.js'
import { open as openWin } from './wm.js'
import './skills.js'
import { mountSurface } from './surface.js'
import './hero.js'
import './nav.js'
import { story } from './story.js'
import { autopilot } from './autopilot.js'
import './virus.js'
import './links.js'

// the 3D studio (and three.js with it) loads only when it is first opened; from then on the lens
// shows its real code
const studio3d = (from) => import('./studio3d.js').then((m) => { sourceOf('open:studio3d', m.studio3d); return m.studio3d(from) })

// the ground: the rough graphite surface with the light gliding over it
// (on touch screens: 30 frames a second, a lighter light pass, and nothing while a sheet covers it)
const touch = matchMedia('(hover: none) and (pointer: coarse)').matches
mountSurface(document.body, touch ? { fps: 30, maxPR: 1.5, rest: () => document.documentElement.classList.contains('has-sheet') } : {})

// The desk: one sentence about me; whatever is underlined, and every tool at the bottom, opens a
// window tied to it by a hairline. Corners: the mark and the settings (me.txt, sound, theme) above,
// the time zones sliding past and the tools below.
const actions = {
  me: (from) => A.me(from), hello: (from) => A.hello(from), projects: (from) => A.projects(from),
  theme: () => toggleTheme(), sound: () => toggleSound(),
}
const OPEN = {
  role: (f) => A.role(f, actions), where: A.where, projects: A.projects, open: (f) => A.availability(f, actions), hello: A.hello,
  numbers: A.numbers, scale: A.scale, studio3d, sounds: A.sounds, ask: (f) => A.ask(f, actions), story, me: A.me,
}
// what the x-ray lens shows for each thing: the function that runs when you click it
const REAL = { role: A.role, where: A.where, projects: A.projects, open: A.availability, hello: A.hello, numbers: A.numbers, scale: A.scale, studio3d, sounds: A.sounds, ask: A.ask, story, me: A.me }
Object.entries(REAL).forEach(([k, fn]) => sourceOf('open:' + k, fn))
sourceOf('project', A.project); sourceOf('me', A.me); sourceOf('tidy', tidy); sourceOf('clear', closeAll)
document.querySelectorAll('[data-open]').forEach((el) => el.addEventListener('click', (e) => {
  e.preventDefault()
  const id = el.dataset.open
  if (el.classList.contains('chip') && wins.has(id === 'role' ? 'role' : id)) return close(id)
  OPEN[id](el)
}))
document.getElementById('me').addEventListener('click', (e) => (wins.has('me') ? close('me') : A.me(e.currentTarget)))
// the inbox: every notification that arrived, newest first; a click on one does it again
const inboxBtn = document.getElementById('inbox')
const ago = (d) => { const m = Math.round((Date.now() - d) / 60000); return m < 1 ? 'now' : m + ' min' }
function inbox(from) {
  return openWin('inbox', from, { title: 'inbox', width: 380, height: 420, minW: 320, minH: 260, place: [0.96, 0.12], build: (b) => {
    const draw = () => {
      if (!b.isConnected) return
      b.innerHTML = history.length
        ? `<div class="ib">${history.map((n, i) => `<button class="ib-row${n.action ? ' act' : ''}" data-i="${i}"><span class="mono ib-from"><i style="background:${n.color ?? 'var(--ink)'}"></i>${n.from}<em>${ago(n.at)}</em></span><b>${n.title}</b>${n.body ? `<span class="ib-body">${n.body}</span>` : ''}</button>`).join('')}</div>`
        : '<p class="pad text">Nothing yet. Notifications collect here.</p>'
      b.querySelectorAll('.ib-row.act').forEach((r) => (r.onclick = () => history[r.dataset.i].action(r)))
    }
    draw(); onInbox(draw); markRead()
  } })
}
onInbox((h, unread) => { document.getElementById('compass').classList.toggle('unread', unread > 0); inboxBtn.textContent = unread ? `inbox ${unread}` : 'inbox'; inboxBtn.classList.toggle('new', unread > 0); if (unread && wins.has('inbox')) markRead() })
inboxBtn.addEventListener('click', (e) => (wins.has('inbox') ? close('inbox') : inbox(e.currentTarget)))
sourceOf('inbox', inbox)
document.getElementById('tidy').addEventListener('click', tidy)
document.getElementById('clear').addEventListener('click', closeAll)

// what is open shows on the desk: its words go grey, its tool lights up
onChange(() => {
  document.querySelectorAll('a.w').forEach((el) => el.classList.toggle('lit', wins.has(el.dataset.open)))
  document.querySelectorAll('#tools [data-open], #me, #inbox').forEach((el) => el.classList.toggle('on', wins.has(el.dataset.open ?? el.id)))
})

// theme: graphite or concrete, remembered; the first visit is graphite
const root = document.documentElement, themeBtn = document.getElementById('theme')
if (!root.dataset.theme) root.dataset.theme = 'dark' // graphite is the identity; concrete is the alternative
const label = () => { themeBtn.textContent = root.dataset.theme === 'dark' ? 'light' : 'dark' }
function toggleTheme() { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('vf-desk-theme', root.dataset.theme) } catch {} label(); play('toggle') }
themeBtn.addEventListener('click', toggleTheme); label(); sourceOf('theme', toggleTheme)

// sound on / off
const soundBtn = document.getElementById('sound')
const soundLabel = () => { soundBtn.textContent = isMuted() ? 'sound off' : 'sound on'; soundBtn.setAttribute('aria-pressed', String(!isMuted())) }
function toggleSound() { setMuted(!isMuted()); soundLabel(); play('toggle', true) }
soundBtn.addEventListener('click', toggleSound); soundLabel(); sourceOf('sound', toggleSound)

// every other button ticks
document.addEventListener('click', (e) => { const b = e.target.closest('button, a'); if (b && !b.dataset.open && !['theme', 'sound', 'me', 'tidy', 'inbox'].includes(b.id) && !b.closest('.bar') && !b.closest('[data-add]')) play('click') })

// the time zones, sliding past: the list twice, so the loop has no seam
const track = document.getElementById('zones-track')
const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())
const zones = () => { const one = ZONES.map(([c, tz]) => `<span>${c} <b>${fmt(tz)}</b></span>`).join(''); track.innerHTML = one + one }
zones(); setInterval(zones, 30000)

// Esc closes the window in front
addEventListener('keydown', (e) => { if (e.key === 'Escape' && wins.size && !e.target.closest('input')) close(topmost().id) })

// now and then a notification: a note from me first, then what else the desk can do
schedule([
  [7000, { from: 'mail · Vincent', title: 'Thanks for stopping by.', body: 'This whole page is one sentence — click anything underlined, or write me.', action: (n) => A.hello(n) }],
  [28000, { from: 'desk', title: 'Rest your cursor on anything.', body: 'A lens opens and shows the code that runs when you click it.' }],
  [55000, { from: 'story.txt', title: 'There is more than the résumé.', body: 'Open the story and scroll.', action: () => story() }],
  [90000, { from: '3d studio', title: 'Build something.', body: 'There is a small 3D studio in the tools.', action: (n) => studio3d(n) }],
  [125000, { from: 'terminal', title: 'Try “sudo hire vincent”', body: 'in the full-stack-developer terminal.', action: (n) => A.role(n, actions) }],
  [160000, { from: 'desk', title: 'Windows resize.', body: 'Pull a corner — or Alt + arrow keys.' }],
  [200000, { from: 'desk', title: 'Leave it alone for a minute.', body: 'The desk knows how to use itself — or watch now.', action: () => autopilot() }],
  [240000, { from: 'display', title: 'Try the dark desk.', action: () => toggleTheme() }],
])
