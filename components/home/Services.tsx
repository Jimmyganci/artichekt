import Link from 'next/link'
import React from 'react'

function Services() {
  return (
    <div className="min-h-screen">
      <Link href="/services">
        <h4 className="text-primary text-center">
          <span className="relative after:h-px after:absolute after:w-1/2 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:bg-primary">
            {`Services`}
          </span>
        </h4>
      </Link>
    </div>
  )
}

export default Services
