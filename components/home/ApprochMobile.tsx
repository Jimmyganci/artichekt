'use client'
import Image from 'next/image'
import SeeAll from '../layouts/SeeAll'
import TitleSection from '../TitleSection'

function ApprochMobile() {
  return (
    <div className="pt-7 sm:hidden">
      <TitleSection
        title={"L'approche artichekt"}
        primary={false}
        position="right"
      />
      <div className="flex justify-center items-center mt-20">
        <Image
          className="w-[80%]"
          src="/images/approch.png"
          alt="schema"
          width={450}
          height={250}
        />
      </div>
      <div className="text-lg px-14 mt-20">
        <h5 className="text-primary font-fontBold">
          ARCHITECTURE INTÉRIEURE :
        </h5>
        <p className="mt-0">
          Restructuration et agencement des espaces de vie, de travail et de
          consommation. Prise en compte des dimensions esthétiques et
          fonctionnelles.
        </p>
        <h5 className="text-primary font-fontBold">SOCIOLOGIE :</h5>
        <p className="mt-0">
          Observation et étude des usages des habitants, des personnes en
          activité et des consommateurs dans leur milieu. Prise en compte de ce
          qui constitue le bien-être des usagers.
        </p>
        <h5 className="text-primary font-fontBold">ARTICHEKT :</h5>
        <p className="mt-0">
          Proposer des espaces de vie, de travail et de consommation adaptés aux
          usages des habitants, des personnes en activité et des consommateurs
          tout en tenant compte des dimensions esthétiques et fonctionnelles
        </p>
      </div>

      <div className="mt-8">
        <SeeAll path="/methodologie" />
      </div>
    </div>
  )
}

export default ApprochMobile
