'use client'
import React, {useEffect, useRef} from 'react'
import TitleSection from '../TitleSection'
import Image from 'next/image'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SeeAll from '../layouts/SeeAll'

function Approch() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      const image = document.querySelector('.approch-container img')
      const texts = document.querySelectorAll('.approch-container p')

      // Définir les propriétés initiales des textes
      gsap.set(texts, {opacity: 0, y: 50})

      // Créer une timeline synchronisée avec ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container, // L'élément déclencheur
          start: 'top 15%', // Début de l'animation
          end: '+=500', // Fin de l'animation
          // end: 'top top', // Fin de l'animation
          scrub: true, // Synchronisé avec le scroll
          pin: true, // Active le pin
          markers: false // Pour le débogage
        }
      })

      // Ajouter l'animation de l'image à la timeline
      timeline.fromTo(
        image,
        {scale: 1.25}, // État initial
        {scale: 1, duration: 1} // État final
      )

      // Ajouter l'animation des textes à la timeline
      timeline.fromTo(
        texts,
        {opacity: 0, y: 50}, // État initial
        {opacity: 1, y: 0, duration: 1, stagger: 0.2}, // État final (stagger pour un effet en cascade)
        0 // Début en même temps que l'image
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="approch-container mt-7">
      <TitleSection
        title={"L'approche artichekt"}
        primary={false}
        position="right"
      />

      <div
        ref={containerRef}
        className="grid grid-cols-[0.5fr_1fr_0.5fr] grid-rows-[1fr_auto] gap-4 p-10"
      >
        <div className="text-end flex flex-col justify-center">
          <p>
            Restructuration et agencement des espaces de vie, de travail et de
            consommation.
          </p>
          <p>Prise en compte des dimensions esthétiques et fonctionnelles. </p>
        </div>
        <div>
          <Image
            className="w-full"
            src="/images/approch.png"
            alt="schema"
            width={500}
            height={300}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p>
            Observation et étude des usages des habitants, des personnes en
            activité et des consommateurs dans leur milieu.
          </p>
          <p> Prise en compte de ce qui constitue le bien-être des usagers.</p>
        </div>
        <div className="col-start-2">
          <p className="text-center">
            Proposer des espaces de vie, de travail et de consommation adaptés
            aux usages des habitants, des personnes en activité et des
            consommateurs tout en tenant compte des dimensions esthétiques et
            fonctionnelles
          </p>
        </div>
      </div>
      <SeeAll path="/methodologie" />
    </div>
  )
}

export default Approch
