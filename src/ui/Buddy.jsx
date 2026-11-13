import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'
import { on } from '../lib/events'
import { lenis } from '../lib/scroll'

const IDS = ['start', 'idee', 'arbeiten', 'stack', 'weg', 'kontakt']

// Each section has a few spots, each with its own line: while the section scrolls by, it hops from
// spot to spot and says that spot's line (once per visit). [x, y as share of the viewport, side
// the bubble opens to, line — a list is spoken one after another]. Phones: the lower corners only.
const SCENES = {
  start: { spots: [
    [0.9, 0.8, 'left', ['Hi, ich bin Mi! Vincent hat mich mit Claude Code gebaut.', 'Scroll los, ich komm mit.']],
    [0.08, 0.55, 'right', 'Das Fenster ist Creator\'s Journal – eine echte Aufnahme, kein Mockup.'],
    [0.92, 0.3, 'left', 'Das iPhone davor zeigt Dienstzeit. Klick ruhig drauf.'],
  ] },
  idee: { spots: [[0.9, 0.5, 'left', 'Die Bildchen im Satz sind echte Ausschnitte. Fahr mal drüber.']] },
  arbeiten: { spots: [
    [0.93, 0.84, 'left', 'Seine Projekte. Scroll weiter – die Galerie läuft seitwärts.'],
    [0.5, 0.9, 'right', 'Dienstzeit rechnet nach SAZV – mit 18 Buchungsarten.'],
    [0.08, 0.86, 'right', 'Creator\'s Journal: Planung, Reflexion, Training. Alles lokal.'],
    [0.93, 0.18, 'left', 'Und das letzte Projekt bist du gerade: diese Website.'],
  ] },
  stack: { spots: [
    [0.12, 0.74, 'right', 'Sein Werkzeugkasten – er läuft einfach durch.'],
    [0.88, 0.72, 'left', 'Fahr über ein Projekt: Dann leuchtet im Band auf, was drinsteckt.'],
    [0.5, 0.86, 'right', 'Klick ein Symbol, dann sag ich dir, wo es steckt.'],
  ] },
  weg: { spots: [
    [0.09, 0.5, 'right', 'Hier steht kurz, wer er ist und was er sucht.'],
    [0.92, 0.3, 'left', 'Seine Stationen, von 2020 bis heute. Links fliegt das Jahr mit.'],
    [0.08, 0.82, 'right', 'Die Balken unter dem Jahr sind klickbar.'],
    [0.9, 0.78, 'left', 'Die ganze Geschichte steht in den Notizen.'],
  ] },
  kontakt: { spots: [
    [0.9, 0.6, 'left', 'Schreib ihm! Der Betreff ist schon ausgefüllt.'],
    [0.1, 0.7, 'right', 'Er sucht Praktika und Werkstudentenstellen – ab 2029.'],
  ] },
}
const TIPS = [
  '⌘K findet alles auf dieser Seite.',
  'Vincent sucht Praktika und Werkstudentenstellen – ab 2029.',
  'Ich habe die Seite gestartet. Return war deine Idee.',
  'Die Fenster oben laufen mit echten Aufnahmen.',
  'Ich bin Mi – nur CSS, kein Three.js, keine Bilder.',
]

// Mi — the terminal from the boot, shrunk into a companion. A rounded chrome block with depth (a stack
// of darker layers behind its face), a dark screen for a face: two eyes that follow the pointer
// and blink, a prompt caret for a mouth that moves while it talks. It floats, leans towards the
// pointer, tilts with the scroll's speed, moves to its own place in every section and talks:
// about the section, about the window under the pointer ([data-buddy]), about what just happened
// (Spotlight, a copied address, an opened project). Fast scrolling makes it dizzy; left alone it
// falls asleep. A click spins it and it shares a tip.
export default function Buddy() {
  const [shown, setShown] = useState(false)
  const [mood, setMood] = useState('idle') // idle · happy · wow · sleep · dizzy
  const [text, setText] = useState('')
  const [talking, setTalking] = useState(false)
  const [side, setSide] = useState('left')
  const wrapRef = useRef(), bodyRef = useRef(), eyesRef = useRef(), faceRef = useRef()
  const state = useRef({ scene: 'start', spot: 0, said: { 'start:0': true }, lastSay: 0, tip: 0, mobile: false })

  // talking: types the line, holds it, clears it
  const say = useRef(() => {})
  useEffect(() => {
    let typing, clear
    let queue = []
    say.current = (line, { force = false } = {}) => {
      if (Array.isArray(line)) { queue = line.slice(1); line = line[0] } else queue = []
      const now = Date.now(), s = state.current
      if (!force && (line === s.lastLine && now - s.lastSay < 15000)) return
      s.lastLine = line; s.lastSay = now
      clearInterval(typing); clearTimeout(clear)
      if (prefersReduced()) { setText(line); setTalking(false) }
      else {
        let i = 0; setTalking(true); setText('')
        typing = setInterval(() => { i++; setText(line.slice(0, i)); if (i >= line.length) { clearInterval(typing); setTalking(false) } }, 26)
      }
      clear = setTimeout(() => {
        setText('')
        if (queue.length) { const rest = queue; setTimeout(() => say.current(rest, { force: true }), 450) }
      }, 2200 + line.length * 45)
    }
    return () => { clearInterval(typing); clearTimeout(clear) }
  }, [])
  const mood_ = useRef(), moodFor = (m, ms = 1600) => { setMood(m); clearTimeout(mood_.current); mood_.current = setTimeout(() => setMood('idle'), ms) }

  // where it stands for a scene
  const place = (id, instant = false, spot = 0) => {
    const sc = SCENES[id]; if (!sc) return
    const s = state.current
    s.mobile = innerWidth < 768
    const size = s.mobile ? 54 : 76
    const [sx, sy, sside] = sc.spots[Math.min(spot, sc.spots.length - 1)]
    // phones: the lower corners only, alternating
    const x = s.mobile ? ((IDS.indexOf(id) + spot) % 2 ? 16 + size / 2 : innerWidth - 16 - size / 2) : sx * innerWidth
    const y = s.mobile ? innerHeight - 22 - size / 2 : sy * innerHeight
    setSide(s.mobile ? (x < innerWidth / 2 ? 'right' : 'left') : sside)
    if (instant || prefersReduced()) gsap.set(wrapRef.current, { x, y })
    else {
      // a little hop on the way: up and over, landing with a lean
      gsap.to(wrapRef.current, { x, duration: 1.3, ease: 'power3.inOut', overwrite: 'auto' })
      gsap.to(wrapRef.current, { y, duration: 1.3, ease: 'back.inOut(1.4)', overwrite: 'auto' })
      gsap.fromTo(bodyRef.current, { rotationZ: x < gsap.getProperty(wrapRef.current, 'x') ? 12 : -12 }, { rotationZ: 0, duration: 1.4, ease: 'elastic.out(1, 0.5)' })
    }
  }

  // arrival from the boot, and leaving again when the terminal restarts
  useEffect(() => {
    place('start', true)
    const offA = on('buddy:arrive', () => { setShown(true); setTimeout(() => say.current(SCENES.start.spots[0][3], { force: true }), 400) })
    const offR = on('reboot', () => setShown(false))
    const resize = () => place(state.current.scene, true, state.current.spot ?? 0)
    window.addEventListener('resize', resize)
    return () => { offA(); offR(); window.removeEventListener('resize', resize) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // the section under the middle of the screen decides its line; how far that section has
  // scrolled by decides which of its spots it takes
  useEffect(() => {
    if (!shown) return
    // it stays where it landed until the visitor scrolls for the first time
    let raf = 0, moved = window.scrollY > 40
    const check = () => {
      raf = 0
      const mid = innerHeight / 2, s = state.current
      for (const id of IDS) {
        const el = document.getElementById(id); if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top > mid || r.bottom < mid) continue
        // progress through the section: how much of it has scrolled past the top of the screen
        const p = Math.min(0.999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight * 0.5)))
        const spot = Math.floor(p * SCENES[id].spots.length)
        if (id !== s.scene || spot !== s.spot) {
          const newScene = id !== s.scene
          s.scene = id; s.spot = spot; place(id, false, spot)
          const key = `${id}:${spot}`
          if (!s.said[key]) { s.said[key] = true; setTimeout(() => say.current(SCENES[id].spots[spot][3]), newScene ? 700 : 500) }
        }
        break
      }
    }
    const onScroll = () => { if (!moved && window.scrollY < 40) return; moved = true; if (!raf) raf = requestAnimationFrame(check) }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (moved) check()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown])

  // reactions to the rest of the page
  useEffect(() => {
    const offs = [
      on('open-project', () => { moodFor('happy'); gsap.to(wrapRef.current, { scale: 0.001, opacity: 0, duration: 0.4, ease: 'power2.in' }) }),
      on('sheet:closed', () => { gsap.to(wrapRef.current, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)' }); say.current('Und? Gut, oder?') }),
      on('spotlight', () => { moodFor('wow'); say.current('Such ruhig – ich warte.', { force: true }) }),
      on('notify', (n) => {
        if (n.app === 'Zwischenablage') { moodFor('happy', 2200); say.current('Kopiert! Jetzt nur noch einfügen.', { force: true }) }
        else if (n.app === 'Mail') { moodFor('happy', 2600); say.current('Ich drück die Daumen.', { force: true }) }
        else moodFor('wow', 900)
        if (!prefersReduced()) gsap.fromTo(bodyRef.current, { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' })
      }),
    ]
    // what the pointer is over
    const over = (e) => { const t = e.target.closest?.('[data-buddy]'); if (t) say.current(t.getAttribute('data-buddy')) }
    window.addEventListener('pointerover', over, { passive: true })
    return () => { offs.forEach((o) => o()); window.removeEventListener('pointerover', over) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eyes and body follow the pointer; the scroll's speed tilts it; it sleeps when left alone
  useEffect(() => {
    if (!shown || prefersReduced()) return
    const body = bodyRef.current, eyes = eyesRef.current, face = faceRef.current
    const rx = gsap.quickTo(body, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(body, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const ex = gsap.quickTo(eyes, 'x', { duration: 0.35, ease: 'power3.out' })
    const ey = gsap.quickTo(eyes, 'y', { duration: 0.35, ease: 'power3.out' })
    let idle, asleep = false
    const wake = () => {
      clearTimeout(idle)
      if (asleep) { asleep = false; setMood('wow'); say.current('Oh – hi! Ich war kurz weg.', { force: true }); setTimeout(() => setMood('idle'), 900) }
      idle = setTimeout(() => { asleep = true; setMood('sleep'); say.current('zzz …', { force: true }) }, 30000)
    }
    const move = (e) => {
      const r = body.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1
      ry(gsap.utils.clamp(-28, 28, dx / 18)); rx(gsap.utils.clamp(-24, 24, -dy / 18))
      ex((dx / d) * Math.min(5, d / 40)); ey((dy / d) * Math.min(4, d / 50))
      face.style.setProperty('--lx', `${50 + gsap.utils.clamp(-50, 50, dx / 6)}%`); face.style.setProperty('--ly', `${40 + gsap.utils.clamp(-40, 40, dy / 6)}%`)
      wake()
    }
    // tilt with the scroll: the faster, the more; fast enough and it gets dizzy
    let dizzy = 0
    const onScroll = () => {
      const v = lenis?.velocity ?? 0
      gsap.to(body, { rotationX: gsap.utils.clamp(-30, 30, v * 0.9), duration: 0.4, overwrite: 'auto' })
      if (Math.abs(v) > 55 && Date.now() - dizzy > 6000) { dizzy = Date.now(); moodFor('dizzy', 1400); say.current('Huiii – langsam!', { force: true }) }
      wake()
    }
    // blinking, now and then
    let blink
    const doBlink = () => { gsap.to(eyes, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.inOut' }); blink = setTimeout(doBlink, 2500 + Math.random() * 3500) }
    blink = setTimeout(doBlink, 2000)
    gsap.set(eyes, { x: 0, y: 0 })
    const follow = setTimeout(() => window.addEventListener('pointermove', move, { passive: true }), 450)
    window.addEventListener('scroll', onScroll, { passive: true })
    wake()
    return () => { clearTimeout(idle); clearTimeout(blink); clearTimeout(follow); window.removeEventListener('pointermove', move); window.removeEventListener('scroll', onScroll) }
  }, [shown])

  const poke = () => {
    const s = state.current
    say.current(TIPS[s.tip++ % TIPS.length], { force: true }); moodFor('happy', 1800)
    if (!prefersReduced()) gsap.fromTo(bodyRef.current, { rotationY: 0 }, { rotationY: 360, duration: 0.9, ease: 'power3.inOut' })
  }

  const eye = mood === 'happy'
    ? 'w-[11px] h-[6px] rounded-t-full border-t-[2.5px] border-x-[2.5px] border-white bg-transparent mt-[3px]'
    : mood === 'sleep' ? 'w-[10px] h-[2.5px] rounded-full bg-white mt-[6px]'
      : mood === 'wow' ? 'w-[10px] h-[14px] rounded-full bg-white'
        : mood === 'dizzy' ? 'w-[9px] h-[9px] rounded-full border-[2.5px] border-white bg-transparent mt-[2px]'
          : 'w-[8px] h-[12px] rounded-[4px] bg-white'

  return (
    <div ref={wrapRef} data-buddy-wrap className="fixed left-0 top-0 z-[90] pointer-events-none" style={{ opacity: shown ? 1 : 0 }}>
      <div className="-translate-x-1/2 -translate-y-1/2 [perspective:500px]">
        <div className="buddy-float">
          <button type="button" onClick={poke} aria-label="Mi, der Begleiter – Tipp anzeigen" data-cursor-ignore tabIndex={shown ? 0 : -1}
            className="pointer-events-auto block rounded-[22.37%]" style={{ width: 'var(--b)', height: 'var(--b)' }}>
            <div ref={bodyRef} data-buddy-body className="relative w-full h-full [transform-style:preserve-3d]">
              {/* depth: the chrome continues backwards, darker towards the back */}
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} aria-hidden className="absolute inset-0 rounded-[22.37%]" style={{ transform: `translateZ(${-(i + 1) * 1.7}px)`, background: `linear-gradient(160deg, hsl(220 4% ${72 - i * 5}%), hsl(220 5% ${38 - i * 3}%))` }} />
              ))}
              <div ref={faceRef} className="chrome absolute inset-0 rounded-[22.37%] p-[11%]">
                <span aria-hidden className="chrome-rim absolute inset-0 rounded-[inherit]" />
                <div className="relative w-full h-full rounded-[16%] bg-[#0e0e10] shadow-[inset_0_1px_0_rgb(255_255_255/.08),inset_0_0_0_1px_rgb(0_0_0/.6)] grid place-items-center">
                  <div ref={eyesRef} className="flex items-start gap-[9px] -mt-1">
                    <i className={`block transition-all duration-200 shadow-[0_0_8px_rgb(255_255_255/.5)] ${eye}`} />
                    <i className={`block transition-all duration-200 shadow-[0_0_8px_rgb(255_255_255/.5)] ${eye}`} />
                  </div>
                  {/* the mouth is a prompt caret: it blinks at rest and jitters while talking */}
                  <i aria-hidden className={`absolute bottom-[22%] left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-[#28c840] ${talking ? 'w-[10px] buddy-talk' : 'w-[7px] buddy-caret'}`} />
                </div>
              </div>
            </div>
          </button>
        </div>
        {/* the speech bubble */}
        <p aria-hidden className={`absolute top-1/2 -translate-y-1/2 w-max max-w-[min(15rem,60vw)] glass-strong rounded-card px-3.5 py-2 text-[14px] font-medium leading-snug text-ink transition-[opacity,transform] duration-300 ${side === 'left' ? 'right-[calc(100%+12px)] origin-right' : 'left-[calc(100%+12px)] origin-left'} ${text ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {text}<span className={talking ? 'caret ml-0.5 text-ink/70' : 'hidden'} style={{ height: '0.95em' }} />
        </p>
      </div>
      <style>{`
        [data-buddy-wrap]{--b:76px}
        @media (max-width:767px){[data-buddy-wrap]{--b:54px}}
        .buddy-float{animation:buddy-float 4.2s ease-in-out infinite}
        @keyframes buddy-float{50%{transform:translateY(-7px) rotate(-1.5deg)}}
        .buddy-caret{animation:blink 1.06s steps(1) infinite}
        .buddy-talk{animation:buddy-talk 160ms steps(2) infinite}
        @keyframes buddy-talk{50%{transform:translateX(-50%) scaleX(.45)}}
        @media (prefers-reduced-motion:reduce){.buddy-float,.buddy-caret,.buddy-talk{animation:none}}
      `}</style>
    </div>
  )
}
