'use client'
import React, {useRef, useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'
import {gsapTo} from '@/lib/functions'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const title = ['ARCHITECTURE', 'INTERIEURE', 'INNOVANTE']

function TitleHome() {
  const [isHovered, setIsHovered] = useState('')

  const main = useRef<any>()

  useGSAP(
    () => {
      gsapTo('.title-span', 0.2)
    },
    {scope: main}
  )

  function handleMouseEnter(e: any) {
    setIsHovered(e.target.id)
  }

  function handleMouseLeave(e: any) {
    setIsHovered('')
  }

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
                className={`transition ease-in-letter duration-300 inline-block
                  ${isHighlighted ? 'sm:text-white' : ''}
                  ${isHoveredLetter ? 'animate-pluseLetter  text-primary' : ''}
                `}
                style={{
                  color: isHoveredLetter ? '#7DA365' : undefined
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
