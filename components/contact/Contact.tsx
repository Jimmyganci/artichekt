'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Breadcrumb from '../Breadcrumb'
import CarouselContact from './CarouselContact'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const [responseMessage, setResponseMessage] = useState<string | null>(null)
  const [responseType, setResponseType] = useState<'success' | 'error' | null>(
    null
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const destination =
    "ARTICHEKT | Agence d'architecture intérieure, Rue du Tuquet 3, Angresse"
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`

  useEffect(() => {
    const container = containerRef.current
    const headline = headlineRef.current

    if (!container || !headline) return

    const lines = headline.querySelectorAll('span')
    if (!lines.length) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 40%',
        end: '+=400',
        scrub: false,
        markers: false
      }
    })

    tl.from(lines, {
      transformOrigin: '50% 50% -50px',
      opacity: 0,
      rotateX: -90,
      y: 50
    })

    tl.to(lines, {
      opacity: 1,
      rotateX: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2
    })

    return () => {
      tl.kill()
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResponseType(null)
    setResponseMessage(null)
    const form: any = e.currentTarget
    
    // Réinitialiser les messages précédents
    setResponseType('error')
    
    // Vérification du honeypot (anti-spam)
    if (form.website.value) {
      setResponseMessage('Erreur de validation.')
      return
    }
    
    // Trim des valeurs
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const object = form.object.value.trim()
    const budget = form.budget.value.trim()
    const message = form.message.value.trim()
    
    // Tableaux pour collecter les erreurs par catégorie
    const missingFields: string[] = []
    const errors: string[] = []
    
    // Validation du nom
    if (!name) {
      missingFields.push('le nom')
    } else {
      if (name.length < 2) {
        errors.push('Le nom doit comporter au minimum 2 caractères.')
      }
      if (name.length > 100) {
        errors.push('Le nom ne peut pas dépasser 100 caractères.')
      }
    }
    
    // Validation de l'email
    if (!email) {
      missingFields.push("l'email")
    } else {
      if (email.length > 255) {
        errors.push("L'email ne peut pas dépasser 255 caractères.")
      } else {
        // Validation du format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          errors.push("Le format de l'email n'est pas valide.")
        }
      }
    }
    
    // Validation de l'objet
    if (object.length > 200) {
      errors.push("L'objet ne peut pas dépasser 200 caractères.")
    }
    
    // Validation du message
    if (!message) {
      missingFields.push('le message')
    } else {
      if (message.length < 10) {
        errors.push('Le message doit comporter au minimum 10 caractères.')
      }
      if (message.length > 2000) {
        errors.push('Le message ne peut pas dépasser 2000 caractères.')
      }
    }
    
    // Validation du budget (optionnel mais si rempli, vérifier la longueur)
    if (budget.length > 100) {
      errors.push('Le budget ne peut pas dépasser 100 caractères.')
    }
    
    // Formater le message d'erreur pour les champs obligatoires
    if (missingFields.length > 0) {
      let missingMessage = ''
      if (missingFields.length === 1) {
        missingMessage = `${missingFields[0].charAt(0).toUpperCase() + missingFields[0].slice(1)} est obligatoire.`
      } else if (missingFields.length === 2) {
        missingMessage = `${missingFields[0].charAt(0).toUpperCase() + missingFields[0].slice(1)} et ${missingFields[1]} sont obligatoires.`
      } else {
        const lastField = missingFields[missingFields.length - 1]
        const otherFields = missingFields.slice(0, -1)
        missingMessage = `${otherFields.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ')} et ${lastField} sont obligatoires.`
      }
      errors.unshift(missingMessage)
    }
    
    // Si des erreurs ont été trouvées, les afficher toutes
    if (errors.length > 0) {
      setResponseMessage(errors.join(' '))
      return
    }

    const data = {
      name,
      email,
      object,
      budget,
      message,
      website: form.website.value // honeypot
    }

    try {
      const res = await fetch(
        'https://preprod.artichekt.com/wp-json/custom/v1/contact',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }
      )

      const json = await res.json()
      if (json.success) {
        setResponseMessage('Votre message a bien été envoyé.')
        setResponseType('success')
        form.reset()
      } else {
        // Gérer le format errors du backend (objet avec erreurs par champ)
        if (json.errors && typeof json.errors === 'object') {
          const backendErrors: string[] = []
          const backendMissingFields: string[] = []
          
          // Collecter les erreurs par type
          Object.entries(json.errors).forEach(([field, message]) => {
            const msg = message as string
            if (msg.includes('obligatoire')) {
              if (field === 'name') backendMissingFields.push('le nom')
              else if (field === 'email') backendMissingFields.push("l'email")
              else if (field === 'message') backendMissingFields.push('le message')
            } else {
              backendErrors.push(msg)
            }
          })
          
          // Formater le message pour les champs obligatoires
          if (backendMissingFields.length > 0) {
            let missingMessage = ''
            if (backendMissingFields.length === 1) {
              missingMessage = `${backendMissingFields[0].charAt(0).toUpperCase() + backendMissingFields[0].slice(1)} est obligatoire.`
            } else if (backendMissingFields.length === 2) {
              missingMessage = `${backendMissingFields[0].charAt(0).toUpperCase() + backendMissingFields[0].slice(1)} et ${backendMissingFields[1]} sont obligatoires.`
            } else {
              const lastField = backendMissingFields[backendMissingFields.length - 1]
              const otherFields = backendMissingFields.slice(0, -1)
              missingMessage = `${otherFields.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(', ')} et ${lastField} sont obligatoires.`
            }
            backendErrors.unshift(missingMessage)
          }
          
          setResponseMessage(backendErrors.join(' ') || "Erreur lors de l'envoi.")
        } else {
          setResponseMessage(json.error || "Erreur lors de l'envoi.")
        }
        setResponseType('error')
      }
    } catch (err) {
      console.error(err)
      setResponseMessage("Une erreur s'est produite.")
      setResponseType('error')
    }
  }

  return (
    <main className="pt-32 lg:pt-60 px-10 lg:px-32 max-w-screen-2xl mx-auto mb-60">
      <Breadcrumb />
      <section className="flex flex-col lg:flex-row gap-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:w-1/2">
          <label htmlFor="website" className="hidden">
            Website
            <input
              type="text"
              name="website"
              id="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
          <label htmlFor="name" className="flex flex-col">
            Votre nom :
            <input type="text" name="name" id="name" />
          </label>
          <label htmlFor="email" className="flex flex-col">
            Votre email :
            <input type="email" name="email" id="email" />
          </label>
          <label htmlFor="object" className="flex flex-col">
            Objet :
            <input type="text" name="object" id="object" />
          </label>
          <label htmlFor="budget" className="flex flex-col">
            Budget approximatif (facultatif):
            <input type="text" name="budget" id="budget" />
          </label>
          <label htmlFor="message" className="flex flex-col">
            Votre message :
            <textarea name="message" id="message" rows={10}></textarea>
          </label>
          {responseMessage && (
            <p
              className={`mt-4 text-lg ${
                responseType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {responseMessage}
            </p>
          )}
          <input className="w-fit mt-20" type="submit" value="Envoyer" />
        </form>
        <div className="lg:w-1/2">
          <div className="mt-6">
            <h4 className="text-4xl mt-0 font-fontRegular font-light text-primary">
              AGENCE
            </h4>
            <p className="leading-none font-fontBold text-primary text-2xl">
              SARL ARTICHEKT <br /> 96 rue du Tuquet 3 <br /> 40150 ANGRESSE
            </p>
          </div>
          <div className="mt-20">
            <h4 className="text-4xl mt-0 font-fontRegular font-light text-primary">
              CONTACT
            </h4>
            <p className="leading-none font-fontBold text-primary text-2xl">
              96 rue du Tuquet 3 <br />
              40150 ANGRESSE <br />
              (+33) 5 35 65 95 64 <br />
              contact@artichekt.com
            </p>
          </div>
          <div className="mt-20">
            <h4 className="text-4xl mt-0 font-fontRegular font-light text-primary">
              RESEAUX
            </h4>
            <Link
              target="_blank"
              className="leading-none font-fontBold text-primary text-2xl"
              href="https://www.instagram.com/artichekt.agence/"
            >
              Instagram
            </Link>
            <br />
            <Link
              target="_blank"
              className="leading-none font-fontBold text-primary text-2xl"
              href="https://www.facebook.com/artichekt?locale=fr_FR"
            >
              Facebook
            </Link>
          </div>
          <div>
            <p className="text-7xl text-end text-primary font-fontRegular font-normal">
              Venez nous
              <br />
              parler de
              <br />
              votre projet
              <br />
              dans
            </p>
          </div>
        </div>
      </section>
      <section
        ref={containerRef}
        className="relative w-full flex flex-col items-end"
      >
        <div>
          <h4
            ref={headlineRef}
            className="flex flex-col absolute top-0 sm:top-36 left-0 z-10"
          >
            <span
              style={{
                perspective: '500px'
              }}
              className="text-5xl sm:text-7xl lg:text-9xl font-number text-primary"
            >
              UN LIEU
            </span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-number text-primary">
              DÉDIÉ
            </span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-number text-primary">
              A LA
            </span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-fontBold text-primary">
              CRÉATION
            </span>
          </h4>
        </div>

        <div className="w-[55%]">
          <CarouselContact />
        </div>
      </section>

      <div className="w-full flex justify-center mt-20">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <button className="px-4 text-2xl py-2 text-white bg-primary">
            {"S'y rendre"}
          </button>
        </a>
      </div>
    </main>
  )
}

export default Contact
