import { useEffect, useRef, useState } from 'react'
import { SectionHead } from './Section'
import { Slab, SlabScene } from './Slabs'
import { useMotion, gsap, ScrollTrigger, finePointer, prefersReduced } from './motion'
import Accent from './Accent'
import Marquee from './Marquee'

// What I work with, grouped by what it is for, bottom layer first: the foundation (languages) up
// to the tools on top. Plain names: the projects show what each one was used for.
const GROUPS = [
  { label: 'Sprachen', items: ['TypeScript', 'Swift', 'Python', 'HTML & CSS'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'React Native · Expo', 'SwiftUI', 'Node.js'] },
  { label: 'Gestaltung & Motion', items: ['Figma', 'GSAP', 'Framer Motion', 'Three.js', 'Blender'] },
  { label: 'Werkzeuge', items: ['Git · GitHub', 'Vite', 'Tailwind CSS', 'Xcode', 'Docker'] },
  { label: 'Mit KI', items: ['Claude Code', 'Claude', 'ChatGPT', 'Perplexity'] },
]

const LIFT = 22, OPEN = 96

function useSlabSize() {
  const get = () => (window.matchMedia('(min-width: 640px)').matches ? 210 : 170)
  const [s, setS] = useState(get)
  useEffect(() => {
    const on = () => setS(get())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

// Touch screens can't hover, so there the scroll does it — driven by the model, not the list
// (on a phone the list stands below the model, so a row-driven selection lifted layers that had
// already left the screen): from the moment the model comes up into view until it nears the top,
// its layers are selected one after another, top plate first, exactly as if their rows were hovered
// (the layer lifts out, the other rows dim) — down and up with the scroll. Before and after, the
// model rests. One ScrollTrigger; nothing with reduced motion (a tap still selects). Devices with a
// real pointer keep their hover and never get it.
function useScrollSelect(sceneRef, select, count) {
  useEffect(() => {
    if (finePointer() || prefersReduced()) return
    const st = ScrollTrigger.create({
      trigger: sceneRef.current, start: 'top 68%', end: 'top 8%',
      onUpdate: (self) => select(count - 1 - Math.min(count - 1, Math.floor(self.progress * count))),
      onLeave: () => select(null), onLeaveBack: () => select(null),
    })
    return () => st.kill()
  }, [sceneRef, select, count])
}

// The model enters once (the layers settle one after another), then turns a few degrees with the
// scroll — no pinning, no restacking — while light slides across the top faces. Below it a
// perspective grid opens up as the section passes. Hover/focus/tap select a layer at any time; on
// touch screens the scroll selects too (useScrollSelect).
export default function Stack() {
  const ref = useRef(), sceneRef = useRef()
  const size = useSlabSize()
  const [hovered, setHovered] = useState(null)
  const active = hovered
  // a touch reaches the rows as emulated mouseenter/focus right before its click, which then
  // toggled the selection straight off again: there only the tap (and keyboard focus) selects
  const [touch] = useState(() => !finePointer())
  useScrollSelect(sceneRef, setHovered, GROUPS.length)

  useMotion(ref, (el) => {
    const scene = el.querySelector('[data-stack-scene]')
    gsap.from(el.querySelectorAll('[data-slab]'), {
      opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out',
      scrollTrigger: { trigger: scene, start: 'top 80%', once: true },
    })
    gsap.fromTo(scene, { '--gap': '8px' }, {
      '--gap': '30px', duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: scene, start: 'top 80%', once: true },
    })
    // through the whole section: a slow turn and the light moving over the stack
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
      .fromTo(el.querySelector('[data-spin]'), { rotation: -7 }, { rotation: 7, ease: 'none' }, 0)
      .fromTo(scene, { '--light': 0 }, { '--light': 1, ease: 'none' }, 0)
      .fromTo(el.querySelector('[data-floor]'), { scaleY: 0.35, opacity: 0 }, { scaleY: 1, opacity: 1, ease: 'none', duration: 0.5 }, 0)
  }, [], { idle: true })

  const z = (i) => {
    const extra = active === null ? 0 : i === active ? LIFT : i > active ? OPEN : 0
    return `calc(${i} * var(--gap, 30px) + ${extra}px)`
  }

  return (
    <section ref={ref} id="stack" aria-labelledby="stack-title" className="relative isolate frame section-y">
      {/* a field from the top right edge, beside the title and clear of the model */}
      <Accent className="right-[calc(50%-50vw)] w-[42vw] top-0 h-[40%]" strength={0.3}
        shape="polygon(0 0, 100% 0, 100% 100%, 38% 80%)"
        gradient="radial-gradient(90% 85% at 88% 18%, #000 0%, rgba(0,0,0,.5) 40%, transparent 78%)" />
      <SectionHead n={3} label="Stack" file="stack.json" title={<span id="stack-title">Womit ich arbeite</span>} />
      {/* the tools at a glance, as a band right under the title; the list below reads them in order */}
      <div className="mt-12 lg:mt-16"><Marquee items={GROUPS.flatMap((g) => g.items)} /></div>
      <div data-stage className="grid12 gap-y-6 mt-12 lg:mt-16 items-center">
        <div ref={sceneRef} data-stack-scene className="relative col-span-4 lg:col-start-8 lg:col-span-5 lg:row-start-1" style={{ '--light': 0.5 }}>
          {/* the floor: a perspective grid that opens up while the section scrolls past */}
          <div aria-hidden data-floor className="absolute inset-x-0 lg:inset-x-[-10%] bottom-[4%] h-[55%] origin-bottom pointer-events-none [perspective:600px]">
            <div className="absolute inset-0 [transform:rotateX(62deg)] [transform-origin:bottom]"
              style={{ backgroundImage: 'linear-gradient(rgb(255 255 255 / .07) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .07) 1px, transparent 1px)', backgroundSize: '32px 32px',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 100%, black 30%, transparent 75%)', maskImage: 'radial-gradient(ellipse 60% 70% at 50% 100%, black 30%, transparent 75%)' }} />
          </div>
          <div data-spin className="relative">
          <SlabScene size={size} className="h-[300px] sm:h-[380px] lg:h-[460px]">
            {GROUPS.map((g, i) => (
              <Slab key={g.label} size={size} z={z(i)} active={i === active} sheen label={`${String(i + 1).padStart(2, '0')} ${g.label}`} />
            ))}
          </SlabScene>
          </div>
        </div>
        <ul className="col-span-4 lg:col-start-3 lg:col-span-5 lg:row-start-1 border-b border-line" onMouseLeave={() => setHovered(null)}>
          {[...GROUPS].reverse().map((g) => {
            const i = GROUPS.indexOf(g)
            const on = active === i
            return (
              <li key={g.label} className="border-t border-line">
                <button type="button" aria-pressed={on}
                  onMouseEnter={touch ? undefined : () => setHovered(i)}
                  onFocus={(e) => { if (!touch || e.target.matches(':focus-visible')) setHovered(i) }} onBlur={() => setHovered(null)}
                  onClick={() => setHovered((a) => (a === i ? null : i))}
                  className="group w-full text-left py-5 grid grid-cols-[2.25rem_1fr] gap-x-3 focus-visible:outline-offset-[-1px]">
                  <span className={`t-meta tabular-nums pt-[0.15em] transition-colors duration-150 ${on ? 'text-signal' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block t-meta mb-1.5">{g.label}</span>
                    <span className={`block text-[16px] tracking-tight transition-colors duration-[420ms] ${active === null || on ? 'text-ink' : 'text-muted'}`}>
                      {g.items.map((t, j) => <span key={t}>{t}{j < g.items.length - 1 && <span className="text-faint"> · </span>}</span>)}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
