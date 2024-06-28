import React from 'react'
import Carousel from './carousel/Carousel'
import {Post} from '@/lib/types'
import Link from 'next/link'

function Projects({project}: {project: Post}) {
  return (
    <>
      <Link href="/projets">
        <h4 className="text-black text-center">
          <span className="relative after:h-px after:absolute after:w-1/2 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:bg-black">
            {`Projects`}
          </span>
        </h4>
      </Link>
      <div className="w-[200vw] sm:w-screen h-full">
        <Carousel project={project} />
      </div>
    </>
  )
}

export default Projects
