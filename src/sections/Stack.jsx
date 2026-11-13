import { useEffect, useRef, useState } from 'react'
import { LAYERS, PROJECTS, projectsUsing } from '../data/content'
import { useMotion, gsap, ScrollTrigger, prefersReduced } from '../lib/motion'
import { notify, emit } from '../lib/events'
import Tile, { Mark } from '../ui/Tile'

const TOOLS = LAYERS.flatMap((l) => l.items.map((t) => ({ t, layer: l })))
const titleOf = (slug) => PROJECTS.find((p) => p.slug === slug).title
// the tools of the stack that a project uses (its tech list, read through the aliases)
const TOOLS_OF = Object.fromEntries(PROJECTS.map((p) => [p.slug, TOOLS.filter(({ t }) => projectsUsing(t).includes(p.slug))]))
// what a project lists that is not in the stack (an API, a router), named in text beside its tiles
const EXTRAS = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.tech.filter((t) => !TOOLS_OF[p.slug].some((x) => x.t === t || x.t.includes(t.split(' ')[0])))]))
const BASE = 34 // px per second, the band's own pace

const tell = ({ t, layer }) => {
  const used = projectsUsing(t)
  notify({ app: layer.label, title: t, body: used.length ? `Steckt in ${used.map(titleOf).join(', ')}.` : 'Im Werkzeugkasten – in keinem der gezeigten Projekte.', icon: <Mark t={t} size={18} /> })
}

// The tools as one endless band, running from left to right on its own; scrolling pushes it along
// faster for a moment. Under it the projects, each with the tools it is built with. The two answer
// each other: over a tool the band stops, the tool lifts, the projects without it step back; over a
// project the band slows and only that project's tools stay lit. The heading above is made of
// particles (ParticleField); the line beside it names what is pointed at.
// A click on a tool posts where it is used; a click on a project opens it.
export default function Stack() {
  const ref = useRef(), trackRef = useRef(), slow = useRef(1)
  const [active, setActive] = useState(null) // { tool } | { slug }
  const [size, setSize] = useState(64)

  useEffect(() => {
    const fit = () => setSize(innerWidth < 640 ? 52 : 64)
    fit(); window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  // the band: two copies side by side, shifted right and wrapped every copy's width; it runs only
  // while it is on screen
  useEffect(() => {
    const track = trackRef.current
    if (prefersReduced()) return
    let x = 0, speed = BASE, boost = 0, half = 0, seen = false
    const measure = () => { half = track.scrollWidth / 2 }
    measure()
    const ro = new ResizeObserver(measure); ro.observe(track)
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting }); io.observe(track)
    const st = ScrollTrigger.create({ trigger: track, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { boost = Math.min(700, Math.abs(s.getVelocity()) * 0.3) } })
    const tick = (time, dt) => {
      if (!seen || !half) return
      speed += (BASE * slow.current - speed) * 0.06
      boost *= 0.92
      x = (x + ((speed + boost * slow.current) * Math.min(dt, 50)) / 1000) % half
      track.style.transform = `translate3d(${x - half}px,0,0)`
    }
    gsap.ticker.add(tick)
    return () => { gsap.ticker.remove(tick); ro.disconnect(); io.disconnect(); st.kill() }
  }, [])

  // over a tool the band stops, over a project it slows
  useEffect(() => { slow.current = active?.tool ? 0 : active?.slug ? 0.3 : 1 }, [active])

  useMotion(ref, (el) => {
    gsap.fromTo(el.querySelector('[data-band]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: 0.6 } })
    gsap.fromTo(el.querySelectorAll('[data-project]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: el.querySelector('[data-projects]'), start: 'top 85%', once: true } })
  })

  const tool = active?.tool, slug = active?.slug
  const lit = (t) => (tool ? tool.t === t : slug ? TOOLS_OF[slug].some((x) => x.t === t) : true)
  const leave = () => setActive(null)

  const band = (copy) => TOOLS.map((x) => (
    <li key={copy + x.t} className="flex-none pr-4 sm:pr-5" aria-hidden={copy ? true : undefined}>
      <button type="button" tabIndex={copy ? -1 : undefined} aria-label={`${x.t} – ${x.layer.label}`}
        onPointerEnter={(e) => e.pointerType !== 'touch' && setActive({ tool: x })} onFocus={() => setActive({ tool: x })} onBlur={leave}
        onClick={() => { setActive({ tool: x }); tell(x) }}
        className={`group/t flex flex-col items-center gap-2.5 transition-[opacity,transform] duration-500 ease-sys ${lit(x.t) ? '' : 'opacity-25'} ${tool?.t === x.t || (slug && lit(x.t)) ? '-translate-y-2' : ''}`}>
        <Tile t={x.t} size={size} className={`transition-transform duration-500 ease-sys ${tool?.t === x.t ? 'scale-[1.15]' : 'group-hover/t:scale-105'}`} />
        <span className={`t-mono text-[11px] whitespace-nowrap transition-colors duration-300 ${tool?.t === x.t ? 'text-ink' : 'text-faint'}`}>{x.t}</span>
      </button>
    </li>
  ))

  return (
    <section ref={ref} id="stack" aria-labelledby="stack-title" className="section-y overflow-x-clip">
      <div className="frame grid grid-cols-12 gap-x-6 gap-y-4 items-end">
        <div className="col-span-12 lg:col-span-8">
          <p className="t-cap">{tool ? tool.layer.label : slug ? `${TOOLS_OF[slug].length} Werkzeuge im Projekt` : `${TOOLS.length} Werkzeuge · ${PROJECTS.length} Projekte`}</p>
          <h2 id="stack-title" className="sr-only">Womit ich baue</h2>
          {/* made of particles (ParticleField); it stays put whatever is pointed at */}
          <p aria-hidden className="t-hero mt-3 whitespace-nowrap"><span data-particles="text" className="inline-block">Womit ich baue</span></p>
        </div>
        <p className="col-span-12 lg:col-span-4 lg:text-right t-mono text-gray min-h-[1.5em] lg:pb-3" aria-live="polite">
          {tool ? (projectsUsing(tool.t).length ? `→ ${projectsUsing(tool.t).map(titleOf).join(' · ')}` : '→ im Werkzeugkasten')
            : slug ? `→ ${TOOLS_OF[slug].map((x) => x.t).join(' · ')}` : 'Fahr über ein Symbol oder ein Projekt.'}
        </p>
      </div>

      {/* the band, faded out at both edges */}
      <div data-band className="mt-14 lg:mt-20 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]" onPointerLeave={leave}>
        <ul ref={trackRef} aria-label="Werkzeuge" className={`flex w-max py-4 will-change-transform ${prefersReduced() ? 'flex-wrap w-auto justify-center gap-y-6 px-[var(--gutter)]' : ''}`}>
          {band(0)}
          {!prefersReduced() && band(1)}
        </ul>
      </div>

      {/* the projects, each with its tools */}
      <ul data-projects aria-label="Projekte und ihre Werkzeuge" className="frame mt-14 lg:mt-20" onPointerLeave={leave}>
        {PROJECTS.map((p, i) => {
          const dim = (tool && !projectsUsing(tool.t).includes(p.slug)) || (slug && slug !== p.slug)
          return (
            <li key={p.slug} data-project className="border-t border-line last:border-b">
              <button type="button" onPointerEnter={(e) => e.pointerType !== 'touch' && setActive({ slug: p.slug })} onFocus={() => setActive({ slug: p.slug })} onBlur={leave}
                onClick={() => emit('open-project', p.slug)} data-cursor="Öffnen ↗"
                className={`group w-full grid grid-cols-12 gap-x-6 gap-y-4 items-center py-6 sm:py-7 text-left transition-opacity duration-500 ease-sys ${dim ? 'opacity-30' : ''}`}>
                <span className="col-span-12 md:col-span-5 lg:col-span-4 flex items-baseline gap-4">
                  <span className="t-mono text-faint tabular-nums">0{i + 1}</span>
                  <span>
                    <span className="block t-title transition-transform duration-500 ease-sys group-hover:translate-x-2">{p.title}</span>
                    <span className="block t-mono text-gray mt-1">{p.kind} · {p.year}</span>
                  </span>
                </span>
                <span className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-wrap gap-2">
                  {TOOLS_OF[p.slug].map((x, k) => (
                    <span key={x.t} className="transition-transform duration-500 ease-sys group-hover:-translate-y-1.5" style={{ transitionDelay: `${k * 45}ms` }}>
                      <Tile t={x.t} size={40} />
                    </span>
                  ))}
                  {EXTRAS[p.slug].length > 0 && <span className="self-center t-mono text-faint ml-1">+ {EXTRAS[p.slug].join(' · ')}</span>}
                </span>
                <span className="hidden lg:flex col-span-2 justify-end items-center gap-2 t-mono text-gray group-hover:text-ink transition-colors">
                  Öffnen <span aria-hidden className="transition-transform duration-500 ease-sys group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
