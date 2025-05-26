import engagments from '@/public/data/engagments.json'
import SeeAll from '../layouts/SeeAll'

function Engagment() {
  return (
    <div className="px-[10%] bg-white max-w-screen-2xl mx-auto" id="engagment">
      <h4 className="font-fontBold text-black leading-[0.7] lg:leading-[0.7] text-5xl sm:text-6xl md:text-8xl pl-24 my-0 opacity-100 z-[2] -ml-24 relative">
        LES VALEURS <br className="hidden lg:block" />
        ARTICHEKT
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-center items-center mx-auto">
        {engagments.map((engagment, index) => (
          <div
            key={engagment.id}
            className={`px-8 pt-10 shadow-lg  h-full mx-auto ${
              index % 2 === 0 ? 'bg-primary text-white' : 'bg-black text-white'
            }`}
          >
            <h5 className="font-fontBlack my-4 text-center text-3xl">
              {engagment.title}
            </h5>
            <p
              className="leading-[1.1] text-center text-lg sm:text-2xl"
              dangerouslySetInnerHTML={{__html: engagment.content}}
            ></p>
          </div>
        ))}
      </div>
      <SeeAll path="/a-propos/les-valeurs-artichekt" />
    </div>
  )
}

export default Engagment
