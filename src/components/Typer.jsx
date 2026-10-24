import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from './motion'

// The hero's editor moment, kept short: a caret appears and writes a first draft (`draft`, e.g.
// "Apps."), pauses on it, selects it and deletes it — reconsidered; then types the first letters of
// the real word, an autocomplete list offers it, the suggestion is confirmed (↵) and the word
// completes. The caret blinks a couple of times and then disappears — the line ends at rest, fully
// readable. The selection is a quiet ink tint, not the signal colour.
// Screen readers (and reduced motion) get the finished word straight away.
//
// `play` is a counter: each change replays the sequence (the portfolio preview uses that); the
// hero plays it once on mount; `autoplay={false}` shows the finished word until asked. `onDone`
// fires when the word is complete.
export default function Typer({ word, typed, options, draft, play = 0, autoplay = true, delay = 0, popupClass = '', onDone }) {
  const line = useRef(), text = useRef(), popup = useRef()
  const [phase, setPhase] = useState('idle') // idle (no caret) | typing | done (caret blinks out)
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState(false)

  // layout effect: the line is cleared before the first paint, so the word never flashes
  useLayoutEffect(() => {
    const t = text.current
    // not (yet) asked to play, or reduced motion: just the finished word
    if (!autoplay || prefersReduced()) { t.textContent = word; setPhase('idle'); if (autoplay) onDone?.(); return }
    let alive = true
    const timers = []
    const wait = (s) => new Promise((r) => timers.push(gsap.delayedCall(s, r)))
    const rows = () => popup.current?.querySelectorAll('[data-row]') ?? []

    const run = async () => {
      t.textContent = ''
      setPhase('typing'); setActive(0); setSelected(false)
      gsap.set(popup.current, { autoAlpha: 0, y: -4 })
      await wait(delay)
      // 0. a first draft: written, looked at, selected, deleted
      if (draft) {
        for (const ch of draft) {
          if (!alive) return
          t.textContent += ch
          await wait(0.08 + (ch.charCodeAt(0) % 3) * 0.035)
        }
        await wait(0.7); if (!alive) return
        setSelected(true)
        await wait(0.5); if (!alive) return
        t.textContent = ''; setSelected(false)
        await wait(0.35)
      }
      // 1. type the first letters, a little uneven like a person
      for (const ch of typed) {
        if (!alive) return
        t.textContent += ch
        await wait(0.07 + (ch.charCodeAt(0) % 3) * 0.03)
      }
      if (!alive) return
      // 2. the suggestion list opens under the word, the match highlighted
      gsap.to(popup.current, { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power2.out' })
      gsap.fromTo(rows(), { opacity: 0, x: -4 }, { opacity: 1, x: 0, duration: 0.2, stagger: 0.04, ease: 'power2.out' })
      await wait(0.55)
      if (!alive) return
      // 3. confirmed: the row flashes once, the list closes, the word completes
      setActive(-1); await wait(0.08); setActive(0); await wait(0.12)
      gsap.to(popup.current, { autoAlpha: 0, duration: 0.12 })
      t.textContent = word
      await wait(0.1)
      if (!alive) return
      setPhase('done')
      onDone?.()
    }
    run()
    return () => { alive = false; timers.forEach((d) => d.kill()); gsap.killTweensOf([popup.current, ...rows()]) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play])

  return (
    <>
      <span className="sr-only">{word}</span>
      {/* phase 'done' starts the caret's last blinks and fade (.typer-rest) */}
      {/* the typed text is its own .glow element: a parent's background-clip doesn't repaint text
          typed into the DOM, so it gets the pointer glow itself — positioned on its own box, which
          useGlowPointer measures on every move, so it sits right at any length of the word */}
      <span aria-hidden ref={line} className={`relative inline-block whitespace-nowrap text-ink ${phase === 'done' ? 'typer-rest' : ''}`} style={{ color: 'var(--ink)' }}>
        <span ref={text} className={`glow ${phase === 'idle' ? '' : 'typer-caret'} ${selected ? 'typer-sel' : ''}`}>{word}</span>
        <span ref={popup} className={`absolute left-0 top-[100%] z-20 min-w-[13rem] rounded-[4px] border border-line bg-raised py-1 font-mono text-[13px] leading-normal tracking-normal font-normal text-muted shadow-[0_12px_32px_rgba(0,0,0,.5)] invisible ${popupClass}`}>
          {options.map(([label, kind], i) => (
            <span key={label} data-row className={`flex items-center justify-between gap-6 px-3 py-[3px] transition-colors duration-100 ${i === active ? 'bg-signal/15 text-ink' : ''}`}>
              <span><span className="text-signal">{label.slice(0, typed.length)}</span>{label.slice(typed.length)}</span>
              <span className="text-[11px] text-faint">{i === 0 ? '↵' : kind}</span>
            </span>
          ))}
        </span>
      </span>
    </>
  )
}
