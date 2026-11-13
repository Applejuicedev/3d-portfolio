import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SECTIONS, PERSON } from '../data/content'
import { goTo, useCurrentSection } from '../lib/nav'

const IDS = SECTIONS.map((s) => s.id)
const pad = (n) => String(n).padStart(2, '0')

// The navigation once the hero is gone: a compact dock at the bottom centre. The lime block slides
// under the current section; a hairline along its top edge fills with the page's progress. On
// phones only the current section keeps its name, the others are numbers — five targets in one
// thumb-reachable row, no menu to open.
export default function Dock() {
  const current = useCurrentSection(IDS)
  const [shown, setShown] = useState(false)
  const listRef = useRef(), markRef = useRef(), barRef = useRef()

  useEffect(() => {
    const on = () => {
      setShown(window.scrollY > window.innerHeight * 0.6)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])

  // the marker moves to the active item (measured after the labels have re-laid out)
  useLayoutEffect(() => {
    const a = listRef.current?.querySelector('[aria-current]')?.closest('li')
    const m = markRef.current
    if (!m) return
    if (!a) { m.style.opacity = '0'; return }
    m.style.opacity = '1'
    m.style.transform = `translateX(${a.offsetLeft}px)`
    m.style.width = `${a.offsetWidth}px`
  }, [current, shown])

  return (
    <nav aria-label="Abschnitte" inert={!shown ? '' : undefined}
      className={`fixed z-50 left-1/2 bottom-[max(0.75rem,env(safe-area-inset-bottom))] -translate-x-1/2 transition-[opacity,transform] duration-500 ease-sys ${shown ? 'opacity-100' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="relative flex items-center gap-1 rounded-[6px] border border-line bg-raised/85 p-1 shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-md">
        <span aria-hidden className="absolute left-1 right-1 top-0 h-px bg-line overflow-hidden">
          <span ref={barRef} className="block h-full bg-lime origin-left" style={{ transform: 'scaleX(0)' }} />
        </span>
        <a href="#start" onClick={(e) => { e.preventDefault(); goTo('start') }} aria-label={`${PERSON.name} – zum Anfang`}
          className="grid place-items-center w-8 h-8 rounded-[4px] text-[12px] font-semibold tracking-tight text-ink hover:bg-white/5">VF</a>
        <span aria-hidden className="w-px h-4 bg-line mx-1" />
        <ul ref={listRef} className="relative flex items-center">
          <li ref={markRef} aria-hidden className="absolute left-0 top-0 h-full rounded-[4px] bg-lime transition-[transform,width,opacity] duration-500 ease-sys" />
          {SECTIONS.map((s, i) => {
            const on = current === s.id
            return (
              <li key={s.id} className="relative">
                <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); goTo(s.id) }} aria-current={on ? 'location' : undefined}
                  className={`flex items-center gap-1.5 h-8 px-2.5 rounded-[4px] t-label tracking-[0.04em] transition-colors duration-300 ${on ? 'text-bg' : 'text-muted hover:text-ink'}`}>
                  <span className={on ? 'text-bg/60' : 'text-faint'}>{pad(i + 1)}</span>
                  <span className={on ? '' : 'max-sm:sr-only'}>{s.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
