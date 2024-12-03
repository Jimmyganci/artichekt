'use client'

import React, {useRef} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import TitleSection from './TitleSection'
import SeeAll from './layouts/SeeAll'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {generateUUID} from 'three/src/math/MathUtils.js'

function ScrollTextAppear({
  name,
  content,
  primary,
  id
}: {
  name?: string
  content: string
  primary: boolean
  id: string
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
            markers: false,
            scrub: true
            // onLeave: () => {
            //   if (yForced) {
            //     gsap.set('.toSlide', {y: '-600px'})
            //   }
            // }
          }
        }
      )
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    {scope: container}
  )

  return (
    <div
      ref={container}
      className={`min-h-[100vh] sm:min-h-[100vh] mt-8 flex justify-evenly items-center`}
    >
      <div className={`toSlide sm:w-fit`}>
        {name && <TitleSection title={name} primary={false} />}

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
        <SeeAll path={`/${name}`} />
      </div>
    </div>
  )
}

export default ScrollTextAppear
