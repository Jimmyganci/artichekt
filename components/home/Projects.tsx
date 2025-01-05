'use client'
import React, {useEffect, useRef, useState} from 'react'
import Carousel from './carousel/Carousel'
import {Post} from '@/lib/types'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

function Projects({project}: {project: Post}) {
  const containerRef = useRef<any>()

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'center center',
          end: '+=8000',
          scrub: true,
          pin: true,
          markers: false,
          pinSpacing: true
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
  return (
    <>
      <div
        ref={containerRef}
        className="min-h-screen w-[200vw] sm:w-screen h-full"
      >
        <Carousel project={project} />
      </div>
    </>
  )
}

export default Projects
