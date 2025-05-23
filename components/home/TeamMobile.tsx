'use client'
import getLogo from '@/lib/queries/getLogo'
import Image from 'next/image'
import {useEffect, useState} from 'react'

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

function TeamMobile() {
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

  useEffect(() => {
    getImages()
  }, [])

  return (
    <div className="relative px-20 sm:hidden min-h-[200vh]">
      <div className="relative sm:px-16 lg:px-36 max-w-[1200px] mx-auto">
        <div>
          <div className="z-10 absolute -top-28 text-end right-0">
            <h3 className="text-[108px] flex flex-col leading-tight mt-0 mb-0 text-primary">
              <span>{"L'EQ"}</span>
              <span>UI</span>
              <span>PE</span>
            </h3>
          </div>
          <div className="flex w-full overflow-hidden flex-col-reverse">
            <div className=" w-full relative leading-none">
              <p className="text-xl lg:text-2xl pr-8 leading-[1.1]">
                Amandine cumule 6 années d’activités dans le domaine de
                l’architecture intérieure acquises par le biais d’une première
                expérience réussie en tant qu’auto-entrepreneur durant laquelle
                elle a dirigé, entre autres, la conception et la rénovation du
                restaurant Le Katana.
              </p>
              <p className="text-xl lg:text-2xl pr-8 leading-[1.1]">
                Architecte d’intérieur cheffe de projet pour la société darroman
                design d’octobre 2022 à janvier 2024, cette seconde expérience
                lui a permis de consolider ses compétences dans la gestion
                globale de projet d’architecture intérieure.
                <span>
                  <a href="/lequipe" className="text-[20px] pl-1">
                    <strong>Lire plus</strong>
                  </a>
                </span>
              </p>
            </div>

            <div className="w-full relative cursor-pointer">
              {/* <div className="sm:w-1/2 sm:relative sm:left-10 cursor-pointer"> */}
              {images.imageLeft && images.imageLeft.mediaItemUrl && (
                <Image
                  width={300}
                  height={400}
                  className="w-full m-0 h-full object-cover"
                  src={images.imageLeft.mediaItemUrl}
                  alt={images.imageLeft.altText}
                />
              )}
              <div className="absolute bottom-0 flex flex-col justify-center items-center w-full pb-2 text-white">
                <p className="my-0 font-fontBold text-2xl">AMANDINE GANCI</p>
                <p className="my-0 font-fontBold ">Dirigeante associé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="w-full relative cursor-pointer">
            {/* <div className="sm:w-1/2 sm:top-44 sm:right-10 sm:relative cursor-pointer"> */}
            {images.imageRight && images.imageRight.mediaItemUrl && (
              <Image
                width={300}
                height={400}
                className="w-full m-0 h-full object-cover"
                src={images.imageRight.mediaItemUrl}
                alt={images.imageRight.altText}
              />
            )}
            <div className="absolute bottom-0 flex flex-col justify-center items-center w-full pb-2 text-white">
              <p className="my-0 font-fontBold text-2xl">VINCENT BAUDAIN</p>
              <p className="my-0 font-fontBold ">Dirigeant associé</p>
            </div>
          </div>
          <div className="w-full relative leading-none">
            <p className="text-xl lg:text-2xl pl-8">
              Bilingue, informaticien autoproclamé et couteau suisse, Vincent
              c’est celui qu’on aimerait toutes et tous avoir dans son équipe.
              C’est celui qui a une solution pour chaque problème mais qui ne
              sera pas à l’aise qu’on écrive cela à propos de lui.
            </p>
            <p className="text-xl lg:text-2xl pl-8">
              Les 5 années qu’il a passées à sillonner l’Europe dans plus de 15
              pays et 3 états des États-Unis lui ont permis de développer des
              capacités relationnelles, d’adaptation et de gestion de ses
              propres ressources afin de garantir le succès de son projet.
              <span>
                <a href="/lequipe" className="text-[20px] pl-1">
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

export default TeamMobile
