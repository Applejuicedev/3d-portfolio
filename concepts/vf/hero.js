// The opening composition. Two scales at once: the sentence in small, plain type, scattered through
// the empty desk — and my name, enormous and quiet, cut off by the bottom edge, nearly the colour of
// the ground so the surface reads through it. It is fitted to the width of the screen. It answers the
// pointer letter by letter: the letters nearest to it gather a little weight and rise a touch; the
// far ones stay light. The small groups of words hang at different depths and drift against the
// pointer (parallax), and lean a little toward it when it comes close.
const still = matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches

// the name
const word = document.createElement('div')
word.id = 'dune'; word.setAttribute('aria-hidden', 'true')
word.innerHTML = [...'FIDANLI'].map((c) => `<span>${c}</span>`).join('')
// beside the desk, not in it: the desk is its own layer, and the name has to blend with the surface
document.getElementById('desk').before(word)
const W0 = 300 // weight at rest
const letters = [...word.children].map((el) => ({ el, w: W0, y: 0 }))
letters.forEach((l) => (l.el.style.fontWeight = W0))

// fit, measured on the ink, not on the letter boxes (an F starts a little inside its box, an I ends a
// little inside its own): the F stands exactly as far from the left edge as the I from the right one —
// the same distance as the mark in the corner — and the line sits on the bottom edge low enough to be
// cut, high enough that the foot of the L still reads. (At rest; once the face is in.)
const pen = document.createElement('canvas').getContext('2d')
function fit() {
  const MARGIN = 24, W = innerWidth
  const ink = () => {
    const size = parseFloat(word.style.getPropertyValue('--size')), cs = getComputedStyle(letters[0].el)
    pen.font = `${W0} ${size}px ${cs.fontFamily}`
    const F = pen.measureText('F'), I = pen.measureText('I'), first = letters[0].el.getBoundingClientRect(), last = letters.at(-1).el.getBoundingClientRect()
    const asc = F.fontBoundingBoxAscent ?? size * 0.95, desc = F.fontBoundingBoxDescent ?? size * 0.25
    return { size, left: first.left - F.actualBoundingBoxLeft, right: last.left + I.actualBoundingBoxRight,
      baseline: first.top + (first.height - (asc + desc)) / 2 + asc }
  }
  word.style.setProperty('--dx', '0px'); word.style.setProperty('--dy', '0px'); word.style.setProperty('--size', '100px')
  let m = ink()
  word.style.setProperty('--size', Math.min((100 * (W - 2 * MARGIN)) / (m.right - m.left), innerHeight * 0.62).toFixed(1) + 'px')
  m = ink()
  word.style.setProperty('--dx', (((W - m.right) - m.left) / 2).toFixed(1) + 'px')
  word.style.setProperty('--dy', (innerHeight + m.size * 0.012 - m.baseline).toFixed(1) + 'px')
}
document.fonts.ready.then(fit); addEventListener('resize', fit); fit()

// the groups of words, each at its own depth
const frags = [...document.querySelectorAll('#sentence .frag')].map((el, i) => ({ el, depth: [0.6, 1, 0.35, 0.8, 0.5, 0.9][i % 6], x: 0, y: 0 }))

let px = innerWidth / 2, py = innerHeight / 2, active = false
addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; px = e.clientX; py = e.clientY; active = true }, { passive: true })
document.addEventListener('pointerout', (e) => { if (!e.relatedTarget) active = false })

function frame() {
  const W = innerWidth, H = innerHeight
  // letters: weight and lift by horizontal nearness (and a little by height: the closer to the
  // bottom the pointer is, the more the name responds)
  const reach = active ? 0.35 + 0.65 * Math.min(1, py / H) : 0
  letters.forEach((l) => {
    const r = l.el.getBoundingClientRect(), cx = r.left + r.width / 2
    const near = Math.max(0, 1 - Math.abs(px - cx) / (W * 0.2)) ** 1.5 * reach
    const wantW = W0 + near * 200, wantY = -near * 12
    l.w += (wantW - l.w) * 0.06; l.y += (wantY - l.y) * 0.06
    l.el.style.fontWeight = Math.round(l.w); l.el.style.transform = `translateY(${l.y.toFixed(2)}px)`
  })
  // groups: parallax against the pointer, and a slight lean toward it when near
  const nx = active ? px / W - 0.5 : 0, ny = active ? py / H - 0.5 : 0
  frags.forEach((f) => {
    const r = f.el.getBoundingClientRect(), cx = r.left + r.width / 2 - f.x, cy = r.top + r.height / 2 - f.y
    const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy), pull = active && d < 140 ? (1 - d / 140) * 7 : 0
    const wantX = -nx * 14 * f.depth + (dx / (d || 1)) * pull, wantY = -ny * 10 * f.depth + (dy / (d || 1)) * pull
    f.x += (wantX - f.x) * 0.07; f.y += (wantY - f.y) * 0.07
    f.el.style.transform = `translate(${f.x.toFixed(2)}px, ${f.y.toFixed(2)}px)`
  })
  requestAnimationFrame(frame)
}
if (!still && fine) requestAnimationFrame(frame)
