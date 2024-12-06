import {Post} from '@/lib/types'
import React from 'react'
import ServiceCard from '../services/ServiceCard'
import SeeAll from '../layouts/SeeAll'

function TargetedLocations({targetedLocations}: {targetedLocations: Post[]}) {
  return (
    <div className="px-28">
      <h4 className="font-fontMedium text-8xl my-0 z-[2] relative">
        LES LIEUX CIBLES
      </h4>
      {targetedLocations && targetedLocations.length > 0 && (
        <div className="flex gap-12 pl-28 -mt-10">
          {targetedLocations.map((targetedLocation) => (
            <ServiceCard key={targetedLocation.slug} {...targetedLocation} />
          ))}
        </div>
      )}
      <div className="mt-20">
        <SeeAll path="/targeted-locations" />
      </div>
    </div>
  )
}

export default TargetedLocations
