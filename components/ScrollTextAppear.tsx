'use client'

import React, {useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import Link from 'next/link'
import Image from 'next/image'
import TitleSection from './TitleSection'

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
      className={`min-h-[100vh] sm:min-h-[100vh] mt-8 flex justify-center items-center`}
    >
      <div className="toSlide sm:w-fit">
        <TitleSection title={name} primary={false} />

        <p
          className={`text-2xl w-full text-right sm:w-2/3 pl-28 sm:text-3xl mx-auto ${primary ? 'text-primary' : 'text-black'}  mt-12`}
          ref={textRef}
        >
          {content.split(' ').map((word, index) => (
            <span className="opacity-0" key={index}>
              {word}{' '}
            </span>
          ))}
        </p>
        <Link
          className="text-2xl w-fit mx-auto flex items-center gap-4 justify-center"
          href={'/lagence'}
        >
          <span className="font-bold">{'tout voir'}</span>
          <span>
            <Image
              src={'./assets/icons/arrow-right.svg'}
              width={50}
              height={50}
              alt="arrow right"
            />{' '}
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ScrollTextAppear
