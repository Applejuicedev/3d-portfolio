import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, prefersReduced, finePointer } from '../lib/motion'
import { booted, on, lastOf } from '../lib/events'
import { palette, refreshPalette } from '../lib/theme'

// ── Particle objects across the page ────────────────────────────
// After the particle bust of the previous design: words and objects made of points that build
// themselves as they come into view and fall apart again as they leave. Any element marked
// data-particles="text" becomes one: its own words, sampled in its own font and extruded into a 3D
// body (front, back, walls), with a loose swarm orbiting it. One fixed canvas and one renderer for
// all of them — each object one draw call:
//   · data-particles-boot: assembles once the page has booted (with data-particles-wait: when the
//     hero's scene says 'hero:code') and is blown apart as the hero scrolls away (the hero's "Code.");
//   · data-particles-live: when the element's text changes, the points fly from the old word into
//     the new one (the Stack's heading, the year in the time line);
//   · data-particles-stay: once built it no longer falls apart above the screen (the page's end);
//   · the others assemble while they are in the middle of the screen and scatter above or below it,
//     scrubbed — they reassemble on the way back;
//   · each leans towards the pointer; points near it swell and turn blue; a click sends a shockwave.
// Every frame each object is laid exactly over its element; a text element itself stays in the
// page, transparent, for layout and screen readers.

const VERT = /* glsl */ `
uniform float uTime, uMorph, uSpread, uScatter, uSize, uAspect, uHover, uFade, uWide;
uniform vec2 uMouse, uTilt;
uniform vec4 uShock;
uniform vec3 uInk, uAccent, uCanvas;
attribute vec3 aNormal, aFrom, aFromN;
attribute vec4 aRand;
attribute float aOrbit;
varying vec4 vColor;
mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
void main() {
  // the morph from the previous word, staggered per point, each on a little arc of its own
  float mk = smoothstep(0., 1., clamp(uMorph * 1.6 - aRand.x * 0.6, 0., 1.));
  vec3 p = mix(aFrom, position, mk) + (aRand.yzx - 0.5) * sin(mk * 3.14159) * 0.35;
  vec3 n = normalize(mix(aFromN, aNormal, mk) + 1e-4);
  if (aOrbit > 0.5) {
    // the swarm: an elliptic orbit around the word, each point at its own speed and height
    float ang = aRand.w * 6.2831 + uTime * (0.12 + aRand.x * 0.22) * (aRand.y > 0.5 ? 1. : -1.);
    float rad = 0.62 + aRand.y * 0.55;
    p = vec3(cos(ang) * rad * uWide, (aRand.z - 0.5) * 1.1 + sin(ang * 2. + aRand.w * 9.) * 0.07, sin(ang) * rad * 0.9);
    n = normalize(vec3(cos(ang), 0., sin(ang)));
  }
  mat3 R = rotY(uTilt.x) * rotX(uTilt.y);
  p = R * p; n = R * n;
  // alive: every point breathes a little
  p += n * sin(uTime * 1.1 + aRand.w * 40.) * 0.005;
  // scattered ↔ assembled (the boot), blown apart (the scroll); staggered per point
  float k = max(uSpread, uScatter);
  float s = smoothstep(0., 1., clamp(k * 1.25 - aRand.w * 0.25, 0., 1.));
  vec3 away = normalize(n * 0.5 + (aRand.xyz - 0.5) * 2.) * (1.2 + aRand.w * 3.5) * (1. + uScatter * 3.);
  p = mix(p, p + away, s);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  vec4 cp = projectionMatrix * mv;
  vec2 ndc = cp.xy / cp.w;
  vec3 nv = normalize(normalMatrix * n);
  // the pointer: a soft swelling towards the viewer around it
  vec2 dm = ndc - uMouse; dm.x *= uAspect;
  float m = exp(-dot(dm, dm) / 0.007) * uHover * (1. - s);
  // the shockwave: a ring running out from the click, fading
  float st = uTime - uShock.z;
  vec2 ds = ndc - uShock.xy; ds.x *= uAspect;
  float ring = st > 0. ? exp(-pow(length(ds) - st * 0.8, 2.) / 0.002) * exp(-st * 1.6) * uShock.w : 0.;
  mv.xyz += nv * (m * 0.045 + ring * 0.14) + vec3(0., 0., m * 0.05);
  gl_Position = projectionMatrix * mv;
  // a key light from the upper left front: faces towards it read darker on the white page
  float key = max(dot(nv, normalize(vec3(-0.5, 0.5, 0.75))), 0.);
  gl_PointSize = uSize * (0.65 + aRand.w * 0.7) * (10. / -mv.z) * (1. + m * 0.45 + ring * 0.7);
  vec3 ink = mix(mix(uInk, uCanvas, 0.6), uInk, pow(key, 0.8));
  vec3 col = mix(ink, uAccent, clamp(m * 0.9 + ring * 0.8, 0., 1.));
  float a = (aOrbit > 0.5 ? 0.42 : mix(0.45, 1., key)) * (1. - s * 0.92) * uFade; // scattered points all but vanish: no dust left on the page
  a = min(1., a + m * 0.3);
  vColor = vec4(col, a);
}`
const FRAG = /* glsl */ `
varying vec4 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.2, d) * vColor.a;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor.rgb, a);
}`

// the word, drawn in the headline's own font and sampled into points: front, back and walls
function sampleWord(text, font, target) {
  const fs = 240
  const c = document.createElement('canvas'), x = c.getContext('2d')
  x.font = `${font.weight} ${fs}px ${font.family}`
  if ('letterSpacing' in x) x.letterSpacing = font.spacing
  const w = Math.ceil(x.measureText(text).width) + 20, h = Math.ceil(fs * 1.25)
  c.width = w; c.height = h
  x.font = `${font.weight} ${fs}px ${font.family}`
  if ('letterSpacing' in x) x.letterSpacing = font.spacing
  x.fillStyle = '#000'; x.textBaseline = 'alphabetic'; x.fillText(text, 10, fs * 0.98)
  const d = x.getImageData(0, 0, w, h).data
  const on = (i, j) => i >= 0 && j >= 0 && i < w && j < h && d[(j * w + i) * 4 + 3] > 128
  let filled = 0
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (on(i, j)) filled++
  const step = Math.max(1, Math.sqrt(filled / (target * 0.42)))
  const pos = [], nor = []
  const S = 1 / fs, D = 0.13 // units: 1 = the font size; depth of the extrusion
  for (let j = 0; j < h; j += step) for (let i = 0; i < w; i += step) {
    const xi = Math.round(i), yj = Math.round(j)
    if (!on(xi, yj)) continue
    const X = (i + (Math.random() - 0.5) * step - w / 2) * S, Y = -(j + (Math.random() - 0.5) * step - h / 2) * S
    pos.push(X, Y, D); nor.push(0, 0, 1)
    if (Math.random() < 0.45) { pos.push(X, Y, -D); nor.push(0, 0, -1) }
    // an edge (a neighbour is empty): a few points down the wall
    const r = Math.ceil(step)
    const gx = (on(xi - r, yj) ? 1 : 0) - (on(xi + r, yj) ? 1 : 0), gy = (on(xi, yj - r) ? 1 : 0) - (on(xi, yj + r) ? 1 : 0)
    if (gx || gy) {
      const l = Math.hypot(gx, gy)
      for (let k = 0; k < 4; k++) { pos.push(X, Y, -D + Math.random() * 2 * D); nor.push(gx / l, -gy / l, 0) }
    }
  }
  return { pos, nor, width: w * S, height: h * S }
}

// the sample, resized to exactly n points (a random subset, or repeats), so a word can turn into another
function fit(w, n, pos, nor) {
  const m = w.pos.length / 3, idx = Array.from({ length: m }, (_, i) => i)
  for (let i = 0; i < n; i++) {
    let j
    if (i < m) { const r = i + Math.floor(Math.random() * (m - i)); j = idx[r]; idx[r] = idx[i]; idx[i] = j } else j = Math.floor(Math.random() * m)
    for (let k = 0; k < 3; k++) { pos[i * 3 + k] = w.pos[j * 3 + k]; nor[i * 3 + k] = w.nor[j * 3 + k] }
  }
}

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

export default function ParticleField() {
  const wrapRef = useRef()
  useEffect(() => {
    const wrap = wrapRef.current
    if (prefersReduced()) return
    const small = !window.matchMedia('(min-width: 1024px)').matches
    const touch = !finePointer()
    let alive = true, renderer, raf = 0, base
    const cleanup = [], objects = []

    const make = (el, scene) => {
      const boot = el.hasAttribute('data-particles-boot'), live = el.hasAttribute('data-particles-live')
      const cs = getComputedStyle(el)
      const font = { family: cs.fontFamily, weight: cs.fontWeight, spacing: cs.letterSpacing === 'normal' ? '0px' : `${parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize) * 240}px` }
      const budget = (small ? 0.4 : 1) * (boot ? 20000 : 14000)
      let text = el.textContent.trim(), w = sampleWord(text, font, budget)
      const nObj = w.pos.length / 3, nOrbit = Math.round((small ? 0.4 : 1) * (boot ? 1600 : 800)), n = nObj + nOrbit
      const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), rnd = new Float32Array(n * 4), orb = new Float32Array(n)
      pos.set(w.pos); nor.set(w.nor)
      for (let i = 0; i < n; i++) { for (let k = 0; k < 4; k++) rnd[i * 4 + k] = Math.random(); orb[i] = i >= nObj ? 1 : 0 }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aNormal', new THREE.BufferAttribute(nor, 3))
      geo.setAttribute('aFrom', new THREE.BufferAttribute(pos.slice(), 3))
      geo.setAttribute('aFromN', new THREE.BufferAttribute(nor.slice(), 3))
      geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 4))
      geo.setAttribute('aOrbit', new THREE.BufferAttribute(orb, 1))
      const mat = base.clone()
      const u = mat.uniforms
      u.uWide.value = w.width / 2
      u.uSpread.value = boot ? 1 : 0; u.uFade.value = boot ? 0 : 1; u.uScatter.value = 1
      const pts = new THREE.Points(geo, mat); pts.frustumCulled = false
      scene.add(pts)
      el.style.color = 'transparent'
      cleanup.push(() => { el.style.color = ''; geo.dispose(); mat.dispose() })
      const o = { el, boot, stay: el.hasAttribute('data-particles-stay'), w, pts, u, tilt: { x: 0, y: 0 }, hover: 0 }
      const assemble = () => {
        gsap.to(u.uFade, { value: 1, duration: 0.6, ease: 'power2.out', overwrite: true })
        gsap.to(u.uSpread, { value: 0, duration: 2.6, ease: 'power3.out', delay: 0.15, overwrite: true })
      }
      // data-particles-wait: not at the boot but when the hero says so (the drop melting into the words, HeroScene) — and apart again when it is wound back
      if (boot && el.hasAttribute('data-particles-wait')) cleanup.push(on('hero:code', (v) => {
        if (v) assemble()
        else { gsap.to(u.uFade, { value: 0, duration: 0.4, overwrite: true }); gsap.to(u.uSpread, { value: 1, duration: 0.6, ease: 'power2.in', overwrite: true }) }
      }), lastOf('hero:code') ? (assemble(), () => {}) : () => {})
      else if (boot) booted.then(() => { if (alive) assemble() })
      if (live) {
        // the text changed: where the points are now becomes the start, the new word the goal
        const A = geo.attributes
        const mo = new MutationObserver(() => {
          const t = el.textContent.trim()
          if (!t || t === text) return
          text = t
          const k = u.uMorph.value
          for (let i = 0; i < nObj * 3; i++) {
            A.aFrom.array[i] += (A.position.array[i] - A.aFrom.array[i]) * k
            A.aFromN.array[i] += (A.aNormal.array[i] - A.aFromN.array[i]) * k
          }
          o.w = w = sampleWord(t, font, budget)
          fit(w, nObj, A.position.array, A.aNormal.array)
          for (const a of ['position', 'aNormal', 'aFrom', 'aFromN']) A[a].needsUpdate = true
          u.uWide.value = w.width / 2
          gsap.fromTo(u.uMorph, { value: 0 }, { value: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
        })
        mo.observe(el, { childList: true, subtree: true, characterData: true })
        cleanup.push(() => mo.disconnect())
      }
      return o
    }

    const start = () => {
      if (!alive) return
      try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' }) } catch { return }
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5))
      const canvas = renderer.domElement
      canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.display = 'block'
      wrap.appendChild(canvas)
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60)
      camera.position.set(0, 0, 10)
      base = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
        uniforms: {
          uTime: { value: 0 }, uMorph: { value: 1 }, uSpread: { value: 0 }, uScatter: { value: 0 }, uSize: { value: 1 }, uAspect: { value: 1 }, uHover: { value: 0 }, uFade: { value: 1 },
          uWide: { value: 1 }, uMouse: { value: new THREE.Vector2(9, 9) }, uTilt: { value: new THREE.Vector2() }, uShock: { value: new THREE.Vector4(0, 0, -99, 0) },
          uInk: { value: new THREE.Vector3() }, uAccent: { value: new THREE.Vector3() }, uCanvas: { value: new THREE.Vector3() },
        },
      })
      refreshPalette()
      document.querySelectorAll('[data-particles]').forEach((el) => { if (el.getClientRects().length) objects.push(make(el, scene)) })

      const mouse = { x: -1e4, y: -1e4 }, shock = new THREE.Vector4(0, 0, -99, 0)
      const onMove = (e) => { if (e.pointerType !== 'touch') { mouse.x = e.clientX; mouse.y = e.clientY } }
      const onDown = (e) => {
        if (e.pointerType === 'touch' || e.target.closest?.('a, button, input, textarea, label')) return
        shock.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, (performance.now() - t0) / 1000, 1)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      cleanup.push(() => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerdown', onDown) })

      let size = ''
      const t0 = performance.now()
      const frame = (now) => {
        raf = requestAnimationFrame(frame)
        const W = innerWidth, H = innerHeight
        if (size !== `${W}x${H}`) { size = `${W}x${H}`; renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix() }
        const upx = (2 * Math.tan(THREE.MathUtils.degToRad(15)) * 10) / H
        const time = (now - t0) / 1000
        let any = false
        for (const o of objects) {
          const r = o.el.getBoundingClientRect(), u = o.u
          u.uInk.value.fromArray(palette.ink); u.uAccent.value.fromArray(palette.accent); u.uCanvas.value.fromArray(palette.canvas)
          // how far it is from the middle of the screen decides whether it holds together
          let target
          if (o.boot) target = Math.min(1, Math.max(0, scrollY / (H * 0.75)))
          else { const c = (r.top + r.height / 2) / H; target = c < 0.22 ? (o.stay ? 0 : smooth(0, 1, (0.22 - c) / 0.32)) : c > 0.84 ? smooth(0, 1, (c - 0.84) / 0.3) : 0 }
          u.uScatter.value += (target - u.uScatter.value) * 0.1
          const gone = u.uScatter.value > 0.985 && (r.bottom < -H * 0.3 || r.top > H * 1.3)
          o.pts.visible = !gone
          if (gone) continue
          any = true
          // laid over its element
          const s = (r.width * upx) / o.w.width
          o.pts.scale.setScalar(s)
          o.pts.position.set((r.left + r.width / 2 - W / 2) * upx, (H / 2 - (r.top + r.height * 0.47)) * upx, 0)
          u.uSize.value = (small ? 1.0 : 1.15) * renderer.getPixelRatio() * Math.sqrt(Math.max(0.5, s))
          u.uAspect.value = camera.aspect; u.uTime.value = time
          u.uMouse.value.set((mouse.x / W) * 2 - 1, -(mouse.y / H) * 2 + 1); u.uShock.value.copy(shock)
          // it leans towards the pointer when it is near, sways slowly otherwise
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2
          const near = !touch && mouse.x > -1e3 ? Math.max(0, 1 - Math.hypot(mouse.x - cx, mouse.y - cy) / (W * 0.5)) : 0
          const tx = near ? ((mouse.x - cx) / W) * 1.1 : Math.sin(time * 0.4 + r.top * 0.001) * 0.18
          const ty = near ? ((mouse.y - cy) / H) * 0.7 : Math.sin(time * 0.3) * 0.06
          o.tilt.x += (tx - o.tilt.x) * 0.06; o.tilt.y += (ty - o.tilt.y) * 0.06
          u.uTilt.value.set(o.tilt.x, o.tilt.y)
          o.hover += ((touch ? 0 : 1) - o.hover) * 0.08; u.uHover.value = o.hover
        }
        canvas.style.visibility = any ? '' : 'hidden'
        if (any) renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(frame)
      // nothing is drawn while the tab is hidden or a project's sheet covers the page
      let covered = false
      const vis = () => { if (document.hidden || covered) { cancelAnimationFrame(raf); raf = 0 } else if (!raf) raf = requestAnimationFrame(frame) }
      document.addEventListener('visibilitychange', vis)
      cleanup.push(on('open-project', () => { covered = true; vis() }), on('sheet:closed', () => { covered = false; vis() }))
      cleanup.push(() => document.removeEventListener('visibilitychange', vis), () => { base.dispose(); renderer.dispose(); canvas.remove() })
    }

    // wait for the fonts, so the words are sampled in the right shapes
    document.fonts.ready.then(() => (window.requestIdleCallback ? requestIdleCallback(start, { timeout: 800 }) : setTimeout(start, 50)))
    return () => { alive = false; cancelAnimationFrame(raf); cleanup.forEach((f) => f()) }
  }, [])

  return <div ref={wrapRef} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />
}
