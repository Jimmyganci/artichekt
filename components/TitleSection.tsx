import React from 'react'

function TitleSection({title, primary}: {title: string; primary: boolean}) {
  return (
    <h2
      className={`${primary ? 'text-primary' : 'text-black'}  mb-28 mt-4 uppercase `}
    >
      <span className="pl-24 relative after:-z-10 after:w-[6.5rem] after:h-12 after:bg-primary after:absolute after:top-8 after:left-0 after:skew-y-[-35deg]">
        {title}
      </span>
    </h2>
  )
}

export default TitleSection
