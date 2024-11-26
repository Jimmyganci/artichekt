'use client'

import React, {useEffect, useRef} from 'react'
import gsap from 'gsap'
import TitleSection from './TitleSection'
import SeeAll from './layouts/SeeAll'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

function Scroll2({
  name,
  content,
  primary
}: {
  name?: string
  content: string
  primary: boolean
}) {
  const containerRef = useRef<any>()
  const textRef = useRef<any>()

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      // Récupérer les mots à animer
      const words = container.querySelectorAll('.test span')

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
    <div ref={containerRef} className={`mt-8`}>
      <div
        className={`test sm:w-fit min-h-screen flex flex-col justify-center`}
      >
        {name && <TitleSection title={name} primary={false} />}

        <p
          className={`text-2xl w-full text-right sm:w-2/3 pl-28 sm:text-3xl mx-auto ${primary ? 'text-primary' : 'text-black'}  mt-12`}
          ref={textRef}
        >
          {content.split(' ').map((word, index) => (
            <span key={index}>{word} </span>
          ))}
        </p>
        <SeeAll path="/lagence" />
      </div>
    </div>
  )
}

export default Scroll2
