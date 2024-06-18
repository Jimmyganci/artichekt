'use client'
import getLogo from '@/lib/queries/getLogo'
import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import {Logo, Menu, MenuItem} from '@/lib/types'
import Link from 'next/link'
import {use, useCallback, useEffect, useState} from 'react'

/**
 * Header component.
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setMenu] = useState<MenuItem[]>()
  const [showContentmenu, setShowContentMenu] = useState(false)
  const [parentId, setParentId] = useState('')
  const [logoLeft, setLogoLeft] = useState<Logo>()
  const [logoMiddle, setLogoMiddle] = useState<Logo>()
  const [logoModal, setLogoModal] = useState<Logo>()
  const [subMenu, setSubMenu] = useState<MenuItem[]>()
  const [loading, setLoading] = useState(true)
  async function getDatas() {
    try {
      const [menu, logoMiddle, logoLeft, logoModal] = await Promise.all([
        getMenuBySlug('header-menu'),
        getLogo('ARTICHEKT'),
        getLogo('cropped-D__ARTICHEKT_4.png'),
        getLogo('D__ARTICHEKT_BLANC3')
      ])

      const newEdges = menu.menuItems.edges
      setMenu(newEdges)
      setLogoMiddle(logoMiddle)
      setLogoLeft(logoLeft)
      setLogoModal(logoModal)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleOpenMenu = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true)
      setTimeout(() => {
        setShowContentMenu(true)
      }, 500)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    } else {
      setSubMenu([])
      setShowContentMenu(false)
      setLoading(true)
      setTimeout(() => {
        setParentId('')
        setIsOpen(false)
      }, 1000)
    }
  }, [isOpen])

  const handleMouseOver = useCallback(
    (id: string) => {
      if (!loading) {
        setParentId(id)
        const subMenu = menu?.filter(
          (children) => children.node.parentId === id
        )
        setSubMenu(subMenu)
      }
    },
    [loading, menu]
  )

  const handleMouseLeave = useCallback(
    (isSub?: boolean) => {
      if (!subMenu?.length || (isSub && subMenu?.length)) {
        setParentId('')
        setSubMenu([])
      }
    },
    [subMenu]
  )

  useEffect(() => {
    getDatas()
  }, [])

  return (
    logoLeft &&
    logoMiddle && (
      <header>
        <div className="flex px-12 items-center justify-between">
          {logoLeft && (
            <a href="/">
              <div className="max-w-20 m-0">
                <img src={logoLeft.mediaItemUrl} alt={logoLeft.altText} />
              </div>
            </a>
          )}
          {logoMiddle && (
            <a href="/">
              <div className="max-w-56">
                <img src={logoMiddle.mediaItemUrl} alt={logoMiddle.altText} />
              </div>
            </a>
          )}
          <button
            onClick={handleOpenMenu}
            className="z-10 bg-transparent text-right p-0 items-end justify-center w-12 h-12 gap-4 flex-col max-w-14 max-h-14 flex column"
          >
            <span
              className={`transition-all ease-in-out duration-300 w-full h-1 bg-black ${isOpen ? 'transform rotate-45 translate-y-2.5 bg-white' : ''}`}
            ></span>
            <span
              className={`transition-all ease-in-out duration-300 h-1 bg-black ${isOpen ? 'transform -rotate-45 -translate-y-2.5 bg-white w-full' : 'w-2/3'}`}
            ></span>
          </button>
        </div>

        <div
          className={`px-12 overflow-y-scroll overflow-x-hidden ${!isOpen ? '-translate-y-full' : 'translate-y-0'} transition-transform ease-in-out duration-300 fixed top-0 left-0 w-full h-full before:z-0 before:transition before:duration-300 before:ease-in-out before:absolute before:content-['']  before:bg-white bg-primary before:h-full before:w-[55%] before:left-0 ${subMenu?.length ? 'before:translate-x-0 ' : ' before:-translate-x-full'}`}
        >
          <div className="flex h-full z-10">
            <div className="w-[55%] flex flex-col gap-[21vh]">
              {logoModal && !subMenu?.length ? (
                <div
                  className={`min-w-24 w-[8vw] max-w-[200px] duration-700 ${showContentmenu ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-10'}`}
                >
                  <img src={logoModal.mediaItemUrl} alt={logoModal.altText} />
                </div>
              ) : (
                logoLeft && (
                  <div
                    className={`min-w-24 w-[8vw] max-w-[200px] duration-700 ${showContentmenu ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-10'}`}
                  >
                    <img src={logoLeft.mediaItemUrl} alt={logoLeft.altText} />
                  </div>
                )
              )}
              <div className="">
                <Link
                  onClick={handleOpenMenu}
                  className={`  text-[20px] flex items-center duration-700 ${showContentmenu ? 'delay-500  opacity-100 translate-y-0' : 'delay-200 opacity-0 translate-y-10'}`}
                  href={'/estimer'}
                >
                  <p
                    className={`hover:text-black duration-300 m-0 ${subMenu?.length ? 'text-primary' : 'text-white'} `}
                  >
                    Estimez votre budget
                  </p>
                </Link>
              </div>
              <div className={`flex flex-col gap-4`}>
                <Link
                  onClick={handleOpenMenu}
                  className={` max-w-fit duration-700  ${showContentmenu ? ' delay-200 opacity-100 translate-y-0' : 'delay-500 opacity-0 translate-y-10'}`}
                  href="/contact"
                >
                  <p
                    className={`hover:text-black duration-300 btn-primary ${subMenu?.length ? 'bg-primary' : 'bg-white text-primary'}`}
                  >
                    Contact
                  </p>
                </Link>
                <div
                  className={`flex gap-16 duration-700 ${showContentmenu ? 'opacity-100 translate-y-0' : 'delay-700 opacity-0 translate-y-10'}`}
                >
                  <a
                    target="_blank"
                    className={`hover:text-black duration-300 ${subMenu?.length ? 'text-primary' : 'text-white'}  text-[20px]`}
                    href=""
                  >
                    Instagram
                  </a>
                  <a
                    target="_blank"
                    className={`hover:text-black duration-300 ${subMenu?.length ? 'text-primary' : 'text-white'}  text-[20px]`}
                    href=""
                  >
                    Facebook
                  </a>
                  <a
                    target="_blank"
                    className={`hover:text-black duration-300 ${subMenu?.length ? 'text-primary' : 'text-white'}  text-[20px]`}
                    href=""
                  >
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
            <nav
              onMouseLeave={() => handleMouseLeave()}
              className=" mt-[22vh]  pb-28 flex items-end flex-1 flex-col gap-4"
            >
              {!!menu &&
                menu
                  .filter((item) => !item.node.parentId)
                  .map(
                    (item, index) =>
                      !item.node.parentId && (
                        <div
                          className={`relative w-full text-end ${parentId && parentId === item.node.id ? 'after:w-32 after:h-[30%] after:bg-white after:absolute after:top-1/2 after:translate-y-1/2 after:left-full after:skew-y-[35deg]' : ''}`}
                          key={item.node.databaseId}
                        >
                          <div className="overflow-hidden">
                            <Link
                              onClick={handleOpenMenu}
                              onMouseOver={() => handleMouseOver(item.node.id)}
                              className={`whitespace-nowrap font-fontMenu no-underline text-[60px] lg:text-[5vw] 2xl:text-[10vh] leading-none text-white ${!parentId || parentId === item.node.id ? 'opacity-100' : 'opacity-60'}`}
                              href={item.node.uri}
                            >
                              <p
                                className={`duration-700 ${showContentmenu ? 'translate-y-0  opacity-1' : 'translate-y-full opacity-0'}  py-2 pl-0 pr-16 ${parentId && parentId !== item.node.id ? 'pr-[120px]' : 'pr-16'} m-0`}
                                style={{
                                  transition: `
                                  transform 0.7s ${showContentmenu ? (menu.length - index - 1) * 0.05 + 's' : index * 0.1 + 's'}, 
                                  opacity 0.7s ${showContentmenu ? (menu.length - index - 1) * 0.05 + 's' : index * 0.1 + 's'}, 
                                  padding 0.7s`
                                }}
                              >
                                {item.node.label}
                              </p>
                            </Link>
                          </div>

                          {
                            <ul
                              onMouseLeave={() => handleMouseLeave(true)}
                              className={`gap-2 absolute top-0 right-[105%] flex flex-col items-end w-max ${parentId === item.node.id ? 'z-10' : 'z-0'} `}
                            >
                              {menu
                                .filter(
                                  (children) =>
                                    children.node.parentId === item.node.id
                                )
                                ?.map((children, index) => (
                                  <li
                                    key={children.node.id}
                                    className={`m-0 relative font-fontBold text-lg overflow-hidden`}
                                  >
                                    <Link
                                      href={children.node.uri}
                                      onClick={handleOpenMenu}
                                      className="text-primary hover:text-black transition-colors duration-300"
                                      style={{
                                        transitionDelay: '0s' // Transition pour la couleur uniquement
                                      }}
                                    >
                                      <p
                                        style={{
                                          transition:
                                            'opacity 0.3s ease, transform 0.3s ease', // Transition pour l'opacité et la transformation
                                          transitionDelay: `${parentId === children.node.parentId ? (menu.length - index - 1) * 0.07 + 's' : index * 0.1 + 's'}`
                                        }}
                                        className={`m-0 md:text-xl 2xl:text-3xl leading-none lg:text-[1.5vw] duration-300 ${parentId === children.node.parentId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
                                      >
                                        {children.node.label}
                                      </p>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          }
                        </div>
                      )
                  )}
            </nav>
          </div>
        </div>
      </header>
    )
  )
}
