import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../lib/motion'
import { holdScroll } from '../lib/scroll'
import ProjectVideo from '../ui/ProjectVideo'
import MiniHero from './MiniHero'

// **key phrases** in ink, the rest grey
const Rich = ({ s }) => s.split(/\*\*/).map((part, i) => (i % 2 ? <span key={i} className="text-ink">{part}</span> : part))

// A project, opened: the page fades back and the recording takes the screen, the whole story
// beside it. Esc, the close button or a click on the empty space closes it; focus goes in and
// comes back to where it was.
export default function ProjectView({ p, onClose }) {
  const ref = useRef(), closeRef = useRef(), back = useRef(null)
  useEffect(() => {
    if (!p) return
    back.current = document.activeElement
    holdScroll(true, 'project')
    const el = ref.current
    if (!prefersReduced()) gsap.fromTo(el.querySelectorAll('[data-in]'), { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.06, ease: 'expo.out', clearProps: 'all' })
    closeRef.current?.focus({ preventScroll: true })
    const key = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); holdScroll(false, 'project'); back.current?.focus?.({ preventScroll: true }) }
  }, [p, onClose])

  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label={p?.title} hidden={!p}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="fixed inset-0 z-[80] bg-canvas overflow-y-auto overscroll-contain">
      {p && (
        <div className="frame min-h-full py-20 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
          <div data-in className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-ink/[0.04]" style={{ background: p.surface }}>
            {p.video
              ? <ProjectVideo src={`/videos/${p.slug}.webm`} poster={`/videos/${p.slug}.jpg`} label={p.video.label} frame={p.video.frame} surface={p.surface} alongside />
              : <MiniHero />}
          </div>
          <div>
            <p data-in className="t-cap">{p.kind} · {p.year} · {p.status}</p>
            <h2 data-in className="t-display mt-3">{p.title}</h2>
            <dl className="mt-8 grid gap-6">
              {p.story.map(([k, s]) => (
                <div data-in key={k} className="border-t border-line pt-4">
                  <dt className="t-cap capitalize">{k}</dt>
                  <dd className="text-[14px] leading-[1.618] text-gray mt-2"><Rich s={s} /></dd>
                </div>
              ))}
            </dl>
            <p data-in className="mt-8 text-[13px] text-gray">{p.tech.join(' · ')}</p>
            {p.links.length > 0 && (
              <p data-in className="mt-4 flex gap-6 text-[14px]">
                {p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-blue">{l.label} ↗</a>)}
              </p>
            )}
          </div>
        </div>
      )}
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close"
        className="fixed top-3 right-[var(--gutter)] h-11 px-5 rounded-full border border-ink/15 bg-canvas text-[13px] hover:border-ink transition-colors">
        Close <span aria-hidden className="ml-1">✕</span>
      </button>
    </div>
  )
}
