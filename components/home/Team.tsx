import React from 'react'
import TitleSection from '../TitleSection'
import getLogo from '@/lib/queries/getLogo'

async function Team() {
  const imageLeft = await getLogo('portrait_amandine')
  const imageRight = await getLogo('portrait_vincent')

  return (
    <div>
      <TitleSection primary path="/lequipe" title="L'équipe" />
      <div className="relative mt-20 sm:px-16 lg:px-36 flex flex-col sm:flex-row">
        <div className="sm:w-1/2 sm:relative sm:left-10 cursor-pointer">
          {imageLeft && (
            <img
              className="w-full"
              src={imageLeft.mediaItemUrl}
              alt={imageLeft.altText}
            />
          )}
        </div>

        <div className="sm:w-1/2 sm:top-44 sm:right-10 sm:relative cursor-pointer">
          {imageRight && (
            <img
              className="w-full"
              src={imageRight.mediaItemUrl}
              alt={imageRight.altText}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Team
