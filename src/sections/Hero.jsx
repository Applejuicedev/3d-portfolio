import { useEffect, useRef, useState } from 'react'
import { PERSON, SECTIONS } from '../data/content'
import { goTo, useBerlinTime } from '../lib/nav'
import { useMotion, gsap, EASE } from '../lib/motion'
import { stats } from '../lib/ascii'
import AsciiCanvas from '../ui/AsciiCanvas'
import Terminal from '../ui/Terminal'

const pad = (n) => String(n).padStart(2, '0')

// the renderer's own numbers, read twice a second — measured, not decorative
function useStats() {
  const [s, setS] = useState({ ...stats })
  useEffect(() => { const id = setInterval(() => setS({ ...stats }), 500); return () => clearInterval(id) }, [])
  return s
}

function Readout({ k, v, className = '', ...rest }) {
  return <p {...rest} className={`t-label flex gap-2 ${className}`}><span className="text-faint">{k}</span><span className="text-ink tabular-nums">{v}</span></p>
}

// The opening. The top bar is a four-column index (who · what · where to · when); the knot is
// the hand-written rasterizer, framed like a viewport with its live numbers in the corners; the
// headline sits on the baseline at the bottom, the terminal beside it is a second way to navigate.
export default function Hero() {
  const ref = useRef()
  const time = useBerlinTime()
  const s = useStats()

  useMotion(ref, (el) => {
    const h1 = [...el.querySelectorAll('[data-line]')]
    gsap.timeline({ delay: 0.15 })
      .from('[data-top] > *', { opacity: 0, y: -10, duration: 0.9, stagger: 0.07, ease: EASE.out }, 0)
      .from(h1, { yPercent: 110, duration: 1.4, stagger: 0.12, ease: EASE.out }, 0.2)
      .from('[data-viewport]', { clipPath: 'inset(50% 50% 50% 50%)', duration: 1.3, ease: EASE.inOut }, 0.1)
      .from('[data-readout]', { opacity: 0, duration: 0.6, stagger: 0.08 }, 1.1)
      .from('[data-lede] > *', { opacity: 0, y: 14, duration: 0.9, stagger: 0.1, ease: EASE.out }, 0.8)
      .from('[data-term]', { opacity: 0, y: 24, duration: 1, ease: EASE.out }, 1.0)
  })

  return (
    <div ref={ref} className="relative frame min-h-[100svh] flex flex-col pt-5 pb-6 lg:pb-8">
      {/* ── the index bar ── */}
      <div data-top className="grid12 gap-y-3 items-start relative z-10">
        <a href="#start" className="col-span-2 lg:col-span-3 text-[15px] font-medium tracking-tight">{PERSON.name}</a>
        <p className="col-span-2 lg:col-span-3 t-label max-lg:text-right">{PERSON.role}<span className="block text-faint">Medieninformatik</span></p>
        <nav aria-label="Bereiche" className="hidden lg:block lg:col-span-3">
          <ul>
            {SECTIONS.map((sec, i) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} onClick={(e) => { e.preventDefault(); goTo(sec.id) }}
                  className="group t-label inline-flex gap-3 py-[1px] text-ink hover:text-lime transition-colors">
                  <span className="text-faint group-hover:text-lime transition-colors">{pad(i + 1)}</span>
                  <span className="roll"><span>{sec.label}</span><span aria-hidden>{sec.label}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="hidden lg:block lg:col-span-3 t-label text-right">
          <span className="inline-flex items-center gap-2 text-ink"><i className="pulse w-1.5 h-1.5 rounded-full bg-lime" />{PERSON.available}</span>
          <span className="block">{PERSON.looking}</span>
        </p>
      </div>

      {/* ── the viewport with the knot ── */}
      {/* phones: a square under the index bar; desktop: the whole right side of the hero, from the
          index bar down to the baseline — the headline and the terminal lie over its lower edge.
          Its children are all absolute, so it gets its size from here. */}
      <div data-viewport className="relative max-lg:mt-6 max-lg:aspect-square lg:absolute lg:left-[40%] lg:right-[var(--gutter)] lg:top-[9.5rem] lg:bottom-6">
        <AsciiCanvas report className="absolute inset-0" fontSize={11} zoom={1.02}
          label="Ein Torusknoten, live aus Schriftzeichen gerendert. Unter dem Mauszeiger werden die Zeichen zu Code." />
        {/* corner marks and live numbers, like an editor viewport */}
        <span aria-hidden className="absolute left-0 top-0 w-3 h-3 border-l border-t border-faint" />
        <span aria-hidden className="absolute right-0 top-0 w-3 h-3 border-r border-t border-faint" />
        <Readout data-readout k="OBJ" v="torus_knot(2,3)" className="absolute left-4 top-2" />
        <div data-readout className="absolute right-4 top-2 text-right space-y-0.5">
          <Readout k="FPS" v={s.fps || '—'} className="justify-end" />
          <Readout k="ZEICHEN" v={s.cells ? s.cells.toLocaleString('de-DE') : '—'} className="justify-end max-sm:hidden" />
          <Readout k="ORTSZEIT" v={time} className="justify-end max-lg:hidden" />
        </div>
      </div>

      {/* ── lede (desktop: top left, beside the knot) ── */}
      <div className="flex-1 grid12 relative z-10 pointer-events-none">
        <div data-lede className="col-span-4 lg:col-span-4 max-w-[30ch] mt-8 lg:mt-[13vh] pointer-events-auto">
          <p className="t-lead text-ink">Ich gestalte und entwickle digitale Anwendungen – <span className="text-muted">vom Interface bis zur Datenbank.</span></p>
          <p className="t-label mt-4">Web-Apps · iOS-Apps · Interfaces</p>
        </div>
      </div>

      {/* ── headline on the baseline, terminal docked bottom right ── */}
      <div className="grid12 gap-y-8 items-end relative z-10 mt-10 lg:mt-0 pointer-events-none">
        <h1 className="col-span-4 lg:col-span-8 t-mega" aria-label={`${PERSON.name} — ${PERSON.role}`}>
          <span className="block overflow-hidden pb-[0.06em]"><span data-line className="block">Fullstack</span></span>
          <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"><span data-line className="block t-serif tracking-[-0.035em] pr-[0.05em]">Developer</span></span>
        </h1>
        <div data-term className="col-span-4 lg:col-start-9 lg:col-span-4 pointer-events-auto"><Terminal className="w-full lg:max-w-[24rem] lg:ml-auto" /></div>
      </div>
    </div>
  )
}
