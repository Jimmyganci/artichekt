'use client'
import {Canvas} from '@react-three/fiber'
import React, {Suspense} from 'react'
import {Scroll, ScrollControls} from './ScrollControls'
import Pages from './Pages'
import {Preload} from '@react-three/drei'

function Carousel() {
  return (
    <Canvas gl={{antialias: false}} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html>
            <h1
              className={`text-[40vw] sm:text-[20vw] absolute top-[10vh] left-[100vw]`}
            >
              LE
            </h1>
            <h1
              className={`text-[50vw] sm:text-[30vw] absolute top-[50vh] left-[150vw]`}
            >
              KATANA
            </h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  )
}

export default Carousel
