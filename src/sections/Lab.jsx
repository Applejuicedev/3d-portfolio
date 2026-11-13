import { useRef } from 'react'
import { useMotion, gsap, EASE } from '../lib/motion'
import SectionHead from '../ui/SectionHead'
import Raster from '../lab-exp/Raster'
import Curve from '../lab-exp/Curve'
import Pause from '../lab-exp/Pause'

// One experiment: an instrument panel with its number, name and what it is — the body is live.
function Exp({ n, name, what, className = '', children }) {
  return (
    <article data-exp aria-label={`Experiment ${n}: ${name}`} className={`panel ticks flex flex-col ${className}`}>
      <header className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <p className="t-label"><span className="text-lime">EXP-{n}</span> · <span className="text-ink">{name}</span></p>
        <p className="t-label text-faint max-sm:hidden">{what}</p>
      </header>
      <div className="flex-1">{children}</div>
    </article>
  )
}

// The lab: small things that run in the browser, kept apart from the projects. One of them takes
// a rule out of a real project (the break rule of Dienstzeit) and makes it something to play with.
export default function Lab() {
  const ref = useRef()
  useMotion(ref, (el) => {
    gsap.from(el.querySelectorAll('[data-exp]'), { opacity: 0, y: 40, duration: 1.2, stagger: 0.12, ease: EASE.out, scrollTrigger: { trigger: el.querySelector('[data-grid]'), start: 'top 80%', once: true } })
  })
  return (
    <section ref={ref} id="labor" aria-labelledby="labor-title" className="frame section-y">
      <SectionHead n={3} label="Labor" id="labor-title"
        title={<>Kleine <span className="t-serif">Experimente</span></>}
        note={<>Keine Kundenprojekte<span className="block text-faint">Läuft live, zum Anfassen</span></>} />
      <div data-grid className="grid12 gap-y-[var(--col-gap)] mt-16 lg:mt-24">
        <Exp n="01" name="Rasterizer" what="Canvas 2D · eigener Renderer" className="col-span-4 lg:col-span-7"><Raster /></Exp>
        <Exp n="02" name="Kurven-Editor" what="cubic-bezier · zum Ziehen" className="col-span-4 lg:col-span-5"><Curve /></Exp>
        <Exp n="03" name="Pausenregel" what="aus der App Dienstzeit · SAZV Grundbetrieb" className="col-span-4 lg:col-span-12"><Pause /></Exp>
      </div>
    </section>
  )
}
