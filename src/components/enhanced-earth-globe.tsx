"use client"

import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export function EnhancedEarthGlobe({
  isHovered,
  setHovered,
}: {
  isHovered: boolean
  setHovered: (h: boolean) => void
}) {
  const earthRef = useRef<THREE.Mesh>(null)

  // Load textures
  const [colorMap, bumpMap, specularMap] = useTexture([
    "/textures/earth_daymap.jpg",
    // "/textures/earth_bump.jpg",
    // "/textures/earth_specular.jpg",
  ])

  // Rotate Earth slowly
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh
      ref={earthRef}
      scale={isHovered ? 2.2 : 2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* geometry */}
      <sphereGeometry args={[1, 64, 64]} />

      {/* material */}
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.05}
        roughnessMap={specularMap} // treat specular as roughness
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}
