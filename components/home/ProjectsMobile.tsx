'use client'
import {Post} from '@/lib/types'
import {
  Image,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useScroll
} from '@react-three/drei'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {useRef} from 'react'

export default function Projects({project}: {project: Post}) {
  const title = project.title

  return (
    <Canvas camera={{position: [0, 0, 20], fov: 15}} className="min-h-screen">
      <ScrollControls damping={0.2} pages={3} distance={0.5} horizontal={true}>
        <Scroll>
          <Images images={project.imagesGalleries?.images} />
        </Scroll>
        <Scroll html>
          <h1>
            {title.split(' ').map((word, i) => (
              <span
                key={i}
                style={{left: 50 + i * 50 + 'vw'}}
                className={`odd:text-[40vw] text-primary even:text-[50vw] odd:sm:text-[20vw] even:sm:text-[30vw] sm:text-[20vw] absolute odd:top-[10vh] even:top-[50vh]`}
              >
                {word}
              </span>
            ))}
          </h1>
        </Scroll>
        {/** This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
                         By default threejs will only process objects if they are "seen" by the camera leading 
                         to jank as you scroll down. With <Preload> that's solved.  */}
        <Preload />
      </ScrollControls>
    </Canvas>
  )
}

function Images({images}: any) {
  const group: any = useRef()
  const data = useScroll()

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
        position={[-1, 2, 0]}
        scale={[4, 2]}
        url={images[0].full_image_url}
      />
      <Image
        position={[0, 0.75, 3]}
        scale={[2, 2]}
        url={images[1].full_image_url}
      />
      <Image
        position={[2, 2, 4]}
        scale={[2, 2]}
        url={images[2].full_image_url}
      />
      <Image
        position={[5, 1, 3]}
        scale={[3, 2]}
        url={images[3].full_image_url}
      />
      <Image
        position={[10, 1.7, 7.5]}
        scale={[2, 1.5]}
        url={images[4].full_image_url}
      />
      <Image
        position={[8, 2, 2]}
        scale={[3, 1]}
        url={images[5].full_image_url}
      />
      <Image
        position={[12, 1, 5]}
        scale={[1, 2]}
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640

  const shared = {
    fontSize: isMobile ? 0.2 : 0.5,
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
        position={[(width / 2.5) * 1.2, -height * 2, 12]}
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
