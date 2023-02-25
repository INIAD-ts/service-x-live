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
        args={[6, 72, 36]}
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
/*
export function Apptwo(props: Url) {
  window.addEventListener('load', function () {
    init()
  })

  let scene, camera, renderer

  function init() {
    //シーン、カメラ、レンダラーを生成
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1.6, 3)
    scene.add(camera)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    //canvasを作成
    const container = document.createElement('div')
    document.body.appendChild(container)
    container.appendChild(renderer.domElement)

    //球体の形状を生成
    const geometry = new THREE.SphereGeometry(100, 100, 100)
    geometry.scale(-1, 1, 1)

    //テクスチャ画像を読み込み
    const loader = new THREE.TextureLoader()
    const texture = loader.load('./img/pict.jpg')

    //球体のマテリアルを生成
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    })

    //球体を生成
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    //OrbitControlsを初期化
    const orbitControls = new OrbitControls(camera, renderer.domElement)

    render()
  }

  function render() {
    requestAnimationFrame(animate)
  }

  function animate() {
    renderer.render(scene, camera)
  }
}
*/
