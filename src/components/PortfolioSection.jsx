import { useRef } from 'react'
import { SectionHead, headingReveal } from './Section'
import { ArrowLink } from './ui'
import ProjectVideo from './ProjectVideo'
import { useMotion, gsap, ScrollTrigger, EASE, STAGGER } from './motion'
import { PROJECTS } from './projects'

const pad = (i) => String(i + 1).padStart(2, '0')

// **key phrase** in a story → set in ink and medium weight; the rest of the text stays muted
function Marked({ text }) {
  return text.split('**').map((part, i) => (i % 2 ? <strong key={i} className="font-medium text-ink">{part}</strong> : part))
}

const StatusDot = ({ status }) => (
  <span className={`w-1.5 h-1.5 rounded-full ${status === 'Live' ? 'bg-signal' : 'border border-muted'}`} />
)

// One project as one scene: its index line, then the demo and the story side by side. The two
// alternate sides from project to project (asymmetric: 8 columns for a screen recording, 7 and a
// free column for the taller phone window, 4 of text — ~44 characters a line at 16 px), and the
// window is centred vertically against the story, so both hold the same weight; on small
// screens they stack.
function Project({ project, i }) {
  const flip = i % 2 === 1
  const wide = project.video.frame !== 'phone'
  const media = wide ? (flip ? 'lg:col-start-5 lg:col-span-8' : 'lg:col-start-1 lg:col-span-8') : (flip ? 'lg:col-start-6 lg:col-span-7' : 'lg:col-start-1 lg:col-span-7')
  return (
    <article id={`projekt-${project.slug}`} data-project data-tint={project.tint} aria-labelledby={`projekt-${project.slug}-title`}
      className="relative scroll-mt-20 pb-20 lg:pb-32">
      <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-line origin-left" />
      <header className="grid12 items-baseline py-7 lg:py-9">
        <span data-num className="col-span-1 lg:col-span-2 t-meta tabular-nums transition-colors duration-[420ms]">{pad(i)}</span>
        <h3 id={`projekt-${project.slug}-title`} className="glow col-span-3 lg:col-span-6 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium tracking-[-0.035em] leading-[1.05] text-ink">
          {project.title}
        </h3>
        <span className="col-start-2 col-span-3 mt-2 flex justify-between lg:contents">
          <span data-meta className="lg:col-span-2 t-meta">{project.kind}</span>
          <span data-meta className="lg:col-span-2 t-meta flex items-center justify-end gap-2 whitespace-nowrap"><StatusDot status={project.status} />{project.status}</span>
        </span>
      </header>

      <div data-dim className="grid12 gap-y-12 lg:items-center transition-opacity duration-700 ease-sys">
        <div data-media className={`relative col-span-4 lg:row-start-1 ${media}`}>
          <span data-cover aria-hidden className="absolute inset-0 z-10 rounded-[4px] origin-bottom pointer-events-none" style={{ transform: 'scaleY(0)', background: project.surface }} />
          <ProjectVideo src={`/videos/${project.slug}.webm`} poster={`/videos/${project.slug}.jpg`} label={project.video.label} frame={project.video.frame} surface={project.surface} />
        </div>
        <div className={`col-span-4 lg:row-start-1 lg:col-span-4 max-w-[44ch] space-y-9 ${flip ? 'lg:col-start-1' : 'lg:col-start-9'}`}>
          <dl className="space-y-8">
            {project.story.map(([k, v]) => (
              <div key={k} data-in className="border-t border-line pt-4">
                <dt className="font-mono text-[13px] font-medium text-ink"><span className="text-faint">{'// '}</span>{k}</dt>
                <dd className="mt-2.5 text-[16px] leading-[1.7] text-muted"><Marked text={v} /></dd>
              </div>
            ))}
          </dl>
          <p data-in className="t-meta">{project.tech.join(' · ')}</p>
          <p data-in className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
            {project.github && <ArrowLink href={project.github} className="hover:text-ink transition-colors">GitHub</ArrowLink>}
            {project.demo && <ArrowLink href={project.demo} className="hover:text-ink transition-colors">{project.demoLabel ?? 'Live ansehen'}</ArrowLink>}
          </p>
        </div>
      </div>
    </article>
  )
}

// The work, one project after another. While a project holds the middle of the screen it is in
// focus: its number takes the signal colour, the others step back, and the atmosphere takes a trace
// of the product's own colour. The demos run by themselves; scrolling never scrubs them.
export default function PortfolioSection() {
  const ref = useRef()

  useMotion(ref, (el) => {
    const projects = [...el.querySelectorAll('[data-project]')]
    // each project arrives as one sequence: the hairline draws left → right, the title rises out
    // of its mask (headingReveal), the kind and status slide in from the right, the demo opens
    // upwards like a window being uncovered, and the story follows row by row — its label from the
    // left, its text rising. Once; afterwards everything is plain, untransformed content.
    const undo = projects.map((p) => {
      gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 85%', once: true } })
        .from(p.querySelector('[data-rule]'), { scaleX: 0, duration: 1.1, ease: EASE.inOut })
        .from(p.querySelectorAll('[data-meta]'), { opacity: 0, x: 16, duration: 0.7, stagger: 0.08, ease: EASE.out }, 0.25)
        // a cover that slides off the demo (not a clip-path on it: a clipped ancestor made the
        // video's IntersectionObserver see it ~0.8 s late, so playback lagged behind the reveal)
        .fromTo(p.querySelector('[data-cover]'), { scaleY: 1 }, { scaleY: 0, duration: 1.2, ease: EASE.inOut }, 0.3)
        .from(p.querySelectorAll('[data-in] dt'), { opacity: 0, x: -14, duration: 0.6, stagger: STAGGER * 2, ease: EASE.out }, 0.55)
        .from(p.querySelectorAll('[data-in] dd, p[data-in]'), { opacity: 0, y: 14, duration: 0.8, stagger: STAGGER * 2, ease: EASE.out }, 0.65)
      return headingReveal(p, p.querySelector('h3'), [], { start: 'top 85%' })
    })
    const tints = (slug) => document.querySelector(`[data-tint="${slug}"]`)
    const setFocus = (target) => {
      projects.forEach((p) => {
        const on = p === target
        p.querySelector('[data-dim]').style.opacity = !target || on ? '1' : '0.3'
        p.querySelector('[data-num]').style.color = on ? 'var(--signal)' : ''
      })
      PROJECTS.forEach((pr) => { const el = tints(pr.slug); if (el) gsap.to(el, { opacity: target && target.id === `projekt-${pr.slug}` ? 1 : 0, duration: 0.9, ease: EASE.soft, overwrite: true }) })
    }
    projects.forEach((p) => ScrollTrigger.create({
      trigger: p, start: 'top 55%', end: 'bottom 45%',
      onToggle: (self) => { if (self.isActive) setFocus(p) },
    }))
    ScrollTrigger.create({ trigger: el.querySelector('[data-list]'), start: 'top 55%', end: 'bottom 45%', onLeave: () => setFocus(null), onLeaveBack: () => setFocus(null) })
    return () => { setFocus(null); undo.forEach((u) => u()) }
  }, [], { idle: true })

  return (
    <section ref={ref} id="projekte" aria-labelledby="projekte-title" className="relative frame section-y">
      <SectionHead n={1} label="Projekte" file="projekte.tsx" title={<span id="projekte-title">Ausgewählte Projekte</span>}>
        <p className="t-lead text-muted mt-6 max-w-[30ch]">Kurze Aufnahmen aus den echten Apps, mit echten Klicks.</p>
      </SectionHead>
      <div data-list className="mt-20 lg:mt-28">
        {PROJECTS.map((p, i) => <Project key={p.slug} project={p} i={i} />)}
        <span aria-hidden className="block h-px bg-line" />
      </div>
    </section>
  )
}
