import React from 'react'
import engagments from '@/public/data/engagments.json'

function Engagment() {
  return (
    <div className="px-[10%] bg-white max-w-[1400px] mx-auto" id="engagment">
      <h4 className="font-fontMedium text-grey text-9xl my-0 opacity-100 z-[2] -ml-24 relative">
        ENGAGEMENTS
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-center items-center -mt-10 mx-auto">
        {engagments.map((engagment, index) => (
          <div
            key={engagment.id}
            className={`px-6 pt-10 shadow-lg  h-full mx-auto ${
              index % 2 === 0 ? 'bg-primary text-white' : 'bg-black text-white'
            }`}
          >
            <h5 className="font-fontBold my-4 text-center text-[28px]">
              {engagment.title}
            </h5>
            <p
              className=" leading-relaxed text-center text-[20px]"
              dangerouslySetInnerHTML={{__html: engagment.content}}
            ></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Engagment
