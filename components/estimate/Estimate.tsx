'use client'

import { useEffect, useRef, useState } from 'react';
import Spacer from '../Spacer';

const projectTimes: Record<
  string,
  {niveau1?: number; niveau2?: number; niveau3?: number}
> = {
  'Maison individuelle et appartement de standing moyen': {
    niveau1: 100,
    niveau2: 200
  },
  'Maison individuelle et appartement de « grand » standing': {
    niveau1: 110,
    niveau2: 220
  },
  "Maison d'hôtes et autres hébergements collectifs": {
    niveau2: 250,
    niveau3: 275
  },
  'Surface destinée à la restauration et autres lieux festifs': {
    niveau2: 350,
    niveau3: 385
  },
  'Surface destinée à l’hôtellerie': {niveau2: 375, niveau3: 412.5},
  'Espace de travail collaboratif': {niveau2: 275, niveau3: 302.5},
  'Bureaux type open space du secteur tertiaire': {
    niveau2: 275,
    niveau3: 302.5
  },
  "Surface dédiée à l'accueil de public au sein d'une administration": {
    niveau2: 300,
    niveau3: 330
  },
  'Espace culturel de type bibliothèque, musée, galerie': {
    niveau2: 300,
    niveau3: 330
  },
  'Surface de commerces': {niveau2: 300, niveau3: 330}
}

const niveauDetails: {[key: string]: string[]} = {
  'Niveau 1': [
    'Etat des lieux (EDL)',
    'Phase esquisse (ESQ)',
    'Avant Projet Sommaire (APS)',
    'Estimation prévisionnelle (EP)'
  ],
  'Niveau 2': [
    'Etat des lieux (EDL)',
    'Phase esquisse (ESQ)',
    'Avant Projet Sommaire (APS)',
    'Avant Projet Détaillé (APD)',
    'Estimation prévisionnelle (EP)',
    'Documents d’exécution (DE)',
    'Assistance aux contrats',
    'Direction des travaux (EXE)'
  ],
  'Niveau 3': [
    'Etat des lieux (EDL)',
    'Analyse des besoins (AB)',
    'Phase esquisse (ESQ)',
    'Avant Projet Sommaire (APS)',
    'Avant Projet Détaillé (APD)',
    'Estimation prévisionnelle (EP)',
    'Documents d’exécution (DE)',
    'Assistance aux contrats',
    'Direction des travaux (EXE)'
  ]
}

interface NiveauListes {
  [key: string] : {
    icon: string,
    title: string,
    description: string,
    list: {icon: string, label: string}[]
  }
}

const niveauxListes: NiveauListes = {
  'Niveau 1': {
    icon: '/images/niveau_1.svg',
    title: 'Les indispensables',
    description: 'Ce premier niveau réunit les prestations indispensables à toute mission d’architecture intérieure ou aménagement d’espace pluriel.',
    list: [
      {
        icon: '/images/edl.svg',
        label: 'état des lieux'
      },
      {
        icon: '/images/esquisse.svg',
        label: 'esquisse et APS'
      },
      {
        icon: '/images/ep.svg',
        label: 'estimation prévisionnelle'
      }
    ]
  },
  'Niveau 2': {
    icon: '/images/niveau_2.svg',
    title: 'Intermédiaire',
    description: 'Ce deuxième niveau comprend toutes les phases de conception et la direction des opérations de travaux.',
    list: [
      {
        icon: '/images/conception.svg',
        label: 'projet de conception générale'
      },
      {
        icon: '/images/suivi_chantier.svg',
        label: 'direction des opérations de travaux'
      }
    ]
  },
  'Niveau 3': {
    icon: '/images/niveau_3.svg',
    title: 'Premium',
    description: 'Ce dernier niveau comprend l’intégralité d’une niveau 2 auquel s’ajoute une analyse des besoins rigoureuse et méthodique.',
    list: [
      {
        icon: '/images/analyse.svg',
        label: 'analyse des besoins'
      },
      {
        icon: '/images/suivi_chantier.svg',
        label: 'projet de conception générale'
      },
      {
        icon: '/images/suivi_chantier.svg',
        label: 'direction des opérations de travaux'
      }
    ]
  }
}

function Estimate() {
  const [formData, setFormData] = useState({
    natureProjet: '',
    typeTravaux: '',
    typeMarche: '',
    typeProjet: '',
    surfaceRenover: '',
    surfaceAmenager: '',
    finitions: '',
    niveauPrestation: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedData = localStorage.getItem('estimateFormData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
      setSubmitted(true)
    }
    setIsLoading(false)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  function handleChange(key: string, value: string) {
    setFormData((prev) => ({...prev, [key]: value}))

    // Si l'utilisateur modifie un champ, on enlève son erreur
    setFormErrors((prevErrors) => {
      const newErrors = {...prevErrors}
      delete newErrors[key]
      return newErrors
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const errors: Record<string, string> = {}

    // Validation de tous les champs
    if (!formData.natureProjet.trim())
      errors.natureProjet = 'La nature du projet est requise.'
    if (!formData.typeTravaux)
      errors.typeTravaux = 'Le type de travaux est requis.'
    if (!formData.typeMarche)
      errors.typeMarche = 'Le type de marché est requis.'
    if (!formData.typeProjet)
      errors.typeProjet = 'Le type de projet est requis.'
    if (!formData.surfaceRenover)
      errors.surfaceRenover = 'La surface à rénover est requise.'
    if (!formData.surfaceAmenager)
      errors.surfaceAmenager = 'La surface à aménager est requise.'
    if (!formData.finitions) errors.finitions = 'Les finitions sont requises.'
    if (!formData.niveauPrestation)
      errors.niveauPrestation = 'Le niveau de prestation est requis.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors) // on stocke les erreurs pour affichage
      headerRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
      return
    }

    // Tout est ok
    setFormErrors({})
    headerRef.current?.scrollIntoView({behavior: 'instant', block: 'start'})
    localStorage.setItem('estimateFormData', JSON.stringify(formData))
    setSubmitted(true)
  }

  function handleReset() {
    localStorage.removeItem('estimateFormData')
    headerRef.current?.scrollIntoView({behavior: 'instant', block: 'start'})
    setFormData({
      natureProjet: '',
      typeTravaux: '',
      typeMarche: '',
      typeProjet: '',
      surfaceRenover: '',
      surfaceAmenager: '',
      finitions: '',
      niveauPrestation: ''
    })
    setSubmitted(false)
  }

  function getSurfaceCoefficient(surface: string): number {
    if (surface === '20-60m²') return 1.1
    if (surface === '60-100m²') return 1.2
    if (surface === '100-150m²') return 1.3
    if (surface === '>150m²') return 1.4
    return 1
  }

  function calculEstimation() {
    const {
      typeProjet,
      niveauPrestation,
      surfaceRenover,
      surfaceAmenager,
      finitions
    } = formData
    const projetData = projectTimes[typeProjet]
    if (!projetData) return {tempsTotal: 0, estimationEuros: 0}

    const niveau = niveauPrestation.toLowerCase().replace(' ', '')
    const tempsBase = projetData[niveau as keyof typeof projetData]
    if (!tempsBase) return {tempsTotal: 0, estimationEuros: 0}

    const coefSurfaceRenover = getSurfaceCoefficient(surfaceRenover)
    const coefSurfaceAmenager = getSurfaceCoefficient(surfaceAmenager)

    let tempsTotal = tempsBase * coefSurfaceRenover * coefSurfaceAmenager
    if (finitions === 'Haut de gamme') tempsTotal *= 1.1

    const tarifHoraire = 90
    const estimationEuros = tempsTotal * tarifHoraire

    return {tempsTotal, estimationEuros}
  }

  if (isLoading) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          <p className="text-xl mt-4">Chargement en cours...</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    const {tempsTotal, estimationEuros} = calculEstimation()

    return (
      <div className="max-w-screen-2xl mx-auto mt-16" ref={headerRef}>
        <p className="flex flex-col w-1/3">
          <span>Projet</span>
          <span className="font-fontBold text-primary text-5xl">
            {formData.natureProjet}
          </span>
        </p>
        <div className="flex gap-10 justify-between">
          <div className="space-y-4 text-lg w-1/3">
            <p className="flex mt-0 flex-col">
              <span>Type de travaux :</span>
              <span className="font-fontBold">{formData.typeTravaux}</span>
            </p>
            <p className="flex flex-col max-w-sm">
              <span>Type de projet :</span>
              <span className="font-fontBold w-3/4">{formData.typeProjet}</span>
            </p>
            <p className="flex flex-col">
              <span>Niveau de prestations souhaité :</span>
              <span className="font-fontBold">{formData.niveauPrestation}</span>
            </p>
            <p className="flex flex-col">
              <span>Type de marché :</span>
              <span className="font-fontBold">{formData.typeMarche}</span>
            </p>
          </div>

          <div className="bg-primary text-white p-6 w-1/3 text-center ">
            <p className="text-xl font-fontBold">Total des prestations</p>
            <p className="text-9xl my-0 font-number">
              {Math.round(tempsTotal)}
            </p>
            <p className="text-2xl text-white font-fontBold mt-0">heures</p>
            <p className="text-lg text-center leading-none mt-2">
              Il s’agit du temps total approximatif nécessaire pour réaliser le
              projet d’étude
            </p>
          </div>
          <div className="text-lg w-1/3">
            <p className="mt-0 text-center ">
              <strong className="font-fontBold">Contenu de la mission</strong>
            </p>
            {niveauDetails[formData.niveauPrestation].map((prestation, index) => (
              <p key={index} className="mt-2 mb-0 text-center">{prestation}</p>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <p className="text-xl mb-2">Coût total des prestations :</p>
          <p className="text-6xl my-0 font-fontBold text-primary">
            €{' '}
            {estimationEuros.toLocaleString('fr-FR', {
              maximumFractionDigits: 0
            })}{' '}
            TTC
          </p>
          <p className="text-sm w-2/3 max-w-lg mt-2 mx-auto">
            Il s’agit du coût approximatif. Nos honoraires pour la direction des
            travaux sont ajustés en fonction du montant des travaux.
          </p>
        </div>

        <div className='flex justify-center items-center'>

            <div className="text-center">
          <button
            onClick={handleReset}
            className="bg-primary text-white p-2 text-xl border-primary font-bold border hover:bg-white hover:text-primary hover:border-primary"
          >
            Recommencer
          </button>
        </div>
        <div className="text-center">
          <button
            onClick={() => setSubmitted(false)}
            className="border-primary text-primary p-2 text-xl font-bold border hover:bg-white"
          >
            Modifier
          </button>
        </div>
        </div>

        
        <Spacer h={55} />
      </div>
    )
  }

  return (
    <div className="p-4 max-w-screen-2xl mx-auto" ref={headerRef}>
      <form onSubmit={handleSubmit} className=" mt-10">
        <label htmlFor="natureProjet">
          1. Nature du projet :
          {formErrors.natureProjet && (
            <p className="text-red-500 text-sm mt-0 mb-0">
              {formErrors.natureProjet}
            </p>
          )}
          <Spacer h={20} />
          <input
            type="text"
            name="natureProjet"
            placeholder="Décris ton projet"
            value={formData.natureProjet}
            onChange={(e) => handleChange('natureProjet', e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <p className="mb-0">2. Type de travaux :</p>
        {formErrors.typeTravaux && (
          <p className="text-red-500 text-sm my-0">{formErrors.typeTravaux}</p>
        )}
        <div className="flex gap-2 justify-between mt-4">
          {[
            'Rénovation légère',
            'Rénovation lourde',
            'Aménagement intérieur sans restructuration',
            'Aménagement intérieur avec restructuration'
          ].map((travaux) => (
            <button
              key={travaux}
              type="button"
              className={`border min-w-64 max-w-52 h-fit p-3 text-xl font-fontBold ${formData.typeTravaux === travaux ? 'bg-primary text-white' : 'text-black'}`}
              onClick={() => handleChange('typeTravaux', travaux)}
            >
              {travaux}
            </button>
          ))}
        </div>

        <p className="mb-0">3. Type de marché :</p>
        {formErrors.typeMarche && (
          <p className="text-red-500 text-sm my-0">{formErrors.typeMarche}</p>
        )}
        <div className="flex gap-11 justify-center mt-4">
          {['Marché privé', 'Marché public'].map((marche, i) => (
            <button
              key={marche}
              type="button"
              className={`relative border min-w-64 max-w-52 text-xl h-fit p-3 font-fontBold ${formData.typeMarche === marche ? 'bg-primary text-white' : ''}`}
              onClick={() => handleChange('typeMarche', marche)}
            >
              {marche}
              <sup className="text-xs absolute top-0 right-2">{i + 1}</sup>
            </button>
          ))}
        </div>

        <label htmlFor="typeProjet">
          4. Type de projet :
          {formErrors.typeProjet && (
            <p className="text-red-500 text-sm mt-0">{formErrors.typeProjet}</p>
          )}
          <Spacer h={20} />
          <select
            value={formData.typeProjet}
            onChange={(e) => handleChange('typeProjet', e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Sélectionner un type de projet</option>
            {Object.keys(projectTimes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <p>5. Surface approximative :</p>
        <div className="flex gap-40">
          <div className="flex flex-1 items-center">
            <label className="w-1/2 font-fontBold text-black">
              A rénover :
            </label>
            <div className="w-1/2">
              <select
                value={formData.surfaceRenover}
                onChange={(e) => handleChange('surfaceRenover', e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Choisir surface</option>
                <option value="0-50m²">0-50m²</option>
                <option value="50-100m²">50-100m²</option>
                <option value="100-150m²">100-150m²</option>
                <option value=">150m²">{'>150m²'}</option>
              </select>
              {formErrors.surfaceRenover && (
                <p className="text-red-500 text-sm mt-0 mb-0">
                  {formErrors.surfaceRenover}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <label className="w-1/2 font-fontBold text-black">
              A aménager :
            </label>
            <div className="w-1/2">
              <select
                value={formData.surfaceAmenager}
                onChange={(e) =>
                  handleChange('surfaceAmenager', e.target.value)
                }
                className="border p-2 w-full"
              >
                <option value="">Choisir surface</option>
                <option value="0-50m²">0-50m²</option>
                <option value="50-100m²">50-100m²</option>
                <option value="100-150m²">100-150m²</option>
                <option value=">150m²">{'>150m²'}</option>
              </select>
              {formErrors.surfaceAmenager && (
                <p className="text-red-500 text-sm mt-0 mb-0">
                  {formErrors.surfaceAmenager}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="mb-0">6. Finitions souhaitées :</p>
        {formErrors.finitions && (
          <p className="text-red-500 text-sm my-0">{formErrors.finitions}</p>
        )}
        <div className="flex gap-11 justify-center mt-4">
          {['Standard', 'Haut de gamme'].map((finition) => (
            <button
              key={finition}
              type="button"
              className={`relative border text-xl min-w-64 max-w-52 h-fit p-3 font-fontBold ${formData.finitions === finition ? 'bg-primary text-white' : ''}`}
              onClick={() => handleChange('finitions', finition)}
            >
              {finition}
            </button>
          ))}
        </div>

        <p className="mb-0">7. Niveau de prestations souhaité :</p>
        {formErrors.niveauPrestation && (
          <p className="text-red-500 text-sm my-0">
            {formErrors.niveauPrestation}
          </p>
        )}
        <div className="flex gap-10 mt-4 justify-between">
          {[1, 2, 3].map((niveau) => {
            const selectedProject = projectTimes[formData.typeProjet]
            const niveauKey = `niveau${niveau}` as keyof typeof selectedProject
            const isAvailable =
              selectedProject && selectedProject[niveauKey] !== undefined
              const detail = niveauxListes['Niveau ' + niveau]

            return (
              <div className="w-1/3" key={niveau}>
                <p className="font-fontBlack mb-1 text-2xl text-center">
                  Niveau {niveau}
                </p>
                <button
                  type="button"
                  disabled={!isAvailable}
                  className={`border p-4 w-full h-full ${!isAvailable ? 'opacity-40 cursor-not-allowed' : ''} ${formData.niveauPrestation === `Niveau ${niveau}` && isAvailable ? 'bg-primary text-white' : ''}`}
                  onClick={() =>
                    isAvailable &&
                    handleChange('niveauPrestation', `Niveau ${niveau}`)
                  }
                >
                  <div className='flex flex-col items-center h-full gap-3'>
                    <img className='w-16 my-0 mt-2' src={detail.icon} alt={detail.title} />
                    <p className='font-fontBold my-0 text-2xl'>{detail.title}</p>
                    <p className='my-0 text-lg text-left pl-4 leading-tight'>{detail.description}</p>
                    <ul className='my-0 w-full p-0 pl-2'>
                      {detail.list.map((ele, index) => (
                        <li key={index} className='flex items-center gap-3'>
                          <img className='my-0' src={ele.icon} alt={ele.label} />
                          <p className='my-0'>{ele.label}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </div>
            )
          })}
        </div>

        <Spacer h={55} />
        <button
          type="submit"
          className="bg-primary text-white p-4 font-fontBold text-xl mt-12"
        >
          Calculer
        </button>
      </form>

      <Spacer h={55} />
    </div>
  )
}

export default Estimate
