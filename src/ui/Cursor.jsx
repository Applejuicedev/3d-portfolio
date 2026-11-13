import { useEffect, useRef, useState } from 'react'
import { finePointer, prefersReduced } from '../lib/motion'

// What the pointer can become: a label pill over [data-cursor="…"] areas, the shape of a control
// over buttons and links (small enough to hug), the native caret in text fields.
const SNAP = 'a[href], button, [role="tab"], [role="option"], label, summary'
const MAX_SNAP = { w: 340, h: 72 }

// The pointer, after iPadOS: a black dot with a thin white ring (it reads on paper and on the
// dark windows alike), exactly on the pointer, stretching a little along fast movements. Over a control it lets go
// of the dot and becomes the control's own highlight — its exact box and corners, a soft grey
// plate that leans a few pixels towards the real pointer position. Over a project window it
// becomes a pill that says what a click does. Pressing squeezes it. Mouse and trackpad only; text
// fields keep their caret; the system cursor returns while the pointer is outside the page.
export default function Cursor() {
  const [on] = useState(() => finePointer())
  const dotRef = useRef(), plateRef = useRef(), pillRef = useRef(), textRef = useRef()

  useEffect(() => {
    if (!on) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    const still = prefersReduced()
    const dot = dotRef.current, plate = plateRef.current, pill = pillRef.current
    let px = -100, py = -100, x = px, y = py, vx = 0, vy = 0, sv = 0, raf = 0, down = false, hidden = true
    let snap = null, label = null
    const box = { x: 0, y: 0, w: 10, h: 10, r: 5, o: 0 }
    let ang = 0

    const pick = (t) => {
      if (!t?.closest) return
      const l = t.closest('[data-cursor]')
      const s = t.closest(SNAP)
      if (t.closest('input:not([type=range]):not([type=radio]), textarea, [contenteditable="true"]')) { snap = null; label = 'text'; return }
      if (s && !s.closest('[data-cursor-ignore]')) {
        const r = s.getBoundingClientRect()
        if (r.width <= MAX_SNAP.w && r.height <= MAX_SNAP.h) { snap = s; label = null; return }
      }
      snap = null
      label = l ? l.getAttribute('data-cursor') : null
    }
    const move = (e) => { px = e.clientX; py = e.clientY; if (hidden) { x = px; y = py; hidden = false } pick(e.target); if (!raf) raf = requestAnimationFrame(tick) }
    const over = (e) => pick(e.target)
    const leave = () => { hidden = true; if (!raf) raf = requestAnimationFrame(tick) }
    const press = () => { down = true }, release = () => { down = false }

    const lerp = (a, b, k) => a + (b - a) * k
    function tick() {
      raf = 0
      // the dot sits exactly on the pointer — no lag; only its stretch is smoothed
      vx = px - x; vy = py - y; x = px; y = py
      sv = lerp(sv, Math.min(1, Math.hypot(vx, vy) / 40), 0.35)

      // the plate: hugs the control under the pointer, leaning towards the pointer a little
      if (snap && snap.isConnected) {
        const r = snap.getBoundingClientRect(), cs = getComputedStyle(snap)
        const pad = 5, lean = 0.08
        const tx = r.left - pad + (px - (r.left + r.width / 2)) * lean, ty = r.top - pad + (py - (r.top + r.height / 2)) * lean
        const rad = parseFloat(cs.borderTopLeftRadius) || 8
        const kk = still ? 1 : 0.5
        box.x = lerp(box.x, tx, kk); box.y = lerp(box.y, ty, kk); box.w = lerp(box.w, r.width + pad * 2, kk); box.h = lerp(box.h, r.height + pad * 2, kk)
        box.r = Math.min(box.h / 2, rad + pad); box.o = lerp(box.o, down ? 0.16 : 0.09, 0.3)
      } else {
        const kk = still ? 1 : 0.6
        box.x = lerp(box.x, x - 5, kk); box.y = lerp(box.y, y - 5, kk); box.w = lerp(box.w, 10, kk); box.h = lerp(box.h, 10, kk); box.r = 5
        box.o = lerp(box.o, 0, 0.35)
      }
      plate.style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`
      plate.style.width = `${box.w}px`; plate.style.height = `${box.h}px`; plate.style.borderRadius = `${box.r}px`
      plate.style.opacity = hidden ? 0 : box.o.toFixed(3)

      // the dot: stretched along the movement, gone while the plate or the pill has taken over
      const speed = sv
      if (Math.hypot(vx, vy) > 0.5) ang = Math.atan2(vy, vx) * 180 / Math.PI
      const sx = 1 + (still ? 0 : speed * 0.8), sy = 1 - (still ? 0 : speed * 0.35)
      const gone = hidden || snap || label
      dot.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0) rotate(${ang}deg) scale(${(gone ? 0 : 1) * (down ? 0.7 : 1) * sx}, ${(gone ? 0 : 1) * (down ? 0.7 : 1) * sy})`

      // the pill: a label that follows the pointer
      const showPill = !hidden && label && label !== 'text'
      if (showPill && textRef.current.textContent !== label) textRef.current.textContent = label
      pill.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${showPill ? (down ? 0.92 : 1) : 0.3})`
      pill.style.opacity = showPill ? 1 : 0
      html.classList.toggle('cursor-text', label === 'text')

      const settling = sv > 0.01 || Math.abs(box.o - (snap ? 0.09 : 0)) > 0.005 || Math.abs(box.w - 10) > 0.3
      if (settling || snap) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    html.addEventListener('pointerleave', leave)
    const scrolled = () => { if (!raf) raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', scrolled, { passive: true })
    return () => {
      cancelAnimationFrame(raf); html.classList.remove('has-cursor', 'cursor-text')
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', press); window.removeEventListener('pointerup', release)
      html.removeEventListener('pointerleave', leave); window.removeEventListener('scroll', scrolled)
    }
  }, [on])

  if (!on) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[400]">
      <span ref={plateRef} className="absolute left-0 top-0 bg-ink" style={{ opacity: 0 }} />
      <span ref={dotRef} className="absolute left-0 top-0 w-[10px] h-[10px] rounded-full bg-ink shadow-[0_0_0_1.5px_#fff,0_1px_4px_rgb(0_0_0/.25)]" />
      <span ref={pillRef} className="absolute left-0 top-0 rounded-pill bg-ink text-canvas text-[13px] font-medium px-3.5 py-1.5 shadow-lift whitespace-nowrap transition-[opacity] duration-200" style={{ opacity: 0 }}>
        <span ref={textRef} />
      </span>
    </div>
  )
}
