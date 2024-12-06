import React from 'react'
import Carousel from './carousel/Carousel'
import {Post} from '@/lib/types'

function Projects({project}: {project: Post}) {
  return (
    <>
      <div className="w-[200vw] sm:w-screen h-full">
        <Carousel project={project} />
      </div>
    </>
  )
}

export default Projects
