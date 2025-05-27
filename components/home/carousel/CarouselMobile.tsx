'use client'
import {chunkArray} from '@/lib/functions'
import {Image, Post} from '@/lib/types'
import {Preload, Scroll, ScrollControls} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Suspense} from 'react'
import PagesMobile from './PagesMobile'

function CarouselMobile({
  project,
  horizontal
}: {
  project: Post
  horizontal: boolean
}) {
  const {title, imagesGalleries} = project

  const chunkedImages: Image[][] = imagesGalleries
    ? chunkArray(imagesGalleries.images, 3)
    : []

  const extendedChunkedImages = [...chunkedImages, ...chunkedImages]

  return (
    imagesGalleries &&
    imagesGalleries.images.length > 0 &&
    title && (
      <Canvas
        className="w-full overflow-hidden min-h-screen"
        gl={{antialias: false}}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal={horizontal}
            damping={0.5}
            pages={chunkedImages.length + 1}
            distance={1}
          >
            <Scroll>
              <PagesMobile images={extendedChunkedImages} />
            </Scroll>
            <Scroll html>
              <h1>
                {title.split(' ').map((word, i) => (
                  <span
                    key={i}
                    style={{left: 100 + i * 50 + 'vw'}}
                    className={`odd:text-[40vw] text-primary even:text-[50vw] odd:sm:text-[20vw] even:sm:text-[30vw] sm:text-[20vw] absolute odd:top-[10vh] even:top-[50vh]`}
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

export default CarouselMobile
