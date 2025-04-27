'use client'

import { useState } from 'react'
import Spacer from '../Spacer'

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

  function handleChange (key: string, value: string) {
    setFormData({...formData, [key]: value})
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // tu peux envoyer formData vers une API ici
  }
  return (
    <div className="p-4">
      <div className="flex">
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
            substituer a
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Nature du projet */}
        <label htmlFor="project">
          1. Nature du projet :
          <Spacer h={20} />
          <input
            type="text"
            name="project"
            placeholder="Décris ton projet"
            value={formData.natureProjet}
            onChange={(e) => handleChange('natureProjet', e.target.value)}
            className="border p-2  w-full"
          />
        </label>

        <Spacer h={4} />

        {/* 2. Type de travaux */}
        <p>2. Type de travaux : </p>
        <div className="flex gap-2 justify-between">
          {[
            'Rénovation légère',
            'Rénovation lourde',
            'Aménagement intérieur sans restructuration',
            'Aménagement intérieur avec restructuration'
          ].map((travaux) => (
            <button
              key={travaux}
              type="button"
              className={`border min-w-40 max-w-52 h-fit p-3 font-fontBold  ${formData.typeTravaux === travaux ? 'bg-primary text-white' : ' text-black '}`}
              onClick={() => handleChange('typeTravaux', travaux)}
            >
              {travaux}
            </button>
          ))}
        </div>

        {/* 3. Type de marché */}
        <p>2. Type de marché : </p>
        <div className="flex gap-6">
          {['Marché privé', 'Marché public'].map((marche, i) => (
            <button
              key={marche}
              type="button"
              className={`relative border min-w-40 max-w-52 h-fit p-3 font-fontBold  ${formData.typeMarche === marche ? 'bg-primary text-white' : ''}`}
              onClick={() => handleChange('typeMarche', marche)}
            >
              {marche}
              <sup className="text-xs absolute top-0 right-2">{i + 1}</sup>
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs">
          <p>
            <sup>1</sup> Est considéré comme <strong>marché privé</strong>{` :
            particuliers résidents, professionnels du secteur tertiaire, secteur
            industriel, professionnels de l'hôtellerie, restauration et/ou bar,
            etc.`}
          </p>
          <p className="mt-2">
            <sup>2</sup> Est considéré comme <strong>marché public</strong> {`:
            toutes collectivités et administrations publiques telles que les
            bibliothèques communales, musées, établissements scolaires, Mairie,
            etc.`}
          </p>
        </div>

        <Spacer h={20} />

        {/* 4. Type de projet */}
        <label htmlFor="project">
          4. Type de projet :
          <Spacer h={20} />
          <select
            value={formData.typeProjet}
            onChange={(e) => handleChange('typeProjet', e.target.value)}
            className="border p-2  w-full"
          >
            <option value="">Sélectionner un type de projet</option>
            <option value="Maison individuelle">Maison individuelle</option>
            <option value="Appartement standing moyen">
              {`Appartement de standing "moyen"`}
            </option>
            {/* ajoute d'autres options ici */}
          </select>
        </label>

        <Spacer h={5} />

        {/* 5. Surface */}
        <p>5. SurfSurface approximative : </p>
        <div className="flex gap-40">
          <div className="flex flex-1 items-center">
            <label className="w-1/2 font-fontBold text-black">
              à rénover :
            </label>
            <select
              value={formData.surfaceRenover}
              onChange={(e) => handleChange('surfaceRenover', e.target.value)}
              className="border p-2  w-1/2"
            >
              <option value="">Choisir surface</option>
              <option value="0-50m²">0-50m²</option>
              <option value="50-100m²">50-100m²</option>
              {/* autres surfaces */}
            </select>
          </div>

          <div className="flex flex-1 items-center">
            <label className="w-1/2 font-fontBold text-black">
              À aménager :
            </label>
            <select
              value={formData.surfaceAmenager}
              onChange={(e) => handleChange('surfaceAmenager', e.target.value)}
              className="border p-2  w-1/2"
            >
              <option value="">Choisir surface</option>
              <option value="0-50m²">0-50m²</option>
              <option value="50-100m²">50-100m²</option>
              {/* autres surfaces */}
            </select>
          </div>
        </div>

        <Spacer h={5} />

        {/* 6. Finitions */}
        <p>6. Finitions souhaitées : </p>
        <div className="flex gap-6">
          {['Standard', 'Haut de gamme'].map((finition) => (
            <button
              key={finition}
              type="button"
              className={`relative border min-w-40 max-w-52 h-fit p-3 font-fontBold ${formData.finitions === finition ? 'bg-primary text-white' : ''}`}
              onClick={() => handleChange('finitions', finition)}
            >
              {finition}
            </button>
          ))}
        </div>

        <Spacer h={5} />

        {/* 7. Niveau de prestations */}
        <p>7. Niveau de prestations souhaité : </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((niveau) => (
            <div className="w-1/3 h-64" key={niveau}>
              <p className="font-fontBold mb-1 text-center">Niveau {niveau}</p>
              <button
                key={niveau}
                type="button"
                className={`border p-4  w-full h-full  ${formData.niveauPrestation === `Niveau ${niveau}` ? 'bg-primary text-white' : ''}`}
                onClick={() =>
                  handleChange('niveauPrestation', `Niveau ${niveau}`)
                }
              ></button>
            </div>
          ))}
        </div>

        <Spacer h={55} />

        {/* Bouton Calculer */}
        <button type="submit" className="bg-primary text-white p-4 ">
          Calculer
        </button>
      </form>

      <Spacer h={55} />
    </div>
  )
}

export default Estimate
