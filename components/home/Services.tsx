'use client'
import {Post} from '@/lib/types'
import React, {useEffect, useRef, useState} from 'react'
import ServiceCard from '../services/ServiceCard'
import {gsap} from 'gsap'
import SeeAll from '../layouts/SeeAll'

function Services({services}: {services: Post[]}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const testRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const totalWidth = container.scrollWidth - window.innerWidth
      gsap.fromTo(
        container,
        {x: '250px'}, // Point de départ
        {
          x: '0px', // Point final
          duration: 1,
          scrollTrigger: {
            trigger: testRef.current,
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
            trigger: testRef.current,
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
            }
          }
        }
      )
    }
  }, [])

  return (
    <div ref={testRef}>
      <div
        ref={containerRef}
        className=" pl-20 flex relative whitespace-nowrap will-change-transform"
      >
        <div>
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
      </div>
      <div>
        <SeeAll path="/services" />
      </div>
    </div>
  )
}

export default Services
