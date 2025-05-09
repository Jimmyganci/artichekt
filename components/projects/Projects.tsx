'use client'
import {
  Image,
  MeshTransmissionMaterial,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useFBO,
  useGLTF,
  useScroll
} from '@react-three/drei'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function Projects({projects}: any) {
  const [isEnter, setIsEnter] = useState(false)

  function handleEnter() {
    setIsEnter(true)
  }
  function handleLeave() {
    setIsEnter(false)
  }
  return (
    <Canvas camera={{position: [0, 0, 20], fov: 15}} className="min-h-screen">
      <ScrollControls damping={0.2} pages={3} distance={0.5}>
        {projects.length > 0 &&
          projects.map((project: any, index: number) => (
            <Lens key={index} isEnter={isEnter}>
              <Scroll>
                <Typography title={project.title} />
                <Images images={project.imagesGalleries?.images} />
              </Scroll>
              <Scroll html>
                <div
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  style={{transform: 'translate3d(40vw, 212vh, 0)'}}
                  className={`w-[40vw] text-white ${isEnter ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </Scroll>
              {/** This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
                         By default threejs will only process objects if they are "seen" by the camera leading 
                         to jank as you scroll down. With <Preload> that's solved.  */}
              <Preload />
            </Lens>
          ))}
      </ScrollControls>
    </Canvas>
  )
}

function Lens({children, isEnter, damping = 0.15, ...props}: any) {
  const ref: any = useRef()
  const {nodes}: any = useGLTF('./lens-transformed.glb')
  const buffer = useFBO()
  const viewport = useThree((state) => state.viewport)
  const [scene] = useState(() => new THREE.Scene())

  // Utiliser un THREE.Vector3 pour l'échelle
  const scale = useRef(new THREE.Vector3(0.15, 0.15, 0.15)) // Initial scale

  useFrame((state, delta) => {
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15])

    // Animation de la position du rond
    easing.damp3(
      ref.current.position,
      [
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        15
      ],
      damping,
      delta
    )

    // Animation de l'échelle
    const targetScale: [x: number, y: number, z: number] = isEnter
      ? [0.45, 0.45, 0.45]
      : [0.15, 0.15, 0.15]
    easing.damp3(scale.current, targetScale, damping, delta) // Transition douce
    ref.current.scale.copy(scale.current) // Applique l'échelle lissée au mesh

    // Préparer et nettoyer le buffer
    state.gl.setRenderTarget(buffer)
    state.gl.setClearColor(0x000000, 0) // Fond transparent
    state.gl.clear(true, true, true) // Nettoyer le buffer
    state.gl.render(scene, state.camera)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          map={buffer.texture}
          transparent={true}
          opacity={1}
        />
      </mesh>
      <mesh
        ref={ref}
        rotation-x={Math.PI / 2}
        geometry={nodes.Cylinder.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.2}
          thickness={1.5}
          anisotropy={0.1}
          background={buffer.texture}
          chromaticAberration={0.04}
        />
      </mesh>
    </>
  )
}

function Images({images}: any) {
  const group: any = useRef()
  const data = useScroll()
  const {width, height} = useThree((state) => state.viewport)
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[2].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[3].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[4].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[5].material.grayscale =
      1 - data.range(1.6 / 3, 1 / 3)
    group.current.children[6].material.zoom =
      1 + (1 - data.range(2 / 3, 1 / 3)) / 3
  })
  return (
    <group ref={group} position={[0, -1.5, 0]}>
      <Image
        position={[-2, 0, 0]}
        scale={[4, height]}
        url={images[0].full_image_url}
      />
      <Image position={[2, 0, 3]} scale={3} url={images[1].full_image_url} />
      <Image
        position={[-2.05, -height, 6]}
        scale={[1, 3]}
        url={images[2].full_image_url}
      />
      <Image
        position={[-0.6, -height, 9]}
        scale={[1, 2]}
        url={images[3].full_image_url}
      />
      <Image
        position={[0.65, -height, 10.5]}
        scale={1.5}
        url={images[4].full_image_url}
      />
      <Image
        position={[-1.5, -height * 1.5, 7.5]}
        scale={[1.5, 3]}
        url={images[5].full_image_url}
      />
      <Image
        position={[0, -height * 2 - height / 4, 0]}
        scale={[width, height / 1.1]}
        url={images[6].full_image_url}
      />
    </group>
  )
}

function Typography({title}: {title: string}) {
  const titleSplitted = title.split(' ')
  const first = titleSplitted[0]
  const second = titleSplitted[1]
  const state: any = useThree()
  const {width, height} = state.viewport.getCurrentViewport(
    state.cameta,
    [0, 0, 12]
  )
  const shared = {
    letterSpacing: -0.1,
    color: '#7da365'
  }
  return (
    <>
      <Text
        anchorX="left"
        position={[-width / 2.5, -height / 10, 12]}
        {...shared}
      >
        {first}
      </Text>
      <Text
        anchorX="right"
        position={[width / 2.5, -height * 2, 12]}
        {...shared}
      >
        {second}
      </Text>
      <Text position={[0, -height * 4.624, 12]} {...shared}>
        {'projets'}
      </Text>
    </>
  )
}
