import { useEffect, useRef } from 'react'
import { useMotion, gsap } from './motion'

// ── Sand-grain colour accents ───────────────────────────────────
// The page is dark grey; colour appears only in a few cut-out fields. Each field is a signal
// gradient that fades into the dark, cut by an asymmetric edge, and dissolved
// into sand: a per-device-pixel noise is used as an alpha mask together with the gradient, so the
// soft part of the gradient breaks up into sharp grains instead of blurring; a second noise in
// overlay adds light and shade inside the colour. Fields drift a little with the scroll.
// The cut is a mask, not a clip-path: the polygon drawn into an SVG with a small blur, so its
// inner edges run out over `feather` px instead of breaking off. Edges that lie on the field's own
// border are pushed outward first and stay hard (they meet the viewport or the next section).
// The grain is not blurred — the soft edge only lowers the alpha, and the grains drop out there.

// noise tiles, generated once per page at device resolution — each in its own idle slot and
// encoded asynchronously (toBlob, not toDataURL): done synchronously at mount, the per-pixel loop
// and the PNG encoding cost ~35 ms right while the hero's headline was rising (measured, a dropped
// frame). The fields fade in once their grain is there, so they never show without it.
let tiles
function grainTiles() {
  if (tiles) return tiles
  const dpr = Math.min(window.devicePixelRatio || 1, 3)
  const css = 220, n = Math.round(css * dpr)
  const idle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 300 }) : setTimeout(fn, 0))
  const make = (fill) => new Promise((res) => idle(() => {
    const c = document.createElement('canvas'); c.width = c.height = n
    const ctx = c.getContext('2d'), img = ctx.createImageData(n, n), d = img.data
    for (let i = 0; i < d.length; i += 4) fill(d, i, Math.random())
    ctx.putImageData(img, 0, 0)
    c.toBlob((b) => res(URL.createObjectURL(b)), 'image/png')
  }))
  tiles = Promise.all([
    // alpha: mostly opaque, a share of grains drops out → sand at partial gradient alpha
    make((d, i, r) => { d[i] = d[i + 1] = d[i + 2] = 255; d[i + 3] = r < 0.18 ? 0 : r < 0.32 ? 110 : 255 }),
    // light: luminance around neutral grey (overlay), a few strong grains
    make((d, i, r) => { const s = (r - 0.5) * (r > 0.93 || r < 0.07 ? 2.6 : 1.1); const v = Math.max(0, Math.min(255, 128 + s * 110)); d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255 }),
  ]).then(([alpha, light]) => ({ alpha, light, size: css }))
  return tiles
}

// polygon(x% y%, …) → SVG mask, blurred by `px` at the element's current size
function edgeMask(shape, w, h, px) {
  const pts = shape.replace(/^polygon\(|\)$/g, '').split(',').map((p) => p.trim().split(/\s+/).map((v) => parseFloat(v) || 0))
  const out = (v) => (v <= 0 ? -25 : v >= 100 ? 125 : v)
  const poly = pts.map(([x, y]) => `${out(x)},${out(y)}`).join(' ')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><filter id='f' x='-50' y='-50' width='200' height='200' filterUnits='userSpaceOnUse'><feGaussianBlur stdDeviation='${(px / w * 100).toFixed(3)} ${(px / h * 100).toFixed(3)}'/></filter><polygon points='${poly}' filter='url(%23f)'/></svg>`
  return `url("data:image/svg+xml,${svg.replace(/</g, '%3C').replace(/>/g, '%3E')}")`
}

// shape: a polygon() of the cut; gradient: where the colour comes from; drift: px of scroll travel;
// feather: px over which the inner edges fade
export default function Accent({ className = '', shape, gradient, strength = 0.5, drift = 60, feather = 18, enter, ...rest }) {
  const ref = useRef(), fieldRef = useRef()
  useEffect(() => {
    const el = ref.current
    const apply = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      const m = edgeMask(shape, width, height, feather)
      el.style.webkitMaskImage = m; el.style.maskImage = m
      el.style.webkitMaskSize = el.style.maskSize = '100% 100%'
      el.style.webkitMaskRepeat = el.style.maskRepeat = 'no-repeat'
      el.style.clipPath = 'none'
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [shape, feather])
  useEffect(() => {
    let alive = true
    grainTiles().then(({ alpha, light, size }) => {
      const f = fieldRef.current
      if (!alive || !f) return
      const mask = `url(${alpha}), ${gradient}`
      Object.assign(f.style, {
        WebkitMaskImage: mask, maskImage: mask,
        WebkitMaskSize: `${size}px ${size}px, 100% 100%`, maskSize: `${size}px ${size}px, 100% 100%`,
        WebkitMaskComposite: 'source-in', maskComposite: 'intersect',
      })
      f.querySelector('[data-light]').style.backgroundImage = `url(${light})`
      f.querySelector('[data-light]').style.backgroundSize = `${size}px ${size}px`
      f.style.opacity = strength
    })
    return () => { alive = false }
  }, [gradient, strength])

  useMotion(ref, (el) => {
    gsap.fromTo(el.firstElementChild, { y: drift }, { y: -drift, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
  }, [], { idle: true })

  return (
    // enter: a delay for the entrance after the preloader (index.css [data-enter])
    <div ref={ref} {...rest} aria-hidden data-enter={enter ? '' : undefined} className={`absolute pointer-events-none -z-10 overflow-clip ${className}`} style={{ clipPath: shape /* until the mask is set */, '--enter': enter }}>
      <div ref={fieldRef} className="absolute inset-[-80px_0] isolate transition-opacity duration-700" style={{ opacity: 0 }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #ff7a3d 0%, #ff5b1f 45%, #b8380c 100%)' }} />
        <div data-light className="absolute inset-0 mix-blend-overlay [image-rendering:pixelated]" />
      </div>
    </div>
  )
}
