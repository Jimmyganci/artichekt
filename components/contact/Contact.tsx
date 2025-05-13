'use client'
import Link from 'next/link'
import {useEffect, useRef} from 'react'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

import CarouselContact from './CarouselContact'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

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
        markers: true
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

  return (
    <main className="pt-60 px-32 max-w-screen-xl mx-auto">
      <section className="flex gap-20">
        <form action="" className="flex flex-col gap-4 w-1/2">
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
          <input className="w-fit mt-20" type="submit" value="Envoyer" />
        </form>
        <div className="w-1/2">
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
              parle de
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
            className="flex flex-col absolute top-36 left-0 z-10"
          >
            <span
              style={{
                perspective: '500px'
              }}
              className="text-9xl font-number text-primary"
            >
              UN LIEU
            </span>
            <span className="text-9xl font-number text-primary">DÉDIÉ</span>
            <span className="text-9xl font-number text-primary">A LA</span>
            <span className="text-9xl font-fontBold text-primary">
              CRÉATION
            </span>
          </h4>
        </div>

        <div className="w-[55%]">
          <CarouselContact />
        </div>
      </section>
    </main>
  )
}

export default Contact
