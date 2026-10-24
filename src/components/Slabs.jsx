import { useRef } from 'react'
import { useMotion, gsap, finePointer } from './motion'

// ── The site's 3D language ──────────────────────────────────────
// Everything spatial is built from one element: a thin square slab, seen from the same isometric
// angle. CSS 3D, no WebGL: flat precise geometry, nothing to load, crisp at any resolution, no
// render loop. A slab has two states, and the change between them is the site's core idea:
//   wire     → a blueprint: dashed signal edges, see-through, a code label  (development)
//   solid    → rendered: material, thickness, a quiet label                (design)
// `active` lifts one slab out with a signal edge (selection).
export const ISO = 'rotateX(58deg) rotateZ(-40deg)'

// `z` is a number (px) or any CSS length, e.g. a calc() driven by a custom property
// `sheen`: a light band over the top face whose position follows the --light custom property (0–1)
export function Slab({ z = 0, wire = false, active = false, sheen = false, label, size, thick = 8, delay = 0 }) {
  const t = `${delay}s`
  const tr = (p) => ({ transitionProperty: p, transitionDuration: '700ms', transitionTimingFunction: 'var(--ease)', transitionDelay: t })
  const edge = active ? 'var(--signal)' : wire ? 'rgb(255 91 31 / 0.75)' : 'rgb(255 255 255 / 0.12)'
  return (
    <div data-slab className="absolute inset-0 [transform-style:preserve-3d]"
      style={{ width: size, height: size, transform: `translateZ(${typeof z === 'number' ? `${z}px` : z})`, ...tr('transform') }}>
      <div className="absolute inset-0 rounded-[3px] border"
        style={{
          transform: `translateZ(${thick}px)`,
          borderStyle: wire && !active ? 'dashed' : 'solid',
          borderColor: edge,
          background: wire ? 'rgb(255 91 31 / 0.03)' : active ? '#1d1a18' : 'var(--raised)',
          ...tr('background-color, border-color'),
        }}>
        {sheen && !wire && (
          <div aria-hidden className="absolute inset-0 rounded-[3px] pointer-events-none"
            style={{ background: 'linear-gradient(115deg, transparent calc(var(--light, .5) * 100% - 30%), rgb(255 255 255 / .07) calc(var(--light, .5) * 100%), transparent calc(var(--light, .5) * 100% + 30%))' }} />
        )}
        {label && (
          <span className="absolute left-3 bottom-2.5 font-mono text-[10px] whitespace-nowrap"
            style={{ color: active || wire ? 'var(--signal)' : 'var(--faint)', ...tr('color') }}>{label}</span>
        )}
      </div>
      {/* two visible side faces give the slab its thickness; a blueprint has none */}
      <div className="absolute left-0 right-0 bottom-0 origin-bottom"
        style={{ height: thick, transform: 'rotateX(-90deg)', background: active ? 'rgb(255 91 31 / 0.6)' : '#0b0b0a', opacity: wire ? 0 : 1, ...tr('opacity, background-color') }} />
      <div className="absolute top-0 bottom-0 right-0 origin-right"
        style={{ width: thick, transform: 'rotateY(90deg)', background: active ? 'rgb(255 91 31 / 0.4)' : '#121211', opacity: wire ? 0 : 1, ...tr('opacity, background-color') }} />
    </div>
  )
}

// The stage for slabs: fixed iso angle, plus a slight tilt towards a fine pointer (max ~5°) on a
// wrapper of its own, so the angle itself never drifts. Decorative: hidden from assistive tech.
export function SlabScene({ size, lift = -60, className = '', children }) {
  const ref = useRef()
  useMotion(ref, (el) => {
    if (!finePointer()) return
    const tilt = el.querySelector('[data-tilt]')
    const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' })
    const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8)
      ry(((e.clientX - r.left) / r.width - 0.5) * 10)
    }
    const leave = () => { rx(0); ry(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  })
  return (
    <div ref={ref} aria-hidden className={`relative grid place-items-center [perspective:1600px] ${className}`}>
      <div data-tilt className="[transform-style:preserve-3d]">
        <div className="relative [transform-style:preserve-3d]" style={{ width: size, height: size, transform: `${ISO} translateZ(${lift}px)` }}>
          {children}
        </div>
      </div>
    </div>
  )
}
