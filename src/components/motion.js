import { useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ── Motion language ─────────────────────────────────────────────
// Three speeds and three curves for the whole site. Everything that belongs together runs in one
// timeline; nothing loops forever; scroll only drives what tells something (the Werdegang).
export const DUR = { fast: 0.16, move: 0.42, reveal: 0.8 }
export const EASE = {
  out: 'expo.out',        // things arriving: lines, panels, layers
  inOut: 'power3.inOut',  // things travelling between two states
  soft: 'power2.out',     // small feedback: hover, focus
}
export const STAGGER = 0.06

export const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// Runs `setup` inside a gsap.context scoped to `ref`, only when motion is allowed; everything it
// creates (tweens, timelines, ScrollTriggers, SplitTexts) is reverted on unmount or dep change.
// `setup` may return a cleanup for anything else (listeners).
// `idle`: for what is not on screen at load — the setup (splitting, from() states, triggers: each
// reads computed styles) waits for an idle moment instead of running while the hero animates.
const onIdle = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200))
const offIdle = (id) => (window.cancelIdleCallback ? cancelIdleCallback(id) : clearTimeout(id))
export function useMotion(ref, setup, deps = [], { idle = false } = {}) {
  useIsoLayoutEffect(() => {
    if (!ref.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let extra, ctx, id
      const run = () => { if (ref.current) ctx = gsap.context(() => { extra = setup(ref.current) }, ref) }
      if (idle) id = onIdle(run); else run()
      return () => { offIdle(id); extra?.(); ctx?.revert() }
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger, SplitText }
