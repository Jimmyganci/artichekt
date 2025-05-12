'use client'
import { useEffect, useRef, useState } from 'react'
import TitleSection from '../TitleSection'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import guarantees from '@/public/data/guarantees.json'

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
      const letters = container.querySelectorAll('#guaranteeContainer .letter')

      window.addEventListener('resize', handleResize)

      // Définir les animations GSAP avec ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'center center',
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
            if (pointY && currentY >= pointY && activePoint !== index) {
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
      <TitleSection title={'Les garanties artichekt'} primary={false} />
      <div className="flex justify-center items-center mt-20">
        <ul className="flex flex-col gap-0 max-w-[700px] relative">
          <span
            ref={progressBarRef}
            className="w-1 h-0 left-[63px] -z-10 bg-[#D9D9D9] absolute top-12"
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
                <span className="flex items-center justify-center rounded-full h-16 w-16 text-3xl bg-[#D9D9D9] text-white font-fontBlack flex-shrink-0">
                  {guarantee.id + 1}
                </span>
                <div>
                  <p className="font-fontBold text-primary text-2xl mb-0">
                    {guarantee.content}
                  </p>
                  <p
                    className={`${activePoint !== undefined && index <= activePoint ? 'opacity-100' : 'opacity-0'} duration-300 ease-in-out mt-0`}
                  >
                    {guarantee.description}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Guarantee
