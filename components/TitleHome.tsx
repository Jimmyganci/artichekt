'use client'
import {gsapTo} from '@/lib/functions'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useEffect, useRef, useState} from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const title = ['ARCHITECTURE', 'INTERIEURE', 'INNOVANTE']

function TitleHome() {
  const [isHovered, setIsHovered] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const main = useRef<any>()

  useGSAP(
    () => {
      gsapTo('.title-span', 0.3)
    },
    {scope: main}
  )

  function handleMouseEnter(e: any) {
    setTimeout(() => {
      setIsHovered(e.target.id)
    }, 300)
  }

  function handleMouseLeave() {
    setTimeout(() => {
      setIsHovered('')
    }, 300)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 2000)
  }, [])

  return (
    <h1
      ref={main}
      className="z-10 flex flex-col text-[25vw] sm:text-[9vw] sm:text-end sm:text-black sm:absolute sm:right-0 sm:w-full sm:pr-[8.8vw] break-words font-fontBlack text-primary"
    >
      {title.map((word, index) => (
        <span key={index} className="title-span select-none">
          {word.split('').map((letter, i) => {
            const isHighlighted =
              i < 3 && (word === 'INTERIEURE' || word === 'INNOVANTE')
            const isHoveredLetter = `${index}_${i}` === isHovered
            return (
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={i}
                id={`${index}_${i}`}
                className={`transition ${!isLoading ? 'animate-pulseLetter' : ''} ease-in-letter duration-300 inline-block
                  ${isHighlighted ? 'sm:text-white' : ''}
                  ${isHoveredLetter ? 'animate-hoverLetter text-primary' : ''}
                `}
                style={{
                  // color: isHoveredLetter ? '#7DA365' : undefined,
                  animationDelay: !isHoveredLetter
                    ? `${(i + 0.1) * 0.1 + 1}s`
                    : '0s'
                }}
              >
                {letter}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

export default TitleHome
