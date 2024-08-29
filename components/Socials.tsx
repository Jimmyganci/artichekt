import React from 'react'

function Socials() {
  return (
    <div className={`flex flex-col gap-2 text-left`}>
      <a
        target="_blank"
        className={`hover:text-black duration-300 text-sm text-white`}
        href=""
      >
        Instagram
      </a>
      <a
        target="_blank"
        className={`hover:text-black duration-300 text-sm text-white`}
        href=""
      >
        Facebook
      </a>
      <a
        target="_blank"
        className={`hover:text-black duration-300 text-sm text-white`}
        href=""
      >
        Pinterest
      </a>
    </div>
  )
}

export default Socials
