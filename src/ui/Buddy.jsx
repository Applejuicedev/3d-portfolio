import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'
import { on, emit } from '../lib/events'
import { lenis, holdScroll } from '../lib/scroll'
import { IDS, SCENES, TIPS, SAY } from '../data/mi'
import { voicePlay, voiceStop, voiceLevel, sfx } from '../lib/sound'
import MiBlob from './MiBlob'

// Mi — the companion: a small drop of liquid chrome in 3D (MiBlob) with two dark eyes, floating
// over its own soft shadow. The eyes look towards the pointer and blink, their shape is the mood;
// while it talks, the chrome shivers with the voice. It leans with the scroll's speed, moves to its own place in every section and talks:
// once about each section, about what just happened
// (Spotlight, a copied address, an opened project). Fast scrolling makes it dizzy; left alone it
// falls asleep. A click makes it hop, and it shares a tip.
export default function Buddy() {
  const [shown, setShown] = useState(false)
  const [mood, setMood] = useState('idle') // idle · happy · wow · sleep · dizzy
  const [text, setText] = useState('')
  const [said, setSaid] = useState(0) // how many of its words have been spoken (those turn black)
  const [talking, setTalking] = useState(false)
  const [side, setSide] = useState('left')
  const [intro, setIntro] = useState(false) // alone in the middle, introducing itself
  const [busy, setBusy] = useState(false) // something under the words (text, media, a dark surface): they get frosted glass behind them
  const sayRef = useRef()
  const wrapRef = useRef(), bodyRef = useRef(), eyesRef = useRef(), faceRef = useRef(), mouthRef = useRef()
  const state = useRef({ scene: 'start', spot: 0, said: { 'start:0': true }, lastSay: 0, tip: 0, mobile: false })

  // talking, the way adamperlis.com's buddy does: the whole line stands there in grey at once and
  // each word turns black as it is spoken — on the recording's own word times when there is a take
  // (Mi's voice, lib/sound), otherwise at a speaking pace of its own. Then it holds and clears.
  const say = useRef(() => {})
  useEffect(() => {
    let run = 0, clear, raf
    let queue = []
    say.current = async (line, { force = false } = {}) => {
      if (Array.isArray(line)) { queue = line.slice(1); line = line[0] } else queue = []
      const now = Date.now(), s = state.current
      if (!force && (line === s.lastLine && now - s.lastSay < 15000)) return
      s.lastLine = line; s.lastSay = now
      const id = ++run
      clearTimeout(clear); cancelAnimationFrame(raf); voiceStop()
      const words = line.split(' ')
      setText(line); setSaid(0)
      if (prefersReduced()) { setSaid(words.length) }
      const take = prefersReduced() ? null : await voicePlay(line)
      if (id !== run) return
      // without a take: about 60 ms a letter, a breath after a comma or a full stop
      let t = 0
      const at = take?.words ?? words.map((w) => { const s0 = t; t += 110 + w.length * 52 + (/[,.!?–:]$/.test(w) ? 160 : 0); return s0 })
      const total = take?.ms ?? t
      const t0 = performance.now()
      setTalking(true)
      const tick = () => {
        if (id !== run) return
        const e = performance.now() - t0
        let n = 0; while (n < at.length && at[n] <= e) n++
        setSaid(n)
        // the mouth: the voice's level when it is heard, a flutter on each word otherwise
        const lvl = take ? voiceLevel() : Math.max(0, Math.sin(((e - (at[n - 1] ?? 0)) / 140) * Math.PI)) * 0.7
        if (mouthRef.current) mouthRef.current.style.setProperty('--open', lvl.toFixed(3))
        if (e < total + 80) raf = requestAnimationFrame(tick)
        else {
          setSaid(words.length); setTalking(false)
          mouthRef.current?.style.setProperty('--open', '0')
          clear = setTimeout(() => {
            if (id !== run) return
            setText('')
            if (queue.length) { const rest = queue; setTimeout(() => { if (id === run) say.current(rest, { force: true }) }, 450) }
          }, 1600 + words.length * 120)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    return () => { run++; clearTimeout(clear); cancelAnimationFrame(raf); voiceStop() }
  }, [])
  const mood_ = useRef(), moodFor = (m, ms = 1600) => { setMood(m); clearTimeout(mood_.current); mood_.current = setTimeout(() => setMood('idle'), ms) }

  // what lies under the words: sampled a few times a second while they are shown (Mi moves, the
  // page scrolls under it). Anything but the bare page — text, a picture, a video, a window, any
  // painted surface — gets the words a frosted backing, so they stay readable.
  useEffect(() => {
    if (!text) return
    const el = sayRef.current
    const painted = (n) => {
      for (let e = n; e && e !== document.body && e !== document.documentElement; e = e.parentElement) {
        if (e.closest('[data-buddy-wrap]')) return false
        if (/^(IMG|VIDEO|SVG|PICTURE|INPUT|TEXTAREA|BUTTON|A|P|H[1-6]|LI|DT|DD|PRE|CODE|LABEL)$/i.test(e.tagName)) return true
        if (e.tagName === 'CANVAS' && !e.closest('.fixed.inset-0')) return true // the page-wide particle canvas doesn't count
        const cs = getComputedStyle(e)
        if (cs.backgroundImage !== 'none') return true
        const a = cs.backgroundColor.match(/[\d.]+/g)
        if (a && (a[3] === undefined ? 1 : +a[3]) > 0.06) return true
        if (cs.backdropFilter && cs.backdropFilter !== 'none') return true
      }
      return false
    }
    const check = () => {
      const r = el.getBoundingClientRect()
      if (!r.width) return
      let hit = false
      for (const fx of [0.08, 0.35, 0.65, 0.92]) for (const fy of [0.3, 0.75]) {
        const x = r.left + r.width * fx, y = r.top + r.height * fy
        const top = document.elementsFromPoint(x, y).find((n) => !n.closest('[data-buddy-wrap]'))
        if (top && painted(top)) { hit = true; break }
      }
      setBusy(hit)
    }
    check()
    const id = setInterval(check, 220)
    return () => clearInterval(id)
  }, [text])

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
    // the first thing after the boot: it appears alone in the middle, large, and introduces itself
    // while the page waits; then it goes to its corner, small, and the page begins (intro:done)
    const offA = on('buddy:arrive', () => {
      setShown(true); setIntro(true); sfx('arrive')
      document.documentElement.setAttribute('data-intro', '') // nothing else on the page yet, not even the navigation
      const still = prefersReduced()
      holdScroll(true, 'intro')
      gsap.set(wrapRef.current, { x: innerWidth / 2, y: innerHeight * 0.44 })
      if (still) gsap.set(bodyRef.current, { scale: 2.2 })
      else gsap.fromTo(bodyRef.current, { scale: 0.4, opacity: 0, rotationZ: -25 }, { scale: 2.2, opacity: 1, rotationZ: 0, duration: 1, ease: 'back.out(2)', delay: 0.15 })
      setTimeout(() => say.current(SAY.intro, { force: true }), 600)
      // short: as long as the line takes to say (the pace say() keeps), a breath, and off to its corner
      const pace = (l) => l.split(' ').reduce((t, w) => t + 110 + w.length * 52 + (/[,.!?–:]$/.test(w) ? 160 : 0), 0)
      const total = 600 + pace(SAY.intro) + 700
      let done = false
      const finish = () => {
        if (done) return
        done = true; clearTimeout(tm); window.removeEventListener('keydown', esc)
        setIntro(false); document.documentElement.removeAttribute('data-intro')
        gsap.to(bodyRef.current, { scale: 1, duration: still ? 0 : 1.2, ease: 'power3.inOut' })
        place('start', still)
        holdScroll(false, 'intro'); emit('intro:done')
        setTimeout(() => say.current(SAY.go, { force: true }), 1700)
      }
      const tm = setTimeout(finish, total)
      const esc = (e) => { if (e.key === 'Escape') finish() }
      window.addEventListener('keydown', esc)
    })
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
      on('sheet:closed', () => { gsap.to(wrapRef.current, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)' }) }),
      on('buddy:say', (line) => say.current(line, { force: true })),
      on('spotlight', () => { moodFor('wow'); say.current(SAY.spotlight, { force: true }) }),
      on('notify', (n) => {
        if (n.app === 'Zwischenablage') { moodFor('happy', 2200); say.current(SAY.copied, { force: true }) }
        else if (n.app === 'Mail') { moodFor('happy', 2600); say.current(SAY.mailed, { force: true }) }
        else moodFor('wow', 900)
        if (!prefersReduced()) gsap.fromTo(bodyRef.current, { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' })
      }),
    ]
    return () => offs.forEach((o) => o())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eyes and body follow the pointer; the scroll's speed tilts it; it sleeps when left alone
  useEffect(() => {
    if (!shown || prefersReduced()) return
    const body = bodyRef.current, eyes = eyesRef.current, face = faceRef.current
    const ex = gsap.quickTo(eyes, 'x', { duration: 0.35, ease: 'power3.out' })
    const ey = gsap.quickTo(eyes, 'y', { duration: 0.35, ease: 'power3.out' })
    let idle, asleep = false
    const wake = () => {
      clearTimeout(idle)
      if (asleep) { asleep = false; setMood('wow'); say.current(SAY.wake, { force: true }); setTimeout(() => setMood('idle'), 900) }
      idle = setTimeout(() => { asleep = true; setMood('sleep'); say.current(SAY.sleep, { force: true }) }, 30000)
    }
    const move = (e) => {
      const r = body.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1
            ex((dx / d) * Math.min(6, d / 40)); ey((dy / d) * Math.min(5, d / 45))
      face.style.setProperty('--lx', `${50 + gsap.utils.clamp(-50, 50, dx / 6)}%`); face.style.setProperty('--ly', `${40 + gsap.utils.clamp(-40, 40, dy / 6)}%`)
      wake()
    }
    // tilt with the scroll: the faster, the more; fast enough and it gets dizzy
    let dizzy = 0
    const onScroll = () => {
      const v = lenis?.velocity ?? 0
      gsap.to(body, { rotation: gsap.utils.clamp(-14, 14, v * 0.4), duration: 0.4, overwrite: 'auto' })
      if (Math.abs(v) > 55 && Date.now() - dizzy > 6000) { dizzy = Date.now(); moodFor('dizzy', 1400) }
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
    say.current(TIPS[s.tip++ % TIPS.length], { force: true }); moodFor('happy', 1800); sfx('spin')
    if (!prefersReduced()) gsap.fromTo(bodyRef.current, { y: 0 }, { y: -16, duration: 0.25, ease: 'power2.out', yoyo: true, repeat: 1 })
  }

  // two eyes; their shape is the mood
  const eye = mood === 'happy'
    ? 'w-[8px] h-[4px] rounded-t-full border-t-[2px] border-x-[2px] border-[#0b0b0d] bg-transparent mt-[2px]'
    : mood === 'sleep' ? 'w-[7px] h-[2px] rounded-full bg-[#0b0b0d] mt-[4px]'
      : mood === 'wow' ? 'w-[6px] h-[9px] rounded-full bg-[#0b0b0d]'
        : mood === 'dizzy' ? 'w-[7px] h-[7px] rounded-full border-[2px] border-[#0b0b0d] bg-transparent'
          : 'w-[5px] h-[8px] rounded-full bg-[#0b0b0d]'

  return (
    <div ref={wrapRef} data-buddy-wrap className="fixed left-0 top-0 z-[90] pointer-events-none" style={{ opacity: shown ? 1 : 0 }}>
      <div className="-translate-x-1/2 -translate-y-1/2 [perspective:500px]">
        <div>
          <button type="button" onClick={poke} aria-label="Mi, der Begleiter – Tipp anzeigen" data-cursor-ignore tabIndex={shown ? 0 : -1}
            className="buddy-float pointer-events-auto block rounded-full" style={{ width: 'var(--b)', height: 'var(--b)' }}>
            <div ref={bodyRef} data-buddy-body className="relative w-full h-full">
              {/* the drop of liquid chrome, and the eyes on it */}
              <div ref={faceRef} className="absolute inset-0">
                <MiBlob />
                <div className="absolute inset-0 grid place-items-center">
                  <div ref={eyesRef} className="flex items-start gap-[6px] -mt-0.5">
                    <i className={`block transition-all duration-200 shadow-[0_0_0_1px_rgb(255_255_255/.35)] ${eye}`} />
                    <i className={`block transition-all duration-200 shadow-[0_0_0_1px_rgb(255_255_255/.35)] ${eye}`} />
                  </div>
                </div>
                <i ref={mouthRef} aria-hidden className="hidden" />
              </div>
            </div>
          </button>
          <i aria-hidden className="buddy-shadow block mx-auto mt-2 h-[5px] rounded-full bg-black/10 blur-[3px]" />
        </div>
        {/* what it says — no bubble, just the words beside it (as on adamperlis.com): grey, black once spoken */}
        <p ref={sayRef} aria-hidden className={`absolute w-max leading-[1.4] text-faint buddy-say ${busy ? 'is-busy' : ''} transition-[opacity,transform] duration-300 ${intro ? 'left-1/2 -translate-x-1/2 top-[calc(100%+4.5rem)] text-center text-[17px] max-w-[min(22rem,80vw)]' : `top-1/2 -translate-y-1/2 text-[15px] max-w-[min(16rem,60vw)] ${side === 'left' ? 'right-[calc(100%+12px)] origin-right' : 'left-[calc(100%+12px)] origin-left'}`} ${text ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {text.split(' ').map((w, i) => <span key={i} className={`transition-colors duration-150 ${i < said ? 'text-ink' : ''}`}>{i ? ' ' : ''}{w}</span>)}
        </p>
      </div>
      <style>{`
        [data-buddy-wrap]{--b:46px}
        @media (max-width:767px){[data-buddy-wrap]{--b:40px}}
        .buddy-float{animation:buddy-float 4.2s ease-in-out infinite}
        .buddy-shadow{width:calc(var(--b) * .7);animation:buddy-shadow 4.2s ease-in-out infinite}
        @keyframes buddy-float{50%{transform:translateY(-6px)}}
        @keyframes buddy-shadow{50%{transform:scaleX(.8);opacity:.6}}
        .buddy-say{text-shadow:0 0 12px var(--canvas),0 0 4px var(--canvas),0 0 2px var(--canvas);transition:opacity .3s var(--ease),transform .3s var(--ease),color .35s var(--ease)}
        .buddy-say::before{content:'';position:absolute;inset:-8px -12px;z-index:-1;border-radius:18px;opacity:0;transition:opacity .35s var(--ease);
          background:rgb(var(--g)/calc(var(--g-a) + .32));-webkit-backdrop-filter:blur(10px) saturate(1.9) brightness(1.04);backdrop-filter:blur(10px) saturate(1.9) brightness(1.04);
          box-shadow:inset 0 0 14px -4px rgb(255 255 255/.9),inset 1px 1px 0 rgb(255 255 255/.9),inset -1px -1px 0 rgb(255 255 255/.45),0 0 0 .5px rgb(0 0 0/.07),0 12px 32px -14px rgb(0 0 0/.25)}
        .buddy-say.is-busy::before{opacity:1}
        .buddy-say.is-busy{text-shadow:none;color:var(--gray)}
                @media (prefers-reduced-motion:reduce){.buddy-float,.buddy-shadow{animation:none}}
      `}</style>
    </div>
  )
}
