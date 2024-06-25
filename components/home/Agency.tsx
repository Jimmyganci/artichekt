'use client'

import React, {useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function Agency() {
  const content = `Notre agence propose une expertise technique solide qui s’appuie sur
    un réseau de professionnels compétents tout en développant une
    approche innovante et pluridisciplinaire.`

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
        <h4 className="text-primary ">
          <span className="relative after:h-px after:absolute after:w-1/2 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:bg-primary">
            {`L'agence`}
          </span>
        </h4>
        <p
          className="text-2xl w-full sm:w-1/2 sm:text-3xl mx-auto text-primary mt-7"
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

export default Agency
