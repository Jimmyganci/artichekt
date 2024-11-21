'use client'
import {Post} from '@/lib/types'
import React, {useEffect, useRef, useState} from 'react'
import ServiceCard from '../services/ServiceCard'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SeeAll from '../layouts/SeeAll'

gsap.registerPlugin(ScrollTrigger)

function Services({services}: {services: Post[]}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      // const totalWidth = container.scrollWidth - window.innerWidth

      // console.log('Total scrollable width:', totalWidth)

      // // Phase 2 Trigger (scroll horizontal)
      // const phase2Trigger = ScrollTrigger.create({
      //   trigger: container,
      //   start: 'top 20%',
      //   end: `+=${totalWidth}`,
      //   scrub: true,
      //   pin: true,
      //   pinSpacing: false,
      //   markers: true,
      //   animation: gsap.fromTo(
      //     container,
      //     {x: '0%'}, // Position initiale
      //     {x: -totalWidth, ease: 'power2.out'} // Position finale
      //   ),
      //   onLeaveBack: () => {
      //     phase2Trigger.disable()
      //   }
      // })

      // // Désactiver la phase 2 au départ
      // phase2Trigger.disable()

      // // Phase 1 Trigger (glissement initial)
      // const phase1Trigger = ScrollTrigger.create({
      //   trigger: container,
      //   start: 'top 70%',
      //   end: 'top 20%',
      //   scrub: true,
      //   markers: true,
      //   animation: gsap.fromTo(
      //     container,
      //     {x: '25%'},
      //     {x: '0%', ease: 'power2.out'}
      //   ),
      //   onLeave: () => {
      //     console.log('leave 1')

      //     // phase1Trigger.disable()
      //     phase2Trigger.enable()
      //   },
      //   onLeaveBack: () => {
      //     console.log('leave back 1')
      //   }
      // })

      // return () => {
      //   phase1Trigger.kill()
      //   phase2Trigger.kill()
      // }
      const totalWidth = container.scrollWidth - window.innerWidth
      gsap.fromTo(
        container,
        {x: '250px'}, // Point de départ
        {
          x: '0px', // Point final
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: 'top 70%', // Début de la Phase 1
            end: 'top 20%', // Fin de la Phase 1
            scrub: 1, // Synchronisé avec le scroll
            markers: false // Marqueurs pour le débogage
          }
        }
      )

      // Phase 2 : Ajout du pin et défilement horizontal avec un `fromTo`
      gsap.fromTo(
        container,
        () => ({
          x: gsap.getProperty(container, 'x')
        }), // Dynamique : récupère la position actuelle
        {
          x: `-${totalWidth}px`, // Déplacement horizontal complet
          duration: 1,
          scrollTrigger: {
            trigger: container,
            start: 'top 20%', // Début du pinning
            end: `+=${totalWidth}`, // Durée du pinning
            scrub: 0.5, // Synchronisé avec le scroll
            pin: true, // Activation du pin
            markers: false, // Marqueurs pour le débogage
            anticipatePin: 1,
            onUpdate: (self) => {
              // Forcer translate3d pour l'axe Y à 0px
              gsap.set(container, {y: '0px'})
            },
            onEnter: () => {
              // En cas d'animation non souhaitée
              gsap.set(container, {y: '0px'})
            },
            onEnterBack: () => {
              // Corrige le retour
              gsap.set(container, {y: '0px'})
            },
            onLeave: () => {
              gsap.set(container, {y: '92%'})
            }
          }
        }
      )
    }
  }, [])

  return (
    <div>
      <div
        ref={containerRef}
        className="min-h-screen pl-20 flex relative whitespace-nowrap will-change-transform"
      >
        <div className="w-60 break-words z-10 absolute top-0">
          <h3 className="text-[108px] leading-tight mt-0 mb-0">SERVICES</h3>
        </div>
        {services && services.length > 0 && (
          <div className="flex gap-12 pl-28">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-[60vh]">
        <SeeAll path="/services" />
      </div>
    </div>
  )
}

export default Services
