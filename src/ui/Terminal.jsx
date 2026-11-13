import { useEffect, useRef, useState } from 'react'
import { PERSON, SECTIONS, CHANNELS } from '../data/content'
import { goTo } from '../lib/nav'
import { stats } from '../lib/ascii'

const GITHUB = CHANNELS.find((c) => c.label === 'GitHub').href
const NAMES = SECTIONS.map((s) => s.id)
const COMMANDS = ['help', 'ls', 'cd', 'whoami', 'status', 'email', 'github', 'stats', 'date', 'clear', ...NAMES]

const find = (word) => SECTIONS.find((s) => s.id === word || s.alias.includes(word))

// One command line → output lines ([text, tone]) and an optional action.
function run(input) {
  const [cmd = '', ...args] = input.trim().toLowerCase().replace(/^\.?\//, '').split(/\s+/)
  const arg = args.join(' ').replace(/\/$/, '')
  if (!cmd) return { out: [] }
  if (cmd === 'help') return { out: [
    ['Befehle:', 'muted'],
    ['  ls · cd <bereich> · whoami · status', 'ink'],
    ['  email · github · stats · date · clear', 'ink'],
    ['Oder direkt: ' + NAMES.join(' · '), 'muted'],
  ] }
  if (cmd === 'ls') return { out: [[NAMES.map((n) => n + '/').join('  '), 'ink']] }
  if (cmd === 'cd' || cmd === 'open') {
    const s = find(arg)
    return s ? { out: [[`→ ${s.label}`, 'lime']], go: s.id } : { out: [[`cd: kein Bereich: ${arg || '…'}`, 'err']] }
  }
  const s = find(cmd)
  if (s) return { out: [[`→ ${s.label}`, 'lime']], go: s.id }
  if (cmd === 'whoami') return { out: [[`${PERSON.name} — ${PERSON.role}`, 'ink'], ['Medieninformatik · Soldat auf Zeit', 'muted']] }
  if (cmd === 'status') return { out: [[`● ${PERSON.available}`, 'lime'], [PERSON.looking, 'muted']] }
  if (cmd === 'email') return { out: [[PERSON.email, 'ink']], copy: PERSON.email }
  if (cmd === 'github') return { out: [['öffne github.com/applejuicedev …', 'muted']], open: GITHUB }
  if (cmd === 'stats') return { out: [[`${stats.fps} fps · ${stats.cells.toLocaleString('de-DE')} Zeichen · ${stats.cols}×${stats.rows} Raster`, 'ink']] }
  if (cmd === 'date') return { out: [[new Intl.DateTimeFormat('de-DE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(new Date()), 'ink']] }
  if (cmd === 'clear') return { clear: true, out: [] }
  if (cmd === 'sudo') return { out: [['Netter Versuch.', 'muted']] }
  return { out: [[`zsh: command not found: ${cmd}`, 'err'], ['tippe help', 'muted']] }
}

const TONE = { ink: 'text-ink', muted: 'text-muted', lime: 'text-lime', err: 'text-[#ff7a6b]' }
const CHIPS = ['arbeiten', 'system', 'labor', 'kontakt']

// A real command line: it navigates the page, copies the address, prints live numbers. History
// with ↑/↓, completion with Tab. The chips below run commands with one tap (touch screens).
export default function Terminal({ className = '' }) {
  const [lines, setLines] = useState([['Tippe help – oder wähle unten.', 'muted']])
  const [value, setValue] = useState('')
  const hist = useRef([]), hi = useRef(-1), inputRef = useRef(), outRef = useRef()

  useEffect(() => { outRef.current?.scrollTo({ top: 1e6 }) }, [lines])

  const exec = (cmd) => {
    const r = run(cmd)
    if (cmd.trim()) { hist.current.unshift(cmd); hi.current = -1 }
    if (r.copy) navigator.clipboard?.writeText(r.copy).then(() => setLines((l) => [...l, ['✓ in die Zwischenablage kopiert', 'lime']]), () => {})
    setLines((l) => (r.clear ? [] : [...l, [`~ % ${cmd}`, 'faint'], ...r.out]).slice(-7))
    if (r.go) setTimeout(() => goTo(r.go), 260)
    if (r.open) window.open(r.open, '_blank', 'noopener,noreferrer')
  }
  const onKey = (e) => {
    if (e.key === 'Enter') { exec(value); setValue('') }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const h = hist.current
      hi.current = Math.max(-1, Math.min(h.length - 1, hi.current + (e.key === 'ArrowUp' ? 1 : -1)))
      setValue(hi.current < 0 ? '' : h[hi.current])
    } else if (e.key === 'Tab' && value) {
      const m = COMMANDS.find((c) => c.startsWith(value.toLowerCase()))
      if (m) { e.preventDefault(); setValue(m) }
    }
  }

  return (
    <div className={`panel ticks backdrop-blur-[2px] ${className}`} onClick={(e) => { if (e.target.tagName !== 'BUTTON') inputRef.current?.focus({ preventScroll: true }) }}>
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2">
        <span className="flex gap-1.5" aria-hidden><i className="w-2 h-2 rounded-full bg-faint" /><i className="w-2 h-2 rounded-full bg-faint" /><i className="w-2 h-2 rounded-full bg-lime" /></span>
        <span className="t-label normal-case tracking-normal text-faint">zsh — vincent@fidanli</span>
      </div>
      <div ref={outRef} aria-live="polite" className="t-mono text-[12.5px] px-3.5 pt-3 h-[8.6em] overflow-y-auto [scrollbar-width:none]">
        {lines.map(([t, tone], i) => <p key={i} className={`whitespace-pre-wrap ${tone === 'faint' ? 'text-faint' : TONE[tone]}`}>{t}</p>)}
      </div>
      <label className="t-mono text-[12.5px] flex items-center gap-2 px-3.5 pb-3 pt-1">
        <span className="text-lime" aria-hidden>~ %</span>
        <span className="sr-only">Befehl eingeben</span>
        <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey}
          autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="go"
          className="flex-1 min-w-0 bg-transparent outline-none text-ink caret-lime placeholder:text-faint text-[16px] sm:text-[12.5px]" placeholder="help" />
      </label>
      <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2.5">
        {CHIPS.map((c) => (
          <button key={c} type="button" onClick={() => exec(c)}
            className="press t-mono text-[11.5px] rounded-[3px] border border-line px-2 py-1 text-muted transition-colors hover:text-bg hover:bg-lime hover:border-lime">
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
