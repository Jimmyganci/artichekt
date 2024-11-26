'use client'
import {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

function Method() {
  const containerRef = useRef<any>()
  const titleRef = useRef<any>()

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      // Récupérer les mots à animer
      const words = container.querySelectorAll('.test span')

      // Définir les animations GSAP avec ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container, // Élément déclencheur
          start: 'center center', // Début de l'animation
          end: '+=600', // Fin de l'animation
          scrub: true, // Synchronisé avec le scroll
          pin: true, // Active le pin
          markers: true // Débogage
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
    <div ref={containerRef} className="text-center">
      <h3 ref={titleRef} className="text-[16vw] m-0">
        <span>METH</span>
        <span className="inline-block rounded-full h-[16vw] w-[16vw] bg-slate-400"></span>
        <span>DE</span>
      </h3>
    </div>
  )
}

export default Method
