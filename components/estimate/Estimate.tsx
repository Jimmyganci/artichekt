'use client'

import {useEffect, useRef, useState} from 'react'
import Spacer from '../Spacer'

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
    niveau3: 300
  },
  'Surface destinée à la restauration et autres lieux festifs': {
    niveau2: 350,
    niveau3: 420
  },
  'Surface destinée à l’hôtellerie': {niveau2: 375, niveau3: 450},
  'Espace de travail collaboratif': {niveau2: 275, niveau3: 330},
  'Bureaux type open space du secteur tertiaire': {niveau2: 275, niveau3: 330},
  "Surface dédiée à l'accueil de public au sein d'une administration": {
    niveau2: 300,
    niveau3: 360
  },
  'Espace culturel de type bibliothèque, musée, galerie': {
    niveau2: 300,
    niveau3: 360
  },
  'Surface de commerces': {niveau2: 300, niveau3: 360}
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

  const headerBlock = (
    <div className="flex" ref={headerRef}>
      <h1 className="flex flex-col gap-1 text-6xl font-fontBold w-2/5 min-w-[400px]">
        <span className="bg-primary w-fit text-white p-1">Outil de</span>
        <span className="bg-primary w-fit text-white p-1">calcul</span>
        <span className="bg-primary w-fit text-white p-1">des</span>
        <span className="bg-primary w-fit text-white p-1">prestations</span>
      </h1>
      <div className="w-3/5">
        <p className="mt-0 text-xl">
          ARTICHEKT a développé un outil qui vous permet d’estimer
          approximativement le montant de vos prestations en fonction de la
          nature de votre projet et sa typologie.
        </p>
        <p className="mt-0 text-xl">
          Cette estimation n’est évidemment pas contractuelle et ne peut se
          substituer à un devis précis.
        </p>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        {headerBlock}
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
      <div className="p-4 max-w-screen-2xl mx-auto">
        {headerBlock}

        <div className="flex gap-72 items-center">
          <div className="space-y-4 mt-10 text-lg">
            <p className="flex flex-col">
              <span>Nom du projet :</span>
              <span className="font-fontBold text-primary text-5xl">
                {formData.natureProjet}
              </span>
            </p>
            <p className="flex flex-col">
              <span>Type de travaux :</span>
              <span className="font-fontBold">{formData.typeTravaux}</span>
            </p>
            <p className="flex flex-col max-w-sm">
              <span>Type de projet :</span>{' '}
              <span className="font-fontBold">{formData.typeProjet}</span>
            </p>
            <p className="flex flex-col">
              <span>Niveau de prestations :</span>{' '}
              <span className="font-fontBold">{formData.niveauPrestation}</span>
            </p>
            <p className="flex flex-col">
              <span>Type de marché :</span>{' '}
              <span className="font-fontBold">{formData.typeMarche}</span>
            </p>
          </div>

          <div className="bg-primary text-white p-6 w-1/3 mt-10 text-center">
            <p className="text-xl font-fontBold">Total des prestations</p>
            <p className="text-9xl my-0 font-number">
              {Math.round(tempsTotal)}
            </p>
            <p className="text-2xl text-white font-fontBold mt-0">heures</p>
            <p className="text-sm text-left mt-2">
              Il s’agit du temps total approximatif nécessaire pour réaliser le
              projet d’étude
            </p>
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
          <p className="text-sm mt-2">Ceci est un devis non contractuel.</p>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleReset}
            className="bg-primary text-white p-4 text-xl font-bold"
          >
            Faire une nouvelle estimation
          </button>
        </div>
        <Spacer h={55} />
      </div>
    )
  }

  return (
    <div className="p-4 max-w-screen-2xl">
      {headerBlock}

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
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((niveau) => {
            const selectedProject = projectTimes[formData.typeProjet]
            const niveauKey = `niveau${niveau}` as keyof typeof selectedProject
            const isAvailable =
              selectedProject && selectedProject[niveauKey] !== undefined

            return (
              <div className="w-1/3 h-64" key={niveau}>
                <p className="font-fontBold mb-1 text-center">
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
                  {isAvailable ? '' : 'Indisponible'}
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
