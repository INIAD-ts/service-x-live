import React from 'react'
import { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

type Url = {
  url: string
}

function Sphere(props: Url) {
  const map = new THREE.TextureLoader().load(props.url)

  return (
    <mesh>
      <sphereBufferGeometry
        args={[3, 64, 32]}
        attach="geometry"
      />
      <meshBasicMaterial
        map={map}
        side={THREE.BackSide}
        attach="material"
      />
    </mesh>
  )
}

function App(props: Url) {
  return (
    <Canvas
      camera={{ fov: 70, near: 0.01, far: 100, position: [0, 0, 1] }}
      style={{ height: '100vh', backgroundColor: '#87CEEB' }}
    >
      <OrbitControls
        enableZoom={false}
        enablePan={false}
      />
      <Suspense fallback={null}>
        <Sphere url={props.url} />
      </Suspense>
    </Canvas>
  )
}

export default App
