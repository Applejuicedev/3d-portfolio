import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../lib/motion'

// Only one demo plays at a time — the one that came into view last. Measured: whenever two videos
// decoded at once during scrolling (one leaving, the next arriving) frames dropped to 30 fps for
// that overlap; one at a time, scrolling stays at the display's full rate.
const playing = new Set()
const playOnly = (v) => { playing.forEach((o) => { if (o !== v && !o.dataset.alongside) o.pause() }); v.play().catch(() => {}) }
const play = (v, alongside) => (alongside ? v.play().catch(() => {}) : playOnly(v))

// A product demo: a short, silent loop recorded from the real application (scripts in the
// scratchpad recorder: real clicks, fresh demo data). It loads only when it comes near the screen,
// plays only while it is visible, and always has a pause control (moving content > 5 s, WCAG 2.2.2).
// With reduced motion it waits on its poster until asked to play. A browser that can't play WebM
// keeps the poster — the first frame of the same take. `alongside` (an opened project's sheet): it plays
// without pausing the one on the page behind it, so that one is still running when the sheet closes.
export default function ProjectVideo({ src, poster, label, frame = 'screen', surface, alongside = false }) {
  const ref = useRef(), wrapRef = useRef()
  const [near, setNear] = useState(alongside) // a sheet's video is on screen at once: load it now
  const [paused, setPaused] = useState(() => prefersReduced())
  const [playable] = useState(() => document.createElement('video').canPlayType('video/webm') !== '')
  const userPaused = useRef(prefersReduced())
  const seen = useRef(false) // visible enough to play; play() before the source has loaded is lost, so canplay asks again

  // loads 2.5 screens ahead — by the time it scrolls into view the first seconds are buffered and
  // it starts at once (one screen ahead was not enough when scrolling fast); plays only while
  // ≥ 35 % visible (and only one at a time, see playOnly)
  useEffect(() => {
    const el = wrapRef.current
    const ioNear = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); ioNear.disconnect() } }, { rootMargin: '250% 0px' })
    const ioSeen = new IntersectionObserver(([e]) => {
      const v = ref.current
      if (!v) return
      seen.current = e.isIntersecting
      if (e.isIntersecting && !userPaused.current) play(v, alongside)
      else v.pause()
    }, { threshold: 0.35 })
    ioNear.observe(el); ioSeen.observe(el)
    return () => { ioNear.disconnect(); ioSeen.disconnect() }
  }, [])

  // near: source set and preload=auto, so it is downloaded before it is visible
  useEffect(() => { if (near) ref.current?.load() }, [near])

  // the sheet picks up where the window on the page was, so opening it doesn't jump back to the start
  const resume = (e) => {
    const v = e.currentTarget
    if (alongside && !v.dataset.synced) {
      v.dataset.synced = '1'
      const twin = [...document.querySelectorAll('video')].find((o) => o !== v && o.currentSrc === v.currentSrc && o.currentTime > 0)
      if (twin) v.currentTime = twin.currentTime
    }
    if (seen.current && !userPaused.current && v.paused) play(v, alongside)
  }

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { userPaused.current = false; play(v, alongside) } else { userPaused.current = true; v.pause() }
  }

  const media = playable ? (
    <video ref={ref} data-alongside={alongside || undefined} muted loop playsInline preload={near ? 'auto' : 'none'} poster={near ? poster : undefined} aria-label={label}
      src={near ? src : undefined} onCanPlay={resume} onPlay={(e) => { playing.add(e.currentTarget); setPaused(false) }} onPause={(e) => { playing.delete(e.currentTarget); setPaused(true) }}
      className="block w-full h-full object-cover" />
  ) : (
    <img src={poster} alt={label} loading="lazy" decoding="async" className="block w-full h-full object-cover" />
  )

  const button = playable && (
    <button type="button" onClick={toggle} aria-label={paused ? 'Video abspielen' : 'Video pausieren'}
      className="btn-media absolute right-3 bottom-3 z-20 gap-1.5 h-8 px-3 text-[12px]">
      <span aria-hidden className="w-2.5 text-center">{paused ? '▶' : '❚❚'}</span>
      {paused ? 'Abspielen' : 'Pause'}
    </button>
  )

  // a phone recording standing on its product's colour, filling whatever holds it
  if (frame === 'phone') return (
    <div ref={wrapRef} className="absolute inset-0 grid place-items-center" style={{ background: surface }}>
      <div className="relative h-[88%] aspect-[390/844] overflow-hidden rounded-[9%/4.2%] ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)]">{media}</div>
      {button}
    </div>
  )

  // a screen recording filling whatever holds it
  return (
    <div ref={wrapRef} className="absolute inset-0" style={{ background: surface }}>
      {media}
      {button}
    </div>
  )
}
