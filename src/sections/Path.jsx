import { useEffect, useRef, useState } from 'react'
import { PERSON, STATIONS, CHAPTERS, LINKS } from '../data/content'
import { useMotion, gsap, ScrollTrigger } from '../lib/motion'
import { scrollToTarget } from '../lib/scroll'
import Window, { Lights } from '../ui/Window'

const FACTS = [
  ['Rolle', PERSON.role],
  ['Fokus', 'Web-Apps · iOS-Apps · Interfaces'],
  ['Heute', 'Soldat auf Zeit · Leichter Späher'],
  ['Studium', 'Medieninformatik B.Sc. · IU · ab 2027'],
  ['Verfügbar', 'ab 2029'],
  ['Sucht', PERSON.looking],
]
const A = ({ href, children }) => <a className="underline decoration-line underline-offset-[0.2em] hover:decoration-ink transition-colors" href={href} target="_blank" rel="noopener noreferrer">{children}</a>

// ── 1 · "Über Vincent": the About-this-Mac panel, flipped up into place by the scroll ──
function About() {
  const ref = useRef()
  useMotion(ref, (el) => {
    gsap.fromTo(el.querySelector('[data-panel]'), { rotateX: -55, y: 80, opacity: 0, transformPerspective: 1400, transformOrigin: '50% 100%' },
      { rotateX: 0, y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 40%', scrub: 0.6 } })
  })
  return (
    <div ref={ref} className="flex justify-center">
      <Window data-panel title="Über Vincent" className="w-full max-w-[44rem]">
        <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-center p-7 sm:p-10">
          <img src="/profile/vincent.jpg" alt={`Porträt von ${PERSON.name}`} width={560} height={560} loading="lazy" decoding="async"
            className="mx-auto w-32 h-32 rounded-full object-cover shadow-lift ring-1 ring-black/5" />
          <div>
            <h3 className="t-title">{PERSON.name}</h3>
            <p className="text-gray mt-1">Medieninformatik · Version 2026</p>
            <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-[14px]">
              {FACTS.map(([k, v]) => [<dt key={k} className="font-semibold text-right pr-4">{k}</dt>, <dd key={k + 'v'} className="text-gray">{v}</dd>])}
            </dl>
          </div>
        </div>
      </Window>
    </div>
  )
}

// ── 2 · the stations as a list that opens as you go ──
// The stations as a plain list, one line each — when, what. Scrolling down, each opens when it
// reaches the middle of the screen (where, a note) and stays open, so the story builds up line by
// line; the current one is black, the rest grey. Beside it, standing still, the year (in particles,
// flying from year to year: ParticleField, data-particles-live) and the time line, where exactly the
// current station's stretch is lit and labelled (lanes where stations overlap). A bar is a button:
// it scrolls to its station. Nothing is pinned — the page scrolls as ever.
const Y0 = 2020, Y1 = 2031, NOW = 2026 + 10.5 / 12
const pct = (y) => `${((y - Y0) / (Y1 - Y0)) * 100}%`
// overlapping stations go to the next free lane
const LANES = (() => { const ends = []; return STATIONS.map((s) => { let l = ends.findIndex((e) => e <= s.from + 0.01); if (l < 0) l = ends.length; ends[l] = s.to; return l }) })()

function Scale({ at, jump }) {
  const lanes = Math.max(...LANES) + 1, cur = STATIONS[at]
  return (
    <div className="mt-8">
      <div className="relative" style={{ height: lanes * 18 + 18 }}>
        {/* the current stretch, named above its bar */}
        <span aria-hidden className="absolute top-0 -translate-x-0 t-mono text-[11px] text-ink whitespace-nowrap transition-[left] duration-500 ease-sys" style={{ left: pct(cur.from) }}>{cur.when}</span>
        {STATIONS.map((s, k) => (
          <button key={s.title} type="button" onClick={() => jump(k)} aria-label={`${s.when}: ${s.title}`} aria-current={at === k ? 'step' : undefined}
            className={`absolute h-[10px] rounded-full transition-[background-color,box-shadow] duration-500 ${at === k ? 'bg-ink shadow-[0_0_0_4px_rgb(var(--c-accent)/.2)]' : 'bg-black/[0.08] hover:bg-black/[0.18]'} ${s.open ? '[mask-image:linear-gradient(90deg,#000_55%,transparent)]' : ''}`}
            style={{ left: pct(s.from), width: `calc(${pct(Y0 + s.to - s.from)} - 3px)`, top: 18 + LANES[k] * 18 }} />
        ))}
        {/* today */}
        <span aria-hidden className="absolute top-3 -bottom-3 w-px bg-blue/50" style={{ left: pct(NOW) }}>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 t-cap text-blue">heute</span>
        </span>
      </div>
      <div aria-hidden className="relative h-5 mt-6 border-t border-line t-mono text-faint tabular-nums">
        {[2020, 2022, 2024, 2026, 2028, 2030].map((y) => <span key={y} className="absolute top-1.5 -translate-x-1/2" style={{ left: pct(y) }}>{y}</span>)}
      </div>
    </div>
  )
}

function TimeLine() {
  const ref = useRef()
  const [at, setAt] = useState(0)
  const [open, setOpen] = useState(0) // how many have opened so far (they stay open)
  const n = STATIONS.length

  // the current station is the last row whose top has passed the middle of the screen — measured
  // on every scroll, since rows opening make the list longer as you go
  useEffect(() => {
    const rows = [...ref.current.querySelectorAll('[data-station]')]
    let raf = 0
    const check = () => {
      raf = 0
      const mid = innerHeight * 0.55
      const first = rows[0].getBoundingClientRect()
      if (first.top > innerHeight) return
      let k = 0
      rows.forEach((r, i) => { if (r.getBoundingClientRect().top < mid) k = i })
      setAt(k); setOpen((o) => Math.max(o, k + 1))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    window.addEventListener('scroll', onScroll, { passive: true }); check()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const jump = (k) => scrollToTarget(ref.current.querySelectorAll('[data-station]')[k], { offset: -innerHeight * 0.4 })
  const s = STATIONS[at]
  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-x-6">
      <ol aria-label="Stationen" className="lg:col-span-7 lg:py-[30svh]">
        {STATIONS.map((st, k) => {
          const isOpen = k < open || at === k, cur = at === k
          return (
            <li key={st.title} data-station aria-current={cur ? 'step' : undefined} className="border-t border-line last:border-b">
              <button type="button" onClick={() => jump(k)} aria-expanded={isOpen} className="w-full flex items-baseline gap-5 py-5 text-left">
                <span className={`w-36 flex-none t-mono tabular-nums transition-colors duration-500 ${cur ? 'text-ink' : 'text-faint'}`}>{st.when}</span>
                <span className={`flex-1 text-[clamp(1.15rem,1.8vw,1.6rem)] tracking-[-0.015em] transition-colors duration-500 ${cur ? 'text-ink' : 'text-gray'}`}>{st.title}</span>
                {st.state && <span className={`t-cap rounded-full px-2.5 py-1 ${st.state === 'geplant' ? 'bg-blue/15 text-blue' : 'bg-mist'}`}>{st.state}</span>}
              </button>
              {/* the details, opening */}
              <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-sys ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="pl-[10.25rem] max-sm:pl-0 pb-6">
                    <p className="text-[15px]">{st.href ? <A href={st.href}>{st.org}</A> : st.org}</p>
                    <p className="t-mono text-gray mt-1.5">{st.note}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
      {/* the year and the time line, the current stretch lit */}
      <div className="lg:col-span-5 max-lg:order-first max-lg:mb-8">
        <div className="lg:sticky lg:top-0 lg:h-[100svh] flex flex-col justify-center">
          <p className="t-cap tabular-nums">Station {String(at + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
          <p aria-hidden className="t-hero text-[min(10vw,8rem)] leading-[1] mt-2 max-lg:hidden"><span data-particles="text" data-particles-live className="inline-block">{String(Math.floor(s.from))}</span></p>
          <Scale at={at} jump={jump} />
        </div>
      </div>
    </div>
  )
}

// ── 3 · the story as a Notes window ──
// Apple's Notes, as it looks on a Mac: the folders on a grey sidebar (yellow folder glyphs), the
// list of notes on white with the selected one in Notes' yellow, the note itself on the right with
// its date centred above it; one light toolbar across the top. Each chapter is a note.
const NOTES_DATES = ['12. Aug. 2020', '1. Sep. 2022', '1. Okt. 2023', '1. Apr. 2025', 'Heute']
const Folder = () => <svg aria-hidden width="16" height="13" viewBox="0 0 16 13"><path d="M1.5 2.2c0-.7.5-1.2 1.2-1.2h3.2l1.4 1.5h6c.7 0 1.2.5 1.2 1.2v7.4c0 .7-.5 1.2-1.2 1.2H2.7c-.7 0-1.2-.5-1.2-1.2z" fill="none" stroke="#e1a100" strokeWidth="1.2" /></svg>
function Notes() {
  const ref = useRef(), bodyRef = useRef()
  const [i, setI] = useState(CHAPTERS.length - 1)
  useMotion(ref, (el) => {
    // opens like a window from the Dock: from a narrow sliver at the bottom up to full size
    gsap.fromTo(el.querySelector('[data-notes]'), { clipPath: 'inset(70% 35% 0% 35% round 16px)', scale: 0.9, y: 60 },
      { clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 35%', scrub: 0.6 } })
  })
  const pick = (k) => { setI(k); gsap.fromTo(bodyRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }) }
  const c = CHAPTERS[i]
  const date = (k) => NOTES_DATES[k] ?? NOTES_DATES[NOTES_DATES.length - 1]
  return (
    <div ref={ref}>
      <div data-notes className="mac-window max-w-[64rem] mx-auto text-[13px] text-ink">
        {/* the toolbar */}
        <div className="flex items-center h-[52px] border-b border-black/[0.07]">
          <div className="flex items-center gap-4 w-[12.5rem] max-md:w-auto px-4"><Lights /><svg aria-hidden width="18" height="14" viewBox="0 0 18 14" className="max-md:hidden"><rect x=".75" y=".75" width="16.5" height="12.5" rx="2.5" fill="none" stroke="#8a8a8e" strokeWidth="1.3" /><path d="M6 1v12" stroke="#8a8a8e" strokeWidth="1.3" /></svg></div>
          <div className="hidden md:flex items-center gap-4 w-[17rem] px-4 border-l border-black/[0.06] h-full text-faint">
            <svg aria-hidden width="17" height="13" viewBox="0 0 17 13"><path d="M1 2h15M1 6.5h15M1 11h15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            <svg aria-hidden width="15" height="15" viewBox="0 0 15 15" className="ml-auto"><path d="M10.5 1.5l3 3-8 8H2.5v-3z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
          </div>
          <div className="flex-1 flex items-center justify-end gap-5 px-5 text-faint border-l border-black/[0.06] h-full">
            <span className="text-[15px] font-medium">Aa</span>
            <svg aria-hidden width="16" height="14" viewBox="0 0 16 14"><path d="M2 2.5h1M2 7h1M2 11.5h1M6 2.5h8M6 7h8M6 11.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            <svg aria-hidden width="16" height="14" viewBox="0 0 16 14"><rect x="1" y="1" width="14" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M1 5h14M6 1v12" stroke="currentColor" strokeWidth="1.3" /></svg>
            <svg aria-hidden width="14" height="15" viewBox="0 0 14 15"><path d="M7 1v9M3.5 4.5L7 1l3.5 3.5M2 8v5.5h10V8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
        <div className="grid md:grid-cols-[12.5rem_17rem_1fr] min-h-[26rem]">
          {/* the folders */}
          <div className="hidden md:block bg-white/20 border-r border-black/[0.06] p-2 pt-3">
            <p className="px-2 pb-1 text-[11px] font-semibold text-faint">iCloud</p>
            {[['Alle iCloud-Notizen', 9], ['Notizen', 4], ['Geschichte', CHAPTERS.length]].map(([f, n]) => (
              <p key={f} className={`flex items-center gap-2 rounded-[8px] px-2 py-[5px] ${f === 'Geschichte' ? 'bg-black/[0.07]' : ''}`}><Folder /><span className="flex-1 truncate">{f}</span><span className="text-faint">{n}</span></p>
            ))}
          </div>
          {/* the notes */}
          <ul role="tablist" aria-label="Kapitel" className="flex md:flex-col gap-0.5 overflow-x-auto md:overflow-visible p-2 bg-paper md:border-r border-black/[0.08] max-md:border-b">
            {CHAPTERS.map((ch, k) => (
              <li key={ch.hash} className="flex-none">
                <button type="button" role="tab" aria-selected={i === k} onClick={() => pick(k)}
                  className={`w-full text-left rounded-[6px] px-3 py-2 transition-colors ${i === k ? 'bg-[#ffe066]' : 'hover:bg-black/[0.04]'}`}>
                  <span className="block font-semibold whitespace-nowrap truncate">{ch.label}</span>
                  <span className="hidden md:block text-[12px] truncate"><span className="text-ink/80">{date(k)}</span> <span className="text-faint">{ch.text.slice(0, 40)}</span></span>
                </button>
                <i aria-hidden className={`hidden md:block mx-3 h-px bg-black/[0.07] ${k === CHAPTERS.length - 1 ? 'invisible' : ''}`} />
              </li>
            ))}
          </ul>
          {/* the note */}
          <div role="tabpanel" className="bg-paper px-8 sm:px-12 py-5">
            <div ref={bodyRef}>
              <p className="text-center text-[11px] text-faint">{date(i)}{i === CHAPTERS.length - 1 ? ' um 10:12' : ''}</p>
              <h4 className="mt-5 text-[22px] font-bold tracking-[-0.01em]">{c.label}</h4>
              <p className="mt-3 text-[14px] leading-[1.6] max-w-[38em]">
                {c.label === 'Studium & Nachtschicht'
                  ? <>Das Studium an der THM hat mir gefallen. Parallel habe ich nachts im Briefzentrum bei <A href={LINKS.DHL}>DHL in Langgöns</A> gearbeitet, und oft fehlte mir die Kraft für Prüfungen und Testate. Gelernt habe ich daraus Disziplin – und dass Erfolg erarbeitet werden muss.</>
                  : c.text}
              </p>
              <p className="mt-6 text-[12px] text-faint font-mono">{c.hash}{c.head ? ' · HEAD' : ''}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Path() {
  return (
    <section id="weg" aria-labelledby="weg-title" className="section-y">
      <div className="frame grid grid-cols-12 gap-x-6 gap-y-6 items-end mb-14 lg:mb-20">
        <div className="col-span-12 lg:col-span-5">
          <p className="t-cap">Werdegang</p>
          <h2 id="weg-title" className="t-hero mt-3">Mein Weg</h2>
        </div>
        <p className="col-span-12 lg:col-start-7 lg:col-span-5 t-lead text-gray max-w-[34ch] lg:pb-3">Nach Ausbildung, Fachabitur und zwei Semestern Medieninformatik an der THM bin ich heute Zeitsoldat bei der Bundeswehr. <span className="text-ink">Ab 2027 studiere ich nebenbei an der IU weiter.</span></p>
      </div>
      <div className="frame"><About /></div>
      <div className="frame mt-28 lg:mt-0"><TimeLine /></div>
      <div className="frame mt-24 lg:mt-10"><Notes /></div>
    </section>
  )
}
