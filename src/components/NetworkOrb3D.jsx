import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 62
const MAX_EDGES = 110
// 9 anchor indices — one per badge, well distributed
const ANCHOR_INDICES = [0, 7, 14, 21, 28, 35, 42, 49, 56]

function BrainNet({ mouseRef, projectedRef }) {
  const groupRef = useRef()
  const time = useRef(0)
  const mouseOffset = useRef({ x: 0, y: 0 })

  const { edgeGeo, nodeGeo, anchorVecs } = useMemo(() => {
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
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(vecs.flatMap(v => [v.x, v.y, v.z])), 3
    ))
    const anchorVecs = ANCHOR_INDICES.map(i => vecs[i].clone())
    return { edgeGeo, nodeGeo, anchorVecs }
  }, [])

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#818cf8', transparent: true, opacity: 0.12 }), [])
  const nodeMat = useMemo(() => new THREE.PointsMaterial({ color: '#a5b4fc', size: 0.048, transparent: true, opacity: 0.42 }), [])

  useEffect(() => () => { edgeGeo.dispose(); nodeGeo.dispose(); edgeMat.dispose(); nodeMat.dispose() }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const dark = document.documentElement.classList.contains('dark')

    edgeMat.color.set(dark ? '#818cf8' : '#6366f1')
    edgeMat.opacity = dark ? 0.12 : 0.09
    nodeMat.color.set(dark ? '#a5b4fc' : '#4f46e5')
    nodeMat.opacity = dark ? 0.42 : 0.35

    time.current += delta
    if (mouseRef?.current) {
      const nx = (mouseRef.current.x / window.innerWidth) * 2 - 1
      const ny = -((mouseRef.current.y / window.innerHeight) * 2 - 1)
      mouseOffset.current.x = THREE.MathUtils.lerp(mouseOffset.current.x, ny * 0.35, 0.04)
      mouseOffset.current.y = THREE.MathUtils.lerp(mouseOffset.current.y, nx * 0.45, 0.04)
    }
    groupRef.current.rotation.y = time.current * 0.18 + mouseOffset.current.y
    groupRef.current.rotation.x = time.current * 0.07 + mouseOffset.current.x

    // Project anchor nodes to 2D canvas coordinates each frame
    if (projectedRef) {
      projectedRef.current = anchorVecs.map(vec => {
        const worldPos = vec.clone()
        groupRef.current.localToWorld(worldPos)
        const ndc = worldPos.clone().project(state.camera)
        return {
          x: (ndc.x * 0.5 + 0.5) * state.size.width,
          y: (-ndc.y * 0.5 + 0.5) * state.size.height,
          behind: ndc.z > 1,
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgeGeo} material={edgeMat} />
      <points geometry={nodeGeo} material={nodeMat} />
    </group>
  )
}

export default function NetworkOrb3D({ mouseRef, projectedRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <BrainNet mouseRef={mouseRef} projectedRef={projectedRef} />
    </Canvas>
  )
}
