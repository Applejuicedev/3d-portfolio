import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/content'
import { gsap, ScrollTrigger, prefersReduced } from '../lib/motion'
import { scramble } from './textfx'
import MiniHero from './MiniHero'

const pad = (i) => String(i + 1).padStart(2, '0')

// The work, right after the opening: the screen holds, and scrolling moves the recordings past
// sideways, one after the other, in front of the galaxy the points have become. The one in the
// middle is lit and named; a click opens it.
export default function Work({ onOpen }) {
  const ref = useRef(), pinRef = useRef(), track = useRef(), capRef = useRef()
  const [at, setAt] = useState(0)

  useEffect(() => {
    const el = ref.current, pin = pinRef.current, tr = track.current
    const cards = [...tr.children]
    // the distance: from the first recording in the middle to the last in the middle
    const dist = () => { const f = cards[0], l = cards[cards.length - 1]; return l.offsetLeft - f.offsetLeft }
    const focus = () => {
      const mid = innerWidth / 2
      let best = 0, bd = Infinity
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect(), d = (r.left + r.width / 2 - mid) / innerWidth
        if (Math.abs(d) < bd) { bd = Math.abs(d); best = i }
        const k = Math.min(1, Math.abs(d) * 1.6)
        c.style.transform = `scale(${1 - k * 0.12})`
        c.style.filter = `brightness(${1 - k * 0.55})`
      })
      setAt((o) => (o === best ? o : best))
    }
    const ctx = gsap.context(() => {
      gsap.to(tr, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${dist() * 1.1}`, pin: true, scrub: prefersReduced() ? true : 0.9, invalidateOnRefresh: true, onUpdate: focus, onRefresh: focus },
      })
    }, el)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  // the caption decodes anew for each recording
  useEffect(() => { capRef.current?.querySelectorAll('[data-sc]').forEach((n, k) => { n.dataset.text = n.dataset.sc; scramble(n, { duration: 0.5, delay: k * 0.06 }) }) }, [at])

  const p = PROJECTS[at]
  return (
    <section ref={ref} id="work" aria-label="Work" className="relative">
      <div ref={pinRef} data-form="galaxy" data-size="2" data-tilt="1.05" data-alpha="1.5" data-solid className="relative h-[100svh] overflow-hidden flex flex-col justify-center">
        <p className="frame w-full t-cap tabular-nums mb-8" aria-live="polite">Work <span className="text-ink">{pad(at)}</span> / {pad(PROJECTS.length - 1)}</p>
        <ul ref={track} className="flex items-center gap-[7vw] pl-[calc(50vw-min(22vw,20rem))] max-md:pl-[11vw] will-change-transform">
          {PROJECTS.map((it) => (
            <li key={it.slug} className="flex-none w-[min(44vw,40rem)] max-md:w-[78vw] origin-center">
              <button type="button" onClick={() => onOpen(it)} data-cursor="View" aria-label={`View ${it.title}`}
                className="block w-full aspect-[16/10] rounded-[14px] overflow-hidden relative bg-paper shadow-[0_40px_120px_-30px_rgb(0_0_0/.8)]" style={it.surface ? { background: it.surface } : undefined}>
                {it.video
                  ? <video src={`/videos/${it.slug}.webm`} poster={`/videos/${it.slug}.jpg`} muted loop playsInline autoPlay={!prefersReduced()} preload="auto" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                  : <MiniHero />}
              </button>
            </li>
          ))}
        </ul>
        <div ref={capRef} className="frame w-full mt-8 flex justify-between gap-4 items-baseline">
          <p className="t-title"><span data-sc={p.title}>{p.title}</span></p>
          <p className="t-cap"><span data-sc={`${p.kind} · ${p.year}`}>{p.kind} · {p.year}</span></p>
        </div>
      </div>
    </section>
  )
}
