'use client'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'
import {useEffect, useRef} from 'react'
import SeeAll from '../layouts/SeeAll'
import TitleSection from '../TitleSection'

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
          start: 'top 10%', // Début de l'animation
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
        {opacity: 1, y: 0, duration: 1} // État final (stagger pour un effet en cascade)
        // 0 // Début en même temps que l'image
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="approch-container pt-7" ref={containerRef}>
      <TitleSection
        title={"L'approche artichekt"}
        primary={false}
        position="right"
      />

      <div className="grid grid-cols-[0.5fr_1fr_0.5fr] grid-rows-[1fr_auto] gap-4 p-10">
        <div className="text-end flex flex-col justify-center items-end mr-0">
          <p className="max-w-52">
            Restructuration et agencement des espaces de vie, de travail et de
            consommation.
          </p>
          <p className="max-w-52">
            Prise en compte des dimensions esthétiques et fonctionnelles.{' '}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            className="w-[80%]"
            src="/images/approch.png"
            alt="schema"
            width={450}
            height={250}
          />
        </div>
        <div className="flex flex-col justify-center ml-0">
          <p className="max-w-52">
            Observation et étude des usages des habitants, des personnes en
            activité et des consommateurs dans leur milieu.
          </p>
          <p className="max-w-52">
            {' '}
            Prise en compte de ce qui constitue le bien-être des usagers.
          </p>
        </div>
        <div className="col-start-2 max-w-96 mx-auto">
          <p className="text-center">
            Proposer des espaces de vie, de travail et de consommation adaptés
            aux usages des habitants, des personnes en activité et des
            consommateurs tout en tenant compte des dimensions esthétiques et
            fonctionnelles
          </p>
        </div>
      </div>
      <div className="mt-8">
        <SeeAll path="/methodologie" />
      </div>
    </div>
  )
}

export default Approch
