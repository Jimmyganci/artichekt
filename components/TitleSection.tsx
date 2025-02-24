import React from 'react'
import Skew from './layouts/Skew'

function TitleSection({
  title,
  primary,
  position = 'left'
}: {
  title: string
  primary: boolean
  position?: 'left' | 'right'
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
        className={`${primary ? 'text-primary' : 'text-black'} mt-0 mb-0 uppercase ${textAlign}`}
      >
        <span>
          {title && (
            <>
              {title.split(' ').slice(0, -1).join(' ')}
              <br />
              {title.split(' ').slice(-1)}
            </>
          )}
        </span>
      </h2>
      <Skew />
    </div>
  )
}

export default TitleSection
