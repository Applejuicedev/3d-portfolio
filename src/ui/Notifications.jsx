import { useEffect, useState } from 'react'
import { on } from '../lib/events'
import { prefersReduced } from '../lib/motion'
import { sfx } from '../lib/sound'

let id = 0

// System notifications, top right, stacked. Each one slides in from the edge, stays 5 s (the timer
// stops while the pointer rests on the stack) and slides out; a click dismisses it at once. Read
// out politely by screen readers.
export default function Notifications() {
  const [items, setItems] = useState([])
  const [hold, setHold] = useState(false)

  useEffect(() => on('notify', (n) => { sfx('chime'); setItems((l) => [...l.slice(-2), { ...n, id: ++id, t: Date.now(), out: false }]) }), [])
  useEffect(() => {
    if (hold || !items.length) return
    const tm = setInterval(() => {
      const now = Date.now()
      setItems((l) => l.map((n) => (now - n.t > 5000 ? { ...n, out: true } : n)).filter((n) => !(n.out && now - n.t > 5500)))
    }, 250)
    return () => clearInterval(tm)
  }, [hold, items.length])

  const dismiss = (nid) => setItems((l) => l.map((n) => (n.id === nid ? { ...n, out: true, t: Date.now() - 5000 } : n)))
  const still = prefersReduced()

  return (
    <div aria-live="polite" className="fixed z-[120] right-3 sm:right-4 top-[4.5rem] w-[min(22rem,calc(100vw-1.5rem))] flex flex-col gap-2 pointer-events-none"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      {items.map((n) => (
        <button key={n.id} type="button" onClick={() => dismiss(n.id)}
          style={{ animation: still ? 'none' : `${n.out ? 'note-out' : 'note-in'} 520ms var(--ease) both` }}
          className="pointer-events-auto glass-strong text-left rounded-card px-3.5 py-3 flex gap-3 items-start">
          <span aria-hidden className="grid place-items-center w-9 h-9 flex-none rounded-ctl bg-paper/80 ring-1 ring-black/5 shadow-pill text-[16px] text-ink">{n.icon ?? '›_'}</span>
          <span className="min-w-0 flex-1">
            <span className="flex justify-between gap-2 t-cap"><span className="uppercase tracking-[0.06em]">{n.app}</span><span>jetzt</span></span>
            <span className="block text-[14px] font-semibold leading-snug mt-0.5">{n.title}</span>
            {n.body && <span className="block text-[13.5px] text-gray leading-snug">{n.body}</span>}
          </span>
        </button>
      ))}
      <style>{`@keyframes note-in{from{transform:translateX(110%);opacity:0}to{transform:none;opacity:1}}@keyframes note-out{to{transform:translateX(110%);opacity:0}}`}</style>
    </div>
  )
}
