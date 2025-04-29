'use client'
import { gsap } from 'gsap'
import { MotionPathPlugin, ScrollTrigger } from 'gsap/all'
import { useEffect, useRef, useState } from 'react'

// Enregistrer les plugins GSAP
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

function Line() {
  const circles = useRef<(SVGCircleElement | null)[]>([])
  const [pointToAppear, setPointToAppear] = useState<string[]>([])

  useEffect(() => {
    // Initialisation des éléments avec GSAP
    gsap.set('#linesvg', {opacity: 1})
    gsap.set('#motionSVG', {scale: 0.7, autoAlpha: 1})
    gsap.set('#tractor', {transformOrigin: '50% 50%'})

    let rotateTo = gsap.quickTo('#tractor', 'rotation'),
      prevDirection = 0

    function checkCollision() {
      const tractor = document.getElementById('tractor') as any
      const tractorRect = tractor.getBoundingClientRect()

      circles.current.forEach((circle, index) => {
        if (circle) {
          const circleRect = circle.getBoundingClientRect()

          // Comparer les positions du `tractor` et du cercle fixe
          const isColliding =
            tractorRect.left < circleRect.right &&
            tractorRect.right > circleRect.left &&
            tractorRect.top < circleRect.bottom &&
            tractorRect.bottom > circleRect.top

          if (isColliding) {
            setPointToAppear((prevPoints) => {
              // Vérifie si l'élément existe déjà dans le tableau
              if (!prevPoints.includes(String(index))) {
                // Si l'élément n'est pas présent, on l'ajoute
                return [...prevPoints, String(index)]
              }
              // Sinon, on retourne le tableau inchangé
              return prevPoints
            })
          }
        }
      })
    }

    // Animation principale
    const motionPath = document.querySelector('#motionPath')
    if (motionPath) {
      gsap.to('#motionSVG', {
        scrollTrigger: {
          trigger: '#motionPath',
          start: '-100 center',
          end: () => '+=' + motionPath.getBoundingClientRect().height,
          scrub: 0.5,
          onUpdate: (self) => {
            if (prevDirection !== self.direction) {
              // Changer la direction de rotation
              rotateTo(self.direction === 1 ? 0 : -180)
              prevDirection = self.direction
            }

            checkCollision()
          }
        },
        ease: pathEase('#motionPath'), // Utilisation de la fonction de facilité personnalisée
        immediateRender: true,
        motionPath: {
          path: '#motionPath',
          align: '#motionPath',
          alignOrigin: [0.5, 0.5],
          autoRotate: 90
        }
      })
    }
  }, [])

  return (
    <div className="relative">
      <svg
        id="linesvg"
        opacity="0"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 869 2402"
        xmlSpace="preserve"
        className="-mt-[400px]"
      >
        <path
          id="motionPath"
          className="fill-none stroke-primary stroke-[5] stroke-linecap-round stroke-linejoin-round"
          style={{strokeMiterlimit: 10}}
          d="M155.395,383.31 C152.773,390.548 92.401,646.162 250.215,727.041 453.479,831.213 835.629,715.412 832.33,924.268 830.006,1071.385 20.339,1040.965 22.58,1206.204 24.517,1348.994 835.125,1320.378 832.275,1445.504 827.175,1669.362 57.235,1623.348 56.673,1760.63 55.674,2004.272 837.157,1936.609 837.205,2053.845 837.283,2246.807 137.92199,2252.96102 137.92199,2252.96102 "
        />
        <circle
          ref={(el: any) => (circles.current[0] = el)}
          cx="250"
          cy="727"
          r="10"
          className="fill-red"
        />
        <circle
          ref={(el: any) => (circles.current[1] = el)}
          cx="832"
          cy="924"
          r="10"
          className="fill-red"
        />
        <circle
          ref={(el: any) => (circles.current[2] = el)}
          cx="22"
          cy="1206"
          r="10"
          className="fill-red"
        />
        <circle
          ref={(el: any) => (circles.current[3] = el)}
          cx="832"
          cy="1445"
          r="10"
          className="fill-red"
        />
        <circle
          ref={(el: any) => (circles.current[4] = el)}
          cx="56"
          cy="1760"
          r="10"
          className="fill-red"
        />
        <circle
          ref={(el: any) => (circles.current[5] = el)}
          cx="837"
          cy="2053"
          r="10"
          className="fill-red"
        />
        <g id="motionSVG">
          <circle
            cx="50"
            cy="50"
            r="20"
            id="tractor"
            className="fill-primary"
          />
        </g>
      </svg>
      <div
        className={`absolute flex items-center gap-6 duration-500 transition-all top-[27%] left-[30%] opacity-0 ${pointToAppear.includes('0') && 'opacity-100'}`}
      >
        <img
          className="w-16"
          src="/assets/icons/architecture.svg"
          alt="architecture"
        />
        <p className="font-fontBold text-primary">CONCEPTION</p>
      </div>
      <div
        className={`absolute flex flex-row-reverse items-center gap-6 duration-500 transition-all top-[37%] left-[82%] -translate-x-1/2 opacity-0 ${pointToAppear.includes('1') && 'opacity-100'}`}
      >
        <img
          className="w-16"
          src="/assets/icons/casque.svg"
          alt="architecture"
        />
        <p className="font-fontBold text-primary">SUIVI DE CHANTIER</p>
      </div>
      <div
        className={`absolute flex items-center gap-6 duration-500 transition-all top-[48%] left-[7%]  opacity-0 ${pointToAppear.includes('2') && 'opacity-100'}`}
      >
        <img
          className="w-16"
          src="/assets/icons/autorisation.svg"
          alt="architecture"
        />
        <p className="font-fontBold text-primary">{"DEMANDE D'AUTORISATION"}</p>
      </div>
      <div
        className={`absolute flex flex-row-reverse items-center gap-6 duration-500 transition-all top-[59%] left-[80%] -translate-x-1/2  opacity-0 ${pointToAppear.includes('3') && 'opacity-100'}`}
      >
        <img
          className="w-16"
          src="/assets/icons/maison-ecologique.svg"
          alt="architecture"
        />
        <p className="font-fontBold text-primary">
          CONSEIL EN RENOVATION SOBRE
        </p>
      </div>
      <div
        className={`absolute flex items-center gap-6 duration-500 transition-all top-[72%] left-[10%]  opacity-0 ${pointToAppear.includes('4') && 'opacity-100'}`}
      >
        <img
          className="w-16"
          src="/assets/icons/architecture.svg"
          alt="architecture"
        />
        <p className="font-fontBold text-primary">CLIENTS</p>
      </div>
      <div
        className={`absolute flex flex-row-reverse items-center gap-6 duration-500 transition-all top-[84%] left-[85%] -translate-x-1/2  opacity-0 ${pointToAppear.includes('5') && 'opacity-100'}`}
      >
        <img
          className="w-16"
          src="/assets/icons/casque.svg"
          alt="architecture"
        />
        <p className="font-fontBold text-primary">ÉVÈNEMENTIELS</p>
      </div>
    </div>
  )
}

interface PathEaseConfig {
  axis?: 'x' | 'y'
  precision?: number
  smooth?: boolean | number
}

function pathEase(
  path: string | Element | Element[],
  config: PathEaseConfig = {}
): (p: number) => number {
  const axis = config.axis || 'y'
  const precision = config.precision || 1

  // Convertir path en tableau d'éléments
  const elements = gsap.utils.toArray(path)

  // Vérifier si l'élément est un SVGPathElement
  const rawPath =
    elements.length > 0 && elements[0] instanceof SVGPathElement
      ? MotionPathPlugin.getRawPath(elements[0] as SVGPathElement)
      : null

  if (!rawPath) {
    throw new Error(
      "Le chemin fourni n'est pas valide ou ne contient pas d'élément SVGPathElement."
    )
  }

  const cachedRawPath = MotionPathPlugin.cacheRawPathMeasurements(
    rawPath,
    Math.round(precision * 12)
  )
  const useX = axis === 'x'
  const start = cachedRawPath[0][useX ? 0 : 1]
  const end =
    cachedRawPath[cachedRawPath.length - 1][
      cachedRawPath[cachedRawPath.length - 1].length - (useX ? 2 : 1)
    ]
  const range = end - start
  const l = Math.round(precision * 200)
  const inc = 1 / l
  const positions: number[] = [0]
  const a: number[] = []
  let minIndex = 0
  const smooth: number[] = [0]
  const minChange = (1 / l) * 0.6
  const smoothRange =
    config.smooth === true
      ? 7
      : typeof config.smooth === 'number'
        ? Math.round(config.smooth)
        : 0
  const fullSmoothRange = smoothRange * 2

  function getClosest(p: number) {
    while (positions[minIndex] <= p && minIndex++ < l) {}
    a.push(
      ((p - positions[minIndex - 1]) /
        (positions[minIndex] - positions[minIndex - 1])) *
        inc +
        minIndex * inc
    )
    if (
      smoothRange &&
      a.length > smoothRange &&
      a[a.length - 1] - a[a.length - 2] < minChange
    ) {
      smooth.push(a.length - smoothRange)
    }
  }

  for (let i = 1; i < l; i++) {
    positions[i] =
      (MotionPathPlugin.getPositionOnPath(cachedRawPath, i / l)[axis] - start) /
      range
  }
  positions[l] = 1

  for (let i = 0; i < l; i++) {
    getClosest(i / l)
  }
  a.push(1)

  if (smoothRange) {
    smooth.push(l - fullSmoothRange + 1)
    smooth.forEach((i) => {
      const start = a[i]
      const j = Math.min(i + fullSmoothRange, l)
      const inc = (a[j] - start) / (j - i)
      let c = 1
      i++
      for (; i < j; i++) {
        a[i] = start + inc * c++
      }
    })
  }

  return (p: number) => {
    const i = p * l
    const s = a[i | 0]
    return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0
  }
}

export default Line
