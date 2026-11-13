import { useRef } from 'react'
import { useMotion, riseLines, gsap, EASE } from '../lib/motion'

// Every section opens the same way: a hairline that draws across, the section's number and name
// as a label, then the title rising out of its mask (one word of it in the serif voice), and an
// optional note on the right.
export default function SectionHead({ n, label, id, title, note }) {
  const ref = useRef()
  useMotion(ref, (el) => {
    gsap.from(el.querySelector('[data-rule]'), { scaleX: 0, duration: 1.4, ease: EASE.inOut, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    gsap.from(el.querySelectorAll('[data-fade]'), { opacity: 0, y: 10, duration: 0.9, stagger: 0.08, ease: EASE.out, scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
    return riseLines(el.querySelector('h2'), { trigger: el })
  })
  return (
    <header ref={ref} className="relative pt-5">
      <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-line origin-left" />
      <div className="grid12 gap-y-6 items-end">
        <p data-fade className="col-span-4 lg:col-span-3 t-label self-start"><span className="text-lime">({String(n).padStart(2, '0')})</span> {label}</p>
        <h2 id={id} className="col-span-4 lg:col-span-6 t-display">{title}</h2>
        {note && <div data-fade className="col-span-4 lg:col-span-3 t-label lg:text-right">{note}</div>}
      </div>
    </header>
  )
}
