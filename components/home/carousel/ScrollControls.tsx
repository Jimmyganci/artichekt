'use client'

import {context as fiberContext, useFrame, useThree} from '@react-three/fiber'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {mergeRefs} from 'react-merge-refs'
import * as THREE from 'three'

export type ScrollControlsProps = {
  eps?: number
  horizontal?: boolean
  infinite?: boolean
  pages?: number
  distance?: number
  damping?: number
  enabled?: boolean
  children: React.ReactNode
}

export type ScrollControlsState = {
  el: HTMLDivElement
  eps: number
  fill: HTMLDivElement
  fixed: HTMLDivElement
  horizontal: boolean | undefined
  damping: number
  offset: number
  delta: number
  pages: number
  range(from: number, distance: number, margin?: number): number
  curve(from: number, distance: number, margin?: number): number
  visible(from: number, distance: number, margin?: number): boolean
}

const context = React.createContext<ScrollControlsState>(null!)

export function useScroll() {
  return React.useContext(context)
}

export function ScrollControls({
  eps = 0.00001,
  enabled = true,
  infinite,
  horizontal,
  pages = 1,
  distance = 1,
  damping = 4,
  children
}: ScrollControlsProps) {
  const {gl, size, invalidate, events, raycaster}: any = useThree()
  const [el] = React.useState(() => document.createElement('div'))
  const [fill] = React.useState(() => document.createElement('div'))
  const [fixed] = React.useState(() => document.createElement('div'))
  const target = gl.domElement.parentNode!
  const scroll = React.useRef(0)

  const state = React.useMemo(() => {
    const state = {
      el,
      eps,
      fill,
      fixed,
      horizontal,
      damping,
      offset: 0,
      delta: 0,
      scroll,
      pages,
      range(from: number, distance: number, margin: number = 0) {
        const start = from - margin
        const end = start + distance + margin * 2
        return this.offset < start
          ? 0
          : this.offset > end
            ? 1
            : (this.offset - start) / (end - start)
      },
      curve(from: number, distance: number, margin: number = 0) {
        return Math.sin(this.range(from, distance, margin) * Math.PI)
      },
      visible(from: number, distance: number, margin: number = 0) {
        const start = from - margin
        const end = start + distance + margin * 2
        return this.offset >= start && this.offset <= end
      }
    }
    return state
  }, [eps, damping, horizontal, pages])

  React.useEffect(() => {
    el.style.position = 'absolute'
    el.style.width = '100%'
    el.style.height = '100%'
    el.style[horizontal ? 'overflowX' : 'overflowY'] = 'hidden'
    el.style[horizontal ? 'overflowY' : 'overflowX'] = 'hidden'
    el.style.top = '0px'
    el.style.left = '0px'

    fixed.style.position = 'sticky'
    fixed.style.top = '0px'
    fixed.style.left = '0px'
    fixed.style.width = '100%'
    fixed.style.height = '100%'
    fixed.style.overflow = 'hidden'
    el.appendChild(fixed)

    fill.style.height = horizontal ? '100%' : `${pages * distance * 100}%`
    fill.style.width = horizontal ? `${pages * distance * 100}%` : '100%'
    fill.style.pointerEvents = 'none'
    el.appendChild(fill)
    target.appendChild(el)

    el[horizontal ? 'scrollLeft' : 'scrollTop'] = 1

    const oldTarget =
      typeof events.connected !== 'boolean' ? events.connected : gl.domElement
    requestAnimationFrame(() => events.connect?.(el))
    const oldCompute = raycaster.computeOffsets
    raycaster.computeOffsets = ({
      clientX,
      clientY
    }: {
      clientX: number
      clientY: number
    }) => ({
      offsetX: clientX - (target as HTMLElement).offsetLeft,
      offsetY: clientY - (target as HTMLElement).offsetTop
    })

    return () => {
      if (el && events) {
        target.removeChild(el)
        raycaster.computeOffsets = oldCompute
        events.connect?.(oldTarget)
      }
    }
  }, [pages, distance, horizontal, el, fill, fixed, target])

  React.useEffect(() => {
    const containerLength = size[horizontal ? 'width' : 'height']
    const scrollLength = el[horizontal ? 'scrollWidth' : 'scrollHeight']
    const scrollThreshold = scrollLength - containerLength

    let current = 0
    let disableScroll = true
    let firstRun = true
    let touchStart = 0

    function onScroll(e: any) {
      if (!enabled || firstRun) return
      invalidate()
      current = el[horizontal ? 'scrollLeft' : 'scrollTop']
      scroll.current = current / scrollThreshold
      if (infinite) {
        if (!disableScroll) {
          if (scroll.current >= 1 - 0.001) {
            const damp = 1 - state.offset
            el[horizontal ? 'scrollLeft' : 'scrollTop'] = 1
            scroll.current = state.offset = -damp
            disableScroll = true
          } else if (current <= 0) {
            const damp = 1 + state.offset
            el[horizontal ? 'scrollLeft' : 'scrollTop'] = scrollLength
            scroll.current = state.offset = damp
            disableScroll = true
          }
        }
        if (disableScroll) setTimeout(() => (disableScroll = false), 40)
      }
    }

    function onTouchStart(e: TouchEvent) {
      if (!enabled) return
      touchStart = horizontal ? e.touches[0].clientX : e.touches[0].clientY
    }

    // Fonction pour gérer le mouvement du touch (mobile)
    function onTouchMove(e: TouchEvent) {
      if (!enabled || !touchStart) return
      const touchMove = horizontal ? e.touches[0].clientX : e.touches[0].clientY
      const delta = touchMove - touchStart
      el[horizontal ? 'scrollLeft' : 'scrollTop'] -= delta
      touchStart = touchMove
    }

    if (el) {
      el.addEventListener('scroll', onScroll, {passive: true})
      el.addEventListener('touchstart', onTouchStart, {passive: true})
      el.addEventListener('touchmove', onTouchMove, {passive: true})
      requestAnimationFrame(() => (firstRun = false))
    }

    function onWheel(e: any) {
      el.scrollLeft += e.deltaY / 2
    }

    if (horizontal) el.addEventListener('wheel', onWheel, {passive: true})

    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      if (horizontal) el.removeEventListener('wheel', onWheel)
    }
  }, [el, size, infinite, state, invalidate, horizontal])

  let last = 0
  useFrame((_, delta) => {
    state.offset = THREE.MathUtils.damp(
      (last = state.offset),
      scroll.current,
      damping,
      delta
    )
    state.delta = THREE.MathUtils.damp(
      state.delta,
      Math.abs(last - state.offset),
      damping,
      delta
    )
    if (state.delta > eps) invalidate()
  })
  return <context.Provider value={state}>{children}</context.Provider>
}

const ScrollCanvas = React.forwardRef(({children}: any, ref: any) => {
  const group: any = React.useRef<THREE.Group>(null!)
  const state = useScroll()
  const {width, height} = useThree((state) => state.viewport)
  useFrame(() => {
    group.current.position.x = state.horizontal
      ? -width * (state.pages - 1) * state.offset
      : 0
    group.current.position.y = state.horizontal
      ? 0
      : height * (state.pages - 1) * state.offset
  })
  return <group ref={mergeRefs([ref, group])}>{children}</group>
})

ScrollCanvas.displayName = 'ScrollCanvas'

const ScrollHtml = React.forwardRef(
  (
    {
      children,
      style,
      ...props
    }: {children?: React.ReactNode; style?: React.CSSProperties},
    ref: React.Ref<HTMLDivElement>
  ) => {
    const state = useScroll()
    const group = React.useRef<HTMLDivElement>(null!)
    const {width, height} = useThree((state) => state.size)
    const fiberState = React.useContext(fiberContext)
    useFrame(() => {
      if (state.delta > state.eps && group.current) {
        group.current.style.transform = `translate3d(${state.horizontal ? -width * (state.pages - 1) * state.offset : 0}px,${
          state.horizontal ? 0 : height * (state.pages - 1) * -state.offset
        }px,0)`
      }
    })

    React.useEffect(() => {
      const combinedRef = mergeRefs([ref, group])
      const root = ReactDOM.createRoot(state.fixed)
      root.render(
        <div
          ref={combinedRef}
          style={{
            ...style,
            position: 'absolute',
            top: 0,
            left: 0,
            willChange: 'transform'
          }}
          {...props}
        >
          <context.Provider value={state}>
            <fiberContext.Provider value={fiberState}>
              {children}
            </fiberContext.Provider>
          </context.Provider>
        </div>
      )
      // Cleanup
      return () => {
        root.unmount()
      }
    }, [state, fiberState, ref, style, props, children])

    return null
  }
)
ScrollHtml.displayName = 'ScrollHtml'

type ScrollProps = {
  html?: boolean
  children?: React.ReactNode
}

export const Scroll = React.forwardRef(
  ({html, ...props}: ScrollProps, ref: any) => {
    const El = html ? ScrollHtml : ScrollCanvas
    return <El ref={ref} {...props} />
  }
)

Scroll.displayName = 'Scroll'
