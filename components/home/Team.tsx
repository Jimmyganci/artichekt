'use client'
import React, {useEffect, useRef, useState} from 'react'
import TitleSection from '../TitleSection'
import getLogo from '@/lib/queries/getLogo'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'

interface Images {
  imageLeft: {
    mediaItemUrl: string
    altText: string
  }
  imageRight: {
    mediaItemUrl: string
    altText: string
  }
}

function Team() {
  const [images, setImages] = useState<Images>({
    imageLeft: {
      mediaItemUrl: '',
      altText: ''
    },
    imageRight: {
      mediaItemUrl: '',
      altText: ''
    }
  })

  async function getImages() {
    const imageLeft = await getLogo('portrait_amandine')
    const imageRight = await getLogo('portrait_vincent')
    setImages({
      imageLeft,
      imageRight
    })
  }

  const containerRef = useRef(null)
  const containerRef2 = useRef(null)

  useEffect(() => {
    getImages()

    const container = containerRef.current
    const container2 = containerRef2.current

    if (container) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 15%',
          end: '+=500',
          scrub: true,
          pin: true,
          markers: false
        }
      })

      // // Ajouter l'animation de l'image à la timeline
      // timeline.fromTo(
      //   image,
      //   {scale: 1.25}, // État initial
      //   {scale: 1, duration: 1} // État final
      // )

      timeline.fromTo(
        '.teamContainer .textContent p',
        {opacity: 0}, // État initial
        {opacity: 1, duration: 1, stagger: 0.2}
      )
    }

    if (container2) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container2,
          start: 'top 15%',
          end: '+=500',
          scrub: true,
          pin: true,
          markers: false
        }
      })

      timeline.fromTo(
        '.teamContainer .textContent2 p',
        {opacity: 0},
        {opacity: 1, duration: 1, stagger: 0.2}
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="teamContainer">
      <TitleSection primary title="L'équipe" />
      <div className="relative mt-20 sm:px-16 lg:px-36 max-w-[1200px] mx-auto">
        <div className="flex w-full" ref={containerRef}>
          <div className="textContent w-full px-8">
            <p className="text-[20px]">
              Amandine cumule 6 années d’activités dans le domaine de
              l’architecture intérieure acquises par le biais d’une première
              expérience réussie en tant qu’auto-entrepreneur durant laquelle
              elle a dirigé, entre autres, la conception et la rénovation du
              restaurant Le Katana.
            </p>
            <p className="text-[20px]">
              Architecte d’intérieur cheffe de projet pour la société darroman
              design d’octobre 2022 à janvier 2024, cette seconde expérience lui
              a permis de consolider ses compétences dans la gestion globale de
              projet d’architecture intérieure.
              <span>
                <a href="#" className="text-[20px] pl-1">
                  <strong>Lire plus</strong>
                </a>
              </span>
            </p>
          </div>
          <div className="sm:w-full w-1/2 sm:relative cursor-pointer">
            {/* <div className="sm:w-1/2 sm:relative sm:left-10 cursor-pointer"> */}
            {images.imageLeft && (
              <Image
                width={300}
                height={400}
                className="w-full"
                src={images.imageLeft.mediaItemUrl}
                alt={images.imageLeft.altText}
              />
            )}
          </div>
        </div>

        <div className="flex" ref={containerRef2}>
          <div className="sm:w-full w-1/2 sm:relative cursor-pointer">
            {/* <div className="sm:w-1/2 sm:top-44 sm:right-10 sm:relative cursor-pointer"> */}
            {images.imageRight && (
              <Image
                width={300}
                height={400}
                className="w-full"
                src={images.imageRight.mediaItemUrl}
                alt={images.imageRight.altText}
              />
            )}
          </div>
          <div className="textContent2 w-full px-8">
            <p className="text-[20px]">
              Bilingue, informaticien autoproclamé et couteau suisse, Vincent
              c’est celui qu’on aimerait toutes et tous avoir dans son équipe.
              C’est celui qui a une solution pour chaque problème mais qui ne
              sera pas à l’aise qu’on écrive cela à propos de lui.
            </p>
            <p className="text-[20px]">
              Les 5 années qu’il a passées à sillonner l’Europe dans plus de 15
              pays et 3 états des États-Unis lui ont permis de développer des
              capacités relationnelles, d’adaptation et de gestion de ses
              propres ressources afin de garantir le succès de son projet.
              <span>
                <a href="#" className="text-[20px] pl-1">
                  <strong>Lire plus</strong>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
