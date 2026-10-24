import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, ScrollTrigger, prefersReduced } from './motion'
import { stage, markReady } from './hero/stage'

// ── The hero's object: a bust made of light ─────────────────────
// ~64 000 points (24 000 on phones) on the surface of an anonymous human bust (hero/bustGeometry.js), drawn as
// one THREE.Points with its own small shader — one draw call, no textures, no environment map, so
// there is almost nothing to compile or upload. Everything that moves is done on the GPU:
//   · the head turns towards the pointer (around the neck, the shoulders stay),
//   · points near the pointer swell outward in depth and warm towards the signal colour,
//   · a click on the bust sends a shockwave across it,
//   · loading assembles it out of scattered particles; scrolling away scatters it again — slowly:
//     the canvas stays fixed behind the page while the bust rises a little slower than the page,
//     the decay starts after a stretch of scroll and runs until the projects header nears the top
//     (scrubbed: it follows the scroll both ways and reassembles when scrolling back),
//   · the hero's workflow can select it (Blender's orange outline), turn it and change its colour.
// Start-up is paced so the headline's entrance never stutters: the points are sampled in a worker,
// the renderer is created in an idle slot after the lines have risen, the shader is compiled
// asynchronously, and only then does the canvas draw and the bust assemble.

const VERT = /* glsl */ `
uniform float uTime, uSpread, uSelect, uTint, uSize, uAspect, uFade, uHover;
uniform vec2 uMouse, uHead;
uniform vec4 uShock;
attribute vec3 aNormal;
attribute vec4 aRand;
varying vec4 vColor;
const vec3 PIVOT = vec3(0.0, -0.85, -0.06);
mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
void main() {
  vec3 p = position, n = aNormal;
  // the head turns on the neck: full above the jaw line, none on the shoulders
  float w = smoothstep(-1.3, -0.75, p.y);
  mat3 R = rotY(uHead.x) * rotX(uHead.y);
  p = mix(p, PIVOT + R * (p - PIVOT), w);
  n = normalize(mix(n, R * n, w));
  // alive: every point breathes a little on its normal
  p += n * sin(uTime * 1.1 + aRand.w * 40.0) * 0.007;
  // scattered ↔ assembled, staggered per point so the form condenses, not pops
  float s = smoothstep(0.0, 1.0, clamp(uSpread * 1.25 - aRand.w * 0.25, 0.0, 1.0));
  vec3 away = normalize(n * 0.8 + aRand.xyz) * (0.9 + aRand.w * 2.6);
  away.y += s * aRand.w * 0.8;
  p = mix(p, rotY(s * (1.2 + aRand.w)) * (p + away), s);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 cp = projectionMatrix * mv;
  vec2 ndc = cp.xy / cp.w;
  vec3 nv = normalize(normalMatrix * n);
  // the pointer: a soft swelling in depth around it
  vec2 dm = ndc - uMouse; dm.x *= uAspect;
  float m = exp(-dot(dm, dm) / 0.018) * uHover * (1.0 - s);
  // the shockwave: a ring running out from the click, fading
  float st = uTime - uShock.z;
  vec2 ds = ndc - uShock.xy; ds.x *= uAspect;
  float ring = st > 0.0 ? exp(-pow(length(ds) - st * 0.9, 2.0) / 0.003) * exp(-st * 1.5) * uShock.w : 0.0;
  mv.xyz += nv * (m * 0.16 + ring * 0.3) + vec3(0.0, 0.0, m * 0.08);
  gl_Position = projectionMatrix * mv;
  float facing = nv.z;
  float rim = 1.0 - abs(facing);
  // a key light from the upper left front gives each plane its own brightness, a thin rim runs
  // along the silhouette
  float key = max(dot(nv, normalize(vec3(-0.55, 0.5, 0.7))), 0.0);
  float lit = 0.07 + 1.12 * pow(key, 1.45) + 0.3 * pow(rim, 6.0) * step(-0.05, facing);
  gl_PointSize = uSize * (0.7 + aRand.w * 0.7) * (10.0 / -mv.z) * (1.0 + m * 0.6 + ring * 0.8);
  // only what really faces away fades (the far side would show through the face); the bottom of
  // the shoulders dissolves into the page
  float a = lit * mix(0.08, 1.0, smoothstep(-0.4, 0.0, facing)) * smoothstep(-2.83, -2.2, position.y);
  a *= (1.0 - s * 0.8) * uFade;
  vec3 ink = vec3(0.925, 0.92, 0.9), signal = vec3(1.0, 0.357, 0.122), select = vec3(1.0, 0.63, 0.24);
  vec3 col = mix(ink, signal, uTint * (0.55 + 0.45 * facing));
  col = mix(col, signal, clamp(m * 0.9 + ring, 0.0, 1.0));
  float outline = uSelect * smoothstep(0.86, 0.98, rim) * step(-0.05, facing);
  col = mix(col, select, outline);
  a = min(1.0, a + outline * 0.6 + m * 0.3);
  vColor = vec4(col, a);
}`
const FRAG = /* glsl */ `
varying vec4 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.18, d) * vColor.a;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor.rgb, a);
}`

const idle = (fn, timeout = 600) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout }) : setTimeout(fn, 1))
const BUST_TOP = 1.26, BUST_BOTTOM = -2.85, BUST_H = BUST_TOP - BUST_BOTTOM

export default function Bust3D({ heroRef, stageRef, onFail }) {
  const wrapRef = useRef()
  useEffect(() => {
    const wrap = wrapRef.current, hero = heroRef.current
    const reduced = prefersReduced()
    const small = !window.matchMedia('(min-width: 1024px)').matches
    let alive = true, renderer, worker, raf = 0, visible = true, cleanup = []
    const fail = () => { if (alive) onFail?.() }

    const start = (data) => {
      if (!alive) return
      // ── renderer and scene (one idle slot) ──
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
      } catch { fail(); return }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2))
      const canvas = renderer.domElement
      canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.display = 'block'
      canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); fail() })
      wrap.appendChild(canvas)
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
      camera.position.set(0, 0, 10)

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(data.pos, 3))
      geo.setAttribute('aNormal', new THREE.BufferAttribute(data.nor, 3))
      geo.setAttribute('aRand', new THREE.BufferAttribute(data.rnd, 4))
      const u = {
        uTime: { value: 0 }, uSpread: { value: reduced ? 0 : 1 }, uSelect: { value: 0 }, uTint: { value: 0 },
        uSize: { value: 1 }, uAspect: { value: 1 }, uFade: { value: 1 }, uHover: { value: 0 },
        uMouse: { value: new THREE.Vector2(9, 9) }, uHead: { value: new THREE.Vector2() }, uShock: { value: new THREE.Vector4(0, 0, -99, 0) },
      }
      const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: u, transparent: true, depthWrite: false })
      const bust = new THREE.Points(geo, mat)
      bust.frustumCulled = false
      scene.add(bust)

      // ── layout: the bust is placed on the hero's object stage ──
      const base = { x: 0, y: 0, s: 1 }
      // the canvas is the window (fixed); the bust is placed as if the hero were at the top and
      // follows the hero's actual position each frame (parallax)
      let rect = wrap.getBoundingClientRect(), upx = 1, heroTop0 = 0
      const layout = () => {
        rect = wrap.getBoundingClientRect()
        const hr = hero.getBoundingClientRect()
        heroTop0 = hr.top + window.scrollY
        renderer.setSize(rect.width, rect.height, false)
        camera.aspect = rect.width / rect.height
        camera.updateProjectionMatrix(); camera.updateMatrixWorld()
        u.uAspect.value = camera.aspect
        const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
        upx = vh / rect.height
        const st = stageRef.current.getBoundingClientRect()
        const cx = st.left + st.width / 2 - rect.left
        // desktop: almost the hero's height, the shoulders cut by its lower edge; below lg: inside
        // the stage under the headline (positions relative to the hero's top)
        const h = small ? st.height * 1.05 : hr.height * 0.84
        const bottom = small ? st.bottom - hr.top + st.height * 0.04 : Math.min(hr.height, rect.height) * 1.03
        base.s = (h * upx) / BUST_H
        base.x = (cx - rect.width / 2) * upx
        base.y = (rect.height / 2 - bottom) * upx - BUST_BOTTOM * base.s
        bust.scale.setScalar(base.s)
        u.uSize.value = (small ? 1.05 : 1.2) * renderer.getPixelRatio() * Math.sqrt(Math.max(0.6, base.s))
      }
      layout()

      // ── input ──
      const mouse = { x: -1e4, y: -1e4, t: -1 } // client px, time of the last real move
      const look = { x: 0, y: 0 }                 // current head turn (yaw, pitch)
      const REST_YAW = -0.42                      // at rest the bust looks three-quarters towards the headline
      let hover = 0
      const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.t = performance.now() }
      const onDown = (e) => {
        if (e.target.closest?.('a, button, input, textarea, select, [role="button"]')) return
        const b = stage.screen?.box
        if (!b || e.clientX < b.l || e.clientX > b.r || e.clientY < b.t || e.clientY > b.b) return
        u.uShock.value.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -(((e.clientY - rect.top) / rect.height) * 2 - 1), u.uTime.value, 1)
        // and the head startles a little towards it
        gsap.fromTo(look, { y: look.y - 0.12 }, { y: look.y, duration: 0.9, ease: 'elastic.out(1, 0.5)' })
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown)
      cleanup.push(() => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerdown', onDown) })

      // scroll state (the triggers that write it are created below, once the render loop exists —
      // created earlier, a trigger that fires at once on an already scrolled page called kick()
      // before it was defined and aborted the start-up)
      let scroll = 0
      const intro = { spread: reduced ? 0 : 1 }
      // ── per frame ──
      const v = new THREE.Vector3()
      const toScreen = (x, y, z) => { v.set(x, y, z).applyMatrix4(bust.matrixWorld).project(camera); return { x: rect.left + (v.x + 1) / 2 * rect.width, y: rect.top + (1 - v.y) / 2 * rect.height } }
      let last = 0
      const frame = (now) => {
        raf = 0
        const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016
        last = now
        rect = wrap.getBoundingClientRect()
        u.uTime.value = now / 1000
        // pose: base placement moved with the hero (at 72 % of the page's speed — it lingers), the
        // workflow's turn, a slow idle sway
        const sc = scroll
        const shift = Math.max(0, window.scrollY - heroTop0) * (reduced ? 1 : 0.72)
        bust.position.set(base.x, base.y + shift * upx, 0)
        bust.rotation.set(sc * 0.25, REST_YAW + stage.yaw + Math.sin(now / 3200) * (reduced ? 0 : 0.05) - sc * 0.6, 0)
        bust.updateMatrixWorld()
        // the decay begins after the first stretch of scroll and draws out over the rest
        u.uSpread.value = Math.max(intro.spread, Math.pow(THREE.MathUtils.smoothstep(sc, 0.12, 1), 1.35))
        u.uFade.value = 1 - THREE.MathUtils.smoothstep(sc, 0.78, 1)
        u.uSelect.value = stage.select
        u.uTint.value = stage.tint
        // whose pointer: the demo pointer while it acts (unless the real one moved more recently)
        const real = mouse.t > 0 && (!stage.demo || now - mouse.t < 1500)
        const px = real ? mouse.x : stage.demo ? stage.demo.x : rect.left + rect.width / 2
        const py = real ? mouse.y : stage.demo ? stage.demo.y : rect.top + rect.height * 0.4
        u.uMouse.value.set(((px - rect.left) / rect.width) * 2 - 1, -(((py - rect.top) / rect.height) * 2 - 1))
        const k = 1 - Math.exp(-dt / 0.12)
        hover += ((real || stage.demo ? 1 : 0) - hover) * k
        u.uHover.value = hover
        // the gaze: towards the pointer, limited like a neck, eased by time (same at 60 and 120 Hz)
        const head = toScreen(0, 0.35, 0.4)
        const tx = Math.max(-1, Math.min(1, (px - head.x) / 700)) * 0.6
        const ty = Math.max(-1, Math.min(1, (py - head.y) / 600)) * 0.32
        const kl = reduced ? 1 : 1 - Math.exp(-dt / 0.22)
        look.x += (tx - look.x) * kl; look.y += (ty - look.y) * kl
        u.uHead.value.set(look.x, look.y)
        renderer.render(scene, camera)
        // where the bust is, for the workflow's overlays: origin, gizmo axes (Blender: X red,
        // Y green into depth, Z blue up — three.js y is Blender's Z), and a box for clicks
        const o = toScreen(0, -0.55, 0), sz = 0.85
        const top = toScreen(0, BUST_TOP, 0), bot = toScreen(0, BUST_BOTTOM, 0), l = toScreen(-1.5, -1.9, 0), r = toScreen(1.5, -1.9, 0)
        stage.screen = { origin: o, axes: { x: toScreen(sz, -0.55, 0), y: toScreen(0, -0.55, -sz), z: toScreen(0, -0.55 + sz, 0) }, box: { l: l.x, r: r.x, t: top.y, b: bot.y } }
        if (!ready) { ready = true; markReady(); wrap.style.opacity = '1'; assemble() }
        if (visible && !reduced) raf = requestAnimationFrame(frame)
      }
      const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame) }
      // ── scroll: scatter and fade, scrubbed, gone before the projects header ──
      // drawn only while the bust is there (it has dissolved before the projects)
      const updateVis = () => {
        const on = scroll < 0.999
        wrap.style.visibility = on ? 'visible' : 'hidden'
        visible = on && !document.hidden
        kick()
      }
      const st = reduced ? null : ScrollTrigger.create({
        trigger: hero, start: 'top top', endTrigger: '#projekte > header', end: 'top 15%', scrub: 0.5,
        onUpdate: (self) => { scroll = self.progress; updateVis() },
      })
      // reduced motion: no decay — the bust simply scrolls away with the hero
      const onScroll = () => kick()
      if (reduced) window.addEventListener('scroll', onScroll, { passive: true })
      cleanup.push(() => { st?.kill(); window.removeEventListener('scroll', onScroll) })

      let ready = false
      // load: the particles condense into the bust
      const assemble = () => { if (!reduced) gsap.to(intro, { spread: 0, duration: 2.4, ease: 'power3.out', onUpdate: kick }) }

      // without the scroll decay (reduced motion) it stops drawing once the hero is out of view
      const io = new IntersectionObserver(([e]) => { if (reduced) { visible = e.isIntersecting && !document.hidden; kick() } })
      io.observe(hero)
      const onVis = () => { visible = !document.hidden && wrap.style.visibility !== 'hidden'; kick() }
      document.addEventListener('visibilitychange', onVis)
      const onResize = () => { layout(); kick() }
      window.addEventListener('resize', onResize)
      // the stage can move once the fonts are in
      document.fonts.ready.then(() => { if (alive) { layout(); kick() } })
      cleanup.push(() => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); window.removeEventListener('resize', onResize); gsap.killTweensOf([intro, look]) })
      cleanup.push(() => { geo.dispose(); mat.dispose(); renderer.dispose(); canvas.remove() })

      // compile off the critical path (KHR_parallel_shader_compile where available), then draw
      const go = () => { if (alive) kick() }
      if (renderer.compileAsync) renderer.compileAsync(scene, camera).then(go, go)
      else idle(go)
    }

    // ── pacing: sample in a worker now; build the renderer once the headline has risen ──
    const count = small ? 24000 : 64000
    let data = null, due = false
    const maybeStart = () => { if (data && due) idle(() => start(data)) }
    try {
      worker = new Worker(new URL('./hero/bust.worker.js', import.meta.url), { type: 'module' })
      worker.onmessage = (e) => { data = e.data; worker.terminate(); maybeStart() }
      worker.onerror = () => { worker.terminate(); import('./hero/bustGeometry').then(({ sampleBust }) => { data = sampleBust(count); maybeStart() }) }
      worker.postMessage({ count })
    } catch { import('./hero/bustGeometry').then(({ sampleBust }) => { data = sampleBust(count); maybeStart() }) }
    const t = setTimeout(() => { due = true; maybeStart() }, reduced ? 0 : 1100)

    return () => { alive = false; clearTimeout(t); worker?.terminate(); cancelAnimationFrame(raf); cleanup.forEach((c) => c()); stage.screen = null; stage.ready = false }
  }, [heroRef, stageRef, onFail])

  // behind the text (negative z inside the hero's isolated stacking context), above the accent field
  // fixed behind the page (negative z inside the hero's isolated stacking context: under the text,
  // above the accent field and the page ground); the sections after the hero paint over it
  return <div ref={wrapRef} aria-hidden className="fixed inset-0 -z-[5] pointer-events-none opacity-0 transition-opacity duration-700" />
}
