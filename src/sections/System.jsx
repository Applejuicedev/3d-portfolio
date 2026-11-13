import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LAYERS, PROJECTS, projectsUsing } from '../data/content'
import { useMotion, gsap, EASE, finePointer } from '../lib/motion'
import SectionHead from '../ui/SectionHead'

const USES = Object.fromEntries(LAYERS.flatMap((l) => l.items).map((t) => [t, projectsUsing(t)]))
const EDGES = Object.entries(USES).flatMap(([t, ps]) => ps.map((p) => [t, p]))
const slugId = (s) => s.replace(/[^a-z0-9]+/gi, '-')

// Measures where every edge runs: from the right edge of a tool to the left edge of a project,
// as a cubic curve with horizontal tangents. Re-measured on resize and once the fonts are in.
function useEdges(boxRef) {
  const [paths, setPaths] = useState({ w: 0, h: 0, d: [] })
  const measure = useCallback(() => {
    const box = boxRef.current
    if (!box || !matchMedia('(min-width: 1024px)').matches) return setPaths({ w: 0, h: 0, d: [] })
    const b = box.getBoundingClientRect()
    const d = EDGES.map(([t, p]) => {
      const a = box.querySelector(`[data-tool="${slugId(t)}"]`)?.getBoundingClientRect()
      const z = box.querySelector(`[data-node="${p}"]`)?.getBoundingClientRect()
      if (!a || !z) return null
      const x1 = a.right - b.left + 4, y1 = a.top + a.height / 2 - b.top
      const x2 = z.left - b.left - 4, y2 = z.top + z.height / 2 - b.top
      const mx = (x1 + x2) / 2
      return { t, p, d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}` }
    }).filter(Boolean)
    setPaths({ w: b.width, h: b.height, d })
  }, [boxRef])
  useLayoutEffect(() => {
    measure()
    document.fonts.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [measure, boxRef])
  return paths
}

// The stack as a system: six layers of tools on the left, the projects on the right, and a line
// wherever a tool is really used in a project (from the projects' own tech lists — nothing drawn
// that isn't there). Point at a tool and its lines light up and the projects it built step
// forward; point at a project and you see what it is made of. On phones the lines give way to a
// sentence that says the same.
export default function System() {
  const ref = useRef(), boxRef = useRef()
  const [sel, setSel] = useState(null) // { tool } or { project }
  const [touch, setTouch] = useState(false)
  useEffect(() => setTouch(!finePointer()), [])
  const paths = useEdges(boxRef)

  const litTool = (t) => (sel?.tool ? sel.tool === t : sel?.project ? USES[t].includes(sel.project) : false)
  const litProject = (p) => (sel?.project ? sel.project === p : sel?.tool ? USES[sel.tool].includes(p) : false)
  const litEdge = (e) => (sel?.tool ? e.t === sel.tool : sel?.project ? e.p === sel.project : false)

  useMotion(ref, (el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: boxRef.current, start: 'top 75%', once: true } })
    tl.from(el.querySelectorAll('[data-layer]'), { opacity: 0, x: -24, duration: 1, stagger: 0.07, ease: EASE.out }, 0)
      .from(el.querySelectorAll('[data-node]'), { opacity: 0, x: 24, duration: 1, stagger: 0.1, ease: EASE.out }, 0.2)
      .fromTo(el.querySelector('[data-edges]'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: EASE.inOut }, 0.4)
  })

  const pick = (s) => (touch ? undefined : () => setSel(s))
  const tap = (s, same) => () => setSel((cur) => (same(cur) ? null : s))
  const sentence = sel?.tool
    ? (USES[sel.tool].length ? `${sel.tool} steckt in ${USES[sel.tool].map((s) => PROJECTS.find((p) => p.slug === s).title).join(', ')}.` : `${sel.tool} – im Werkzeugkasten, in keinem der gezeigten Projekte.`)
    : sel?.project ? `${PROJECTS.find((p) => p.slug === sel.project).title}: ${PROJECTS.find((p) => p.slug === sel.project).tech.join(' · ')}.` : 'Zeig auf ein Werkzeug oder ein Projekt.'

  return (
    <section ref={ref} id="system" aria-labelledby="system-title" className="frame section-y">
      <SectionHead n={2} label="System" id="system-title"
        title={<>Womit ich <span className="t-serif">baue</span></>}
        note={<>Vom Entwurf bis zur Datenbank<span className="block text-faint">Linien = echte Verwendung</span></>} />

      <p aria-live="polite" className="t-mono text-[13px] mt-14 lg:mt-20 min-h-[3em] lg:min-h-[1.6em] text-muted"><span className="text-lime">→ </span>{sentence}</p>

      <div ref={boxRef} className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] gap-x-24 xl:gap-x-40 gap-y-10 mt-6" onMouseLeave={() => setSel(null)}>
        {paths.w > 0 && (
          <svg data-edges aria-hidden width={paths.w} height={paths.h} className="absolute inset-0 pointer-events-none overflow-visible">
            {paths.d.map((e) => {
              const on = litEdge(e)
              return <path key={e.t + e.p} d={e.d} fill="none" strokeWidth={on ? 1.25 : 1}
                className={`transition-[stroke,opacity] duration-300 ${on ? 'stroke-lime opacity-100' : sel ? 'stroke-white opacity-[0.04]' : 'stroke-white opacity-[0.12]'}`} />
            })}
          </svg>
        )}

        <ol className="relative">
          {LAYERS.map((l, li) => (
            <li key={l.id} data-layer className="grid grid-cols-[minmax(0,9rem)_1fr] max-sm:grid-cols-1 gap-x-6 gap-y-3 border-t border-line py-4 last:border-b">
              <p className="t-label pt-1.5"><span className="text-faint">L{li + 1} </span>{l.label}</p>
              <ul className="flex flex-wrap gap-1.5">
                {l.items.map((t) => {
                  const on = litTool(t), n = USES[t].length
                  return (
                    <li key={t}>
                      <button type="button" data-tool={slugId(t)} aria-pressed={on}
                        onMouseEnter={pick({ tool: t })} onFocus={pick({ tool: t })} onClick={tap({ tool: t }, (c) => c?.tool === t)}
                        className={`press inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1.5 text-[14px] tracking-tight transition-colors duration-300 ${on ? 'bg-lime border-lime text-bg' : sel ? 'bg-bg border-line text-faint' : 'bg-bg border-line text-ink hover:border-muted'}`}>
                        {t}
                        {n > 0 && <span className={`t-mono text-[10px] ${on ? 'text-bg/60' : 'text-faint'}`}>{n}</span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>

        <ul className="relative grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-0 content-center lg:space-y-16">
          {PROJECTS.map((p) => {
            const on = litProject(p.slug)
            return (
              <li key={p.slug}>
                <button type="button" data-node={p.slug} aria-pressed={on}
                  onMouseEnter={pick({ project: p.slug })} onFocus={pick({ project: p.slug })} onClick={tap({ project: p.slug }, (c) => c?.project === p.slug)}
                  className={`press w-full text-left panel px-3 lg:px-4 py-3 transition-colors duration-300 ${on ? '!border-lime' : ''}`}>
                  <span className={`block t-label ${on ? 'text-lime' : ''}`}>{p.kind}</span>
                  <span className={`block mt-1 text-[14px] lg:text-[17px] tracking-tight transition-colors ${on || !sel ? 'text-ink' : 'text-faint'}`}>{p.title}</span>
                  <span className="hidden lg:block t-mono text-[11px] text-faint mt-2">{p.tech.length} Technologien</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
