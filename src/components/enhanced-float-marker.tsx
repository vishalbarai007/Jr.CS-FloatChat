"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface FloatData {
  Latitude: string
  Longitude: string
  Location: string
}

export function EnhancedFloatMarker({
  float,
  position,
  onClick,
}: {
  float: FloatData
  position: THREE.Vector3
  onClick: () => void
}) {
  const markerRef = useRef<THREE.Mesh>(null)

  // Add a subtle animation (pulsating scale)
  useFrame(({ clock }) => {
    if (markerRef.current) {
      const t = clock.getElapsedTime()
      markerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1) // 10% pulse
    }
  })

  return (
    <mesh
      ref={markerRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default"
      }}
    >
      {/* Marker sphere */}
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={0.6} />
    </mesh>
  )
}
