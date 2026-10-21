import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 62
const MAX_EDGES = 110
// Cursor links: a node connects inside CONNECT_R and lets go beyond RELEASE_R (px)
const MAX_LINKS = 2
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

function BrainNet({ mouseRef }) {
  const groupRef = useRef()
  const time = useRef(0)
  const mouseOffset = useRef({ x: 0, y: 0 })
  const links = useRef([]) // { node, strength, released }
  // Scratch objects reused every frame (no per-frame allocations)
  const tmp = useMemo(() => ({ mvp: new THREE.Matrix4(), world: new THREE.Vector3(), ndc: new THREE.Vector3(), cursor: new THREE.Vector3() }), [])
  const scr = useMemo(() => ({ sx: new Float32Array(NODE_COUNT), sy: new Float32Array(NODE_COUNT), front: new Uint8Array(NODE_COUNT) }), [])

  const { edgeGeo, nodeGeo, local } = useMemo(() => {
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
    const edgePos = []
    pairs.forEach(([a, b]) => {
      edgePos.push(vecs[a].x, vecs[a].y, vecs[a].z, vecs[b].x, vecs[b].y, vecs[b].z)
    })
    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePos), 3))
    const local = new Float32Array(vecs.flatMap(v => [v.x, v.y, v.z]))
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(local, 3))
    return { edgeGeo, nodeGeo, local }
  }, [])

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#818cf8', transparent: true, opacity: 0.12 }), [])
  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: '#a5b4fc', size: 0.06, transparent: true, opacity: 0.42,
    map: makeDotTexture(), alphaTest: 0.01, depthWrite: false,
  }), [])

  // One line object per possible cursor link, each with its own opacity for fading
  const linkLines = useMemo(() => Array.from({ length: MAX_LINKS }, () => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
    const mat = new THREE.LineBasicMaterial({ color: '#a5b4fc', transparent: true, opacity: 0, depthWrite: false })
    const line = new THREE.Line(geo, mat)
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
    if (mouseRef?.current) {
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
    const { mvp, world, ndc, cursor } = tmp
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
      list.push({ node: best, strength: 0, released: false })
      active++
    }

    // Fade in / out, dropping links that have fully faded
    // Connecting is near-instant, letting go stays soft
    const dt = Math.min(delta, 0.1)
    const kIn = 1 - Math.exp(-dt * 40)
    const kOut = 1 - Math.exp(-dt * 9)
    for (let i = list.length - 1; i >= 0; i--) {
      const l = list[i]
      l.strength += ((l.released ? 0 : 1) - l.strength) * (l.released ? kOut : kIn)
      if (l.released && l.strength < 0.01) list.splice(i, 1)
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
      // While fading out, the line retracts towards the node
      if (l.released) cursor.lerpVectors(world, cursor, l.strength)
      const pos = line.geometry.attributes.position
      pos.setXYZ(0, world.x, world.y, world.z)
      pos.setXYZ(1, cursor.x, cursor.y, cursor.z)
      pos.needsUpdate = true
      line.material.opacity = baseOpacity * l.strength
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

export default function NetworkOrb3D({ mouseRef, active = true }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <BrainNet mouseRef={mouseRef} />
    </Canvas>
  )
}
