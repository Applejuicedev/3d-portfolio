import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 62
const MAX_EDGES = 110

// Load-in: the nodes shoot out of the core one after another (with a small overshoot), and each
// edge appears as soon as both of its nodes have arrived
const INTRO_DELAY = 0.35   // s, so it starts together with the hero text
const NODE_SPREAD = 1.1    // s over which the nodes start
const NODE_FLIGHT = 0.75   // s each node needs to reach its place
const nodeStart = (i) => INTRO_DELAY + (i / NODE_COUNT) * NODE_SPREAD
const nodeArrive = (i) => nodeStart(i) + NODE_FLIGHT
const EDGE_GROW = 0.5 // s each edge needs to grow from one node to the other
// the last edge starts when the last node arrives and then still needs to grow
const INTRO_END = nodeArrive(NODE_COUNT - 1) + EDGE_GROW
function easeOutBack(p) {
  const c1 = 1.4, c3 = c1 + 1
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2)
}
// Cursor links: a node connects inside CONNECT_R and lets go beyond RELEASE_R (px)
const MAX_LINKS = 2
// Cursor threads: a new one shoots out from the cursor to the node; a released one tears in the
// middle and both ends snap back (to the node and to the cursor) while fading
const LINK_GROW = 0.28 // s
const LINK_TEAR = 0.42 // s
const TEAR_AT = 0.5    // where along the thread it tears (0 = node, 1 = cursor)
const CONNECT_R = 230
const RELEASE_R = 340

// Soft round sprite so nodes render as dots instead of squares
function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.55, 'rgba(255,255,255,1)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(32, 32, 32, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function BrainNet({ mouseRef, onBuilt }) {
  const groupRef = useRef()
  const time = useRef(0)
  const mouseOffset = useRef({ x: 0, y: 0 })
  const links = useRef([]) // { node, grow, tear, released }
  // Scratch objects reused every frame (no per-frame allocations)
  const tmp = useMemo(() => ({ mvp: new THREE.Matrix4(), world: new THREE.Vector3(), ndc: new THREE.Vector3(), cursor: new THREE.Vector3(), tipA: new THREE.Vector3(), tipB: new THREE.Vector3(), tipEnd: new THREE.Vector3() }), [])
  const scr = useMemo(() => ({ sx: new Float32Array(NODE_COUNT), sy: new Float32Array(NODE_COUNT), front: new Uint8Array(NODE_COUNT) }), [])

  const { edgeGeo, nodeGeo, local, shown, edgeArrive, edgeFinal } = useMemo(() => {
    const vecs = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.35 + (Math.random() - 0.5) * 0.55
      vecs.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
    }
    const seen = new Set()
    const pairs = []
    for (let i = 0; i < NODE_COUNT && pairs.length < MAX_EDGES; i++) {
      const sorted = vecs
        .map((v, j) => ({ j, d: j === i ? Infinity : vecs[i].distanceTo(v) }))
        .sort((a, b) => a.d - b.d)
      const k = 2 + Math.floor(Math.random() * 3)
      for (let n = 0; n < k && pairs.length < MAX_EDGES; n++) {
        const j = sorted[n].j
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(key)) { seen.add(key); pairs.push([i, j]) }
      }
    }
    // edges in the order their second node arrives, so the draw range can simply grow
    pairs.sort((p, q) => Math.max(p[0], p[1]) - Math.max(q[0], q[1]))
    const edgeArrive = pairs.map(([a, b]) => nodeArrive(Math.max(a, b)))
    // each edge grows from the node that arrived first (lower index) towards the other one
    const edgePos = []
    pairs.forEach(([p, q]) => {
      const [a, b] = p < q ? [p, q] : [q, p]
      edgePos.push(vecs[a].x, vecs[a].y, vecs[a].z, vecs[b].x, vecs[b].y, vecs[b].z)
    })
    const edgeGeo = new THREE.BufferGeometry()
    // drawn edge positions: the far end is animated during the intro, final positions afterwards
    const edgeFinal = new Float32Array(edgePos)
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePos), 3))
    const local = new Float32Array(vecs.flatMap(v => [v.x, v.y, v.z]))
    // drawn positions: animated during the intro, identical to `local` afterwards
    const shown = new Float32Array(local.length)
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(shown, 3))
    nodeGeo.setDrawRange(0, 0)
    edgeGeo.setDrawRange(0, 0)
    return { edgeGeo, nodeGeo, local, shown, edgeArrive, edgeFinal }
  }, [])

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#818cf8', transparent: true, opacity: 0.12 }), [])
  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: '#a5b4fc', size: 0.06, transparent: true, opacity: 0.42,
    map: makeDotTexture(), alphaTest: 0.01, depthWrite: false,
  }), [])

  // One line object per possible cursor link, each with its own opacity for fading
  const linkLines = useMemo(() => Array.from({ length: MAX_LINKS }, () => {
    const geo = new THREE.BufferGeometry()
    // two segments: whole while growing/held, the two torn halves while tearing
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3))
    const mat = new THREE.LineBasicMaterial({ color: '#a5b4fc', transparent: true, opacity: 0, depthWrite: false })
    const line = new THREE.LineSegments(geo, mat)
    line.frustumCulled = false
    line.visible = false
    return line
  }), [])

  useEffect(() => () => {
    edgeGeo.dispose(); nodeGeo.dispose(); edgeMat.dispose(); nodeMat.map?.dispose(); nodeMat.dispose()
    linkLines.forEach(l => { l.geometry.dispose(); l.material.dispose() })
  }, [])

  // Canvas position in the viewport, cached so the frame loop never forces a layout read
  const rect = useRef({ left: 0, top: 0, width: 1, height: 1 })
  const gl = useThree(s => s.gl)
  useEffect(() => {
    const el = gl.domElement
    const measure = () => {
      const r = el.getBoundingClientRect()
      rect.current = { left: r.left, top: r.top, width: r.width || 1, height: r.height || 1 }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('scroll', measure); window.removeEventListener('resize', measure) }
  }, [gl])

  const lastDark = useRef(null)
  const intro = useRef({ t: 0, done: false })

  // Skip the build-up for people who prefer reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) intro.current.t = INTRO_END
  }, [])

  function updateIntro(dt) {
    const it = intro.current
    it.t += dt
    const t = it.t
    let started = 0
    for (let i = 0; i < NODE_COUNT; i++) {
      const p = Math.min(1, Math.max(0, (t - nodeStart(i)) / NODE_FLIGHT))
      if (t >= nodeStart(i)) started = i + 1
      const k = p >= 1 ? 1 : easeOutBack(p)
      shown[i * 3] = local[i * 3] * k
      shown[i * 3 + 1] = local[i * 3 + 1] * k
      shown[i * 3 + 2] = local[i * 3 + 2] * k
    }
    nodeGeo.attributes.position.needsUpdate = true
    nodeGeo.setDrawRange(0, started)
    let edges = 0
    while (edges < edgeArrive.length && edgeArrive[edges] <= t) edges++
    // grow each started edge from its first node to its second (ease-out)
    const pos = edgeGeo.attributes.position.array
    for (let e = 0; e < edges; e++) {
      const p = Math.min(1, (t - edgeArrive[e]) / EDGE_GROW)
      const k = 1 - (1 - p) * (1 - p)
      const o = e * 6
      for (let d = 0; d < 3; d++) pos[o + 3 + d] = edgeFinal[o + d] + (edgeFinal[o + 3 + d] - edgeFinal[o + d]) * k
    }
    edgeGeo.attributes.position.needsUpdate = true
    edgeGeo.setDrawRange(0, edges * 2)
    if (t >= INTRO_END) {
      it.done = true
      onBuilt?.()
      nodeGeo.setDrawRange(0, Infinity)
      edgeGeo.attributes.position.array.set(edgeFinal)
      edgeGeo.attributes.position.needsUpdate = true
      edgeGeo.setDrawRange(0, Infinity)
    }
  }

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    // Theme colours only change when the theme does, not every frame
    const dark = document.documentElement.classList.contains('dark')
    if (dark !== lastDark.current) {
      lastDark.current = dark
      edgeMat.color.set(dark ? '#818cf8' : '#6366f1')
      edgeMat.opacity = dark ? 0.12 : 0.09
      nodeMat.color.set(dark ? '#a5b4fc' : '#4f46e5')
      nodeMat.opacity = dark ? 0.42 : 0.35
      linkLines.forEach(l => l.material.color.set(dark ? '#a5b4fc' : '#6366f1'))
    }

    const dt = Math.min(delta, 0.1) // avoid a jump after resuming from pause
    time.current += dt
    if (!intro.current.done) updateIntro(dt)
    // The cursor only takes effect once the orb has finished building itself; the lerp below then
    // eases the tilt in smoothly instead of snapping
    if (mouseRef?.current && intro.current.done) {
      const nx = (mouseRef.current.x / window.innerWidth) * 2 - 1
      const ny = -((mouseRef.current.y / window.innerHeight) * 2 - 1)
      // 0.04 per 60 fps frame, scaled so the follow speed is identical at 120 Hz
      const a = 1 - Math.pow(1 - 0.04, dt * 60)
      mouseOffset.current.x = THREE.MathUtils.lerp(mouseOffset.current.x, ny * 0.35, a)
      mouseOffset.current.y = THREE.MathUtils.lerp(mouseOffset.current.y, nx * 0.45, a)
    }
    group.rotation.y = time.current * 0.18 + mouseOffset.current.y
    group.rotation.x = time.current * 0.07 + mouseOffset.current.x

    updateCursorLinks(state.camera, delta, dark)
  })

  function updateCursorLinks(camera, delta, dark) {
    if (!intro.current.done) return // no cursor links while the orb is still building
    const r = rect.current
    const m = mouseRef?.current
    const mx = m ? m.x - r.left : -1e4
    const my = m ? m.y - r.top : -1e4
    const inside = mx >= 0 && my >= 0 && mx <= r.width && my <= r.height
    const list = links.current

    // Nothing to draw and cursor elsewhere: skip all projection work
    if (!inside && list.length === 0) return

    const group = groupRef.current
    group.updateMatrixWorld()
    const { mvp, world, ndc, cursor, tipA, tipB, tipEnd } = tmp
    mvp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).multiply(group.matrixWorld)
    const e = mvp.elements
    const g = group.matrixWorld.elements
    const { sx, sy, front } = scr

    // Screen position of every node (front half only, so lines don't reach "through" the orb)
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = local[i * 3], y = local[i * 3 + 1], z = local[i * 3 + 2]
      const w = e[3] * x + e[7] * y + e[11] * z + e[15]
      sx[i] = ((e[0] * x + e[4] * y + e[8] * z + e[12]) / w * 0.5 + 0.5) * r.width
      sy[i] = (-(e[1] * x + e[5] * y + e[9] * z + e[13]) / w * 0.5 + 0.5) * r.height
      front[i] = g[2] * x + g[6] * y + g[10] * z + g[14] > -0.2 ? 1 : 0
    }
    const dist2 = i => (sx[i] - mx) ** 2 + (sy[i] - my) ** 2

    // Release links that got too far away (or the cursor left the section)
    let active = 0
    for (const l of list) {
      if (!l.released && (!inside || !front[l.node] || dist2(l.node) > RELEASE_R * RELEASE_R)) l.released = true
      if (!l.released) active++
    }

    // Fill free slots with the nearest unlinked nodes inside the connect radius
    while (inside && active < MAX_LINKS) {
      let best = -1, bestD = CONNECT_R * CONNECT_R
      for (let i = 0; i < NODE_COUNT; i++) {
        if (!front[i]) continue
        const d = dist2(i)
        if (d < bestD && !list.some(l => l.node === i)) { best = i; bestD = d }
      }
      if (best === -1) break
      if (list.length >= MAX_LINKS) {
        // A fading link still occupies a slot — let the new one take it over
        list.splice(list.findIndex(l => l.released), 1)
      }
      list.push({ node: best, grow: 0, tear: 0, released: false })
      active++
    }

    // Advance grow / tear, dropping threads that have fully torn
    const dt = Math.min(delta, 0.1)
    for (let i = list.length - 1; i >= 0; i--) {
      const l = list[i]
      if (l.released) {
        l.tear = Math.min(1, l.tear + dt / LINK_TEAR)
        if (l.tear >= 1) list.splice(i, 1)
      } else l.grow = Math.min(1, l.grow + dt / LINK_GROW)
    }

    const baseOpacity = dark ? 0.38 : 0.3
    for (let slot = 0; slot < MAX_LINKS; slot++) {
      const line = linkLines[slot]
      const l = list[slot]
      if (!l) { line.visible = false; continue }
      world.fromArray(local, l.node * 3).applyMatrix4(group.matrixWorld)
      // Put the cursor end on the node's depth plane so the line sits in the scene
      ndc.copy(world).project(camera)
      cursor.set((mx / r.width) * 2 - 1, -(my / r.height) * 2 + 1, ndc.z).unproject(camera)
      const pos = line.geometry.attributes.position
      const set = (i, v) => pos.setXYZ(i, v.x, v.y, v.z)
      if (!l.released) {
        // growing: shoots out from the cursor towards the node, slowing down on arrival
        const k = 1 - Math.pow(1 - l.grow, 3)
        tipA.lerpVectors(cursor, world, k)
        set(0, cursor); set(1, tipA); set(2, cursor); set(3, cursor)
        line.material.opacity = baseOpacity * Math.min(1, l.grow * 3)
      } else {
        // torn in the middle: each half snaps back to its own end (fast at first, then easing out)
        // while fading. A thread that hadn't fully arrived tears between the cursor and its tip.
        const reach = 1 - Math.pow(1 - l.grow, 3)
        tipEnd.lerpVectors(cursor, world, reach)                  // far end of the thread
        tipA.lerpVectors(cursor, tipEnd, 1 - TEAR_AT)             // tear point
        const k = 1 - Math.pow(1 - l.tear, 2.5)
        tipB.lerpVectors(tipA, cursor, k)                          // cursor half
        tipA.lerp(tipEnd, k)                                       // node half
        set(0, cursor); set(1, tipB); set(2, tipEnd); set(3, tipA)
        line.material.opacity = baseOpacity * (1 - l.tear) * (1 - l.tear)
      }
      pos.needsUpdate = true
      line.visible = true
    }
  }

  return (
    <>
      <group ref={groupRef}>
        <lineSegments geometry={edgeGeo} material={edgeMat} />
        <points geometry={nodeGeo} material={nodeMat} />
      </group>
      {linkLines.map((line, i) => <primitive key={i} object={line} />)}
    </>
  )
}

export default function NetworkOrb3D({ mouseRef, active = true, onBuilt }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <BrainNet mouseRef={mouseRef} onBuilt={onBuilt} />
    </Canvas>
  )
}
