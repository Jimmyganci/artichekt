import React from 'react'

function TitleSection({
  title,
  primary,
  position = 'left'
}: {
  title: string
  primary: boolean
  position?: string
}) {
  let row = 'flex-row-reverse'
  let topSkew = 'top-8'
  let textAlign = 'text-start'
  if (position === 'right') {
    row = 'flex-row'
    topSkew = '-top-8'
    textAlign = 'text-end'
  }
  return (
    <div className={`flex ${row} justify-end`}>
      <h2
        className={`${primary ? 'text-primary' : 'text-black'} mt-0 mb-0 uppercase max-w-[160px] ${textAlign}`}
      >
        <span>{title}</span>
      </h2>
      <span
        className={`pl-24 relative after:-z-10 after:w-[6.5rem] after:h-12 after:bg-primary after:absolute after:${topSkew} after:left-0 after:skew-y-[-35deg]`}
      ></span>
    </div>
  )
}

export default TitleSection
