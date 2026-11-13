import { useEffect, useRef, useState } from 'react'
import { useMotion, gsap, SplitText, finePointer } from '../lib/motion'
import { emit } from '../lib/events'
import { PROJECTS } from '../data/content'
import Tile from '../ui/Tile'

// ── the three motifs in the sentence: small, looping, each showing what its word means ──
// Anwendungen: the three apps fanned out like cards, the front one changing every few seconds.
// Interface: a little window; a pointer moves to its button and presses it.
// Datenbank: a table whose rows fill in one by one.
function AppsMotif() {
  return (
    <span className="relative block w-full h-full">
      {[['/videos/dienstzeit.jpg', 'object-top'], ['/videos/creators-journal.jpg', 'object-left-top'], [null, '']].map(([src, pos], i) => (
        <span key={i} className="absolute top-[8%] left-1/2 h-[84%] aspect-[3/4] rounded-[0.12em] overflow-hidden ring-1 ring-black/10 shadow-pill motif-fan"
          style={{ '--i': i, background: src ? '#111' : '#fafafa' }}>
          {src ? <img src={src} alt="" className={`w-full h-full object-cover ${pos}`} />
            : <span className="absolute inset-0 grid place-items-center text-[0.32em] font-semibold tracking-tight text-ink">VF</span>}
        </span>
      ))}
    </span>
  )
}
function InterfaceMotif() {
  return (
    <span className="relative block w-full h-full rounded-[0.14em] bg-paper ring-1 ring-black/10 overflow-hidden">
      <span className="absolute left-0 right-0 top-0 h-[22%] bg-mist flex items-center gap-[0.05em] pl-[0.08em]">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => <i key={c} className="block w-[0.06em] h-[0.06em] rounded-full" style={{ background: c }} />)}
      </span>
      <span className="absolute left-[12%] top-[34%] w-[55%] h-[7%] rounded-full bg-black/15" />
      <span className="absolute left-[12%] top-[48%] w-[38%] h-[7%] rounded-full bg-black/10" />
      <span className="absolute right-[12%] bottom-[14%] w-[34%] h-[20%] rounded-[0.05em] bg-ink motif-press" />
      {/* the pointer */}
      <svg viewBox="0 0 12 16" className="absolute w-[18%] motif-pointer" aria-hidden><path d="M1 1v12l3-3 2.5 5 2-1-2.5-5H10z" fill="#0f0f0f" stroke="#fff" strokeWidth="1" /></svg>
    </span>
  )
}
function DataMotif() {
  return (
    <span className="relative block w-full h-full rounded-[0.14em] bg-[#161616] ring-1 ring-black/10 overflow-hidden p-[10%]">
      {[0, 1, 2, 3].map((r) => (
        <span key={r} className="flex gap-[6%] h-[18%] mb-[5%] items-center motif-row" style={{ '--r': r }}>
          <i className="block h-[60%] w-[18%] rounded-full bg-[#67b7a4]" />
          <i className="block h-[60%] w-[46%] rounded-full bg-white/70" />
          <i className="block h-[60%] w-[18%] rounded-full bg-white/30" />
        </span>
      ))}
    </span>
  )
}

const byslug = (s) => PROJECTS.find((p) => p.slug === s)

// ── the popups: real content behind each word ──
function AppsCard() {
  return (
    <>
      <p className="t-cap">Anwendungen</p>
      <p className="text-[17px] font-medium tracking-tight mt-1">Drei Projekte, alle echt</p>
      <ul className="mt-3 -mx-1.5">
        {['dienstzeit', 'creators-journal', 'portfolio'].map((s) => {
          const p = byslug(s)
          return (
            <li key={s}>
              <button type="button" onClick={() => emit('open-project', s)} className="group w-full flex items-center gap-3 rounded-ctl px-1.5 py-1.5 text-left hover:bg-mist transition-colors">
                <span className="w-9 h-9 rounded-[22.37%] overflow-hidden bg-[#111] ring-1 ring-black/10 flex-none">
                  {p.video ? <img src={`/videos/${s}.jpg`} alt="" className="w-full h-full object-cover object-top" /> : <span className="w-full h-full grid place-items-center bg-paper text-[11px] font-semibold">VF</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium leading-tight">{p.title}</span>
                  <span className="block t-cap mt-0.5">{p.kind} · {p.status}</span>
                </span>
                <span aria-hidden className="text-gray transition-transform group-hover:translate-x-0.5">↗</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
function InterfaceCard() {
  return (
    <>
      <p className="t-cap">Interface</p>
      <p className="text-[17px] font-medium tracking-tight mt-1">Vom Entwurf zum Pixel</p>
      <div className="mt-3 flex items-center gap-2">
        <Tile t="Figma" size={38} /><span className="text-faint">→</span><Tile t="React" size={38} /><Tile t="SwiftUI" size={38} /><Tile t="Tailwind CSS" size={38} />
      </div>
      <p className="text-[14px] text-gray leading-snug mt-3">Gestaltet in Figma, gebaut in React und SwiftUI – Web und iOS aus einer Hand.</p>
    </>
  )
}
function DataCard() {
  return (
    <>
      <p className="t-cap">Datenbank</p>
      <p className="text-[17px] font-medium tracking-tight mt-1">Daten, die bleiben</p>
      <div className="mt-3 flex items-center gap-2"><Tile t="SQLite" size={38} /><Tile t="Prisma" size={38} /><Tile t="TypeScript" size={38} /></div>
      <ul className="text-[14px] text-gray leading-snug mt-3 space-y-1">
        <li><span className="text-ink">Creator's Journal</span> speichert alles lokal in SQLite.</li>
        <li><span className="text-ink">Dienstzeit</span> hält alle Daten auf dem Gerät.</li>
      </ul>
    </>
  )
}

const MOTIFS = { apps: [AppsMotif, AppsCard, 'Anwendungen'], ui: [InterfaceMotif, InterfaceCard, 'Interface'], data: [DataMotif, DataCard, 'Datenbank'] }

// A motif in the sentence and its popup. The popup opens on hover (and stays while the pointer is
// on it), on keyboard focus, and on tap; it opens upwards out of the motif, in focus, and keeps
// inside the screen. Escape or a click elsewhere closes it.
function Chip({ id }) {
  const [Motif, Card, label] = MOTIFS[id]
  const [open, setOpen] = useState(false)
  const [below, setBelow] = useState(false)
  const wrap = useRef(), card = useRef(), hide = useRef()
  const show = () => { clearTimeout(hide.current); setOpen(true) }
  const later = () => { hide.current = setTimeout(() => setOpen(false), 140) }

  // keep the card on screen: shift it sideways if it would run out
  useEffect(() => {
    if (!open) return
    const c = card.current
    // not enough room above (the navigation sits there too)? then it opens downwards
    setBelow(wrap.current.getBoundingClientRect().top < c.offsetHeight + 96)
    c.style.setProperty('--dx', '0px')
    const r = c.getBoundingClientRect(), m = 12
    const dx = r.left < m ? m - r.left : r.right > innerWidth - m ? innerWidth - m - r.right : 0
    c.style.setProperty('--dx', `${dx}px`)
    const away = (e) => { if (!wrap.current.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', away); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc) }
  }, [open])

  return (
    <span ref={wrap} data-chip className="relative inline-block align-[-0.12em] mx-[0.12em]"
      onMouseEnter={finePointer() ? show : undefined} onMouseLeave={finePointer() ? later : undefined}>
      <button type="button" aria-expanded={open} aria-label={`${label}: mehr dazu`} onClick={() => setOpen((o) => !o)} onFocus={show} onBlur={later}
        className={`relative block w-[1.5em] h-[1.02em] rounded-[0.2em] transition-transform duration-500 ease-sys ${open ? '-translate-y-[0.06em] scale-[1.06]' : ''}`}>
        <Motif />
      </button>
      <span ref={card} role="dialog" aria-label={label} onMouseEnter={show} onMouseLeave={later}
        className={`absolute z-30 left-1/2 ${below ? 'top-[calc(100%+14px)]' : 'bottom-[calc(100%+14px)]'} w-[18.5rem] text-left text-[15px] font-normal tracking-normal leading-normal text-ink normal-case glass-strong rounded-card p-4 transition-[opacity,transform,filter] duration-300 ease-sys ${open ? 'opacity-100 blur-0 pointer-events-auto' : 'opacity-0 blur-[6px] pointer-events-none'}`}
        style={{ transform: `translateX(calc(-50% + var(--dx, 0px))) translateY(${open ? 0 : below ? -8 : 8}px) scale(${open ? 1 : 0.96})`, transformOrigin: below ? '50% 0%' : '50% 100%' }}>
        <Card />
      </span>
    </span>
  )
}

// One sentence, read into focus: every word starts pale and blurred and sharpens as the scroll
// reaches it (scrubbed, both ways); each motif comes into focus with the word after it.
export default function Statement() {
  const ref = useRef()
  useMotion(ref, (el) => {
    let split
    const p = el.querySelector('[data-sentence]')
    document.fonts.ready.then(() => {
      split = SplitText.create(p, { type: 'words', wordsClass: 'sw' })
      const words = split.words.filter((w) => !w.closest('[data-chip]'))
      const tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 55%', scrub: 0.5 } })
      tl.fromTo(words, { opacity: 0.12, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', stagger: 0.12, ease: 'none', duration: 0.6 }, 0)
      el.querySelectorAll('[data-chip] > button').forEach((c) => {
        const next = words.findIndex((w) => c.compareDocumentPosition(w) & Node.DOCUMENT_POSITION_FOLLOWING)
        tl.fromTo(c, { opacity: 0, scale: 0.6, filter: 'blur(8px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'expo.out', duration: 0.5 }, Math.max(0, next) * 0.12)
      })
    })
    return () => split?.revert()
  })
  return (
    <section ref={ref} id="idee" aria-label="Was ich mache" className="frame section-y">
      {/* set like a magazine page: a small label in the margin, the sentence left with a first-line
          indent (a div, not a p: the popups hold lists and paragraphs of their own) */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-6">
        <p className="col-span-12 lg:col-span-2 t-cap pt-3">Was ich mache</p>
      <div data-sentence className="col-span-12 lg:col-span-10 t-display max-w-[16em] [text-indent:1.6em] [&_*]:[text-indent:0]">
        Ich gestalte und entwickle digitale Anwendungen <Chip id="apps" /> – vom Interface <Chip id="ui" /> bis
        zur Datenbank <Chip id="data" />.
        <span className="text-faint"> An der Schnittstelle von Design und Code.</span>
      </div>
      </div>
      <style>{`
        .motif-fan{transform:translateX(-50%) rotate(calc((var(--i) - 1) * 14deg)) translateX(calc((var(--i) - 1) * 32%));transform-origin:50% 120%;animation:fan 6s var(--ease) infinite;animation-delay:calc(var(--i) * -2s)}
        @keyframes fan{0%,30%{z-index:3;transform:translateX(-50%) rotate(0) translateY(-4%)}33%,63%{z-index:2;transform:translateX(-50%) rotate(14deg) translateX(32%)}66%,97%{z-index:1;transform:translateX(-50%) rotate(-14deg) translateX(-32%)}100%{z-index:3;transform:translateX(-50%) rotate(0) translateY(-4%)}}
        .motif-pointer{left:20%;top:70%;animation:pointer 3.2s var(--ease) infinite}
        @keyframes pointer{0%,10%{left:18%;top:72%}45%,70%{left:72%;top:74%}100%{left:18%;top:72%}}
        .motif-press{animation:press 3.2s var(--ease) infinite}
        @keyframes press{0%,48%{transform:scale(1);background:#0f0f0f}53%{transform:scale(.88);background:#0071e3}62%,100%{transform:scale(1);background:#0f0f0f}}
        .motif-row{opacity:0;animation:row 4s var(--ease) infinite;animation-delay:calc(var(--r) * .35s)}
        @keyframes row{0%{opacity:0;transform:translateX(-12%)}15%,80%{opacity:1;transform:none}100%{opacity:0}}
        @media (prefers-reduced-motion:reduce){.motif-fan,.motif-pointer,.motif-press,.motif-row{animation:none;opacity:1}}
      `}</style>
    </section>
  )
}
