'use client'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import {useRef} from 'react'
import {gsapTo} from '@/lib/functions'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function ImageHero({heroImage}: any) {
  const main = useRef<any>()

  useGSAP(
    () => {
      gsapTo('.image-hero', 0.1)
    },
    {scope: main}
  )

  return (
    <div ref={main} className="hidden sm:block sm:w-1/2 sm:pt-[8vw]">
      <img
        className="image-hero object-cover h-full w-full m-0"
        src={heroImage.mediaItemUrl}
        alt={heroImage.altText}
      />
    </div>
  )
}

export default ImageHero
