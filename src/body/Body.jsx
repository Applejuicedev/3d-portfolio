import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReduced } from '../lib/motion'
import { palette, refreshPalette } from '../lib/theme'
import { N, shape, stackLayerOf } from './shapes'

// What the page can tell the body: gather 0 → 1 (the points leave the sky of the loader and become the forms), layer (a plate of the stack
// lit up, -1 for none)
export const body = { gather: 0, layer: -1 }

// The one body of the site: a cloud of points, fixed behind the page, that takes a new form for
// every part of it. The forms are named by the page itself — any element with data-form="…" is a
// stop (data-at="left|right|center" where the form stands, data-size its size, data-spin="sway"
// for flat forms, which only rock instead of turning, data-solid: full strength on phones too,
// data-alpha: a fixed strength, for a form that stands behind text as a backdrop). While a stop is in the middle of the screen
// its form holds; between two stops the points flow from one form into the next, swirling a little
// on the way.
const VERT = /* glsl */ `
attribute vec3 aA, aB; attribute vec4 aR; attribute float aL, aSA, aSB; attribute vec3 aCA, aCB, aSpace; attribute float aWA, aWB;
uniform float uTime, uMix, uGather, uPR, uR, uLayer, uAlpha;
uniform vec2 uRes, uMouse, uOff, uHyper;
uniform vec4 uRotA, uRotB; // per form: turn about y, tilt about x, sway (1) or free (0), breath
varying float vA; varying float vGlow;
mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
// a four-dimensional form (the tesseract): turned in the xw and yw planes, then projected to 3D
vec3 hyper(vec3 p, float w) {
  vec4 q = vec4(p, w);
  q.xw = rot(uTime * .23) * q.xw; q.yw = rot(uTime * .14) * q.yw;
  return q.xyz * (1.7 / (2.7 - q.w)) * .6;
}
vec3 turn(vec3 p, vec4 r) {
  float a = mix(uTime * .045, sin(uTime * .18) * .12, r.z) + r.x;
  p.xz = rot(a) * p.xz;
  p.yz = rot(r.y) * p.yz;
  return p;
}
void main() {
  float m = smoothstep(0., 1., clamp(uMix * 1.35 - aR.w * .35, 0., 1.)); // a little staggered
  // a form can move within itself: each point circles a vertical axis through its own centre
  // (a moon its planet, a planet the sun) at its own speed
  vec3 a0 = (uHyper.x > .5 ? hyper(aA, aWA) : aA) - aCA, b0 = (uHyper.y > .5 ? hyper(aB, aWB) : aB) - aCB;
  a0.xz = rot(uTime * aSA) * a0.xz; b0.xz = rot(uTime * aSB) * b0.xz;
  a0 += aCA; b0 += aCB;
  // breathing: slow waves running outwards from the centre (for forms that ask for it)
  a0 *= 1. + uRotA.w * .045 * sin(uTime * .9 - length(a0) * 5.);
  b0 *= 1. + uRotB.w * .045 * sin(uTime * .9 - length(b0) * 5.);
  vec3 a = turn(a0, uRotA), b = turn(b0, uRotB);
  // on the way from one form to the next the points do not travel straight: they wind round the
  // vertical axis like a vortex — angle, radius and height each blend on their own — the vortex
  // turning a little further and widening halfway, then settling into the new form
  float way = sin(m * 3.14159);
  float ra = length(a.xz), rb = length(b.xz), ta = atan(a.z, a.x), tb = atan(b.z, b.x);
  float dt = mod(tb - ta + 3.14159, 6.28318) - 3.14159;
  float ang = ta + dt * m + way * (1.1 + aR.x * 1.4);
  float rr = mix(ra, rb, m) * (1. + way * (.18 + aR.y * .2));
  vec3 p = vec3(cos(ang) * rr, mix(a.y, b.y, m) + way * (aR.z - .5) * .35, sin(ang) * rr);
  vec3 dir = normalize(aR.xyz - .5 + .001);
  p += dir * way * .03;
  // dust, not lines: every point sits a little off its form, for good
  p += dir * (aR.y - .5) * .018;
  // gathering: from space (the loader's sky of stars, planets and suns) into the form
  float g = smoothstep(0., 1., clamp(uGather * 1.5 - aR.z * .5, 0., 1.));
  vec3 sky = aSpace; sky.xz = rot(uTime * .01) * sky.xz;
  float flight = sin(g * 3.14159);
  p = mix(sky, p, g) + dir * flight * .25;
  // a breath
  p += vec3(sin(uTime * .25 + aR.x * 30.), cos(uTime * .2 + aR.y * 30.), sin(uTime * .22 + aR.z * 30.)) * .004;
  float persp = 4. / (4. - p.z);
  vec2 q = uRes * .5 + uOff + vec2(p.x, -p.y) * uR * persp;
  // the pointer only lights the points near it — nothing moves
  vec2 d = q - uMouse; float near = exp(-dot(d, d) / 9000.);
  gl_Position = vec4(q.x / uRes.x * 2. - 1., 1. - q.y / uRes.y * 2., 0., 1.);
  float lit = (uLayer >= 0. && abs(aL - uLayer) < .5) ? 1. : 0.;
  vGlow = max(near, lit * (1. - m) * (1. - m));
  // mostly fine dust, now and then a brighter grain; each one glimmers slowly on its own
  float grain = step(.975, aR.x);
  gl_PointSize = (.7 + aR.z * .9 + grain * 1.3) * uPR * persp * (1. + vGlow * .35);
  float twinkle = .7 + .3 * sin(uTime * (.4 + aR.w * .8) + aR.y * 40.);
  vA = (.22 + .6 * clamp(.5 + p.z * .5, 0., 1.)) * twinkle * (1. + grain * .8) * mix(.9, uAlpha, g);
}`
const FRAG = /* glsl */ `
uniform vec3 uInk, uAccent;
varying float vA; varying float vGlow;
void main() {
  float d = length(gl_PointCoord - .5);
  // the points a shade under the type; where they are lit, the highlight, brighter and fuller
  float k = clamp(vGlow * 1.3, 0., 1.);
  vec3 c = mix(uInk * .82, uAccent, k);
  gl_FragColor = vec4(c, smoothstep(.5, .12, d) * min(1., vA * (1. + k * 1.6) + k * .35));
}`

const AT = { left: -1, center: 0, right: 1 }

export default function Body() {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: true }) } catch { return }
    const pr = Math.min(devicePixelRatio || 1, 2)
    renderer.setPixelRatio(pr)
    refreshPalette()

    const geo = new THREE.BufferGeometry()
    const A = new THREE.BufferAttribute(new Float32Array(N * 3), 3), B = new THREE.BufferAttribute(new Float32Array(N * 3), 3)
    const SA = new THREE.BufferAttribute(new Float32Array(N), 1), SB = new THREE.BufferAttribute(new Float32Array(N), 1)
    const CA = new THREE.BufferAttribute(new Float32Array(N * 3), 3), CB = new THREE.BufferAttribute(new Float32Array(N * 3), 3)
    const WA = new THREE.BufferAttribute(new Float32Array(N), 1), WB = new THREE.BufferAttribute(new Float32Array(N), 1)
    const R = new Float32Array(N * 4), L = new Float32Array(N)
    for (let i = 0; i < N; i++) { for (let k = 0; k < 4; k++) R[i * 4 + k] = Math.random(); L[i] = stackLayerOf(i) }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
    geo.setAttribute('aA', A); geo.setAttribute('aB', B); geo.setAttribute('aSA', SA); geo.setAttribute('aSB', SB); geo.setAttribute('aCA', CA); geo.setAttribute('aCB', CB); geo.setAttribute('aWA', WA); geo.setAttribute('aWB', WB)
    geo.setAttribute('aSpace', new THREE.BufferAttribute(shape('cosmos'), 3))
    geo.setAttribute('aR', new THREE.BufferAttribute(R, 4)); geo.setAttribute('aL', new THREE.BufferAttribute(L, 1))
    const u = {
      uTime: { value: 0 }, uMix: { value: 0 }, uGather: { value: 0 }, uPR: { value: pr }, uR: { value: 200 }, uLayer: { value: -1 }, uAlpha: { value: 1 },
      uRes: { value: new THREE.Vector2() }, uHyper: { value: new THREE.Vector2() }, uMouse: { value: new THREE.Vector2(-1e4, -1e4) }, uOff: { value: new THREE.Vector2() },
      uRotA: { value: new THREE.Vector4() }, uRotB: { value: new THREE.Vector4() },
      uInk: { value: new THREE.Vector3() }, uAccent: { value: new THREE.Vector3() },
    }
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: u, transparent: true, depthWrite: false, depthTest: false })
    const scene = new THREE.Scene(), camera = new THREE.Camera(), pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false; scene.add(pts)

    // the stops, read from the page (again whenever it changes size)
    let stops = []
    const read = () => {
      stops = [...document.querySelectorAll('[data-form]')].map((el) => ({
        el, form: el.dataset.form, at: AT[el.dataset.at ?? 'center'] ?? 0, size: parseFloat(el.dataset.size ?? '1'),
        sway: el.dataset.spin === 'sway' ? 1 : 0, tilt: parseFloat(el.dataset.tilt ?? '0.3'), breath: el.hasAttribute('data-breath') ? 1 : 0, solid: el.hasAttribute('data-solid'), alpha: el.dataset.alpha ? parseFloat(el.dataset.alpha) : null,
      }))
    }
    read()
    const mo = new MutationObserver(read); mo.observe(document.body, { childList: true, subtree: true })

    let pair = ''
    const load = (sa, sb) => {
      const key = `${sa.form}>${sb.form}`
      if (key === pair) return
      pair = key
      const fa = shape(sa.form), fb = shape(sb.form)
      A.array.set(fa); A.needsUpdate = true; B.array.set(fb); B.needsUpdate = true
      fa.spin ? SA.array.set(fa.spin) : SA.array.fill(0); SA.needsUpdate = true
      fb.spin ? SB.array.set(fb.spin) : SB.array.fill(0); SB.needsUpdate = true
      fa.center ? CA.array.set(fa.center) : CA.array.fill(0); CA.needsUpdate = true
      fb.center ? CB.array.set(fb.center) : CB.array.fill(0); CB.needsUpdate = true
      fa.w ? WA.array.set(fa.w) : WA.array.fill(0); WA.needsUpdate = true
      fb.w ? WB.array.set(fb.w) : WB.array.fill(0); WB.needsUpdate = true
      u.uHyper.value.set(fa.w ? 1 : 0, fb.w ? 1 : 0)
    }

    const mouse = { x: -1e4, y: -1e4 }
    const move = (e) => { if (e.pointerType === 'touch') return; mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('pointermove', move, { passive: true })

    const still = prefersReduced(), t0 = performance.now()
    let raf = 0, size = '', alive = true
    const ease = (t) => t * t * (3 - 2 * t)
    const frame = (now) => {
      raf = 0
      const W = innerWidth, H = innerHeight, narrow = W < 900
      if (size !== `${W}x${H}`) { size = `${W}x${H}`; renderer.setSize(W, H, false) }
      // where are we between two stops: the last one whose middle has passed the middle of the screen, and the next
      let ia = 0, t = 0
      const mids = stops.map((s) => { const r = s.el.getBoundingClientRect(); return r.top + r.height / 2 - H / 2 })
      if (stops.length) {
        ia = mids.findLastIndex((d) => d <= 0)
        if (ia < 0) { ia = 0; t = 0 } else if (ia >= stops.length - 1) { ia = stops.length - 1; t = 0 }
        else t = -mids[ia] / (mids[ia + 1] - mids[ia])
        const sa = stops[ia], sb = stops[Math.min(ia + 1, stops.length - 1)]
        load(sa, sb)
        // the form holds while its stop is near the middle, and flows in the stretch between
        const m = ease(Math.min(1, Math.max(0, (t - 0.25) / 0.5)))
        u.uMix.value = m
        const at = sa.at + (sb.at - sa.at) * m, sz = sa.size + (sb.size - sa.size) * m
        // on a phone there is no room beside the text: the form stands behind it, large and faint
        // (the hero's at full strength — there is no text over it)
        u.uOff.value.set(narrow ? 0 : at * W * 0.191, 0) // golden: text in 38.2 %, the form centred in the other 61.8 %
        u.uR.value = narrow ? W * 0.36 * Math.min(1.2, sz * 1.25) : Math.min(W * 0.5, H) * 0.3 * sz
        const fa = sa.alpha ?? (narrow && !sa.solid ? 0.3 : 1), fb = sb.alpha ?? (narrow && !sb.solid ? 0.3 : 1)
        u.uAlpha.value = fa + (fb - fa) * m
        u.uRotA.value.set(0, sa.tilt, sa.sway, sa.breath); u.uRotB.value.set(0, sb.tilt, sb.sway, sb.breath)
      }
      u.uTime.value = still ? 3 : (now - t0) / 1000
      u.uRes.value.set(W, H); u.uMouse.value.set(mouse.x, mouse.y)
      u.uGather.value = body.gather; u.uLayer.value = body.layer
      u.uInk.value.fromArray(palette.ink); u.uAccent.value.fromArray(palette.accent)
      renderer.render(scene, camera)
      if (alive) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { alive = false; cancelAnimationFrame(raf); mo.disconnect(); window.removeEventListener('pointermove', move); geo.dispose(); mat.dispose(); renderer.dispose() }
  }, [])
  return <canvas ref={ref} aria-hidden className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}
