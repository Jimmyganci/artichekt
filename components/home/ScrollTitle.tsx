'use client'
import React, {useEffect, useRef} from 'react'

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
          start: 'top 90%',
          end: 'bottom 80%',
          scrub: 2.5,
          pin: false,
          markers: true
        }
      })

      timeline
        .fromTo(
          '.scrollFromRight',
          {x: '100vw'}, // État initial
          {x: 0, duration: 100}
        )
        .fromTo(
          '.scrollFromLeft',
          {x: '-100vw'}, // État initial
          {x: 0, duration: 100},
          '<' // '<' synchronise cette animation avec la précédente
        )

      const timeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 35%',
          end: '+=800',
          scrub: 2,
          pin: true,
          markers: true
        }
      })
      timeline2
        .to('.scrollTitleContainer .text', {opacity: 0, duration: 100})
        .to(
          '.image',
          {
            xPercent: -50,
            yPercent: -50,
            scale: 1.5,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 200,
            top: '40%',
            left: '50%',
            ease: 'power1.out'
          },
          '<'
        )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative scrollTitleContainer">
      <div ref={containerRef} className="flex flex-col ">
        <Image
          width={1000}
          height={800}
          alt="test"
          src={'/imagesTest/img8.jpg'}
          className="absolute -z-10 top-[20%] scale-50 will-change-transform transform-cpu -translate-x-[25%] -translate-y-[50%] left-[20%] image scrollFromRight"
        />
        <span className="text-9xl font-fontMedium text-black whitespace-nowrap scrollFromRight text">
          {'UN LIEU'}
        </span>
        <span className="text-9xl font-fontMedium text-black whitespace-nowrap scrollFromLeft text">
          {'PHYSIQUE POUR'}
        </span>
        <span className="text-9xl font-fontMedium text-black whitespace-nowrap scrollFromRight text">
          {'VOUS ACCUEILLIR'}
        </span>
      </div>
    </div>
  )
}

export default ScrollTitle
