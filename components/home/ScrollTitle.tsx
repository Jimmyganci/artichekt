'use client'
import {useEffect, useRef} from 'react'

import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'

function ScrollTitle() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 50%',
          end: 'bottom 70%',
          scrub: 2.5,
          pin: false,
          markers: false
        }
      })

      timeline
        .fromTo(
          '.scrollFromRight',
          {x: '100vw'}, // État initial
          {x: 0, duration: 200}
        )
        .fromTo(
          '.scrollFromLeft',
          {x: '-100vw'}, // État initial
          {x: 0, duration: 200},
          '<' // '<' synchronise cette animation avec la précédente
        )

      const timeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 2%',
          end: '+=800',
          scrub: 2,
          pin: true,
          markers: false
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center relative scrollTitleContainer"
    >
      <div className="flex flex-col ">
        <Image
          width={1000}
          height={800}
          alt="test"
          src={'/images/golden_hours.png'}
          className="absolute -z-10 top-[50%] scale-75 sm:scale-50 will-change-transform transform-cpu -translate-x-[25%] -translate-y-[50%] left-0 sm:left-[30%] image scrollFromRight"
        />
        <span className="text-4xl sm:text-8xl lg:text-9xl font-fontBold text-black whitespace-nowrap scrollFromRight text">
          {'UN LIEU'}
        </span>
        <span className="text-4xl sm:text-8xl lg:text-9xl font-fontBold text-black whitespace-nowrap scrollFromLeft text">
          {'PHYSIQUE POUR'}
        </span>
        <span className="text-4xl sm:text-8xl lg:text-9xl font-fontBold text-black whitespace-nowrap scrollFromRight text">
          {'VOUS ACCUEILLIR'}
        </span>
      </div>
    </div>
  )
}

export default ScrollTitle
