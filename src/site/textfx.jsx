import { gsap, prefersReduced } from '../lib/motion'

// The site's two ways of bringing type in.
//
// Large words arrive letter by letter: each one rises out of a blur and turns upright, one after
// the other — <Chars> splits them (the whole word stays readable to screen readers).
//
// Small type decodes: the label is there at once, but as noise — each character cycles through
// signs until it settles, left to right, as if the line were being received (scramble).

export function Chars({ text, className = '' }) {
  return (
    <span aria-label={text} role="text" className={className}>
      {[...text].map((c, i) => <span key={i} aria-hidden data-ch className="inline-block whitespace-pre will-change-transform">{c}</span>)}
    </span>
  )
}

export function riseChars(root, { delay = 0, from = 'start' } = {}) {
  const chars = root.querySelectorAll('[data-ch]')
  if (prefersReduced()) return gsap.set(chars, { opacity: 1 })
  return gsap.fromTo(chars,
    { opacity: 0, yPercent: 70, rotationX: -70, filter: 'blur(10px)', transformPerspective: 400 },
    { opacity: 1, yPercent: 0, rotationX: 0, filter: 'blur(0px)', duration: 1.1, delay, ease: 'expo.out', stagger: { each: 0.035, from }, clearProps: 'filter,transform' })
}

const SIGNS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>·:'
export function scramble(el, { duration = 0.9, delay = 0 } = {}) {
  const final = el.dataset.text ?? (el.dataset.text = el.textContent)
  // write into the one text node itself, so React can still update it afterwards
  const node = el.childNodes.length === 1 && el.firstChild.nodeType === 3 ? el.firstChild : null
  const put = (t) => { if (node) node.nodeValue = t; else el.textContent = t }
  if (prefersReduced()) { put(final); return }
  const state = { p: 0 }
  return gsap.to(state, {
    p: 1, duration: duration + final.length * 0.012, delay, ease: 'none',
    onStart: () => { el.setAttribute('aria-label', final); put(''); el.style.opacity = '1' },
    onUpdate: () => {
      let out = ''
      for (let i = 0; i < final.length; i++) {
        const c = final[i]
        // each character settles when the wave has passed it; before, a random sign (spaces stay)
        out += c === ' ' || state.p > (i / final.length) * 0.75 + 0.25 ? c : state.p > (i / final.length) * 0.75 - 0.05 ? SIGNS[(Math.random() * SIGNS.length) | 0] : ' '
      }
      put(out)
    },
    onComplete: () => put(final),
  })
}
