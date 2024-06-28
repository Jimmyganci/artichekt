'use client'
import {Canvas} from '@react-three/fiber'
import React, {Suspense} from 'react'
import {Scroll, ScrollControls} from './ScrollControls'
import Pages from './Pages'
import {Preload} from '@react-three/drei'
import {Image, Post} from '@/lib/types'
import {chunkArray} from '@/lib/functions'

function Carousel({project}: {project: Post}) {
  const {title, imagesGalleries} = project

  const chunkedImages: Image[][] = imagesGalleries
    ? chunkArray(imagesGalleries.images, 3)
    : []

  const extendedChunkedImages = [...chunkedImages, ...chunkedImages]

  return (
    imagesGalleries &&
    imagesGalleries.images.length > 0 &&
    title && (
      <Canvas gl={{antialias: false}} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal
            damping={4}
            pages={chunkedImages.length + 1}
            distance={1}
          >
            <Scroll>
              <Pages images={extendedChunkedImages} />
            </Scroll>
            <Scroll html>
              <h1>
                {title.split(' ').map((word, i) => (
                  <span
                    key={i}
                    style={{left: 100 + i * 50 + 'vw'}}
                    className={`odd:text-[40vw] even:text-[50vw] odd:sm:text-[20vw] even:sm:text-[30vw] sm:text-[20vw] absolute odd:top-[10vh] even:top-[50vh]`}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    )
  )
}

export default Carousel
