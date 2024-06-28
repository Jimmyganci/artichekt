import Link from 'next/link'
import React from 'react'

function TitleSection({
  path,
  title,
  primary
}: {
  path: string
  title: string
  primary: boolean
}) {
  return (
    <Link href={path}>
      <h4 className={`${primary ? 'text-primary' : 'text-black'} text-center`}>
        <span className="relative after:h-px after:absolute after:w-1/2 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:bg-primary">
          {title}
        </span>
      </h4>
    </Link>
  )
}

export default TitleSection
