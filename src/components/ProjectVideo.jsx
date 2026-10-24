import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from './motion'

// Only one demo plays at a time — the one that came into view last. Measured: whenever two videos
// decoded at once during scrolling (one leaving, the next arriving) frames dropped to 30 fps for
// that overlap; one at a time, scrolling stays at the display's full rate.
const playing = new Set()
const playOnly = (v) => { playing.forEach((o) => { if (o !== v) o.pause() }); v.play().catch(() => {}) }

// A product demo: a short, silent loop recorded from the real application (scripts in the
// scratchpad recorder: real clicks, fresh demo data). It loads only when it comes near the screen,
// plays only while it is visible, and always has a pause control (moving content > 5 s, WCAG 2.2.2).
// With reduced motion it waits on its poster until asked to play. A browser that can't play WebM
// keeps the poster — the first frame of the same take.
export default function ProjectVideo({ src, poster, label, frame = 'screen', surface }) {
  const ref = useRef(), wrapRef = useRef()
  const [near, setNear] = useState(false)
  const [paused, setPaused] = useState(() => prefersReduced())
  const [playable] = useState(() => document.createElement('video').canPlayType('video/webm') !== '')
  const userPaused = useRef(prefersReduced())

  // loads 2.5 screens ahead — by the time it scrolls into view the first seconds are buffered and
  // it starts at once (one screen ahead was not enough when scrolling fast); plays only while
  // ≥ 35 % visible (and only one at a time, see playOnly)
  useEffect(() => {
    const el = wrapRef.current
    const ioNear = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); ioNear.disconnect() } }, { rootMargin: '250% 0px' })
    const ioSeen = new IntersectionObserver(([e]) => {
      const v = ref.current
      if (!v) return
      if (e.isIntersecting && !userPaused.current) playOnly(v)
      else v.pause()
    }, { threshold: 0.35 })
    ioNear.observe(el); ioSeen.observe(el)
    return () => { ioNear.disconnect(); ioSeen.disconnect() }
  }, [])

  // near: source set and preload=auto, so it is downloaded before it is visible
  useEffect(() => { if (near) ref.current?.load() }, [near])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { userPaused.current = false; playOnly(v) } else { userPaused.current = true; v.pause() }
  }

  const media = playable ? (
    <video ref={ref} muted loop playsInline preload={near ? 'auto' : 'none'} poster={near ? poster : undefined} aria-label={label}
      src={near ? src : undefined} onPlay={(e) => { playing.add(e.currentTarget); setPaused(false) }} onPause={(e) => { playing.delete(e.currentTarget); setPaused(true) }}
      className="block w-full h-full object-cover" />
  ) : (
    <img src={poster} alt={label} loading="lazy" decoding="async" className="block w-full h-full object-cover" />
  )

  return (
    // phone recordings get a taller window (the phone is larger in it); screen recordings keep
    // their own 16:10 and fill it almost to the edge
    <div ref={wrapRef} className={`relative overflow-hidden rounded-[4px] ring-1 ring-line ${frame === 'phone' ? 'aspect-[5/4]' : 'aspect-[16/10]'}`} style={{ background: surface }}>
      {frame === 'phone' ? (
        // an iPhone-sized recording, standing on the product's own surface
        <div className="absolute inset-y-[5%] left-1/2 -translate-x-1/2 aspect-[390/844] overflow-hidden rounded-[1.6rem] ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)]">{media}</div>
      ) : (
        <div className="absolute inset-[3%] overflow-hidden rounded-[4px] ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)]">{media}</div>
      )}
      {playable && (
        <button type="button" onClick={toggle} aria-label={paused ? 'Video abspielen' : 'Video pausieren'}
          className="group press absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-bg/70 px-3 py-1.5 font-mono text-[11px] text-ink ring-1 ring-line backdrop-blur-sm transition-colors hover:ring-ink/40">
          <span aria-hidden className="w-2.5 text-center">{paused ? '▶' : '❚❚'}</span>
          {paused ? 'abspielen' : 'pause'}
        </button>
      )}
    </div>
  )
}
