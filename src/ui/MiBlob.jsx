import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReduced } from '../lib/motion'
import { voiceLevel } from '../lib/sound'

// Mi's body: a small drop of liquid chrome in 3D. A sphere whose surface flows with slow waves, a
// little more when it talks (the voice's level), polished metal mirroring a bright studio — so it
// reads as chrome on the white page: its own environment, a bright studio — white above, a dark band
// at the horizon (what makes chrome look like chrome), light grey below, a few soft light panels. The eyes sit over it (Buddy). Drawn into its own tiny canvas.
export default function MiBlob() {
  const ref = useRef()
  useEffect(() => {
    const cv = ref.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }) } catch { return }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2) * 2.4) // sharp also while it is shown large (its introduction)
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15
    const scene = new THREE.Scene(), pmrem = new THREE.PMREMGenerator(renderer)
    const studio = () => {
      const env = new THREE.Scene()
      const c = document.createElement('canvas'); c.width = 16; c.height = 256
      const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256)
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.38, '#f2f2f5'); g.addColorStop(0.47, '#9a9ba2'); g.addColorStop(0.5, '#3b3c42')
      g.addColorStop(0.54, '#a9aab0'); g.addColorStop(0.75, '#e4e4e8'); g.addColorStop(1, '#cfd0d5')
      x.fillStyle = g; x.fillRect(0, 0, 16, 256)
      const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.flipY = false
      env.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide })))
      for (const [px, py, pz, w, h] of [[-4, 4, 5, 4, 2], [5, 2, 3, 2, 3], [0, 6, -4, 6, 1.5]]) {
        const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: 0xffffff }))
        panel.position.set(px, py, pz); panel.lookAt(0, 0, 0); env.add(panel)
      }
      return env
    }
    scene.environment = pmrem.fromScene(studio(), 0.01).texture
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20); camera.position.set(0, 0, 4.2)
    const geo = new THREE.IcosahedronGeometry(1, 24)
    const base = geo.attributes.position.array.slice()
    const mat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.1 })
    const mesh = new THREE.Mesh(geo, mat); scene.add(mesh)
    const still = prefersReduced(), t0 = performance.now()
    let raf = 0, size = '', lvl = 0
    const pos = geo.attributes.position
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const W = cv.clientWidth, H = cv.clientHeight
      if (!W) return
      if (size !== `${W}x${H}`) { size = `${W}x${H}`; renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix() }
      const t = still ? 1 : (now - t0) / 1000
      lvl += (voiceLevel() - lvl) * 0.3
      const amp = 0.05 + lvl * 0.12
      // the liquid: three slow waves over the surface, a quicker shiver while it talks
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2]
        const w = Math.sin(x * 2.6 + t * 1.3) * Math.sin(y * 2.2 + t * 1.1) * Math.sin(z * 2.4 + t * 0.9) + Math.sin((x + y) * 5 + t * 9) * lvl * 0.4
        const k = 1 + w * amp
        pos.array[i * 3] = x * k; pos.array[i * 3 + 1] = y * k * 0.96; pos.array[i * 3 + 2] = z * k
      }
      pos.needsUpdate = true; geo.computeVertexNormals()
      mesh.rotation.y = Math.sin(t * 0.4) * 0.3; mesh.rotation.x = Math.sin(t * 0.3) * 0.15
      renderer.render(scene, camera)
      if (still) { cancelAnimationFrame(raf); raf = 0 }
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); geo.dispose(); mat.dispose(); scene.environment?.dispose(); pmrem.dispose(); renderer.dispose() }
  }, [])
  return <canvas ref={ref} aria-hidden className="absolute -inset-[18%] w-[136%] h-[136%] pointer-events-none" />
}
