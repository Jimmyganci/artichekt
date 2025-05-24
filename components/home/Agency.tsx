'use client'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect, useRef} from 'react'
import TitleSection from '../TitleSection'
import SeeAll from '../layouts/SeeAll'

function Agency() {
  const containerRef = useRef<any>()
  const textRef = useRef<any>()

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
  const content = `Notre agence propose une expertise technique solide qui s’appuie sur
    un réseau de professionnels compétents tout en développant une
    approche innovante et pluridisciplinaire.`

  return (
    <div ref={containerRef} className={`my-8 sm:mt-40 mt-96`}>
      <div
        className={`containerText sm:w-fit min-h-screen flex flex-col justify-evenly`}
      >
        <TitleSection title={"L'agence"} primary={false} />

        <p
          className={`relative max-w-7xl text-xl sm:text-2xl md:text-4xl w-full sm:w-2/3 mx-auto text-black text-right mt-12 pr-20 sm:pr-0 pl-8 sm:pl-4`}
          ref={textRef}
        >
          {content.split(' ').map((word, index) => (
            <span key={index}>{word} </span>
          ))}
          <span
            className={`absolute font-number text-primary text-[200px] sm:text-[300px] right-[4%] sm:right-0 sm:left-[98%] -top-2 sm:top-10 -z-10`}
          >
            {'“'}
          </span>
        </p>
        <SeeAll path="/lagence" />
      </div>
    </div>
  )
}

export default Agency
