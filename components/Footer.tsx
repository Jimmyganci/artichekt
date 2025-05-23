'use client' // Indiquer que ce fichier doit être rendu côté client

import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import {Menu, MenuItem} from '@/lib/types'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import ImgFooter from './footer/ImgFooter'
import MenuItemWithToggle from './footer/MenuItemWithToggle'
import Socials from './Socials'

/**
 * Footer component.
 */
export default function Footer() {
  const [menu, setMenu] = useState<Menu | null>(null) // State pour stocker le menu
  const [loading, setLoading] = useState(true) // Indicateur de chargement
  const pathname = usePathname()

  // Si l'URL est '/projet', on ne montre pas le footer
  const showFooter = pathname !== '/projets'

  // Récupère les données du menu
  useEffect(() => {
    async function fetchMenu() {
      const data = await getMenuBySlug('footer')
      setMenu(data)
      setLoading(false)
    }

    fetchMenu()
  }, []) // Le tableau vide assure que l'effet ne s'exécute qu'une fois, au montage du composant

  // Si le menu est en cours de chargement, on peut afficher un indicateur de chargement ou rien
  if (loading || !menu) return null

  function buildHierarchy(menu: Menu): MenuItem['node'][] {
    // Crée un objet pour un accès rapide aux éléments par leur ID
    const map: {
      [key: string]: MenuItem['node'] & {children: MenuItem['node'][]}
    } = {}

    // Initialiser chaque élément avec un tableau de children vide
    menu.menuItems.edges.forEach((item) => {
      map[item.node.id] = {...item.node, children: []}
    })

    const hierarchy: MenuItem['node'][] = []

    // Parcourt les éléments et les place dans leur position hiérarchique
    menu.menuItems.edges.forEach((item) => {
      const node = map[item.node.id]
      if (node.parentId) {
        // Si l'élément a un parent, ajoutez-le en tant qu'enfant de son parent
        if (map[node.parentId]) {
          map[node.parentId].children.push(node)
        }
      } else {
        // Si l'élément n'a pas de parent, c'est un élément de premier niveau
        hierarchy.push(node)
      }
    })

    return hierarchy
  }

  const newEdges = buildHierarchy(menu)

  if (!showFooter) return null

  return (
    <footer className="p-0 text-sm text-center border-t-2 pt-8 bg-primary overflow-hidden border-none">
      <div className="flex">
        <div className="h-80 w-[30%]">
          <ImgFooter />
        </div>
        <div className="flex flex-col w-full sm:w-[70%] justify-between">
          <div className="flex flex-col justify-around sm:flex-row items-end pr-6 sm:pr-0 sm:items-start">
            <div className="w-2/3 sm:w-1/3">
              <p className="text-white text-left size-[24px] font-fontBold w-full relative after:w-48 after:h-12 after:bg-white after:absolute after:top-0 after:left-[80%] sm:after:-top-20 sm:after:left-[55%] after:skew-y-[-35deg]">
                NOUS SUIVRE
              </p>
              <Socials />
            </div>
            <div className="w-2/3 sm:w-1/3">
              <p className="text-white text-left size-[24px] font-fontBold w-full relative after:w-48 after:h-12 after:bg-white after:absolute after:top-0 after:left-[80%] sm:after:-top-20 sm:after:left-[55%] after:skew-y-[-35deg]">
                PLAN DU SITE
              </p>
              <ul className="m-0 p-0 flex flex-col gap-2">
                {newEdges
                  .filter((item) => !item.parentId)
                  .map((children, index) => (
                    <MenuItemWithToggle
                      key={children.id}
                      uri={children.uri}
                      label={children.label}
                      subItems={children.children}
                    />
                  ))}
              </ul>
            </div>
            <div className="w-2/3 sm:w-1/3">
              <p className="text-white text-left size-[24px] font-fontBold w-full">
                CONTACT
              </p>
              <ul className="m-0 p-0">
                <li className="text-left">
                  <Link
                    className="text-white"
                    href={'mailto:jimmy.ganci@gmail.com'}
                  >
                    Envoyer un email
                  </Link>
                </li>
                <li className="text-left">
                  <Link className="text-white" href={'/contact'}>
                    Formulaire de contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-0 mt-4 text-white font-fontBold">
          mention légale tous droits réservés &copy;artichekt{' '}
          {new Date().getFullYear()}
        </p>
        <p className="m-0 pb-5 text-white font-sm">by Jimmy GANCI</p>
      </div>
    </footer>
  )
}
