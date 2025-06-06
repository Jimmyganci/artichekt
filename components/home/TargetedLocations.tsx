import {Post} from '@/lib/types'
import SeeAll from '../layouts/SeeAll'
import TLCard from '../targeted-locations/TLCard'

function TargetedLocations({targetedLocations}: {targetedLocations: Post[]}) {
  return (
    <div className="px-10 sm:px-28 max-w-screen-2xl mx-auto">
      <h4 className="font-fontMedium text-5xl sm:text-8xl md:text-6xl  my-0 z-[2] relative">
        LES ESPACES <br /> CIBLES
      </h4>
      {targetedLocations && targetedLocations.length > 0 && (
        <div className="flex flex-col sm:flex-row  gap-12 pl-0 lg:pl-28 -mt-10">
          {targetedLocations.slice(0, 3).map((targetedLocation) => (
            <TLCard key={targetedLocation.slug} {...targetedLocation} />
          ))}
        </div>
      )}
      <div className="mt-20">
        <SeeAll path="/services/les-lieux-cibles" />
      </div>
    </div>
  )
}

export default TargetedLocations
