import { useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)
// layouts differ per project (not every one has callouts or a cover): a missing target is expected
gsap.config({ nullTargetWarn: false })

// ── Motion language ─────────────────────────────────────────────
// Things arrive (expo.out), travel between states (power3.inOut) or answer (power2.out). Text
// rises out of masks; panels open from an edge; numbers count. Nothing loops but what is live.
export const EASE = { out: 'expo.out', inOut: 'power3.inOut', soft: 'power2.out' }
export const DUR = { fast: 0.16, move: 0.42, reveal: 0.9 }

export const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

// Runs `setup` inside a gsap.context scoped to `ref`, only when motion is allowed; everything it
// creates is reverted on unmount. `setup` may return a cleanup for anything else.
export function useMotion(ref, setup, deps = []) {
  useIso(() => {
    if (!ref.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let extra
      const ctx = gsap.context(() => { extra = setup(ref.current) }, ref)
      return () => { extra?.(); ctx.revert() }
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// A heading rises line by line out of masks once it scrolls in; split only after the web fonts are
// in (a later swap would change the line breaks), reverted afterwards so it is plain text again.
export function riseLines(heading, { trigger = heading, start = 'top 85%', delay = 0 } = {}) {
  let split, tl, alive = true
  document.fonts.ready.then(() => {
    if (!alive) return
    split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'pb-[0.12em] -mb-[0.12em]' })
    tl = gsap.timeline({ delay, scrollTrigger: trigger === false ? undefined : { trigger, start, once: true }, onComplete: () => split.revert() })
      .from(split.lines, { yPercent: 115, duration: 1.1, stagger: 0.09, ease: EASE.out })
  })
  return () => { alive = false; tl?.kill(); split?.revert() }
}

export { gsap, ScrollTrigger, SplitText }
