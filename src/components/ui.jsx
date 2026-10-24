import { useEffect, useRef } from 'react'
import { gsap, finePointer, prefersReduced } from './motion'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

// ── Interaction language ────────────────────────────────────────
// One rule for everything clickable: on hover/focus the label rolls up to an identical copy (the
// word "re-renders"), and arrows leave in their direction and come back from the opposite side.
// Both are CSS transforms (.roll / .arrow in index.css), driven by the parent's .group state, so
// they cost nothing until touched and work for keyboard focus too. Press = slight scale-down.

export function Roll({ children }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  )
}

// The link decode, restored from the original navigation: on hover/focus the word builds itself up
// letter by letter, random lowercase letters (darker) resolving into it — 0.55 s, speed 0.9, as
// before. The real text sits invisible underneath and holds the width, so nothing shifts; screen
// readers only ever get the real text.
export function Decode({ children }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    const host = el.closest('a, button')
    const layer = el.querySelector('[data-decode]')
    const text = layer.textContent
    if (!host || prefersReduced()) return
    // swapping the letters under the pointer makes browsers fire mouseenter again and again, so a
    // run that is still going is never restarted
    let run
    const play = () => { if (run?.isActive()) return; run = gsap.to(layer, {
      duration: 0.55, overwrite: true,
      scrambleText: { text, chars: 'abcdefghijklmnopqrstuvwxyz', speed: 0.9, oldClass: 'decode-old' },
    }) }
    host.addEventListener('mouseenter', play)
    host.addEventListener('focus', play)
    return () => { host.removeEventListener('mouseenter', play); host.removeEventListener('focus', play); gsap.killTweensOf(layer) }
  }, [children])
  return (
    // the scrambled letters float over the real word (absolute): their width changes while they
    // run, and in a grid cell that pushed the neighbouring links aside. They never take the
    // pointer: they are replaced while they run, and Safari drops a click whose mousedown landed on
    // a letter that no longer exists at mouseup — links didn't react to the first click
    <span ref={ref} className="relative inline-block">
      <span className="invisible">{children}</span>
      <span aria-hidden data-decode className="absolute left-0 top-0 whitespace-nowrap pointer-events-none">{children}</span>
      <span className="sr-only">{children}</span>
    </span>
  )
}

// The .glow field: one pointer position for the whole page. For every .glow element on screen the
// real distance from the pointer to its box is measured (0 inside); while that is smaller than the
// gradient's radius the field is on — so a headline lights up as soon as the edge of the glow
// touches it, from outside too — and its centre is set relative to the element (it may lie
// outside). Nothing about the element moves; mouse/trackpad only.
const GLOW_R = 176 // px, = 11rem in .glow
export function useGlowPointer() {
  useEffect(() => {
    if (!finePointer()) return
    const seen = new Set()
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target))))
    const observe = () => document.querySelectorAll('.glow').forEach((el) => io.observe(el))
    observe()
    let pending = 0
    const mo = new MutationObserver(() => { if (!pending) pending = setTimeout(() => { pending = 0; observe() }, 300) })
    mo.observe(document.body, { childList: true, subtree: true })
    let raf = 0, px = -1e4, py = -1e4
    const update = () => {
      raf = 0
      seen.forEach((el) => {
        const r = el.getBoundingClientRect()
        const dx = Math.max(r.left - px, 0, px - r.right), dy = Math.max(r.top - py, 0, py - r.bottom)
        const on = Math.hypot(dx, dy) < GLOW_R * 0.85
        el.style.setProperty('--mx', `${px - r.left}px`)
        el.style.setProperty('--my', `${py - r.top}px`)
        el.style.setProperty('--glow', on ? `${GLOW_R}px` : '0px')
      })
    }
    const move = (e) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(update) }
    const scroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(pending); cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll) }
  }, [])
}

// ↗ for external links, → for in-page, ↓ for "further down"
const PATHS = {
  ne: 'M4 12 12 4M5.5 4H12v6.5',
  e: 'M2.5 8h11M9 3.5 13.5 8 9 12.5',
  s: 'M8 2.5v11M3.5 9 8 13.5 12.5 9',
}
export function Arrow({ dir = 'ne', className = '' }) {
  const icon = (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d={PATHS[dir]} />
    </svg>
  )
  return (
    <span aria-hidden className={`arrow arrow-${dir} ${className}`}>
      <span>{icon}</span>
      <span>{icon}</span>
    </span>
  )
}

const external = (href) => /^https?:/.test(href)

// Text link: the label decodes, the arrow travels
export function ArrowLink({ href, children, dir, className = '', ...rest }) {
  const ext = external(href)
  return (
    <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
      className={`group press inline-flex items-center gap-2 ${className}`} {...rest}>
      <Decode>{children}</Decode>
      <Arrow dir={dir ?? (ext || href.startsWith('mailto:') || href.startsWith('tel:') ? 'ne' : 'e')} />
    </a>
  )
}

// A slight pull towards the pointer (max ~6 px), desktop pointers only. The hit area never moves:
// only the inner content shifts, so the button stays exactly where the user aims.
export function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!finePointer() || prefersReduced()) return
    const inner = el.firstElementChild
    const x = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' })
    const y = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      x(gsap.utils.clamp(-6, 6, (e.clientX - r.left - r.width / 2) * strength))
      y(gsap.utils.clamp(-6, 6, (e.clientY - r.top - r.height / 2) * strength))
    }
    const leave = () => { x(0); y(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); gsap.killTweensOf(inner) }
  }, [strength])
  return <span ref={ref} className={`inline-block ${className}`}><span className="inline-block">{children}</span></span>
}

// Primary call to action: a label pill and a separate round arrow button that belong together —
// on hover the circle fills with the signal colour and the arrow travels through it
// The text stays put: on a long address (the e-mail) a magnetic drift plus a rolling label read as
// the text jumping — the hover shows in the outline and the arrow instead.
export function PillLink({ href, children, dir = 'ne', className = '' }) {
  const ext = external(href)
  return (
    <span className={`inline-block ${className}`}>
      <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
        className="group press inline-flex items-center">
        <span className="rounded-full border border-line px-5 py-2.5 text-ink transition-colors duration-[420ms] ease-sys group-hover:border-ink/40">{children}</span>
        <span className="grid place-items-center w-[2.6em] h-[2.6em] rounded-full border border-line text-ink transition-colors duration-[420ms] ease-sys group-hover:bg-signal group-hover:border-signal group-hover:text-bg">
          <Arrow dir={dir} />
        </span>
      </a>
    </span>
  )
}
