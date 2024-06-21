'use client'
import {Canvas} from '@react-three/fiber'
import React, {Suspense} from 'react'
import {Scroll, ScrollControls} from './ScrollControls'
import Pages from './Pages'
import {Preload} from '@react-three/drei'
import {isMobile} from '@/lib/functions'

function Carousel() {
  return (
    <Canvas
      style={{width: isMobile() ? '200vw' : 'auto'}}
      gl={{antialias: false}}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html>
            <h1
              className={isMobile() ? `text-[40vw]` : 'text-[20vw]'}
              style={{position: 'absolute', top: '0vh', left: '100vw'}}
            >
              LE
            </h1>
            <h1
              className={isMobile() ? `text-[50vw]` : 'text-[30vw]'}
              style={{position: 'absolute', top: '50vh', left: '150vw'}}
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
