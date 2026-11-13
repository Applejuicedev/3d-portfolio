import { useEffect, useMemo, useRef, useState } from 'react'
import { SECTIONS, PROJECTS, PERSON, CHANNELS } from '../data/content'
import { goTo } from '../lib/nav'
import { on, emit, notify, copyText } from '../lib/events'

// Everything you can do on the page, as Spotlight rows: [group, label, hint, run]
function useCommands() {
  return useMemo(() => [
    ...SECTIONS.map((s, i) => ['Abschnitte', s.label, `0${i + 1}`, () => goTo(s.id), s.alias]),
    ...PROJECTS.map((p) => ['Projekte', p.title, p.kind, () => emit('open-project', p.slug), [p.slug, ...p.tech]]),
    ['Aktionen', 'E-Mail-Adresse kopieren', PERSON.email, () => copyText(PERSON.email).then((ok) => ok && notify({ app: 'Zwischenablage', title: 'Kopiert', body: PERSON.email, icon: '⌘' })), ['mail', 'email', 'kontakt']],
    ['Aktionen', 'GitHub öffnen', '@applejuicedev', () => window.open(CHANNELS.find((c) => c.label === 'GitHub').href, '_blank', 'noopener,noreferrer'), ['code', 'repo']],
    ['Aktionen', 'Terminal neu starten', 'Boot-Sequenz', () => emit('reboot'), ['boot', 'intro', 'preloader', 'terminal']],
    ['Aktionen', 'Nach oben', 'Start', () => goTo('start'), ['top', 'start', 'hero']],
  ], [])
}

const match = (q, [, label, hint, , alias = []]) => {
  if (!q) return true
  const hay = [label, hint, ...alias].join(' ').toLowerCase()
  return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w))
}

// ⌘K (Ctrl+K, or "/") opens it anywhere. Type to filter, ↑/↓ to choose, ↵ to run, Esc to close.
// A combobox over a listbox, so screen readers follow the active row.
export default function Spotlight() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const cmds = useCommands()
  const list = cmds.filter((c) => match(q, c))
  const inputRef = useRef(), lastFocus = useRef()

  useEffect(() => {
    const key = (e) => {
      const typing = e.target.closest?.('input, textarea, [contenteditable="true"]')
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); setOpen((o) => !o) }
    }
    window.addEventListener('keydown', key)
    const off = on('spotlight', () => setOpen(true))
    return () => { window.removeEventListener('keydown', key); off() }
  }, [])
  useEffect(() => {
    if (open) { lastFocus.current = document.activeElement; setQ(''); setI(0); requestAnimationFrame(() => inputRef.current?.focus()) }
    else lastFocus.current?.focus?.({ preventScroll: true })
  }, [open])
  useEffect(() => setI(0), [q])

  const run = (c) => { setOpen(false); setTimeout(c[3], 120) }
  const onKey = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(list.length - 1, x + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(0, x - 1)) }
    else if (e.key === 'Enter' && list[i]) run(list[i])
  }

  if (!open) return null
  let group
  return (
    <div className="fixed inset-0 z-[150] flex justify-center items-start pt-[14vh] px-3" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div role="dialog" aria-modal="true" aria-label="Spotlight" className="w-full max-w-[38rem] glass-strong rounded-card overflow-hidden"
        style={{ animation: 'spot-in 260ms var(--ease) both' }}>
        <div className="flex items-center gap-3 px-4 h-14 border-b border-line">
          <svg aria-hidden width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gray"><circle cx="8.5" cy="8.5" r="6" /><path d="m13 13 5 5" strokeLinecap="round" /></svg>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
            role="combobox" aria-expanded="true" aria-controls="spot-list" aria-activedescendant={list[i] ? `spot-${i}` : undefined}
            placeholder="Spotlight-Suche" className="flex-1 bg-transparent outline-none text-[20px] tracking-tight placeholder:text-faint" />
          <span className="kbd">esc</span>
        </div>
        <ul id="spot-list" data-lenis-prevent role="listbox" aria-label="Ergebnisse" className="max-h-[52vh] overflow-y-auto p-2">
          {list.length === 0 && <li className="px-3 py-6 text-center text-gray text-[14px]">Nichts gefunden für „{q}“.</li>}
          {list.map((c, n) => {
            const head = c[0] !== group ? (group = c[0]) : null
            return (
              <li key={c[1]} role="presentation">
                {head && <p className="t-cap px-3 pt-2 pb-1">{head}</p>}
                <div id={`spot-${n}`} role="option" aria-selected={n === i} onMouseMove={() => setI(n)} onClick={() => run(c)}
                  className={`flex items-center justify-between gap-4 px-3 py-2 rounded-ctl cursor-default ${n === i ? 'bg-blue text-white' : ''}`}>
                  <span className="text-[15px]">{c[1]}</span>
                  <span className={`t-mono ${n === i ? 'text-white/75' : 'text-gray'}`}>{c[2]}</span>
                </div>
              </li>
            )
          })}
        </ul>
        <style>{'@keyframes spot-in{from{opacity:0;transform:scale(.97) translateY(-6px)}}'}</style>
      </div>
    </div>
  )
}
