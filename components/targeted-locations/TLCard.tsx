import {Post} from '@/lib/types'
import Image from 'next/image'

function TLCard({title, featuredImage}: Post) {
  return (
    <div className="relative w-full sm:max-w-[400px] aspect-[2/3] overflow-hidden cursor-pointer">
      <div className="absolute top-0 left-0 w-full h-full transform transition-transform duration-300 hover:scale-110">
        <Image
          className="object-cover w-full h-full grayscale hover:grayscale-0"
          src={featuredImage.node.sourceUrl}
          alt={featuredImage.node.altText}
          layout="fill" // Cette propriété permet de remplir entièrement l'élément parent
        />
      </div>
      <h6 className="absolute left-1/2 -translate-x-1/2 text-3xl sm:text-[24px] p-1 bg-white bg-opacity-60 leading-tight bottom-0 text-center w-full text-white font-bold">
        {title}
      </h6>
    </div>
  )
}

export default TLCard
