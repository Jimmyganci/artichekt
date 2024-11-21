import {Post} from '@/lib/types'
import Image from 'next/image'
import React from 'react'

function ServiceCard({title, featuredImage}: Post) {
  return (
    <div className="relative h-[500px] w-[400px] overflow-hidden cursor-pointer">
      <div className="absolute top-0 left-0 w-full h-full mt-0 mn-0 transform transition-transform duration-300 hover:scale-110">
        <Image
          className="object-cover w-full h-full mt-0 mb-0 grayscale hover:grayscale-0"
          src={featuredImage.node.sourceUrl}
          width={500}
          height={400}
          alt={featuredImage.node.altText}
        />
      </div>
      <h6 className="absolute text-[26px] px-9 leading-tight bottom-2 text-center w-full text-white font-bold">
        {title}
      </h6>
    </div>
  )
}

export default ServiceCard
