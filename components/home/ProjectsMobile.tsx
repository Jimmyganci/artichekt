'use client'
import {Post} from '@/lib/types'
import Carousel from './carousel/Carousel'

function ProjectsMobile({project}: {project: Post}) {
  return (
    <div className="h-[800px] w-[200vw] sm:w-screen">
      <Carousel project={project} horizontal={true} />
    </div>
  )
}

export default ProjectsMobile
