'use client'
import {Image as ImageImpl, useScroll} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import * as THREE from 'three'

function ImageMobile(props: any) {
  const ref = useRef<any>()
  const group = useRef<any>()
  const data = useScroll()

  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      Math.max(0, data.delta * 100),
      4,
      delta
    )
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    )
  })
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  )
}

export default ImageMobile
