'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean) // enlève les "" vides

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = decodeURIComponent(segment.replace(/-/g, ' ')) // optionnel

    return {label, href}
  })

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600 mb-6">
      <ol className="flex flex-wrap p-0">
        <li>
          <Link href="/" className="hover:underline font-fontBold">
            Menu
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center p-0">
            <span className="mx-3">/</span>
            {i === crumbs.length - 1 ? (
              <span className="font-semibold text-gray-900">
                {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:underline">
                {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
