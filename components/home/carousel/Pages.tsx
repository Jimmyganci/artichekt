import {useThree} from '@react-three/fiber'
import React from 'react'
import Page from './Page'
import {Image} from '@/lib/types'

function Pages({images}: {images: Image[][]}) {
  const {width} = useThree((state) => state.viewport)

  return (
    <>
      {images.map((chunk, index) => (
        <Page
          key={index}
          position={[width * index, 0, 0]}
          // position={[index === 0 ? -width * 1 : width * index, 0, 0]}
          urls={chunk.map((image) => image.full_image_url)}
        />
      ))}
    </>
  )
}

{
  /* <Page
        position={[-width * 1, 0, 0]}
        urls={['/trip1.jpg', '/trip2.jpg', '/trip3.jpg']}
      />
      <Page
        position={[width * 0, 0, 0]}
        urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']}
      />
      <Page
        position={[width * 2, 0, 0]}
        urls={['/trip1.jpg', '/trip2.jpg', '/trip3.jpg']}
      />
      <Page
        position={[width * 3, 0, 0]}
        urls={['/img1.jpg', '/img2.jpg', '/img3.jpg']}
      />
      <Page
        position={[width * 4, 0, 0]}
        urls={['/img4.jpg', '/img5.jpg', '/img6.jpg']}
      /> */
}

export default Pages
