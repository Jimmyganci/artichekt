'use client'
import {Post} from '@/lib/types'
import CarouselMobile from './carousel/CarouselMobile'

function Projects({project}: {project: Post}) {
  return (
    <>
      <div className="h-[800px] w-[200vw] sm:w-screen">
        <CarouselMobile project={project} horizontal={true} />
      </div>
    </>
  )
}

export default Projects
