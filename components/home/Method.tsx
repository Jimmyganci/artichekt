'use client'
import {useEffect, useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import data from '@/public/data/method.json'

gsap.registerPlugin(ScrollTrigger)

function Method() {
  const containerRef = useRef<any>()
  const circleRef = useRef<any>()
  const progressBarRef = useRef<any>()
  const pointsRef = useRef<(HTMLLIElement | null)[]>([]) // Stockage des références des points <li>
  const [activePoint, setActivePoint] = useState<number | undefined>(undefined) // Point actif

  useEffect(() => {
    const container = containerRef.current
    const circle = circleRef.current
    const progressBar = progressBarRef.current

    function updatePointPositions() {
      return pointsRef.current
        .filter((point): point is HTMLLIElement => point !== null) // Éliminer les références nulles
        .map((point) => {
          const bounds = point.getBoundingClientRect()
          return bounds.left + bounds.width / 2 // Centre horizontal du point
        })
    }

    let points = updatePointPositions()

    function handleResize() {
      points = updatePointPositions()
    }

    if (container && circle && progressBar) {
      // Récupérer les mots à animer
      const letters = container.querySelectorAll('#method-container .letter')

      window.addEventListener('resize', handleResize)

      // Définir les animations GSAP avec ScrollTrigger
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'center center',
          end: '+=3000',
          scrub: true,
          pin: true,
          markers: false
        }
      })

      // Animation des lettres
      timeline.fromTo(
        letters,
        {y: 0, opacity: 1},
        {
          y: () => `-${Math.random() * 50}vh`,
          opacity: 0,
          duration: () => Math.random() * 10 + 10, // Durée entre 10s et 20s
          stagger: {
            each: 0.2,
            from: 'random'
          }
        }
      )

      // Animation pour centrer le cercle à partir de sa position
      timeline.to(circle, {
        x:
          window.innerWidth / 2 -
          circle.getBoundingClientRect().left -
          circle.getBoundingClientRect().width / 2,
        scale: 2,
        duration: 5,
        ease: 'power2.out'
      })

      // Animation de la barre de progression
      timeline.to(progressBar, {
        width: '100%',
        duration: 100,
        ease: 'linear',
        onUpdate: function () {
          // Récupérer la position actuelle de la barre
          const progressBarBounds = progressBar.getBoundingClientRect()
          const currentX = progressBarBounds.left + progressBarBounds.width

          if (currentX < points[0]) {
            setActivePoint(undefined)
            return
          }

          // Vérifier si la barre a atteint un point
          points.forEach((pointX, index) => {
            if (currentX >= pointX && activePoint !== index) {
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
    <div ref={containerRef} id="method-container" className="text-center">
      <div className="m-0 flex justify-center items-center">
        <span className="letter text-[16vw]">M</span>
        <span className="letter text-[16vw]">E</span>
        <span className="letter text-[16vw]">T</span>
        <span className="letter text-[16vw]">H</span>
        <div
          ref={circleRef}
          id="circle"
          className="rounded-full h-[10vw] w-[10vw] bg-[#B9B9B9] flex flex-col items-center justify-center p-2"
        >
          {activePoint !== undefined && (
            <span className="text-white font-fontBlack content-circle">
              {data[0]?.id + 1 || ''}
            </span>
          )}
          {activePoint !== undefined && (
            <p className="m-0 text-white leading-none font-fontBlack text-[12px] content-circle">
              {data[0]?.content || ''}
            </p>
          )}
        </div>
        <span className="letter text-[16vw]">D</span>
        <span className="letter text-[16vw]">E</span>
      </div>
      {data && data.length > 0 && (
        <ul
          className={`flex w-[95vw] justify-between relative gap-6 p-0 mx-auto`}
        >
          <span
            ref={progressBarRef}
            className="w-0 h-1 bg-[#B9B9B9] absolute top-6"
          ></span>
          {data.slice(1).map((method, index) => (
            <li
              ref={(el) => {
                pointsRef.current[index] = el // Assigner la référence sans retourner de valeur
              }}
              key={method.id}
              className={`w-[10vw] transition ease-in-out duration-300 z-10 ${activePoint !== undefined && activePoint >= index ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center rounded-full h-10 w-10 bg-[#B9B9B9] text-white font-fontBlack">
                  {method.id + 1}
                </span>
                <p className="uppercase text-primary font-fontBlack text-sm">
                  {method.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Method
