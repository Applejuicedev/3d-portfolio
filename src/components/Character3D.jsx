import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CartoonCharacter({ mouseRef }) {
  const headGroupRef = useRef()

  const mat = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({ color: '#F5C5A3', roughness: 0.75, metalness: 0 }),
    skinDark: new THREE.MeshStandardMaterial({ color: '#E8A882', roughness: 0.8, metalness: 0 }),
    hair: new THREE.MeshStandardMaterial({ color: '#4A2F1A', roughness: 0.9, metalness: 0 }),
    eyeWhite: new THREE.MeshStandardMaterial({ color: '#FEFEFE', roughness: 0.2, metalness: 0 }),
    iris: new THREE.MeshStandardMaterial({ color: '#3D2314', roughness: 0.8, metalness: 0 }),
    pupil: new THREE.MeshStandardMaterial({ color: '#0A0500', roughness: 0.9, metalness: 0 }),
    shine: new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0, metalness: 0.1, emissive: '#FFFFFF', emissiveIntensity: 0.3 }),
    hoodie: new THREE.MeshStandardMaterial({ color: '#3E7B52', roughness: 0.85, metalness: 0 }),
    hoodieSeam: new THREE.MeshStandardMaterial({ color: '#2D5C3D', roughness: 0.9, metalness: 0 }),
    lips: new THREE.MeshStandardMaterial({ color: '#C97B6E', roughness: 0.7, metalness: 0 }),
    blush: new THREE.MeshStandardMaterial({ color: '#F09090', roughness: 1, metalness: 0, transparent: true, opacity: 0.35 }),
    brow: new THREE.MeshStandardMaterial({ color: '#3A1F0D', roughness: 0.9, metalness: 0 }),
  }), [])

  useFrame(() => {
    if (!headGroupRef.current || !mouseRef?.current) return
    const { x, y } = mouseRef.current
    const nx = (x / window.innerWidth) * 2 - 1
    const ny = -((y / window.innerHeight) * 2 - 1)
    const targetY = THREE.MathUtils.clamp(nx * 0.42, -0.42, 0.42)
    const targetX = THREE.MathUtils.clamp(ny * 0.22, -0.22, 0.22)
    headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, targetY, 0.06)
    headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, targetX, 0.06)
  })

  return (
    <group position={[0, -0.6, 0]}>
      {/* Body — hoodie */}
      <mesh material={mat.hoodie} position={[0, -1.35, 0]}>
        <capsuleGeometry args={[0.58, 1.4, 8, 16]} />
      </mesh>

      {/* Hood / collar area */}
      <mesh material={mat.hoodieSeam} position={[0, -0.45, 0.08]} rotation={[0.1, 0, 0]}>
        <torusGeometry args={[0.3, 0.07, 8, 20, Math.PI]} />
      </mesh>

      {/* Shoulders */}
      <mesh material={mat.hoodie} position={[-0.82, -0.72, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
      </mesh>
      <mesh material={mat.hoodie} position={[0.82, -0.72, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
      </mesh>

      {/* Neck */}
      <mesh material={mat.skin} position={[0, -0.18, 0.04]}>
        <cylinderGeometry args={[0.17, 0.2, 0.42, 16]} />
      </mesh>

      {/* HEAD GROUP — rotates to follow cursor */}
      <group ref={headGroupRef} position={[0, 0.62, 0]}>

        {/* Head */}
        <mesh material={mat.skin} scale={[1, 1.1, 0.96]}>
          <sphereGeometry args={[0.82, 48, 48]} />
        </mesh>

        {/* Ears */}
        <mesh material={mat.skin} position={[-0.84, 0.04, 0]} scale={[0.24, 0.32, 0.22]}>
          <sphereGeometry args={[1, 16, 16]} />
        </mesh>
        <mesh material={mat.skin} position={[0.84, 0.04, 0]} scale={[0.24, 0.32, 0.22]}>
          <sphereGeometry args={[1, 16, 16]} />
        </mesh>
        {/* Ear inner */}
        <mesh material={mat.skinDark} position={[-0.84, 0.04, 0.04]} scale={[0.14, 0.2, 0.14]}>
          <sphereGeometry args={[1, 12, 12]} />
        </mesh>
        <mesh material={mat.skinDark} position={[0.84, 0.04, 0.04]} scale={[0.14, 0.2, 0.14]}>
          <sphereGeometry args={[1, 12, 12]} />
        </mesh>

        {/* HAIR — top cap */}
        <mesh material={mat.hair} position={[0, 0.36, -0.08]} scale={[1.04, 0.72, 1.02]}>
          <sphereGeometry args={[0.85, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        </mesh>

        {/* Hair front — bangs */}
        <mesh material={mat.hair} position={[0.22, 0.82, 0.5]} rotation={[0.3, 0.15, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>
        <mesh material={mat.hair} position={[-0.08, 0.88, 0.52]} rotation={[0.2, -0.05, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
        <mesh material={mat.hair} position={[0.42, 0.72, 0.4]} rotation={[0.15, 0.2, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>
        <mesh material={mat.hair} position={[-0.28, 0.8, 0.46]} rotation={[0.1, -0.1, 0]}>
          <sphereGeometry args={[0.17, 16, 16]} />
        </mesh>

        {/* Hair sides */}
        <mesh material={mat.hair} position={[-0.7, 0.28, 0.34]} scale={[0.5, 0.7, 0.5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
        </mesh>
        <mesh material={mat.hair} position={[0.7, 0.28, 0.34]} scale={[0.5, 0.7, 0.5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
        </mesh>

        {/* EYEBROWS */}
        <mesh material={mat.brow} position={[-0.3, 0.32, 0.75]} rotation={[0, 0, -0.18]}>
          <boxGeometry args={[0.28, 0.062, 0.05]} />
        </mesh>
        <mesh material={mat.brow} position={[0.3, 0.32, 0.75]} rotation={[0, 0, 0.18]}>
          <boxGeometry args={[0.28, 0.062, 0.05]} />
        </mesh>

        {/* LEFT EYE */}
        <mesh material={mat.eyeWhite} position={[-0.28, 0.12, 0.72]} scale={[1.15, 1.3, 0.55]}>
          <sphereGeometry args={[0.145, 20, 20]} />
        </mesh>
        <mesh material={mat.iris} position={[-0.28, 0.11, 0.795]} scale={[1, 1, 0.28]}>
          <sphereGeometry args={[0.095, 16, 16]} />
        </mesh>
        <mesh material={mat.pupil} position={[-0.28, 0.11, 0.82]} scale={[1, 1, 0.2]}>
          <sphereGeometry args={[0.056, 12, 12]} />
        </mesh>
        <mesh material={mat.shine} position={[-0.24, 0.16, 0.84]} scale={[1, 1, 0.2]}>
          <sphereGeometry args={[0.028, 8, 8]} />
        </mesh>
        <mesh material={mat.shine} position={[-0.3, 0.08, 0.83]} scale={[1, 1, 0.2]}>
          <sphereGeometry args={[0.016, 8, 8]} />
        </mesh>

        {/* RIGHT EYE */}
        <mesh material={mat.eyeWhite} position={[0.28, 0.12, 0.72]} scale={[1.15, 1.3, 0.55]}>
          <sphereGeometry args={[0.145, 20, 20]} />
        </mesh>
        <mesh material={mat.iris} position={[0.28, 0.11, 0.795]} scale={[1, 1, 0.28]}>
          <sphereGeometry args={[0.095, 16, 16]} />
        </mesh>
        <mesh material={mat.pupil} position={[0.28, 0.11, 0.82]} scale={[1, 1, 0.2]}>
          <sphereGeometry args={[0.056, 12, 12]} />
        </mesh>
        <mesh material={mat.shine} position={[0.32, 0.16, 0.84]} scale={[1, 1, 0.2]}>
          <sphereGeometry args={[0.028, 8, 8]} />
        </mesh>
        <mesh material={mat.shine} position={[0.26, 0.08, 0.83]} scale={[1, 1, 0.2]}>
          <sphereGeometry args={[0.016, 8, 8]} />
        </mesh>

        {/* NOSE */}
        <mesh material={mat.skinDark} position={[0, -0.07, 0.8]}>
          <sphereGeometry args={[0.078, 12, 12]} />
        </mesh>
        <mesh material={mat.skinDark} position={[-0.075, -0.1, 0.77]}>
          <sphereGeometry args={[0.048, 10, 10]} />
        </mesh>
        <mesh material={mat.skinDark} position={[0.075, -0.1, 0.77]}>
          <sphereGeometry args={[0.048, 10, 10]} />
        </mesh>

        {/* SMILE — torus rotated to form a U shape */}
        <mesh material={mat.lips} position={[0, -0.32, 0.76]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.145, 0.038, 8, 24, Math.PI]} />
        </mesh>

        {/* CHEEKS blush */}
        <mesh material={mat.blush} position={[-0.44, -0.1, 0.62]} scale={[1.6, 1, 0.45]}>
          <sphereGeometry args={[0.13, 12, 12]} />
        </mesh>
        <mesh material={mat.blush} position={[0.44, -0.1, 0.62]} scale={[1.6, 1, 0.45]}>
          <sphereGeometry args={[0.13, 12, 12]} />
        </mesh>
      </group>
    </group>
  )
}

export default function Character3D({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-3, 2, 4]} intensity={0.45} color="#B0C8FF" />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#FFE0C0" />
      <CartoonCharacter mouseRef={mouseRef} />
    </Canvas>
  )
}
