import { useEffect, useState } from 'react'
import { ScrollTrigger } from './motion'

// A tiny editor status line, bottom left (desktop): the branch, the "file" of the section being
// read and the line the scroll position is at — the page read like source. Updates on scroll in a
// rAF, nothing else moves. Decorative: the same information is in the page itself.
const FILES = [['start', 'hero.tsx'], ['projekte', 'projekte.tsx'], ['uber-mich', 'vincent.md'], ['stack', 'stack.json'], ['kontakt', 'kontakt.tsx']]
const LINE = 24 // px of page per "line"

export default function StatusBar() {
  const [state, setState] = useState({ file: 'hero.tsx', ln: 1 })
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let file = FILES[0][1]
      for (const [id, f] of FILES) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= mid) file = f }
      const ln = Math.floor(window.scrollY / LINE) + 1
      setState((s) => (s.file === file && s.ln === ln ? s : { file, ln }))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    // also after layout changes (sections mount later, fonts load): otherwise the file shown stays
    // the one measured before the page had its final height
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    ScrollTrigger.addEventListener('refresh', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); ScrollTrigger.removeEventListener('refresh', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div aria-hidden className="hidden lg:flex fixed left-[var(--gutter)] bottom-4 z-40 items-center gap-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-[11px] text-faint ring-1 ring-line pointer-events-none tabular-nums">
      <span><span className="text-signal">⎇</span> main</span>
      <span className="text-ink/80">{state.file}</span>
      <span>Ln {state.ln}, Col 1</span>
    </div>
  )
}
