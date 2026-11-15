import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, prefersReduced } from './motion'

// Smooth scrolling for wheel and trackpad alike. Lenis takes the wheel's deltas and eases the page
// towards them on GSAP's own ticker, so every ScrollTrigger (pins, scrubs) reads the same smoothed
// position in the same frame — no second clock, no drift between the scroll and its animations.
// Touch keeps the device's native scrolling (it is already smooth there); with reduced motion
// there is no smoothing at all.
export let lenis = null

export function startSmoothScroll() {
  if (lenis || prefersReduced()) return
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

// the page can be held still (the boot, an open sheet, the hero's own scene) and let go again; each
// holder lets go of its own hold only, so one can't release the page while another still holds it
const holds = new Set()
export const holdScroll = (on, who = 'page') => {
  on ? holds.add(who) : holds.delete(who)
  if (lenis) holds.size ? lenis.stop() : lenis.start()
}
export const scrollHeld = () => holds.size > 0

// a hold that a jump may break (the hero's scene): a nav link or a deep link finishes it first
let breaker = null
export const onJump = (fn) => { breaker = fn; return () => { if (breaker === fn) breaker = null } }

// scroll to an element or a position — eased through Lenis when it runs, natively otherwise
export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (target !== 0) breaker?.()
  if (lenis) return lenis.scrollTo(target, { offset, immediate, duration: 1.4, easing: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2) })
  if (typeof target === 'number') return window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' })
  target?.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth' })
}
