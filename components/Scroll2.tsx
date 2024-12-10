'use client'

import React, {useEffect, useRef} from 'react'
import gsap from 'gsap'
import TitleSection from './TitleSection'
import SeeAll from './layouts/SeeAll'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

function Scroll2({
  name,
  content,
  primary,
  position = 'right'
}: {
  name?: string
  content: string
  primary: boolean
  position?: string
}) {
  const containerRef = useRef<any>()
  const textRef = useRef<any>()
  let test = 'text-right'
  let test2 = 'left-[92%]'

  if (position === 'left') {
    test = 'text-left'
    test2 = 'left-0'
  }

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      // Récupérer les mots à animer
      const words = container.querySelectorAll('.containerText span')

      // Définir les animations GSAP avec ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container, // Élément déclencheur
          start: '40% center', // Début de l'animation
          end: '+=600', // Fin de l'animation
          scrub: true, // Synchronisé avec le scroll
          pin: true, // Active le pin
          markers: false // Débogage
        }
      })

      // Ajouter les animations des mots à la timeline
      timeline.fromTo(
        words,
        {opacity: 0}, // État initial
        {
          opacity: 1, // État final
          duration: 1,
          stagger: 0.2 // Animation en cascade
        }
      )
    }

    // Nettoyage des ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className={`my-8`}>
      <div
        className={`containerText sm:w-fit min-h-screen flex flex-col justify-evenly`}
      >
        {name && <TitleSection title={name} primary={false} />}

        <p
          className={`relative text-2xl w-full ${test} sm:w-2/3 pl-28 sm:text-3xl mx-auto ${primary ? 'text-primary' : 'text-black'}  mt-12`}
          ref={textRef}
        >
          {content.split(' ').map((word, index) => (
            <span key={index}>{word} </span>
          ))}
          <em className="opacity-50">
            <span
              className={`absolute text-primary text-[300px] ${test2} bottom-[20%] -z-10`}
            >
              {'"'}
            </span>
          </em>
        </p>
        <SeeAll path="/lagence" />
      </div>
    </div>
  )
}

export default Scroll2
