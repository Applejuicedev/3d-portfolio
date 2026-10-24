import { useEffect, useRef, useState } from 'react'
import { useMotion, gsap, SplitText, ScrollTrigger, EASE, DUR } from './motion'

// Fades its content up once when it scrolls in (700 ms, the system curve). Nothing is hidden
// without JS, with reduced motion, or before the observer exists.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef()
  const [state, setState] = useState('idle') // idle → armed (hidden) → shown
  useEffect(() => {
    const el = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return // already in view: no reveal
    setState('armed')
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setState('shown'); io.disconnect()
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} {...rest} className={className}
      style={state === 'idle' ? undefined : {
        opacity: state === 'shown' ? 1 : 0,
        transform: state === 'shown' ? 'none' : 'translate3d(0, 14px, 0)',
        transition: `opacity var(--t-reveal) var(--ease) ${delay}s, transform var(--t-reveal) var(--ease) ${delay}s`,
      }}>
      {children}
    </Tag>
  )
}

// The heading reveal, shared by all section heads and the contact headline. Robust against the
// things that broke it: it splits only once the web fonts are in (a later font swap would change
// the line breaks under the masks and move the trigger), refreshes ScrollTrigger after that, keeps
// the .glow effect off while split ([data-revealing]), and undoes the split when done so the
// heading is plain text again. While split, the heading keeps exactly the height it has as plain
// text: the masks make it a few pixels taller, and undoing the split at the end then pulled the
// text below it up. One timeline, one trigger per heading; all of it reverted on unmount.
export function headingReveal(trigger, heading, extras = [], { type = 'lines', start = 'top 85%', stagger = 0.08 } = {}) {
  let split, tl, alive = true
  document.fonts.ready.then(() => {
    if (!alive) return
    const plain = heading.getBoundingClientRect().height
    heading.setAttribute('data-revealing', '')
    split = SplitText.create(heading, { type, mask: type })
    heading.style.height = `${plain}px`
    // while split, each moving piece paints the pointer glow itself (a heading's own clipped
    // background isn't painted into transformed children) — so the glow is there during the
    // reveal too, instead of popping in when it ends
    ;(type === 'chars' ? split.chars : split.lines).forEach((el) => el.classList.add('glow'))
    const done = () => { split?.revert(); heading.removeAttribute('data-revealing'); heading.style.height = '' }
    tl = gsap.timeline({ scrollTrigger: { trigger, start, once: true }, onComplete: done })
    tl.from(type === 'chars' ? split.chars : split.lines, { yPercent: 110, duration: DUR.reveal + 0.2, stagger, ease: EASE.out })
    if (extras.length) tl.from(extras, { opacity: 0, y: 10, duration: DUR.reveal, ease: EASE.soft }, 0.15)
    ScrollTrigger.refresh()
  })
  return () => { alive = false; tl?.scrollTrigger?.kill(); tl?.kill(); split?.revert(); heading.removeAttribute('data-revealing'); heading.style.height = '' }
}

// Every section opens the same way: its number and name in the meta column, the title in the
// content columns. The title rises line by line out of a mask once, as it scrolls in — the only
// text that animates like this, so it stays special. The number is the page's index.
export function SectionHead({ n, label, file, title, children }) {
  const ref = useRef()
  useMotion(ref, (el) => headingReveal(el, el.querySelector('h2'), el.querySelectorAll('[data-head-fade]')), [], { idle: true })
  return (
    <header ref={ref} className="grid12 gap-y-6">
      <p data-head-fade className="col-span-4 lg:col-span-2 t-meta pt-[0.6em] tabular-nums">({String(n).padStart(2, '0')}) {label}{file && <span className="block text-faint">{file}</span>}</p>
      <div className="col-span-4 lg:col-span-10">
        <h2 className="glow t-title text-ink">{title}</h2>
        {children && <div data-head-fade>{children}</div>}
      </div>
    </header>
  )
}

// A block of code with line numbers. `lines` are React nodes, one per line.
export function CodeBlock({ lines, file, className = '' }) {
  return (
    <figure className={`min-w-0 ${className}`}>
      {file && <figcaption className="t-meta mb-3 text-faint">{file}</figcaption>}
      <div className="code overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className="grid grid-cols-[2.5rem_1fr]">
            <span className="select-none text-faint/70 tabular-nums">{i + 1}</span>
            <span className="whitespace-pre-wrap">{line}</span>
          </div>
        ))}
      </div>
    </figure>
  )
}

// syntax helpers for the code views: keyword/tag, string, number, comment/punctuation
export const K = ({ children }) => <span className="tok-k">{children}</span>
export const S = ({ children }) => <span className="tok-s">&apos;{children}&apos;</span>
export const N = ({ children }) => <span className="tok-n">{children}</span>
export const C = ({ children }) => <span className="tok-c">{children}</span>
