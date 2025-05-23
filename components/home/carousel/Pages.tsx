import {Image} from '@/lib/types'
import {useThree} from '@react-three/fiber'
import Page from './Page'

function Pages({images}: {images: Image[][]}) {
  const {width} = useThree((state) => state.viewport)

  return (
    <>
      {images.map((chunk, index) => (
        <Page
          key={index}
          position={[width * index, 0, 0]}
          urls={chunk.map((image) => image.full_image_url)}
        />
      ))}
    </>
  )
}

export default Pages
