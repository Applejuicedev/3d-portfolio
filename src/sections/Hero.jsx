import { useRef } from 'react'
import { PERSON } from '../data/content'
import { useMotion, gsap, ScrollTrigger } from '../lib/motion'
import { on, lastOf } from '../lib/events'
import HeroParticles, { heroPoints } from '../ui/HeroParticles'


// The opening, after ingrassiadaniel.it: a sphere of points turning in the middle (HeroParticles),
// the name small on its left, the trade small on its right — nothing else; it only gathers once Mi
// has introduced himself. Scrolled, the next section slides up over it at once (App) while the
// sphere unwinds in a spiral and comes apart over most of a screen, the words drifting outwards.
export default function Hero() {
  const ref = useRef()

  useMotion(ref, (el) => {
    heroPoints.gather = 0; heroPoints.split = 0
    gsap.set(el.querySelectorAll('[data-in]'), { opacity: 0 })
    // only once Mi has introduced himself (Buddy) do the points gather and the words come
    let off
    const go = () => {
      gsap.to(heroPoints, { gather: 1, duration: 2.6, ease: 'power2.inOut' })
      gsap.fromTo(el.querySelectorAll('[data-in]'), { opacity: 0, y: 8, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay: 1.2, stagger: 0.12, ease: 'expo.out', clearProps: 'filter,transform' })
    }
    if (lastOf('intro:done')) go(); else off = on('intro:done', () => { off(); go() })
    // scrolled: the sphere unwinds and comes apart, the words drift apart
    const words = el.querySelectorAll('[data-side]')
    ScrollTrigger.create({
      trigger: el.querySelector('[data-hold]'), start: 'top top', end: () => `+=${innerHeight * 0.8}`, scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress
        heroPoints.split = p
        words.forEach((w, i) => gsap.set(w, { x: (i ? 1 : -1) * p * 80, opacity: 1 - p * 2 }))
      },
    })
    return () => off?.()
  })

  const side = 'text-[clamp(1rem,1.5vw,1.375rem)] tracking-[-0.012em]'
  return (
    <div ref={ref} className="relative">
      <div data-hold className="relative h-[200svh]">
        <div data-open className="sticky top-0 h-[100svh] overflow-hidden">
          <HeroParticles />
          <h1 className="sr-only">{PERSON.name}, Full Stack Developer</h1>
          {/* the name and the trade, either side of the sphere */}
          <p data-in data-side aria-hidden className={`absolute left-[var(--gutter)] top-1/2 -translate-y-1/2 ${side} max-md:top-[18%]`}>{PERSON.name}</p>
          <p data-in data-side aria-hidden className={`absolute right-[var(--gutter)] top-1/2 -translate-y-1/2 text-right ${side} max-md:top-auto max-md:bottom-[18%]`}>Full Stack Developer</p>

        </div>
      </div>
    </div>
  )
}
