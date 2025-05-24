'use client'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'
import {useEffect, useRef} from 'react'
import Skew from '../layouts/Skew'

gsap.registerPlugin(ScrollTrigger)

function Laboratory() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = gsap.utils.toArray<HTMLDivElement>('.panel')

    // const cards = gsap.utils.toArray(".panel");
    const spacer = 20
    const minScale = 0.7

    const distributor = gsap.utils.distribute({base: minScale, amount: 0.2})

    cards.forEach((card, index) => {
      const scaleVal = distributor(index, cards[index], cards)

      const tween = gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top top`,
          scrub: true,
          markers: false,
          invalidateOnRefresh: true
        },
        ease: 'none',
        scale: scaleVal
      })

      ScrollTrigger.create({
        trigger: card,
        start: `top 20%`,
        endTrigger: '.cards',
        end: `bottom top+=${200 + cards.length * spacer}`,
        pin: true,
        pinSpacing: false,
        markers: false,
        id: 'pin',
        invalidateOnRefresh: true
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const cards = [
    {
      icon: '/images/statistiques.svg',
      title: 'Recueil de données',
      text: "à partir de nos observations in situ et entretiens menés par ARTICHEKT lors des projets d’architecture intérieure ou auprès de panels d’usagers ciblés dans le but de tendre vers une définition commune des phénomènes d'habitation et de consommation."
    },
    {
      icon: '/images/connaissances.svg',
      title: 'Pédagogie',
      text: 'en proposant des ateliers à destination du grand public sur des thématiques en lien avec des questions autour des espaces investis et leurs usages dans le but de sensibiliser les individus aux problématiques qui y sont liées.'
    },
    {
      icon: '/images/travailler-ensemble.svg',
      title: 'Accompagnement des pouvoirs publics',
      text: 'sur les thématiques du logement collectif et de l’habitat. Proposer notre expertise pour des projets d’aménagement d’espace dédié au public.'
    },
    {
      icon: '/images/maison-ecologique.svg',
      title: 'Création d’une maison des habitants',
      text: 'un lieu chaleureux pour favoriser les rencontres et créer des liens entre les différents acteurs de l’habitat et celles et ceux qui habitent...'
    }
  ]

  return (
    <div className="mb-20 cards" ref={containerRef}>
      <div className={`flex  justify-end`}>
        <h2
          className={`text-black -mr-5  mt-0 mb-0 uppercase text-2xl md:text-5xl sm:text-6xl text-right`}
        >
          LE LABORATOIRE
          <br />
          ARTICHEKT
        </h2>
        <Skew style={'-mt-5'} />
      </div>

      <div>
        <div className="flex flex-col gap-24 mt-20 mx-auto items-center">
          {cards.map((item, index) => (
            <div
              key={index}
              className="relative  bg-grey p-12 w-full sm:w-[450px] flex text-xl flex-col items-center text-center panel"
            >
              <div
                className={`absolute w-10 h-20 z-10 bg-primary top-0 ${
                  index % 2 !== 0 ? 'left-6' : 'right-6'
                } translate-y-[-50%]`}
              ></div>
              <Image
                width={80}
                height={80}
                src={item.icon}
                alt={item.title}
                className="my-0 w-24"
              />
              <p className="font-fontBold text-primary mt-4 mb-0">
                {item.title}
              </p>
              <p className="mt-2 text-sm sm:text-xl">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Laboratory
