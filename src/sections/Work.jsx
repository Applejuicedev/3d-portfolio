import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/content'
import { useMotion, gsap, ScrollTrigger, riseLines, EASE } from '../lib/motion'
import { stats } from '../lib/ascii'
import SectionHead from '../ui/SectionHead'
import ProjectVideo from '../ui/ProjectVideo'
import AsciiCanvas from '../ui/AsciiCanvas'
import { Arrow } from '../ui/Arrow'

const pad = (i) => String(i + 1).padStart(2, '0')
const TOTAL = pad(PROJECTS.length - 1)

// **key phrase** → ink; the rest of the story stays muted
const Marked = ({ text }) => text.split('**').map((part, i) => (i % 2 ? <strong key={i} className="font-normal text-ink">{part}</strong> : part))

function Story({ story, className = '' }) {
  return (
    <dl className={className}>
      {story.map(([k, v]) => (
        <div key={k} data-in className="border-t border-line pt-3">
          <dt className="t-label"><span className="text-faint">// </span>{k}</dt>
          <dd className="mt-3 t-body text-muted max-w-[46ch]"><Marked text={v} /></dd>
        </div>
      ))}
    </dl>
  )
}

function Meta({ p, i }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 t-label">
      <span className="text-ink tabular-nums">{pad(i)} / {TOTAL}</span>
      <span>{p.kind}</span>
      <span>{p.year}</span>
      <span className="inline-flex items-center gap-1.5">
        <i className={`w-1.5 h-1.5 rounded-full ${p.status === 'Live' ? 'bg-lime pulse' : 'border border-muted'}`} />{p.status}
      </span>
    </div>
  )
}

function Links({ p }) {
  if (!p.links.length) return <p className="t-label text-faint">privates Repository · {p.repo}</p>
  return (
    <p className="flex flex-wrap gap-x-6 gap-y-2">
      {p.links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group press inline-flex items-center gap-2 text-[15px] text-ink">
          <span className="roll"><span>{l.label}</span><span aria-hidden>{l.label}</span></span><Arrow />
        </a>
      ))}
    </p>
  )
}

const Tech = ({ p }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="Technologien">
    {p.tech.map((t) => <li key={t} className="t-mono text-[11.5px] text-muted border border-line rounded-[3px] px-2 py-0.5">{t}</li>)}
  </ul>
)

// the demo arrives behind a cover that slides off (not a clip-path on the video: a clipped
// ancestor made the video's IntersectionObserver see it late, so playback lagged behind)
const Cover = ({ color }) => <span data-cover aria-hidden className="absolute inset-0 z-10 origin-top pointer-events-none" style={{ background: color, transform: 'scaleY(0)' }} />

// ── 01 · stage: the phone app on its own colour, with facts pinned around it ──
function StageProject({ p, i }) {
  return (
    <>
      <div className="relative mt-10 overflow-hidden rounded-[4px]" style={{ background: p.surface }}>
        <Cover color="#0b0b0a" />
        <div className="relative grid lg:grid-cols-[1fr_minmax(0,22rem)_1fr] items-center gap-6 px-5 py-8 lg:py-12">
          <ul className="hidden lg:flex flex-col gap-10 items-end">
            {p.callouts.slice(0, 2).map((c) => (
              <li key={c} data-callout className="flex items-center gap-3 t-label text-ink">{c}<span aria-hidden className="w-16 h-px bg-lime/70" /><i className="w-1.5 h-1.5 bg-lime" /></li>
            ))}
          </ul>
          <ProjectVideo src={`/videos/${p.slug}.webm`} poster={`/videos/${p.slug}.jpg`} label={p.video.label} frame="phone-bare" surface={p.surface} />
          <ul className="hidden lg:flex flex-col gap-10">
            {p.callouts.slice(2).map((c) => (
              <li key={c} data-callout className="flex items-center gap-3 t-label text-ink"><i className="w-1.5 h-1.5 bg-lime" /><span aria-hidden className="w-16 h-px bg-lime/70" />{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <Story story={p.story} className="grid lg:grid-cols-3 gap-x-[var(--col-gap)] gap-y-8 mt-12" />
      <div className="flex flex-wrap items-center justify-between gap-6 mt-10"><Tech p={p} /><Links p={p} /></div>
    </>
  )
}

// ── 02 · wide: the screen recording runs out to the edge of the page ──
function WideProject({ p }) {
  return (
    <>
      <div className="relative mt-10 lg:-mr-[var(--gutter)]">
        <Cover color="#0b0b0a" />
        <ProjectVideo src={`/videos/${p.slug}.webm`} poster={`/videos/${p.slug}.jpg`} label={p.video.label} frame="screen" surface={p.surface} />
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-[var(--col-gap)] gap-y-10 mt-12">
        <div className="space-y-6 lg:sticky lg:top-24 self-start"><Tech p={p} /><Links p={p} /></div>
        <Story story={p.story} className="grid sm:grid-cols-2 gap-x-[var(--col-gap)] gap-y-8 [&>*:first-child]:sm:col-span-2" />
      </div>
    </>
  )
}

// ── 03 · live: this site, measured while you read ──
function useLiveNumbers(ref) {
  const [n, setN] = useState(null)
  useEffect(() => {
    let id
    const read = () => {
      const res = performance.getEntriesByType('resource')
      const js = res.filter((r) => r.initiatorType === 'script' || /\.js(\?|$)/.test(r.name))
      const nav = performance.getEntriesByType('navigation')[0]
      const bytes = js.reduce((a, r) => a + (r.transferSize || r.encodedBodySize || 0), 0)
      setN({
        fps: stats.fps, cells: stats.cells, points: stats.points,
        js: bytes ? `${Math.round(bytes / 1024)} KB` : 'aus dem Cache',
        dom: document.getElementsByTagName('*').length,
        load: nav ? `${Math.round(nav.domContentLoadedEventEnd)} ms` : '—',
        vp: `${innerWidth} × ${innerHeight}`,
      })
    }
    const io = new IntersectionObserver(([e]) => { clearInterval(id); if (e.isIntersecting) { read(); id = setInterval(read, 700) } })
    io.observe(ref.current)
    return () => { io.disconnect(); clearInterval(id) }
  }, [ref])
  return n
}

function LiveProject({ p }) {
  const panelRef = useRef()
  const n = useLiveNumbers(panelRef)
  const rows = n && [
    ['Bildrate (Rasterizer)', `${n.fps || '—'} fps`],
    ['Zeichen pro Bild', n.cells ? n.cells.toLocaleString('de-DE') : '—'],
    ['Punkte im Mesh', n.points.toLocaleString('de-DE')],
    ['JavaScript übertragen', n.js],
    ['DOM-Knoten', n.dom.toLocaleString('de-DE')],
    ['DOMContentLoaded', n.load],
    ['Viewport', n.vp],
  ]
  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] items-start gap-x-[var(--col-gap)] gap-y-10 mt-10">
      <div ref={panelRef} className="panel ticks relative overflow-hidden">
        <Cover color="#0b0b0a" />
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 t-label">
          <span>inspector · live</span><span className="inline-flex items-center gap-1.5 text-ink"><i className="pulse w-1.5 h-1.5 rounded-full bg-lime" />misst</span>
        </div>
        <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <AsciiCanvas boot={false} fontSize={7} zoom={0.9} className="h-64 sm:h-auto sm:min-h-[19rem] border-b sm:border-b-0 sm:border-r border-line" />
          <dl className="t-mono text-[12px] divide-y divide-line">
            {(rows ?? []).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 px-4 py-2.5"><dt className="text-muted">{k}</dt><dd className="text-ink tabular-nums text-right">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <div className="space-y-10">
        <Story story={p.story} className="space-y-8" />
        <div className="space-y-6"><Tech p={p} /><Links p={p} /></div>
      </div>
    </div>
  )
}

const LAYOUTS = { stage: StageProject, wide: WideProject, live: LiveProject }

function Project({ p, i }) {
  const Body = LAYOUTS[p.layout]
  return (
    <article id={`projekt-${p.slug}`} data-project={p.slug} aria-labelledby={`projekt-${p.slug}-title`} className="relative scroll-mt-10 pt-6 pb-28 lg:pb-44">
      <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-line origin-left" />
      <Meta p={p} i={i} />
      <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-x-[var(--col-gap)] gap-y-5 mt-8 items-end">
        <h3 id={`projekt-${p.slug}-title`} className="t-title text-[clamp(2.4rem,6vw,5.75rem)]">{p.title}</h3>
        <p data-lede className="t-lead text-muted text-[clamp(1.1rem,1.6vw,1.45rem)] max-w-[34ch] pb-2">{p.lede}</p>
      </div>
      <Body p={p} i={i} />
    </article>
  )
}

// The work. Desktop: a sticky index on the left (Mecha-style) marks the project in view, and its
// hairline fills with your progress through it; each project is composed its own way. Phones:
// the projects one after another.
export default function Work() {
  const ref = useRef()
  const [active, setActive] = useState(0)

  useMotion(ref, (el) => {
    el.querySelectorAll('[data-project]').forEach((a, i) => {
      gsap.timeline({ scrollTrigger: { trigger: a, start: 'top 80%', once: true } })
        .from(a.querySelector('[data-rule]'), { scaleX: 0, duration: 1.2, ease: EASE.inOut }, 0)
        .from(a.querySelector('[data-lede]'), { opacity: 0, y: 16, duration: 1, ease: EASE.out }, 0.3)
      riseLines(a.querySelector('h3'), { trigger: a, start: 'top 80%' })
      const cover = a.querySelector('[data-cover]')
      if (cover) gsap.fromTo(cover, { scaleY: 1 }, { scaleY: 0, duration: 1.3, ease: EASE.inOut, scrollTrigger: { trigger: cover.parentElement, start: 'top 82%', once: true } })
      gsap.from(a.querySelectorAll('[data-callout]'), { opacity: 0, x: (j) => (j < 2 ? -20 : 20), duration: 1, stagger: 0.12, ease: EASE.out, scrollTrigger: { trigger: a, start: 'top 40%', once: true } })
      a.querySelectorAll('[data-in]').forEach((d) => gsap.from(d, { opacity: 0, y: 18, duration: 1, ease: EASE.out, scrollTrigger: { trigger: d, start: 'top 90%', once: true } }))
      // index progress
      const bar = el.querySelector(`[data-index-bar="${i}"]`)
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: a, start: 'top 50%', end: 'bottom 50%', scrub: true } })
    })
  })
  // which project is active: independent of motion settings
  useEffect(() => {
    const sts = [...ref.current.querySelectorAll('[data-project]')].map((a, i) =>
      ScrollTrigger.create({ trigger: a, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => s.isActive && setActive(i) }))
    return () => sts.forEach((s) => s.kill())
  }, [])

  return (
    <section ref={ref} id="arbeiten" aria-labelledby="arbeiten-title" className="frame section-y">
      <SectionHead n={1} label="Arbeiten" id="arbeiten-title"
        title={<>Ausgewählte <span className="t-serif">Arbeiten</span></>}
        note={<>Echte Aufnahmen aus den Apps<span className="block text-faint">{pad(PROJECTS.length - 1)} Projekte</span></>} />
      <div className="grid12 mt-16 lg:mt-24">
        <aside className="hidden lg:block lg:col-span-3">
          <nav aria-label="Projekte" className="sticky top-[calc(50vh-6rem)]">
            <ol>
              {PROJECTS.map((p, i) => (
                <li key={p.slug} className="relative border-t border-line last:border-b">
                  <a href={`#projekt-${p.slug}`} onClick={(e) => { e.preventDefault(); document.getElementById(`projekt-${p.slug}`)?.scrollIntoView() }}
                    aria-current={active === i ? 'true' : undefined}
                    className={`group grid grid-cols-[2.5rem_1fr_auto] items-baseline py-3 pr-1 transition-colors duration-300 ${active === i ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                    <span className={`t-label ${active === i ? 'text-lime' : 'text-faint'}`}>{pad(i)}</span>
                    <span className="text-[15px] tracking-tight">{p.title}</span>
                    <span className="t-label text-faint">{p.kind}</span>
                  </a>
                  <span aria-hidden data-index-bar={i} className="absolute left-0 right-0 -top-px h-px bg-lime origin-left" style={{ transform: 'scaleX(0)' }} />
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="col-span-4 lg:col-span-9">
          {PROJECTS.map((p, i) => <Project key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
