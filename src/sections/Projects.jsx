import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/content'
import { useMotion, gsap, ScrollTrigger } from '../lib/motion'
import { emit } from '../lib/events'
import Window from '../ui/Window'
import ProjectMedia from './ProjectMedia'

const pad = (i) => String(i + 1).padStart(2, '0')

// The gallery runs sideways only where there is room for it and motion is welcome
function useSideways() {
  const q = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
  const [on, setOn] = useState(() => window.matchMedia(q).matches)
  useEffect(() => { const m = window.matchMedia(q); const f = () => setOn(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return on
}

// One project: its window (with the real recording) and the caption below. Over the window the
// pointer itself says what a click does (Cursor.jsx); the click opens the project's sheet.
function ProjectWindow({ p, i }) {
  // (the video's own pause button inside the window doesn't open it)
  const open = (e) => { if (e.target.closest('button') && e.target.closest('button') !== e.currentTarget) return; emit('open-project', { slug: p.slug, from: e.currentTarget.getBoundingClientRect() }) }
  return (
    <article data-item aria-labelledby={`p-${p.slug}`} className="flex-none w-full lg:w-[61.8vw] lg:max-w-[64rem]">
      <div data-win className="relative will-change-transform">
        <Window flat title={`${p.title} — ${p.kind}`} className="group/win cursor-pointer">
          <div className="relative aspect-[16/10] overflow-hidden" onClick={open} data-cursor="Öffnen ↗" data-buddy={`${p.title}: echte Aufnahme. Klick rein.`}>
            <ProjectMedia p={p} />
          </div>
        </Window>
      </div>
      <div data-cap className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 mt-6 px-1">
        <span className="t-cap tabular-nums">{pad(i)}</span>
        <h3 id={`p-${p.slug}`} className="t-title">{p.title}</h3>
        <button type="button" onClick={open} className="group press row-span-2 self-center inline-flex items-center gap-2 h-10 px-4 rounded-full glass text-[14px]">
          <span className="roll"><span>Öffnen</span><span aria-hidden>Details</span></span><span aria-hidden>↗</span>
        </button>
        <p className="col-start-2 t-mono text-gray">{p.kind} · {p.year} · <span className={p.status === 'Live' ? 'text-[#1f9d55]' : ''}>{p.status}</span></p>
        <p className="col-start-2 col-span-2 text-[16px] text-gray max-w-[44ch]">{p.lede}</p>
      </div>
    </article>
  )
}

// The work. On wide screens the section pins and the windows travel sideways as you scroll: the
// one in the middle is in focus (full size, flat), the others turn away and shrink a little, and
// the counter follows. Elsewhere they stand one below the other and rise in as they arrive.
export default function Projects() {
  const ref = useRef(), trackRef = useRef(), countRef = useRef()
  const side = useSideways()

  useMotion(ref, (el) => {
    const items = [...el.querySelectorAll('[data-item]')]
    if (!side) {
      items.forEach((it) => gsap.from(it.querySelector('[data-win]'), { y: 80, scale: 0.94, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: it, start: 'top 85%', once: true } }))
      return
    }
    const track = trackRef.current
    const dist = () => track.scrollWidth - innerWidth
    const focus = () => {
      const mid = innerWidth / 2
      let best = 0, bd = Infinity
      items.forEach((it, i) => {
        const r = it.getBoundingClientRect(), c = r.left + r.width / 2
        const d = Math.max(-1, Math.min(1, (c - mid) / (innerWidth * 0.62)))
        if (Math.abs(d) < bd) { bd = Math.abs(d); best = i }
        gsap.set(it.querySelector('[data-win]'), { rotateY: d * -18, scale: 1 - Math.abs(d) * 0.1, transformPerspective: 1600, transformOrigin: d > 0 ? 'left center' : 'right center' })
        gsap.set(it.querySelector('[data-cap]'), { opacity: 1 - Math.abs(d) * 0.7 })
      })
      if (countRef.current) countRef.current.textContent = pad(best)
    }
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: el.querySelector('[data-pin]'), start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, onUpdate: focus, onRefresh: focus },
    })
    // the title slides in from the right while the pin starts
    gsap.from(el.querySelector('[data-intro]'), { xPercent: 30, opacity: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 20%', scrub: 0.6 } })
  }, [side])

  useEffect(() => { ScrollTrigger.refresh() }, [side])

  const intro = (
    <div data-intro className="flex-none w-full lg:w-[30vw] flex flex-col justify-end lg:pb-[18vh] max-lg:mb-10">
      <p className="t-cap">Arbeiten · <span ref={countRef} className="text-ink tabular-nums">01</span> / {pad(PROJECTS.length - 1)}</p>
      <h2 id="arbeiten-title" className="t-display mt-4">Ausgewählte<br />Arbeiten</h2>
      <p className="t-lead text-gray mt-5 max-w-[22ch]">Echte Aufnahmen aus den Apps. Klick auf ein Fenster.</p>
      {side && <p aria-hidden className="t-cap mt-8 flex items-center gap-2">scrollen <span className="inline-block animate-[nudgex_1.6s_ease-in-out_infinite]">→</span></p>}
    </div>
  )

  return (
    <section ref={ref} id="arbeiten" aria-labelledby="arbeiten-title" className="relative">
      {side ? (
        <div data-pin className="h-[100svh] overflow-hidden flex items-center">
          <div ref={trackRef} className="flex items-center gap-[6vw] pl-[var(--gutter)] pr-[19vw]">
            {intro}
            {PROJECTS.map((p, i) => <ProjectWindow key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      ) : (
        <div className="frame section-y">
          {intro}
          <div className="space-y-20">{PROJECTS.map((p, i) => <ProjectWindow key={p.slug} p={p} i={i} />)}</div>
        </div>
      )}
      <style>{'@keyframes nudgex{50%{transform:translateX(5px)}}'}</style>
    </section>
  )
}
