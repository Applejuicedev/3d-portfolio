import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { orbBuilt, headlineDone } from './heroStage'

const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"
const SEL = 'rgba(129,140,248,0.16)'
const HI = 'rgba(99,102,241,0.25)'
const SQUIGGLE = 'rgba(248,113,113,0.85)'

// the wrong word; phones get the short form so the line never runs past the screen edge
const FIRST = 'Technik'
const FIRST_SHORT = 'Tech'
const OPTIONS = [['Code', 'keyword'], ['Color', 'property'], ['Compose', 'function']]
const FINAL = 'Design trifft Code.'

// macOS-like arrow and I-beam for the pointer that selects the line
const Arrow = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.6))' }}>
    <path d="M3 2 L3 18 L7.2 14.2 L10 20.5 L12.6 19.4 L9.9 13.2 L15.6 13.2 Z" fill="#fff" stroke="#000" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
)
const IBeam = () => (
  <svg width="12" height="24" viewBox="0 0 12 24" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.7))' }}>
    <path d="M2 2 Q6 2 6 5 L6 19 Q6 22 2 22 M10 2 Q6 2 6 5 M6 19 Q6 22 10 22" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

// First headline line, played once on load like an editor session: "Design trifft Technik." is
// typed, then the pointer selects just "Technik", it's deleted and "Co" + autocomplete makes it
// "Code". The caret stays. Screen readers and crawlers get the final sentence straight away.
export default function HeroTyper() {
  const line = useRef(), pre = useRef(), word = useRef(), post = useRef(), popup = useRef(), sel = useRef(), lint = useRef(), badWord = useRef()
  const ptr = useRef(), arrow = useRef(), ibeam = useRef()
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pre.current.textContent = FINAL
      pre.current.classList.add('typer-caret')
      setFinished(true)
      headlineDone.resolve()
      return
    }
    let alive = true
    const tweens = []
    const wait = (s) => new Promise((res) => tweens.push(gsap.delayedCall(s, res)))
    const to = (t, v) => new Promise((res) => tweens.push(gsap.to(t, { ...v, onComplete: res })))
    // the caret is the ::after of the span it currently follows, so moving it is a class swap
    // and typing never has to measure anything
    let at = pre.current
    const caretAfter = (el) => {
      at.classList.remove('typer-caret')
      el.classList.add('typer-caret')
      at = el
    }
    const blink = (on) => line.current.classList.toggle('typer-blink', on)
    const hideCaret = (off) => line.current.classList.toggle('typer-off', off)
    const type = async (el, str, speed = 1) => {
      blink(false)
      for (const ch of str) {
        if (!alive) return
        el.textContent += ch
        caretAfter(el)
        await wait((0.035 + Math.random() * 0.045) * speed)
      }
      blink(true)
    }
    // the mouse only shows up where there is one, and only while the hero is still in place
    const withPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const run = async () => {
      await document.fonts.ready
      // does the long version fit next to "Design trifft"? one measurement before anything is typed
      pre.current.textContent = `Design trifft ${FIRST}.`
      const first = line.current.offsetWidth <= line.current.closest('h1').clientWidth ? FIRST : FIRST_SHORT
      pre.current.textContent = ''
      badWord.current.textContent = first
      caretAfter(pre.current)
      await wait(0.5)

      // 1. the whole sentence, with the "wrong" word
      await type(pre.current, 'Design trifft ')
      await type(word.current, first)
      await type(post.current, '.')
      if (!alive) return
      // the correction is the hero's main moment, so it waits until the 3D object has finished
      // building (desktop only; phones have none). Capped, in case WebGL never comes up.
      if (window.matchMedia('(min-width: 1024px)').matches) await Promise.race([orbBuilt.promise, wait(3)])
      if (!alive) return
      // 1b. the editor flags the word: red squiggle, then the problem message below it
      await wait(0.35)
      word.current.style.textDecorationColor = SQUIGGLE
      await wait(0.3)
      if (!alive) return
      gsap.fromTo(lint.current, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.2 })
      await wait(1.5)
      gsap.to(lint.current, { opacity: 0, duration: 0.2 })

      // 2. pointer comes in, turns into an I-beam and drags over "Technik" only
      const r = word.current.getBoundingClientRect()
      const mouse = withPointer && window.scrollY < 40
      gsap.set(sel.current, { scaleX: 0, opacity: 1 })
      if (mouse) {
        gsap.set(ptr.current, { x: r.left + r.width * 0.5, y: window.innerHeight + 30, opacity: 0 })
        gsap.to(ptr.current, { opacity: 1, duration: 0.2 })
        await to(ptr.current, { x: r.left - 4, y: r.top + r.height * 0.55, duration: 0.75, ease: 'power3.inOut' })
        gsap.to(arrow.current, { opacity: 0, duration: 0.1 }); gsap.to(ibeam.current, { opacity: 1, duration: 0.1 })
        await wait(0.15)
      }
      if (!alive) return
      blink(false); hideCaret(true)
      gsap.to(sel.current, { scaleX: 1, duration: mouse ? 0.5 : 0.3, ease: 'power2.inOut' })
      if (mouse) {
        await to(ptr.current, { x: r.right + 1, duration: 0.5, ease: 'power2.inOut' })
        await wait(0.25)
        gsap.to(ptr.current, { opacity: 0, y: '+=30', duration: 0.35 })
      } else {
        await wait(0.5)
      }
      await wait(0.3)
      if (!alive) return

      // 3. delete the selection, the caret waits where the word was
      gsap.set(sel.current, { opacity: 0 })
      word.current.textContent = ''
      word.current.style.textDecorationColor = 'transparent'
      caretAfter(pre.current); hideCaret(false); blink(true)
      await wait(0.4)

      // 4. "Co" + autocomplete: popup, one step down to "Color", back up, Enter
      await type(word.current, 'Co')
      if (!alive) return
      const rows = popup.current.querySelectorAll('[data-row]')
      const hi = (n) => rows.forEach((row, k) => (row.style.background = k === n ? HI : 'transparent'))
      hi(0)
      await wait(0.08)
      gsap.fromTo(popup.current, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.15 })
      await wait(0.4); hi(1); await wait(0.3); hi(0); await wait(0.35)
      if (!alive) return
      gsap.to(popup.current, { opacity: 0, duration: 0.1 })
      word.current.textContent = 'Code'
      caretAfter(word.current)
      await wait(0.6)
      if (!alive) return

      // 5. settle: caret jumps to the end of the line and keeps blinking
      caretAfter(post.current)
      setFinished(true)
      headlineDone.resolve()
    }
    run()
    return () => { alive = false; tweens.forEach((t) => t.kill()) }
  }, [])

  return (
    <>
      <span className="sr-only">{FINAL}</span>
      <span aria-hidden ref={line} className="typer-blink relative inline-block whitespace-nowrap min-h-[1.06em] pr-[0.1em]">
        <span ref={pre} className="relative typer-caret" />
        <span className="relative inline-block">
          <span ref={sel} className="absolute -inset-x-[0.04em] top-[0.14em] bottom-[0.04em] rounded-[0.08em] origin-left" style={{ background: SEL, transform: 'scaleX(0)' }} />
          {/* wavy underline like an editor error; only coloured while "Technik" is flagged */}
          <span ref={word} className="relative transition-[text-decoration-color] duration-300"
            style={{ textDecorationLine: 'underline', textDecorationStyle: 'wavy', textDecorationColor: 'transparent', textDecorationThickness: '0.035em', textUnderlineOffset: '0.14em', textDecorationSkipInk: 'none' }} />
          {!finished && (
            <span ref={lint} className="absolute right-0 sm:right-auto sm:left-0 top-[108%] z-20 flex items-start gap-2 w-max max-w-[300px] whitespace-normal sm:whitespace-nowrap sm:max-w-none rounded-md border border-white/[0.1] bg-[#141417]/95 px-2.5 py-1.5 text-[12.5px] leading-normal tracking-normal font-normal text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,.6)] opacity-0 pointer-events-none" style={{ fontFamily: MONO }}>
              <span className="text-red-400">✕</span>
              <span>„<span ref={badWord}>{FIRST}</span>“ ist hier nicht definiert. <span className="text-zinc-500">Meintest du</span> <span className="text-indigo-300">„Code“</span>?</span>
            </span>
          )}
          {!finished && <span ref={popup} className="absolute left-0 top-[105%] z-20 w-[220px] rounded-md border border-white/[0.1] bg-[#141417]/95 py-1 text-[13px] leading-normal tracking-normal font-normal shadow-[0_10px_30px_rgba(0,0,0,.6)] opacity-0 pointer-events-none" style={{ fontFamily: MONO }}>
            {OPTIONS.map(([t, k], i) => (
              <span key={t} data-row={i} className="flex justify-between px-2.5 py-[3px] text-zinc-300">
                <span><span className="text-indigo-300">{t.slice(0, 2)}</span>{t.slice(2)}</span><span className="text-zinc-600 text-[11px]">{k}</span>
              </span>
            ))}
          </span>}
        </span>
        <span ref={post} className="relative" />
      </span>
      {/* pointer lives in the viewport so the headline's masks can't clip it */}
      {!finished && <span ref={ptr} aria-hidden className="fixed left-0 top-0 z-50 pointer-events-none opacity-0">
        <span ref={arrow} className="absolute left-0 top-0"><Arrow /></span>
        <span ref={ibeam} className="absolute -left-[6px] -top-[12px] opacity-0"><IBeam /></span>
      </span>}
    </>
  )
}
