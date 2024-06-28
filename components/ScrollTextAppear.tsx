'use client'

import React, {useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

function ScrollTextAppear({
  link: {path, name},
  content,
  primary
}: {
  link: {path: string; name: string}
  content: string
  primary: boolean
}) {
  const container = useRef<any>()
  const textRef = useRef<any>()

  useGSAP(
    () => {
      const words = gsap.utils.toArray('.toSlide span')
      gsap.fromTo(
        words,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.toSlide',
            start: 'center center',
            end: '+=600',
            pin: true,
            // markers: true,
            scrub: true
          }
        }
      )
    },
    {scope: container}
  )

  return (
    <div
      ref={container}
      className={`min-h-[100vh] sm:min-h-[100vh] flex justify-center items-center`}
    >
      <div className="toSlide sm:w-fit text-center">
        <Link href={path}>
          <h4 className={primary ? 'text-primary' : 'text-black'}>
            <span className="relative after:h-px after:absolute after:w-1/2 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:bg-primary">
              {name}
            </span>
          </h4>
        </Link>

        <p
          className={`text-2xl w-full sm:w-2/3 sm:text-3xl mx-auto ${primary ? 'text-primary' : 'text-black'}  mt-12`}
          ref={textRef}
        >
          {content.split(' ').map((word, index) => (
            <span className="opacity-0" key={index}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default ScrollTextAppear
