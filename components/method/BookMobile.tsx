'use client'
import {useRef} from 'react'
import HTMLFlipBook from 'react-pageflip'

function BookMobile() {
  const bookRef = useRef<any>(null)

  function goToPage(page: number, e: any) {
    e.preventDefault()
    bookRef.current.pageFlip().flip(page - 1)
  }

  return (
    <div className="flex flex-col items-center mt-20 justify-center min-h-screen p-4 relative transition-all duration-500">
      <HTMLFlipBook
        ref={bookRef}
        width={400}
        height={500}
        size="fixed"
        minWidth={400}
        maxWidth={400}
        minHeight={500}
        maxHeight={500}
        startPage={0}
        className=""
        style={{}}
        // onChangeState={onFlip}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={true}
        startZIndex={0}
        autoSize={false}
        maxShadowOpacity={0}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={0}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        <div className="demoPage bg-white p-4 text-center border-[25px] border-primary rounded-3xl">
          <div className="flex justify-end h-full">
            <h1 className="text-5xl text-primary font-fontBlack flex flex-col w-fit justify-between h-full">
              <span>M</span>
              <span>E</span>
              <span>T</span>
              <span>H</span>
              <span>O</span>
              <span>D</span>
              <span>E</span>
            </h1>
          </div>
        </div>
        {/* <div className="demoPage bg-white p-4 text-center border-[25px] border-primary rounded-3xl"></div> */}
        <div className="demoPage bg-white p-4 text-center border-[25px] border-primary rounded-3xl">
          <h2 className="text-primary font-fontBold text-end p-4">SOMMAIRE</h2>
          <ol className="flex flex-col items-end pl-8 pr-4 text-sm marker:text-primary">
            <li
              onClick={(e) => goToPage(3, e)}
              className="list-decimal list-inside  w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              Analyse des besoins
            </li>
            <li
              onClick={(e) => goToPage(9, e)}
              className="list-decimal list-inside w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              Offre de service et validation client
            </li>
            <li
              onClick={(e) => goToPage(15, e)}
              className="list-decimal list-inside w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              Observation in situ et état des lieux
            </li>
            <li
              onClick={(e) => goToPage(21, e)}
              className="list-decimal list-inside w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              Phase esquisse et APS
            </li>
            <li
              onClick={(e) => goToPage(27, e)}
              className="list-decimal list-inside w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              Phase avant projet détaillé
            </li>
            <li
              onClick={(e) => goToPage(35, e)}
              className="list-decimal list-inside w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              DCE/CCTP et préparation de chantier
            </li>
            <li
              onClick={(e) => goToPage(41, e)}
              className="list-decimal list-inside w-fit m-0 text-end cursor-pointer text-primary font-fontBold"
            >
              Démarrage et suivi des opérations de chantier
            </li>
          </ol>
        </div>
        {/* <div className="demoPage bg-white p-4 text-center border-[25px] border-primary rounded-3xl"></div> */}
        <div className="demoPage bg-white p-4 text-center border-[25px] border-primary rounded-3xl relative">
          <p className="text-primary text-5xl font-fontBold mb-0">1.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            Analyse des besoins
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">Premier entretien :</h4>
          <p className="text-sm">
            L’analyse des besoins consiste en un premier entretien avec la
            maitrise d’ouvrage afin d’identifier les besoins et les attentes.
            Cette première étape nous permet de prendre connaissance des
            caractéristiques du projet, les contraintes spatiales, techniques et
            environnementales.
          </p>
          <p className="text-sm">
            Nous vous interrogeons ensuite sur vos pratiques de l’espace, sur la
            typologie du public qui va utiliser le lieux et sur les
            fonctionnalités attendues.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            Nos questions sont adaptées selon la typologie du lieu, qu’il
            s’agisse d’un lieu résidentiel, de travail ou de consommation.
          </p>
          <p className="text-sm">
            Souvent un seul et même espace offre plusieurs usages selon la
            temporalité et les utilisateurs qui l’occupent. Un salon par exemple
            peut-être utilisé pour se divertir (regarder la télé, lire), se
            reposer, recevoir des invités, jouer avec des enfants, etc. Avant
            tout démarrage de projet, il est donc capital de bien comprendre les
            usages que les occupants feront ou souhaiteront faire du lieu.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">Première visite des lieux :</h4>
          <p className="text-sm">
            Nous conviendrons d’un moment pour visiter les lieux qui se déroule
            le plus souvent lors du premier entretien.
          </p>
          <p className="text-sm">
            Cette première visite a pour objectif de s’imprégner des lieux,
            noter les caractéristiques spatiales et architecturales, comprendre
            son histoire. Nous prenons un maximum de photographies afin de bien
            documenter l’état des lieux. Elles nous serviront pour la mise au
            propre des plans de l’état existant
          </p>
        </div>
        <div className="demoPage bg-white px-6 text-center border-[25px] border-primary rounded-3xl">
          <p className="text-primary text-5xl font-fontBold mb-0">2.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            OFFRE DE SERVICE ET VALIDATION CLIENT
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">Offre de services :</h4>
          <p className="text-sm">
            Après cette première rencontre avec le maitre d’ouvrage et visite
            des lieux, l’agence vous soumettra une offre de service composée :
          </p>
          <ul className="text-sm">
            <li className="list-disc">
              d’un cahier des charges ou programme détaillant la nature de la
              demande, les objectifs visés, les travaux envisagés, une
              description précise de vos besoins et une enveloppe minimum à
              prévoir pour les travaux futurs
            </li>
            <li className="list-disc">d’un descriptif clair de la mission </li>
            <li className="list-disc">des honoraires de l’agence</li>
            <li className="list-disc">
              et d’un calendrier prévisionnel des étapes clés du projet
            </li>
          </ul>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            La rédaction de ce document peut prendre entre 2 à 3 semaines. Ce
            délai varie en fonction de la charge de travail de l’agence et de
            l’envergure du projet.
          </p>
          <p className="text-sm">
            Nous accordons une attention particulière à cette étape car elle
            correspond au point de départ du projet. Et comme pour toute course,
            nous pensons que la façon dont le projet démarre influe la façon
            dont il se concrétise et aboutit.
          </p>
          <p className="text-sm">
            Nous prenons le temps d’échanger avec la maitrise d’ouvrage autant
            de fois que nécessaire dans le but de{' '}
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            clarifier toutes les zones d’ombre, de recuellir les contraintes,
            les attentes et les objectifs, d’évoquer les exigences spatiales et
            d’identifier les consultants dont l’intervention pourrait s’avérer
            nécessaire (BE stucture, BE thermique, géomètre topographe, expert
            en énergie et autres experts spécifiques, etc.)
          </p>
          <p className="text-sm">
            Le programme précise quels espaces, quels fonctions et quelles
            caractéristiques supplémentaires sont nécessaires pour améliorer la
            fonctionnalité du lieu et l’ambiance générale.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] text-center border-primary rounded-3xl">
          <p className="text-primary text-5xl font-fontBold mb-0">3.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            OBSERVATION IN SITU ET ETAT DES LIEUX
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">Observation des lieux :</h4>
          <p className="text-sm">
            Après validation de l’offre de service, nous procéderons a une
            première étape d’observation des lieux et leurs usages. Nous
            observons les déplacements, la manière dont les utilisateurs font
            usages du lieu et comment ils en subissent les contraintes. Cette
            étape nous permet d’identifier les difficultés ou le plaisir qu’ont
            les utilisateurs (résidents, consommateurs, personnel, etc.) a
            investir les différents espaces concernés par le projet de
            restructuration et/ou d’aménagement intérieur.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">Etat des lieux :</h4>
          <p className="text-sm">
            L’état des lieux repose sur le relevé minutieux des lieux et un
            reportage photographique légendé et détaillé. Nous réalisons des
            croquis rapides à main levé illustrant les parties qui devront faire
            l’objet d’une expertise particulière ainsi qu’un zoning des espaces
            existants.
          </p>
          <p className="text-sm">
            A noter, si le projet nécessite une demande d’autorisation communale
            et pour les projets d’envergures, les relevés seront exécutés par
            une société de géomètres experts à la charge du maitre d’ouvrage.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Etude des comportements et pratiques in situ
          </h4>
          <p className="text-sm">
            Dans le cadre de projet dont les espaces à créer sont destinés à
            recevoir du public, nous associons toujours la phase d’observation à
            la conduite d’entretiens collectifs et/ou individuels. Cette
            démarche nous permet d’une part la prise en compte de tous les
            acteurs/utilisateurs, et d’autres parts d’identifier les pratiques
            et les contraintes de chacunes des parties. L’analyse approfondie
            des données recueillies permettra de définir les priorités et de
            réorienter le programme s’il y a lieu de le faire.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] text-center border-primary rounded-3xl">
          <p className="text-primary text-5xl font-fontBold mb-0">4.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            PHASE ESQUISSES ET APS
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">L’ébauche du projet</h4>
          <p className="text-sm">
            La phase d’esquisses correspond à la phase durant laquelle s’ébauche
            le parti pris architectural. Nous analysons et évaluons les
            différentes options. L’objectif de cette étape est de faire valider
            au maitre d’ouvrage (le client) un concept architectural qui sera
            développé et détaillé tout au long du projet
          </p>
          <p className="text-sm">
            Cette ébauche tient compte des contraintes et objectifs définits
            préalablement dans le programme mais aussi de nos observations et
            analyses auxquelles ont donné lieux les différents entretiens.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            A l’issue de cette phase, nous vous interrongeons sur vos attentes
            en matière d’ambiance et de couleurs envisagées. L’élaboration du
            parti pris esthétique, tout comme le parti pris architectural doit
            faire parti prenante de la réponse.
          </p>
          <h4 className="font-fontBold">
            Livrables : document écrit et restitution orale n°1
          </h4>
          <p className="text-sm">
            A la fin de cette phase, nous vous remettons un document écrit
            composé des conclusions de l’étude des comportements et des
            pratiques in situ ainsi que des pièces graphiques suivantes :
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <ul className="text-sm">
            <li className="list-disc">
              reportage photos légendé de l’état existant
            </li>
            <li className="list-disc">
              plans et élévations de l’état existant
            </li>
            <li className="list-disc">
              plans et élévations permettant d’apprécier les premières formes du
              projet
            </li>
          </ul>
          <p className="text-sm">
            Le maitre d’ouvrage est invité à une première restitution au sein de
            notre agence permettant un échange convivial et constructif. Cette
            présnetation peut également se faire en visioconférence.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] text-center border-primary rounded-3xl">
          <p className="text-primary text-5xl font-fontBold mb-0">5.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            PHASE AVANT PROJET DÉTAILLÉ
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Livrables : document écrit et restitution orale n°1
          </h4>
          <p className="text-sm">
            La phase d’avant projet détaillé a pour objectif d’aboutir sur une
            version définitive du projet. C’est la phase de conception la plus
            intensive durant laquelle l’ébauche prend forme. Un premier niveau
            de détail permettra d’appréhender les volumes avec l’agencements des
            cloisons, la création des ouvertures, l’aspect des murs et des
            plafonds, l’implantation du mobilier. Il se peut que nous vous
            proposions plusieurs version du projet.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            Nous discutons en détail des versions et lorsque votre choix est
            fait, nous opérons un deuxième niveau de détails faisant apparaitre
            les meubles, les luminaires et accessoires sélectionnés
            préalablement avec soin et en cohérence avec la nature du projet et
            ses objectifs. Nous intégrons également, les menuiseries, les
            couleurs ainsi que les revêtements.
          </p>
          <h4 className="font-fontBold">
            Permis de construire (PC) et déclaration préalable (DP)
          </h4>
          <p className="text-sm">
            A ce stade, lorsque le projet nécessite une demande d’autroisation
            auprès des autorités compétentes,
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            nous commençons à constituer le dossier à déposer.
          </p>
          <p className="text-sm font-fontBold">
            A noter, pour tout projet de construction dont la surface de
            plancher dépasse 150 m² vous devez vous faire accompagner
            obligatoirement d’un architecte HMONP avec lequel nous serons ravis
            de travailler en étroite collaboration.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Livrables : document écrit et restitution orale n°2
          </h4>
          <p className="text-sm">
            Lorsque que le projet est validé en détail, nous commençons a
            élaborer le projet de conception générale. Il s’agit d’un document
            écrit qui rassemble l’ensemble des pièces graphiques établies
            composé des spécifications techniques et des aspects esthétiques.
          </p>
          <p className="text-sm m-0">Pièces techniques :</p>
          <ul className="text-sm">
            <li className="list-disc m-0">plans 2D du projet</li>
            <li className="list-disc m-0">plans des sols et plafonds</li>
            <li className="list-disc m-0">coupes et élévations</li>
            <li className="list-disc m-0">plans électrique et VMC</li>
            <li className="list-disc m-0">plan plomberie</li>
            <li className="list-disc m-0">
              carnet de détail des ouvrages sur-mesure
            </li>
            <li className="list-disc m-0">estimation prévisionnelle</li>
          </ul>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">Pièces esthétiques :</p>
          <ul className="text-sm">
            <li className="list-disc m-0">vues axonométriques</li>
            <li className="list-disc m-0">rendus 3D</li>
            <li className="list-disc m-0">planches ambiance</li>
            <li className="list-disc m-0">planches couleurs et matériaux</li>
            <li className="list-disc m-0">listing mobilier et accessoires</li>
            <li className="list-disc m-0">élévations</li>
            <li className="list-disc m-0">
              charte graphique et signalétique pour les projets qui portent sur
              des espaces de consommation (hôtel, restaurant, magasin) ou de
              services (secteur tertiaire)
            </li>
          </ul>
          <p className="text-sm">
            Le maitre d’ouvrage est invité à une première restitution au sein de
            notre agence permettant un échange convivial et constructif. Cette
            présnetation peut également se faire en visioconférence.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] text-center border-primary rounded-3xl">
          <p className="text-primary text-5xl font-fontBold mb-0">6.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            DCE / CCTP ET PREPARATION DU CHANTIER
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Dossier de consultation des entreprises (DCE)
          </h4>
          <p className="text-sm">
            Une fois le projet de conception générale achevé, nous consitutons
            le dossier de consultation des entreprises qui comprend un
            descriptif précis et détaillé des travaux a exécuter accompagné des
            plans d’exécution de l’aménagement intérieur (exeption faite de
            toute structure porteuse qui font l’objet d’une étude dédiée auprès
            des experts mandatés par le maitre d’ouvrage). Ce descriptif est
            découpé en différents lots afin que chaque intervenant s’y retrouve
            et ne chiffre que la ou les parties qui le concerne.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">
            Dans le cadre des marchés publics, nous associons au DCE un cahier
            des clauses techniques particulières (CCTP) pour les parties qui
            nous concernent
          </p>
          <p className="text-sm">
            Nous procédons au dépouillement des offres et guidons le maitre
            d’ouvrage dans la sélection des entreprises grace à nos outils de
            tableaux comparatifs.
          </p>
          <p className="text-sm">
            A noter, dans le cas où le budget global dépasserait
            considérablement l’enveloppe disponible et dédiée, nous devrons
            faire un arbitrage et ajuster possiblement l’objet de la mission.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Livrables : document écrit et échanges informels
          </h4>
          <p className="text-sm">
            Nous vous remettons l’intégralité de ces pièces sous forme de
            document écrit que nous transmettons aux différentes parties
            prenantes du projet.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] text-center border-primary rounded-3xl">
          <p className="text-primary text-5xl font-fontBold mb-0">7.</p>
          <h3 className="text-primary text-3xl font-fontBold p-10 m-0">
            DÉMARRAGE ET SUIVI DES OPERATIONS DE CHANTIER
          </h3>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Gestion de projet et plannification des travaux
          </h4>
          <p className="text-sm">
            C’est la phase la plus chronophage et rigoureuse en termes de
            gestion de projet durant laquelle l’agence a pour mission la
            coordination des différents corps d’état, la révision des plans
            d’exécution et des spécifications techniques, l’organisation des
            visites successives de chantier et la rédaction des procès verbaux.
            Au cours du suivi des opération de chantier, l’agence établit
            également le suivi financier des paiements aux entreprises.
          </p>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <h4 className="font-fontBold">
            Livrables : document écrit et échanges informels
          </h4>
          <p className="text-sm">
            Différents document sont produits lors de cette phase. Certains
            d’entre eux n’ont pas nécessairement vocation à vous être transmis.
            Ils sont prioritairement une ressource et un support technique pour
            assurer le bon déroulement et l’éxecution des travaux.
          </p>
          <p className="text-sm">
            Toutefois, nous vous remettrons les documents suivants :
          </p>
          <ul className="text-sm">
            <li className="list-disc">
              un rétroplanning des travaux lot par lot
            </li>
            <li className="list-disc">un tableau du suivi financier</li>
            <li className="list-disc">
              les procès verbaux rédigés après chaque visite
            </li>
          </ul>
        </div>
        <div className="demoPage bg-white px-6 border-[25px] border-primary rounded-3xl">
          <p className="text-sm">A la livraison du chantier :</p>
          <ul className="text-sm">
            <li className="list-disc">
              le procès verbal de réception faisant état des réserves
            </li>
          </ul>
        </div>
      </HTMLFlipBook>
      <button
        onClick={(e) => goToPage(2, e)}
        className="mt-6 text-primary absolute bottom-[80px]"
      >
        SOMMAIRE
      </button>
    </div>
  )
}

export default BookMobile
