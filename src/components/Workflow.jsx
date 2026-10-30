import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from './motion'
import { stage, bustReady } from './hero/stage'

// ── The hero at work: idea → design → code → 3D ─────────────────
// After the headline has set, a pointer keeps working on it, the way the page itself was made:
//   1 text    it mistypes "digitale", autocorrect offers the fix, it takes it; it drags
//             "entwickle" in front of "gestalte", reads it, and undoes the swap (⌘Z)
//   2 design  it selects the last line as a Figma text layer — frame, handles, size — drags it off
//             the left edge (live distance), and lets it snap back onto the smart guide shared
//             with the lines above (align left)
//   3 code    the frame turns into the editor holding that same headline as JSX; the line with
//             the typed word is written, then the build runs in the terminal
//   4 3D      it moves to the bust, selects it (Blender's orange outline, origin, gizmo,
//             outliner), turns it on Z with the rotate tool (the value counts live) and changes its
//             material colour — the bust really turns and re-colours (hero/stage.js)
//   5 rest    everything it brought fades back out; the headline stands alone again
// Every overlay is placed from the measured positions of what it refers to, so it fits at any
// window size. One sequence of awaited tweens with a shared abort flag: unmounting stops it and
// restores the text. With motion only (decorative: aria-hidden; the headline's real text is
// untouched for assistive tech). Runs once, then again after 40 s while the hero is in view.
// Below lg the same story, fitted to a phone: a fingertip instead of the mouse pointer, every
// panel kept inside the screen, a narrower editor with shorter JSX, the 3D panels slimmer and
// beside the bust where it stands there (under the headline).

const FIGMA = '#0d99ff', GUIDE = '#f24822'
const AX = { x: '#ff3352', y: '#8bdc00', z: '#2890ff' }
const CODE = [
  [['<', 'p'], ['h1', 'k'], [' className', 'a'], ['=', 'p'], ['"t-display"', 's'], ['>', 'p']],
  [['  Ich ', 't'], ['<', 'p'], ['span', 'k'], [' className', 'a'], ['=', 'p'], ['"glow"', 's'], ['>', 'p'], ['gestalte', 't'], ['</', 'p'], ['span', 'k'], ['>', 'p'], [' und', 't']],
  [['  ', 't'], ['<', 'p'], ['span', 'k'], [' className', 'a'], ['=', 'p'], ['"glow"', 's'], ['>', 'p'], ['entwickle', 't'], ['</', 'p'], ['span', 'k'], ['>', 'p'], [' digitale', 't']],
  [['  ', 't'], ['<', 'p'], ['Typer', 'c'], [' word', 'a'], ['=', 'p'], ['"Anwendungen."', 's'], [' typed', 'a'], ['=', 'p'], ['"Anw"', 's'], [' />', 'p']],
  [['</', 'p'], ['h1', 'k'], ['>', 'p']],
]
// below lg: the same headline, without the classNames, so the lines fit a phone's width
const CODE_SM = [
  [['<', 'p'], ['h1', 'k'], ['>', 'p']],
  [['  Ich ', 't'], ['<', 'p'], ['span', 'k'], ['>', 'p'], ['gestalte', 't'], ['</', 'p'], ['span', 'k'], ['>', 'p'], [' und', 't']],
  [['  ', 't'], ['<', 'p'], ['span', 'k'], ['>', 'p'], ['entwickle', 't'], ['</', 'p'], ['span', 'k'], ['>', 'p'], [' digitale', 't']],
  [['  ', 't'], ['<', 'p'], ['Typer', 'c'], [' word', 'a'], ['=', 'p'], ['"Anwendungen."', 's'], [' />', 'p']],
  [['</', 'p'], ['h1', 'k'], ['>', 'p']],
]
const TONE = { p: 'text-faint', k: 'text-[#c8a7ff]', a: 'text-[#8fd3ff]', s: 'text-[#ffb77a]', t: 'text-[#c9c7bf]', c: 'text-[#7fd6b8]' }

export default function Workflow({ rootRef, start }) {
  const L = useRef({}) // overlay elements by name
  const set = (name) => (el) => { L.current[name] = el }
  const [small] = useState(() => !window.matchMedia('(min-width: 1024px)').matches)

  useEffect(() => {
    if (!start || prefersReduced()) return
    const root = rootRef.current, $ = L.current
    const rootW = root.getBoundingClientRect().width
    // below lg: keeps a panel of width w inside the hero (8 px from either edge)
    const fit = (x, w) => (small ? Math.max(8, Math.min(x, rootW - w - 8)) : x)
    let alive = true, timer
    const tweens = []
    const h1 = root.querySelector('h1')
    const word = (w) => root.querySelector(`[data-word="${w}"]`)
    const rel = (el) => { const a = el.getBoundingClientRect(), b = root.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height } }
    const fromClient = (p) => { const b = root.getBoundingClientRect(); return { x: p.x - b.left, y: p.y - b.top } }
    const tw = (t, v) => new Promise((res) => { tweens.push(gsap.to(t, { ...v, onComplete: res })) })
    const wait = (s) => new Promise((res) => { timer = gsap.delayedCall(s, res) })
    const ok = () => alive && window.scrollY < window.innerHeight * 0.5
    // the demo pointer, and where the bust should look while it acts
    const ptr = $.ptr
    // the arrow's tip (desktop), the fingertip's centre (below lg)
    const syncDemo = () => { const r = ptr.getBoundingClientRect(); stage.demo = small ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: r.left + 3, y: r.top + 2 } }
    const moveTo = (x, y, d = 0.75, ease = 'power3.inOut') => tw(ptr, { x, y, duration: d, ease, onUpdate: syncDemo })
    const click = async () => {
      gsap.fromTo($.ripple, { x: gsap.getProperty(ptr, 'x') - 12, y: gsap.getProperty(ptr, 'y') - 12, scale: 0.3, autoAlpha: 0.9 }, { scale: 1.4, autoAlpha: 0, duration: 0.45, ease: 'power2.out' })
      await tw(ptr, { scale: 0.86, duration: 0.07, yoyo: true, repeat: 1 })
    }
    // fade in with a small offset relative to where the element was placed (x/y are positions here)
    const show = (el, from = { y: 6 }) => {
      const to = {}, at = { autoAlpha: 0 }
      for (const [k, v] of Object.entries(from)) {
        if (k === 'scale') { at.scale = v; to.scale = 1 } else { const cur = gsap.getProperty(el, k); at[k] = cur + v; to[k] = cur }
      }
      return tw(el, { ...to, autoAlpha: 1, duration: 0.3, ease: 'power2.out', startAt: at })
    }
    const hide = (el, d = 0.25) => tw(el, { autoAlpha: 0, duration: d, ease: 'power1.out' })
    const place = (el, r) => gsap.set(el, { x: r.x, y: r.y, width: r.w, height: r.h })
    const type = async (el, text, ms = 0.07) => { for (const ch of text) { if (!alive) return; el.textContent += ch; await wait(ms + (ch.charCodeAt(0) % 3) * 0.02) } }

    // the text is only changed while the sequence runs, and always restored
    const original = new Map()
    const remember = (el) => { if (!original.has(el)) original.set(el, el.textContent) }
    const restore = () => {
      original.forEach((t, el) => { el.textContent = t; el.classList.remove('spell', 'typer-caret') })
      root.querySelectorAll('[data-word], [data-w]').forEach((el) => gsap.set(el, { clearProps: 'transform' }))
      gsap.set(root.querySelector('[data-word="anwendungen"] > [aria-hidden]'), { clearProps: 'transform' })
    }

    // ── 1 text ──
    const textPhase = async () => {
      const dig = word('digitale'); remember(dig)
      let r = rel(dig)
      gsap.set(ptr, { x: small ? rootW * 0.8 : r.x + r.w + 140, y: r.y + r.h + 90, autoAlpha: 0, scale: 1 })
      await tw(ptr, { autoAlpha: 1, duration: 0.3 })
      await moveTo(r.x + r.w * 0.55, r.y + r.h * 0.62, 0.9)
      await click(); await click()
      place($.sel, r); await show($.sel, { scale: 0.98 })
      await wait(0.3); if (!ok()) return false
      // retyped — with a typo
      dig.textContent = ''; gsap.set($.sel, { autoAlpha: 0 }); dig.classList.add('typer-caret')
      await type(dig, 'digitlae', 0.075)
      await wait(0.25); dig.classList.add('spell')
      await wait(0.45); if (!ok()) return false
      // autocorrect: the suggestion list hangs under the word
      r = rel(dig)
      gsap.set($.suggest, { x: fit(r.x, $.suggest.offsetWidth), y: r.y + r.h + 8 })
      await show($.suggest)
      const first = $.suggest.querySelector('[data-opt]'), fr = rel(first)
      await moveTo(fr.x + 40, fr.y + fr.h / 2, 0.55)
      first.classList.add('bg-signal/15', 'text-ink')
      await click()
      dig.classList.remove('spell', 'typer-caret'); dig.textContent = 'digitale'
      await hide($.suggest, 0.18); first.classList.remove('bg-signal/15', 'text-ink')
      await wait(0.5); if (!ok()) return false

      // rearranged: "entwickle" in front of "gestalte" — then undone
      const A = word('gestalte'), B = word('entwickle'), und = root.querySelector('[data-w="und"]')
      const ra = rel(A), rb = rel(B), d = rb.w - ra.w
      await moveTo(rb.x + rb.w * 0.5, rb.y + rb.h * 0.6, 0.7)
      await tw(ptr, { scale: 0.86, duration: 0.08 })
      gsap.to(B, { scale: 1.04, duration: 0.15 })
      // the insertion caret at the drop target
      gsap.set($.insert, { x: ra.x - 3, y: ra.y + ra.h * 0.12, height: ra.h * 0.76 })
      gsap.to($.insert, { autoAlpha: 1, duration: 0.15, delay: 0.25 })
      const dx = ra.x - rb.x, dy = ra.y - rb.y
      // while it travels, the others make room: gestalte drops into line 2, und and digitale shift
      // by the width difference — so the two words never sit on top of each other
      await Promise.all([
        moveTo(ra.x + rb.w * 0.5, ra.y + ra.h * 0.6, 0.85),
        tw(B, { x: dx, y: dy, duration: 0.85, ease: 'power3.inOut' }),
        tw(A, { x: rb.x - ra.x, y: rb.y - ra.y, duration: 0.7, delay: 0.12, ease: 'power3.inOut' }),
        tw(und, { x: d, duration: 0.6, delay: 0.25, ease: 'power3.inOut' }),
        tw(dig, { x: -d, duration: 0.6, delay: 0.25, ease: 'power3.inOut' }),
      ])
      gsap.set($.insert, { autoAlpha: 0 })
      await Promise.all([tw(ptr, { scale: 1, duration: 0.08 }), tw(B, { scale: 1, duration: 0.2 })])
      await wait(0.7); if (!ok()) return false
      // ⌘Z
      const pr = { x: gsap.getProperty(ptr, 'x'), y: gsap.getProperty(ptr, 'y') }
      gsap.set($.undo, { x: fit(pr.x + 18, $.undo.offsetWidth), y: pr.y + 20 })
      await show($.undo)
      await wait(0.35)
      await Promise.all([
        tw([A, B, und, dig], { x: 0, y: 0, duration: 0.6, ease: 'power3.inOut' }),
        moveTo(rb.x + rb.w * 0.6, rb.y + rb.h * 1.1, 0.6),
      ])
      await hide($.undo)
      root.querySelectorAll('[data-word], [data-w]').forEach((el) => gsap.set(el, { clearProps: 'transform' }))
      await wait(0.25)
      return ok()
    }

    // ── 2 design ──
    const designPhase = async () => {
      const line = root.querySelector('[data-word="anwendungen"] > [aria-hidden]')
      const r = rel(line), hr = rel(h1)
      await moveTo(r.x + r.w * 0.45, r.y + r.h * 0.55, 0.7)
      await click()
      const pad = 2
      place($.frame, { x: r.x - pad, y: r.y - pad, w: r.w + pad * 2, h: r.h + pad * 2 })
      gsap.set($.frame, { borderColor: FIGMA, backgroundColor: 'rgba(13,153,255,0)' })
      $.size.textContent = `${Math.round(r.w)} × ${Math.round(r.h)}`
      gsap.set($.handles, { autoAlpha: 1 })
      // beside the layer, never over the line above; below lg there is no room beside it: under it
      gsap.set($.align, small ? { x: r.x, y: r.y + r.h + 34 } : { x: r.x + r.w + 18, y: r.y + r.h / 2 - 16 })
      await Promise.all([show($.frame, { scale: 0.985 }), show($.align)])
      await wait(0.35); if (!ok()) return false
      // drag off the left edge: the distance to the other lines' edge counts live
      const drag = { dx: 0 }
      const follow = () => {
        gsap.set([line, $.frame], { x: (i, el) => (el === line ? drag.dx : r.x - pad + drag.dx) })
        gsap.set($.measure, { x: hr.x, y: r.y + r.h / 2, width: Math.max(0, drag.dx) })
        $.measureLabel.textContent = Math.round(drag.dx)
      }
      gsap.set($.measure, { autoAlpha: 1 })
      await Promise.all([
        tw(drag, { dx: small ? 40 : 64, duration: 0.9, ease: 'power2.inOut', onUpdate: follow }),
        moveTo(r.x + r.w * 0.45 + (small ? 40 : 64), r.y + r.h * 0.55, 0.9, 'power2.inOut'),
      ])
      await wait(0.35)
      await Promise.all([
        tw(drag, { dx: 9, duration: 0.6, ease: 'power2.inOut', onUpdate: follow }),
        moveTo(r.x + r.w * 0.45 + 9, r.y + r.h * 0.55, 0.6, 'power2.inOut'),
      ])
      // within reach of the guide: it appears along all three lines and the layer snaps onto it
      const top = rel(root.querySelector('[data-line]'))
      gsap.set($.guide, { x: hr.x, y: top.y - 10, height: r.y + r.h - top.y + 20 })
      gsap.set($.measure, { autoAlpha: 0 })
      gsap.to($.guide, { autoAlpha: 1, duration: 0.12 })
      $.align.querySelector('[data-al="left"]').classList.add('bg-white/15')
      await Promise.all([
        tw(drag, { dx: 0, duration: 0.22, ease: 'power4.out', onUpdate: follow }),
        moveTo(r.x + r.w * 0.45, r.y + r.h * 0.55, 0.22, 'power4.out'),
      ])
      await wait(0.6)
      gsap.to($.guide, { autoAlpha: 0, duration: 0.3 })
      $.align.querySelector('[data-al="left"]').classList.remove('bg-white/15')
      await wait(0.3)
      return ok()
    }

    // ── 3 code ──
    const codePhase = async () => {
      const hr = rel(h1), base = rel(root.querySelector('[data-base]'))
      // the editor opens under the headline; if the window is short it may overlap the base row,
      // which steps back meanwhile
      // below lg the editor takes the content width, without the explorer (shorter JSX, CODE_SM)
      const w = small ? hr.w : Math.min(600, hr.w * 0.86), h = small ? 196 : 236
      const y = Math.min(hr.y + hr.h + 26, base.y + base.h - h)
      const target = { x: hr.x, y, width: w, height: h }
      hide($.align, 0.2); gsap.set($.handles, { autoAlpha: 0 }); $.size.textContent = ''
      if (y + h > base.y) gsap.to(root.querySelector('[data-base]'), { autoAlpha: 0.12, duration: 0.3 })
      // the selection frame turns into the editor window
      await tw($.frame, { ...target, borderColor: 'rgba(255,255,255,0.10)', backgroundColor: 'rgba(22,22,21,0.96)', borderRadius: 6, duration: 0.7, ease: 'power3.inOut' })
      const lines = [...$.code.querySelectorAll('[data-code]')]
      gsap.set(lines, { autoAlpha: 0 })
      gsap.set($.ide, { x: target.x, y: target.y, width: w, height: h })
      await show($.ide, { y: 4 })
      // the JSX of the headline: the surrounding lines appear, the Typer line is written
      for (let i = 0; i < lines.length; i++) {
        if (!alive) return false
        if (i === 3) {
          const t = lines[3].querySelector('[data-typed]')
          const full = t.dataset.typed
          t.textContent = ''
          gsap.set(lines[3], { autoAlpha: 1 })
          const lr = rel(lines[3])
          await moveTo(lr.x + 30, lr.y + lr.h * 0.7, 0.4)
          $.caretLine.style.display = 'inline-block'
          await type(t, full, 0.03)
          $.caretLine.style.display = 'none'
        } else {
          await tw(lines[i], { autoAlpha: 1, duration: 0.14 })
        }
      }
      $.status.textContent = 'Ln 4, Col 44'
      await wait(0.3)
      // the build, in the terminal
      const term = $.term
      term.querySelectorAll('[data-out]').forEach((o) => gsap.set(o, { autoAlpha: 0 }))
      const cmd = term.querySelector('[data-cmd]'); cmd.textContent = ''
      const tr = rel(term)
      await moveTo(tr.x + 60, tr.y + 10, 0.45)
      await type(cmd, 'npm run build', 0.045)
      for (const o of term.querySelectorAll('[data-out]')) { await wait(0.28); gsap.to(o, { autoAlpha: 1, duration: 0.15 }) }
      $.status.textContent = '✓ 0 Probleme'
      await wait(0.9)
      await Promise.all([hide($.ide, 0.3), hide($.frame, 0.3)])
      gsap.set($.frame, { borderRadius: 0 })
      gsap.to(root.querySelector('[data-base]'), { autoAlpha: 1, duration: 0.4 })
      return ok()
    }

    // ── 4 3D ──
    const modelPhase = async () => {
      const okReady = await Promise.race([bustReady.then(() => true), wait(1).then(() => stage.ready)])
      if (!okReady || !stage.screen) return true
      // the overlays follow the bust's real screen position every frame while this phase runs
      const tick = () => {
        const s = stage.screen; if (!s) return
        const o = fromClient(s.origin)
        gsap.set($.origin, { x: o.x - 5, y: o.y - 5 })
        for (const k of ['x', 'y', 'z']) {
          const a = fromClient(s.axes[k])
          const ln = $.gizmo.querySelector(`[data-ax="${k}"]`), cap = $.gizmo.querySelector(`[data-cap="${k}"]`)
          ln.setAttribute('x1', o.x); ln.setAttribute('y1', o.y); ln.setAttribute('x2', a.x); ln.setAttribute('y2', a.y)
          cap.setAttribute('cx', a.x); cap.setAttribute('cy', a.y)
        }
        $.rotZ.textContent = `${((stage.yaw * 180) / Math.PI).toFixed(1)}°`
      }
      gsap.ticker.add(tick); cleanups.push(() => gsap.ticker.remove(tick))
      const s0 = stage.screen
      const o = fromClient(s0.origin), headY = fromClient({ x: 0, y: s0.box.t }).y
      const bh = fromClient({ x: 0, y: s0.box.b }).y - headY // the bust's height on screen
      // panels around the head, kept inside the hero: tools on its left, outliner and properties
      // on its right (Blender's own sides). Below lg the bust fills the width: the tools stand at
      // the left edge, the properties (slimmer) at the right beside the neck, no outliner
      const py = Math.max(84, headY + 20)
      if (small) {
        gsap.set($.tools, { x: 8, y: headY + bh * 0.08 })
        gsap.set($.props, { x: rootW - $.props.offsetWidth - 8, y: headY + bh * 0.42 })
      } else {
        gsap.set($.tools, { x: o.x - 250, y: py + 60 })
        gsap.set($.outliner, { x: Math.min(o.x + 250, rootW - 214), y: py })
        gsap.set($.props, { x: Math.min(o.x + 250, rootW - 214), y: py + 108 })
      }
      // to the head, select it
      await moveTo(o.x + 10, small ? headY + bh * 0.2 : o.y - 160, 1.0)
      await click()
      tw(stage, { select: 1, duration: 0.35, ease: 'power2.out' })
      gsap.set($.gizmo, { autoAlpha: 0 }); tick()
      await Promise.all([show($.origin, { scale: 0.5 }), show($.gizmo, { scale: 1 }), show($.tools, { x: -8 }), small ? null : show($.outliner, { x: 8 })])
      await show($.props, { x: 8 })
      await wait(0.3); if (!ok()) return false
      // the rotate tool
      const rot = $.tools.querySelector('[data-tool="rotate"]'), rr = rel(rot)
      await moveTo(rr.x + rr.w / 2, rr.y + rr.h / 2, 0.6)
      await click()
      $.tools.querySelectorAll('[data-tool]').forEach((t) => t.classList.toggle('bg-[#4772b3]', t === rot))
      $.mode.textContent = 'Drehen · Z'
      // and an arc around the bust: it turns with the pointer, the value counts
      const arc = small ? 0.6 : 1
      await moveTo(o.x + 120 * arc, o.y - 60 * arc, 0.5)
      await Promise.all([
        tw(stage, { yaw: 0.62, duration: 1.4, ease: 'power2.inOut' }),
        tw(ptr, { x: o.x - 100 * arc, y: o.y - 90 * arc, duration: 1.4, ease: 'power2.inOut', onUpdate: syncDemo }),
      ])
      await wait(0.3); if (!ok()) return false
      // material colour
      const sw = $.props.querySelector('[data-swatch]'), sr = rel(sw)
      await moveTo(sr.x + sr.w / 2, sr.y + sr.h / 2, 0.7)
      await click()
      gsap.to(sw, { backgroundColor: '#ff5b1f', duration: 0.4 })
      $.colorHex.textContent = 'FF5B1F'
      await tw(stage, { tint: 1, duration: 0.9, ease: 'power2.inOut' })
      await wait(1.1)
      return ok()
    }

    // ── 5 rest ──
    const cleanups = []
    const rest = async () => {
      gsap.to(stage, { select: 0, duration: 0.4 })
      gsap.to(stage, { yaw: 0, tint: 0, duration: 1.4, ease: 'power2.inOut', delay: 0.3 })
      const out = [$.props, $.outliner, $.tools, $.gizmo, $.origin, $.sel, $.suggest, $.undo, $.frame, $.ide, $.align, $.guide, $.measure, $.insert, ...($.handles?.length !== undefined ? $.handles : [$.handles])].filter(Boolean)
      // a phase cut short (scrolled away) may still be fading its pieces in — stop that first, or
      // those tweens win over the fade-out and leave the frame, handles and rulers standing
      tweens.splice(0).forEach((t) => t.kill()); gsap.killTweensOf(out)
      gsap.to(out, { autoAlpha: 0, duration: 0.3, stagger: 0.05 })
      gsap.to(root.querySelector('[data-base]'), { autoAlpha: 1, duration: 0.3 })
      const sw = $.props.querySelector('[data-swatch]'); gsap.to(sw, { backgroundColor: '#ecebe6', duration: 0.3, delay: 0.6 })
      $.colorHex.textContent = 'ECEBE6'; $.mode.textContent = 'Objektmodus'
      $.tools.querySelectorAll('[data-tool]').forEach((t) => t.classList.toggle('bg-[#4772b3]', t.dataset.tool === 'select'))
      await tw(ptr, { autoAlpha: 0, y: '+=30', duration: 0.5, delay: 0.2 })
      stage.demo = null
      cleanups.splice(0).forEach((c) => c())
    }

    const run = async () => {
      if (!alive) return
      if (ok()) {
        const steps = [textPhase, designPhase, codePhase, modelPhase]
        for (const step of steps) { if (!(await step())) break }
        restore()
        await rest()
      }
      if (alive) timer = gsap.delayedCall(40, run)
    }
    timer = gsap.delayedCall(3, run)
    return () => {
      alive = false; timer?.kill(); tweens.forEach((t) => t.kill())
      restore(); cleanups.forEach((c) => c())
      stage.demo = null; stage.select = 0; stage.tint = 0; stage.yaw = 0
      gsap.killTweensOf(Object.values(L.current))
      gsap.set(Object.values(L.current).filter((el) => el && el !== L.current.ptr), { autoAlpha: 0 })
    }
  }, [start, rootRef, small])

  const box = 'absolute left-0 top-0 invisible pointer-events-none'
  const panel = `${box} rounded-[5px] border border-white/10 bg-[#1d1d1c]/95 shadow-[0_14px_36px_rgba(0,0,0,.5)] font-mono text-[11.5px] text-[#c9c7bf]`
  return (
    // clipped to the hero, so a hidden panel can never widen the page
    <div aria-hidden className="absolute inset-0 z-40 pointer-events-none overflow-clip">
      {/* text */}
      <div ref={set('sel')} className={`${box} rounded-[3px] bg-[rgb(236_235_230/0.16)]`} />
      <div ref={set('suggest')} className={`${panel} min-w-[13rem] py-1 text-[12.5px]`}>
        <p className="px-3 pt-1 pb-1.5 text-[10.5px] text-faint">Rechtschreibung</p>
        {['digitale', 'digital', 'Digitale'].map((w, i) => (
          <p key={w} data-opt={i === 0 ? '' : undefined} className="flex justify-between gap-6 px-3 py-[3px] text-muted"><span>{w}</span>{i === 0 && <span className="text-faint">↵</span>}</p>
        ))}
      </div>
      <div ref={set('insert')} className={`${box} w-[3px] rounded-full bg-signal`} />
      <div ref={set('undo')} className={`${panel} px-2.5 py-1.5 text-[12px] text-ink`}><span className="text-faint">⌘Z</span> Rückgängig</div>
      {/* design */}
      <div ref={set('frame')} className={`${box} border`}>
        <div ref={set('handles')} className="absolute inset-0">
          {['-left-[4px] -top-[4px]', '-right-[4px] -top-[4px]', '-left-[4px] -bottom-[4px]', '-right-[4px] -bottom-[4px]'].map((c) => (
            <span key={c} className={`absolute ${c} w-[7px] h-[7px] bg-white border`} style={{ borderColor: FIGMA }} />
          ))}
          <span className="absolute -top-[22px] left-0 font-sans text-[11px] whitespace-nowrap" style={{ color: FIGMA }}>T&nbsp; Anwendungen.</span>
          <span ref={set('size')} className="absolute left-1/2 -bottom-[24px] -translate-x-1/2 rounded-[3px] px-1.5 py-[1px] font-sans text-[10.5px] text-white tabular-nums" style={{ background: FIGMA }} />
        </div>
      </div>
      <div ref={set('align')} className={`${panel} flex gap-0.5 p-1`}>
        {[['left', 'M3 2v12M6 5h7M6 11h4'], ['center', 'M8 2v12M4 5h8M5.5 11h5'], ['right', 'M13 2v12M3 5h7M6 11h4'], ['top', 'M2 3h12M5 6v7M11 6v4'], ['middle', 'M2 8h12M5 4v8M11 5.5v5'], ['bottom', 'M2 13h12M5 3v7M11 6v4']].map(([k, d]) => (
          <span key={k} data-al={k} className="grid place-items-center w-6 h-6 rounded-[3px] transition-colors">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c9c7bf" strokeWidth="1.3"><path d={d} /></svg>
          </span>
        ))}
      </div>
      <div ref={set('guide')} className={`${box} w-px`} style={{ background: GUIDE }} />
      <div ref={set('measure')} className={`${box} h-px`} style={{ background: GUIDE }}>
        <span ref={set('measureLabel')} className="absolute left-1/2 -top-[20px] -translate-x-1/2 rounded-[3px] px-1.5 font-sans text-[10.5px] text-white tabular-nums" style={{ background: GUIDE }} />
      </div>
      {/* code: tabs, explorer, the headline's JSX, terminal, status */}
      <div ref={set('ide')} className={`${box} flex flex-col overflow-hidden rounded-[6px] font-mono text-[11.5px] leading-[1.55]`}>
        <div className="flex items-center border-b border-white/10 text-[10.5px]">
          <span className="px-3 py-1.5 text-ink border-t-2 border-signal bg-white/[0.03]">HeroSection.jsx</span>
          <span className="px-3 py-1.5 text-faint">Typer.jsx</span>
          {!small && <span className="px-3 py-1.5 text-faint">Bust3D.jsx</span>}
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="max-lg:hidden w-[118px] shrink-0 border-r border-white/10 py-1.5 text-[10.5px] text-muted">
            <p className="px-2.5">▾ src</p><p className="pl-5">▾ components</p>
            <p className="pl-8 bg-white/[0.06] text-ink">HeroSection.jsx</p><p className="pl-8">Typer.jsx</p><p className="pl-8">Bust3D.jsx</p><p className="pl-8">Workflow.jsx</p>
          </div>
          <div ref={set('code')} className="flex-1 py-1.5 pr-2 overflow-hidden whitespace-pre">
            {(small ? CODE_SM : CODE).map((ln, i) => (
              <p key={i} data-code className="flex">
                <span className="w-8 shrink-0 pr-2 text-right text-faint tabular-nums">{204 + i}</span>
                <span>
                  {i === 3 ? (
                    <>{ln.slice(0, 3).map(([t, c], j) => <span key={j} className={TONE[c]}>{t}</span>)}<span data-typed={ln.slice(3).map(([t]) => t).join('')} className="text-[#c9c7bf]" /><span ref={set('caretLine')} className="hidden w-[2px] h-[1.1em] align-[-2px] bg-signal" /></>
                  ) : ln.map(([t, c], j) => <span key={j} className={TONE[c]}>{t}</span>)}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div ref={set('term')} className="border-t border-white/10 px-2.5 py-1 text-[10.5px] leading-[1.5]">
          <p><span className="text-[#7fd6b8]">~/3d-portfolio</span> <span className="text-faint">$</span> <span data-cmd className="text-ink" /></p>
          <p data-out className="text-muted">vite v4.5.14 building for production...</p>
          <p data-out><span className="text-[#7fd6b8]">✓</span> <span className="text-muted">built in 1.04s</span></p>
        </div>
        <div className="flex justify-between bg-signal px-2.5 text-[10px] text-bg"><span>⎇ main</span><span ref={set('status')}>Ln 1, Col 1</span></div>
      </div>
      {/* 3D: origin, gizmo, tools, outliner, properties */}
      <svg ref={set('gizmo')} className={`${box} w-full h-full overflow-visible`}>
        {['x', 'y', 'z'].map((k) => <line key={k} data-ax={k} stroke={AX[k]} strokeWidth="2" strokeLinecap="round" />)}
        {['x', 'y', 'z'].map((k) => <circle key={k} data-cap={k} r="5" fill={AX[k]} />)}
      </svg>
      <div ref={set('origin')} className={`${box} w-[10px] h-[10px] rounded-full bg-[#ffa13d] ring-2 ring-white/80`} />
      <div ref={set('tools')} className={`${panel} flex flex-col gap-0.5 p-1`}>
        {[['select', 'M3 3h10v10H3z'], ['move', 'M8 2v12M2 8h12M8 2l-2 2M8 2l2 2M14 8l-2-2M14 8l-2 2'], ['rotate', 'M12.5 5.5A5 5 0 1 0 13 9M12.5 2v3.5H9'], ['scale', 'M3 13 13 3M9 3h4v4M3 9v4h4']].map(([k, d]) => (
          <span key={k} data-tool={k} className={`grid place-items-center w-7 h-7 rounded-[3px] ${k === 'select' ? 'bg-[#4772b3]' : ''}`}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#e6e6e6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
          </span>
        ))}
      </div>
      <div ref={set('outliner')} className={`${panel} w-[210px] py-1.5`}>
        <p className="px-2.5 pb-1 text-[10px] text-faint">Szenensammlung</p>
        <p className="px-2.5 text-muted">▾ <span className="text-[#c9c7bf]">Hero</span></p>
        <p className="px-2.5 pl-6 bg-[#4772b3]/50 text-white">◆ Büste <span className="text-faint">· 64 000 Punkte</span></p>
        <p className="px-2.5 pl-10 text-muted">● Material.Partikel</p>
        <p className="px-2.5 pl-6 text-muted">◎ Kamera</p>
      </div>
      <div ref={set('props')} className={`${panel} w-[210px] max-lg:w-[190px] py-1.5`}>
        <p className="flex justify-between px-2.5 pb-1 text-[10px] text-faint"><span>Objekt · Büste</span><span ref={set('mode')}>Objektmodus</span></p>
        <p className="flex justify-between px-2.5"><span className="text-muted">Rotation Z</span><span ref={set('rotZ')} className="tabular-nums text-ink">0.0°</span></p>
        <p className="flex justify-between px-2.5"><span className="text-muted">Skalierung</span><span className="tabular-nums">1.000</span></p>
        <p className="flex items-center justify-between px-2.5 pt-1"><span className="text-muted">Farbe</span><span className="flex items-center gap-1.5"><span ref={set('colorHex')} className="tabular-nums">ECEBE6</span><span data-swatch className="w-6 h-3.5 rounded-[2px] bg-ink ring-1 ring-white/20" /></span></p>
      </div>
      {/* the pointer and its click */}
      <span ref={set('ripple')} className={`${box} w-6 h-6 rounded-full border border-white/70`} />
      {/* below lg a fingertip (a soft touch circle) — a mouse arrow makes no sense on a phone */}
      {small
        ? <span ref={set('ptr')} className={`${box} -ml-[13px] -mt-[13px] w-[26px] h-[26px] rounded-full bg-white/25 ring-1 ring-white/70 shadow-[0_2px_8px_rgba(0,0,0,.5)]`} />
        : <svg ref={set('ptr')} width="20" height="20" viewBox="0 0 22 22" className={box} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.6))' }}>
            <path d="M3 2 L3 18 L7.2 14.2 L10 20.5 L12.6 19.4 L9.9 13.2 L15.6 13.2 Z" fill="#fff" stroke="#000" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>}
    </div>
  )
}
