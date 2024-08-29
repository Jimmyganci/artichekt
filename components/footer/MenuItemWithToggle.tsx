// components/MenuItemWithToggle.tsx
'use client' // Ce commentaire indique que ce composant doit être rendu côté client

import React, {useState} from 'react'
import Link from 'next/link'

type MenuItemWithToggleProps = {
  label: string
  uri: string
  subItems?: {id: string; label: string; uri: string}[]
}

function MenuItemWithToggle({label, uri, subItems}: MenuItemWithToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  return (
    <li className={`relative m-0 p-0 text-left text-white `}>
      {subItems && subItems.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <p className="cursor-pointer m-0" onClick={toggleMenu}>
              {label}
            </p>
            <img
              className={`w-3 m-0 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
              src="/assets/icons/arrow_down_white.svg"
              alt="arrow white down"
            />
          </div>
          <ul
            className={`m-0 overflow-hidden transition-all duration-300 ${isOpen ? 'h-auto max-h-screen' : 'h-0'}`}
          >
            {subItems.map((subItem) => (
              <li key={subItem.id}>
                <Link className="text-white" href={subItem.uri}>
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link className="text-white" href={uri}>
          {label}
        </Link>
      )}
    </li>
  )
}

export default MenuItemWithToggle
