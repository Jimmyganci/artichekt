import React from 'react'
import TitleSection from '../TitleSection'
import Image from 'next/image'

function Laboratory() {
  return (
    <div className="mb-80">
      <TitleSection
        title={'LE LABORATOIRE ARTICHEKT'}
        primary={false}
        position="right"
      />

      <div className="px-[12%]">
        <p className="w-1/2 ml-auto text-end text-3xl">
          Le laboratoire ARTICHEKT doit permettre de définir une stratégie et
          apporter des éléments de réponse à la question suivante : Comment
          inscrire les manières d’habiter un espace de vie, de travail et de
          consommation dans une démarche éco-responsable et durable en tenant
          compte du bien-être des personnes ?
        </p>

        <div className="grid grid-cols-2 grid-rows-3 gap-4 p-4">
          <div className="flex justify-end flex-col relative">
            <div className="text-center flex items-center flex-col p-16">
              <Image
                width={100}
                height={100}
                src={'/images/connaissances.svg'}
                alt="connaissance"
              />
              <p className="font-fontBold text-primary text-2xl m-0">
                Pédagogie
              </p>
              <p className="text-2xl">
                en proposant des ateliers autour de pratiques artistiques à
                destination du grand public
              </p>
              <Image
                width={130}
                height={130}
                src={'/images/arrow.svg'}
                alt="connaissance"
                className="absolute top-full"
              />
            </div>
          </div>
          <div className="flex justify-center flex-col relative">
            <div className="p-16 text-center flex items-center justify-center flex-col">
              <Image
                width={100}
                height={100}
                src={'/images/travailler-ensemble.svg'}
                alt="travailler ensemble"
              />
              <p className="font-fontBold text-primary text-2xl m-0">
                Accompagnement des pouvoirs publics
              </p>
              <Image
                width={130}
                height={130}
                src={'/images/arrow2.svg'}
                alt="connaissance"
                className="absolute top-full"
              />
            </div>
          </div>
          <div className="text-center col-span-2 flex justify-center items-center flex-col">
            <Image
              width={100}
              height={100}
              src={'/images/oeil.svg'}
              alt="oeil"
              className="w-1/2"
            />
          </div>
          <div className="flex justify-start flex-col relative">
            <div className="p-16 text-center flex justify-start items-center flex-col">
              <Image
                width={100}
                height={100}
                src={'/images/statistiques.svg'}
                alt="statistiques"
              />
              <p className="font-fontBold text-primary text-2xl m-0">
                Recueil de données
              </p>
              <p className="text-2xl">
                à partir d’enquêtes qualitatives (voire quantitative) menées par
                ARTICHEKT sur des panels d’usagers habitants, personnes en
                activité et consommateurs
              </p>
              <Image
                width={150}
                height={150}
                src={'/images/arrow3.svg'}
                alt="connaissance"
                className="absolute bottom-full"
              />
            </div>
          </div>
          <div className="flex justify-start flex-col relative">
            <div className="p-16 text-center flex justify-start items-center flex-col">
              <Image
                width={100}
                height={100}
                src={'/images/maison-ecologique.svg'}
                alt="maison ecologique"
              />
              <p className="font-fontBold text-primary text-2xl m-0">
                Création d’une maison des habitants
              </p>
              <p className="text-2xl">
                un lieu chaleureux, de rencontre et d’échange entre les
                différents acteurs de l’habitat
              </p>
              <Image
                width={130}
                height={130}
                src={'/images/arrow4.svg'}
                alt="connaissance"
                className="absolute bottom-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Laboratory
