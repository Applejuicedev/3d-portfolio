import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, finePointer, prefersReduced } from './motion'

// The contact object: a gyroscope of three rings — design (solid), code (dashed, signal) and the
// link between them (faint), each carrying one node. Scattered, they cross each other at random
// angles; the closer the pointer gets to the e-mail button (`targetRef`), the more they align into
// concentric orbits until their nodes line up on one radius and the core lights: ready to connect.
// Touch devices: the scroll position through the section does the approaching. Reduced motion:
// shown aligned. Pure CSS 3D, decorative (aria-hidden); the status line says the state in words.
// The nodes orbit slowly on their rings (only while the section is on screen). Hovering or
// focusing the e-mail button excites the system: the orbits speed up, the rings brighten, the core
// glows and one pulse runs outwards; leaving lets it settle back over a second. On touch, the pulse
// runs once when the button comes fully into view.
const RINGS = [
  { size: 230, cls: 'border-white/40', node: 'bg-ink', from: { x: 72, y: 34, z: 20 } },
  { size: 172, cls: 'border-signal/80 border-dashed', node: 'bg-signal', from: { x: 18, y: 76, z: -40 } },
  { size: 116, cls: 'border-white/25', node: 'bg-muted', from: { x: 58, y: -48, z: 70 } },
]
const ALIGNED = { x: 66, y: 0, z: -30 }
const mix = (a, b, k) => a + (b - a) * k

export default function Gyro({ targetRef }) {
  const ref = useRef()
  const [ready, setReady] = useState(prefersReduced)

  useEffect(() => {
    const el = ref.current
    const rings = [...el.querySelectorAll('[data-ring]')]
    const core = el.querySelector('[data-core]')
    const apply = (k) => {
      rings.forEach((r, i) => {
        const f = RINGS[i].from
        gsap.to(r, { rotationX: mix(f.x, ALIGNED.x, k), rotationY: mix(f.y, ALIGNED.y, k), rotationZ: mix(f.z, ALIGNED.z, k), duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
      })
      gsap.to(core, { scale: 0.6 + k * 0.6, duration: 0.4, overwrite: 'auto' })
      setReady(k > 0.85)
    }
    // hover / focus on the button: a state on the root (CSS does colour and glow); with motion
    // also faster orbits and the pulse. Works for keyboard focus too (focusin on the wrapper).
    const target = targetRef?.current
    const orbits = [...el.querySelectorAll('[data-orbit]')]
    const pulseEl = el.querySelector('[data-pulse]')
    const spins = prefersReduced() ? [] : orbits.map((o, i) => gsap.to(o, { rotation: i % 2 ? -360 : 360, duration: 16 + i * 6, ease: 'none', repeat: -1 }))
    const pulse = () => { if (!prefersReduced()) gsap.fromTo(pulseEl, { scale: 0.35, opacity: 0.7 }, { scale: 1.45, opacity: 0, duration: 1.1, ease: 'power2.out' }) }
    const excite = (on) => {
      el.toggleAttribute('data-hot', on)
      spins.forEach((s) => gsap.to(s, { timeScale: on ? 5 : 1, duration: on ? 0.4 : 1.2, ease: 'power2.out', overwrite: true }))
      if (on) pulse()
    }
    const enter = () => excite(true), leave = () => excite(false)
    target?.addEventListener('pointerenter', enter); target?.addEventListener('pointerleave', leave)
    target?.addEventListener('focusin', enter); target?.addEventListener('focusout', leave)
    // orbits only run while the gyroscope is on screen
    const ioRun = new IntersectionObserver(([e]) => spins.forEach((s) => (e.isIntersecting ? s.play() : s.pause())))
    ioRun.observe(el)
    // touch: no hover — the pulse runs once when the button is fully in view
    let ioTouch
    if (!finePointer() && target) {
      ioTouch = new IntersectionObserver(([e]) => { if (e.isIntersecting) { excite(true); gsap.delayedCall(1.2, () => excite(false)); ioTouch.disconnect() } }, { threshold: 1 })
      ioTouch.observe(target)
    }
    const unhook = () => {
      target?.removeEventListener('pointerenter', enter); target?.removeEventListener('pointerleave', leave)
      target?.removeEventListener('focusin', enter); target?.removeEventListener('focusout', leave)
      ioRun.disconnect(); ioTouch?.disconnect(); spins.forEach((s) => s.kill()); gsap.killTweensOf(pulseEl)
    }
    if (prefersReduced()) { apply(1); return unhook }
    apply(0)
    // entering: the whole gyroscope spins in once (on its own wrapper, so it never fights the
    // per-ring alignment below)
    const spin = el.querySelector('[data-spin]')
    gsap.set(spin, { opacity: 0, rotation: -120, scale: 0.8 })
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      gsap.to(spin, { opacity: 1, rotation: 0, scale: 1, duration: 1.4, ease: 'expo.out' })
    }, { threshold: 0.3 })
    io.observe(el)

    if (finePointer() && targetRef?.current) {
      let raf = 0, last = { x: 0, y: 0 }
      const tick = () => {
        raf = 0
        const r = targetRef.current.getBoundingClientRect()
        const d = Math.hypot(last.x - (r.left + r.width / 2), last.y - (r.top + r.height / 2))
        apply(Math.max(0, Math.min(1, 1 - (d - 40) / 420)))
      }
      const move = (e) => { last = { x: e.clientX, y: e.clientY }; if (!raf) raf = requestAnimationFrame(tick) }
      window.addEventListener('pointermove', move, { passive: true })
      return () => { unhook(); io.disconnect(); window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); gsap.killTweensOf([...rings, core, spin]) }
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', end: 'bottom 40%', onUpdate: (s) => apply(s.progress) })
    return () => { unhook(); io.disconnect(); st.kill(); gsap.killTweensOf([...rings, core, spin]) }
  }, [targetRef])

  return (
    <div ref={ref} className="group/gyro relative">
      {/* clipped sideways to its column: while spinning in (and during the pulse) the tilted rings
          project past it, which on a phone widened the page for a moment */}
      <div aria-hidden className="relative h-[280px] grid place-items-center [perspective:1200px] overflow-x-clip">
        <div data-spin className="relative w-[230px] h-[230px] [transform-style:preserve-3d]">
          {RINGS.map((r, i) => (
            <div key={i} data-ring className={`absolute rounded-full border transition-[border-color,box-shadow] duration-500 ${r.cls} group-data-[hot]/gyro:border-signal group-data-[hot]/gyro:shadow-[0_0_18px_rgba(255,91,31,.35)]`}
              style={{ width: r.size, height: r.size, left: (230 - r.size) / 2, top: (230 - r.size) / 2, transformStyle: 'preserve-3d' }}>
              <span data-orbit className="absolute inset-0">
                <span className={`absolute left-1/2 -top-[3px] -ml-[3px] w-[6px] h-[6px] rounded-full ${r.node}`} />
              </span>
            </div>
          ))}
          <div data-pulse className="absolute left-1/2 top-1/2 -ml-[115px] -mt-[115px] w-[230px] h-[230px] rounded-full border border-signal opacity-0" />
          <div data-core className="absolute left-1/2 top-1/2 -ml-[7px] -mt-[7px] w-[14px] h-[14px] rounded-full transition-shadow duration-500 group-data-[hot]/gyro:shadow-[0_0_28px_8px_rgba(255,91,31,.55)]"
            style={{ background: 'radial-gradient(circle at 35% 35%, #ffd2bd, #ff5b1f 55%, #7a2a0c)' }} />
        </div>
      </div>
      <p className="t-meta text-center -mt-2">
        <span className="text-faint">verbindung:</span>{' '}
        <span className={`transition-colors duration-300 ${ready ? 'text-ink' : 'text-signal'}`}>{ready ? 'bereit' : 'wartet'}</span>
      </p>
    </div>
  )
}
