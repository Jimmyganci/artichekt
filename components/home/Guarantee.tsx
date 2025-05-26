'use client'
import {useEffect, useRef, useState} from 'react'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

import guarantees from '@/public/data/guarantees.json'
import SeeAll from '../layouts/SeeAll'
import Skew from '../layouts/Skew'

function Guarantee() {
  const containerRef = useRef<any>()
  const progressBarRef = useRef<any>()
  const pointsRef = useRef<(HTMLLIElement | null)[]>([])
  const [activePoint, setActivePoint] = useState<number | undefined>(undefined)

  useEffect(() => {
    const container = containerRef.current
    const progressBar = progressBarRef.current

    function updatePointPositions() {
      const containerBounds = container.getBoundingClientRect()
      return pointsRef.current
        .filter((point) => point !== null) // Éliminer les références nulles
        .map((point) => {
          if (point) {
            const bounds = point.getBoundingClientRect()
            // Calculer la position relative au conteneur
            return bounds.top + bounds.height - containerBounds.top - 80
          }
        })
    }

    let points = updatePointPositions()

    function handleResize() {
      points = updatePointPositions()
    }

    if (container && progressBar) {
      // Récupérer les mots à animer

      window.addEventListener('resize', handleResize)

      // Définir les animations GSAP avec ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'center 45%',
          end: '+=500',
          scrub: true,
          pin: true,
          markers: false
        }
      })

      // Animation de la barre de progression
      timeline.to(progressBar, {
        height: '84%',
        duration: 100,
        ease: 'linear',
        onUpdate: function () {
          const progressBarBounds = progressBar.getBoundingClientRect()
          const currentY =
            progressBarBounds.top +
            progressBarBounds.height -
            container.getBoundingClientRect().top

          // Vérifier si la barre a atteint un point
          points.forEach((pointY, index) => {
            if (pointY && currentY >= pointY - 50 && activePoint !== index) {
              setActivePoint(index) // Mettre à jour le point actif
            }
          })
        }
      })

      // Nettoyage des écouteurs
      return () => {
        window.removeEventListener('resize', handleResize)
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <div id="guaranteeContainer" ref={containerRef}>
      <div className={`flex flex-row-reverse justify-end`}>
        <h2
          className={`text-black mt-0 mb-0 uppercase text-2xl md:text-4xl sm:text-6xl -ml-5`}
        >
          LES GARANTIES
          <br />
          ARTICHEKT
        </h2>
        <Skew style="mt-10 sm:mt-16" />
      </div>
      <div className="flex justify-center items-center mt-20">
        <ul className="flex flex-col gap-0 w-full sm:max-w-[700px] relative">
          <span
            ref={progressBarRef}
            className="w-1 h-0 left-[55px] sm:left-[63px] -z-10 bg-[#D9D9D9] absolute top-12"
          ></span>
          {guarantees &&
            guarantees.length > 0 &&
            guarantees.map((guarantee, index) => (
              <li
                key={guarantee.id}
                className="flex items-center gap-6"
                ref={(el) => {
                  pointsRef.current[index] = el // Assigner la référence sans retourner de valeur
                }}
              >
                <span className="flex items-center justify-center rounded-full h-12 w-12 sm:h-16 sm:w-16 text-3xl bg-[#D9D9D9] text-white font-fontBlack flex-shrink-0">
                  {guarantee.id + 1}
                </span>
                <div>
                  <p className="font-fontBold text-primary mt-0 text-sm sm:text-2xl mb-0">
                    {guarantee.content}
                  </p>
                  <p
                    className={`${activePoint !== undefined && index <= activePoint ? 'opacity-100' : 'opacity-0'} text-sm duration-300 ease-in-out mt-0`}
                  >
                    {guarantee.description}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <SeeAll path="/services/les-garanties-artichekt" />
    </div>
  )
}

export default Guarantee
