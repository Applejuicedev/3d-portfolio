import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReduced } from '../lib/motion'
import { palette, refreshPalette } from '../lib/theme'

// What drives it: gather 0 → 1 (the points arrive after Mi's introduction), split 0 → 1 (the
// sphere unwinds in a spiral and comes apart — set by the hero's scroll)
export const heroPoints = { gather: 0, split: 0 }

// The hero's one body: a sphere of dark points on the white page, turning slowly. Scrolled, it
// unwinds in a spiral and comes apart, thinning out as it goes, while the next section rises. The pointer only lights
// the points near it in the palette's accent (blue, orange, light blue or yellow).
const VERT = /* glsl */ `
attribute vec3 aS; attribute vec4 aR;
uniform float uTime, uGather, uSplit, uPR, uR; uniform vec2 uRes, uMouse;
varying float vA; varying float vGlow;
mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
void main() {
  vec3 p = aS * uR;
  p.xz = rot(uTime * .14) * p.xz;
  p.yz = rot(.35) * p.yz;
  // opening up: a spiral — each point swings round the axis, the higher it sits the further, and
  // drifts only a little outwards (it loosens, it doesn't scatter); a little staggered, so the sphere unwinds and comes apart rather than bursting
  float s = smoothstep(0., 1., clamp(uSplit * 1.3 - aR.w * .3, 0., 1.));
  float ang = s * (1.1 + aR.x * 1.2) * (1.3 + p.y / uR);
  p.xz = rot(ang) * p.xz;
  p.xz *= 1. + s * (.18 + aR.y * .55);
  p.y *= 1. + s * (.08 + aR.z * .22);
  p.y += s * s * (aR.z - .5) * uR * .5;
  float g = smoothstep(0., 1., clamp(uGather * 1.6 - aR.z * .6, 0., 1.));
  p = mix(vec3((aR.xy - .5) * uRes * 1.4, (aR.z - .5) * 600.), p, g);
  p.xy += vec2(sin(uTime * .8 + aR.w * 40.), cos(uTime * .6 + aR.x * 40.)) * .5;
  float persp = 1000. / (1000. - p.z);
  vec2 q = uRes * .5 + vec2(p.x, -p.y) * persp;
  gl_Position = vec4(q.x / uRes.x * 2. - 1., 1. - q.y / uRes.y * 2., 0., 1.);
  // the pointer: the points near it glow blue (nothing moves)
  float glow = exp(-dot(q - uMouse, q - uMouse) / 6500.) * (1. - s) * g;
  vGlow = glow;
  gl_PointSize = (1.1 + aR.y * 1.2) * uPR * persp * (1. + glow * .5);
  vA = (.3 + .6 * clamp(.5 + p.z / (uR * 2.), 0., 1.)) * g * (1. - s * .55); // nothing before they gather
}`
const FRAG = /* glsl */ `
uniform vec3 uInk, uAccent;
varying float vA; varying float vGlow;
void main() {
  float d = length(gl_PointCoord - .5);
  gl_FragColor = vec4(mix(uInk, uAccent, clamp(vGlow * 1.4, 0., 1.)), smoothstep(.5, .15, d) * min(1., vA + vGlow * .5));
}`

export default function HeroParticles() {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: true }) } catch { return }
    const pr = Math.min(devicePixelRatio || 1, 2), N = innerWidth < 768 ? 8000 : 16000
    renderer.setPixelRatio(pr)
    const geo = new THREE.BufferGeometry(), S = new Float32Array(N * 3), R = new Float32Array(N * 4)
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = i * 2.399963
      S.set([Math.cos(th) * rr, y, Math.sin(th) * rr], i * 3)
      for (let k = 0; k < 4; k++) R[i * 4 + k] = Math.random()
    }
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3))
    geo.setAttribute('aS', new THREE.BufferAttribute(S, 3)); geo.setAttribute('aR', new THREE.BufferAttribute(R, 4))
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, depthTest: false,
      uniforms: { uTime: { value: 0 }, uGather: { value: 0 }, uSplit: { value: 0 }, uPR: { value: pr }, uR: { value: 200 }, uRes: { value: new THREE.Vector2() }, uMouse: { value: new THREE.Vector2(-1e4, -1e4) }, uInk: { value: new THREE.Vector3() }, uAccent: { value: new THREE.Vector3() } } })
    refreshPalette()
    const scene = new THREE.Scene(), camera = new THREE.Camera(), pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false; scene.add(pts)
    const mouse = { x: -1e4, y: -1e4 }
    const move = (e) => { if (e.pointerType === 'touch') return; const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    window.addEventListener('pointermove', move, { passive: true })
    const still = prefersReduced(), t0 = performance.now()
    let raf = 0, size = '', visible = true, alive = true
    const frame = (now) => {
      raf = 0
      const W = cv.clientWidth, H = cv.clientHeight
      if (size !== `${W}x${H}`) { size = `${W}x${H}`; renderer.setSize(W, H, false) }
      const u = mat.uniforms
      u.uTime.value = still ? 2 : (now - t0) / 1000; u.uRes.value.set(W, H); u.uR.value = Math.min(W, H) * (W < 768 ? 0.34 : 0.3)
      u.uInk.value.fromArray(palette.ink); u.uAccent.value.fromArray(palette.accent)
      u.uGather.value = heroPoints.gather; u.uSplit.value = heroPoints.split; u.uMouse.value.set(mouse.x, mouse.y)
      renderer.render(scene, camera)
      if (visible && alive) raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && alive && !raf) raf = requestAnimationFrame(frame) })
    io.observe(cv)
    raf = requestAnimationFrame(frame)
    return () => { alive = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('pointermove', move); geo.dispose(); mat.dispose(); renderer.dispose() }
  }, [])
  return <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
}
