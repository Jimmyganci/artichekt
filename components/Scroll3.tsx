'use client'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect, useRef} from 'react'
import TitleSection from './TitleSection'
import SeeAll from './layouts/SeeAll'

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

  if (position === 'left') {
    test = 'text-left'
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
          className={`relative text-xl sm:text-2xl w-full pl-10 ${test} sm:w-2/3 md:text-4xl mx-auto ${primary ? 'text-primary' : 'text-black'} mt-20 sm:mt-12`}
          ref={textRef}
        >
          {content.split(' ').map((word, index) => (
            <span key={index}>{word} </span>
          ))}
          <span
            className={`absolute font-number text-primary text-[300px] sm:right-full right-[50%] -top-10 sm:top-0 -z-10`}
          >
            {'“'}
          </span>
        </p>
        <SeeAll path="/a-propos/lagence" />
      </div>
    </div>
  )
}

export default Scroll2
