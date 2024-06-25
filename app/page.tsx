import getLogo from '@/lib/queries/getLogo'
import getAllPosts from '../lib/queries/getAllPosts'
import getPageBySlug from '../lib/queries/getPageBySlug'
import {Post} from '../lib/types'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import TitleHome from '@/components/TitleHome'
import ImageHero from '@/components/home/ImageHero'
import Agency from '@/components/home/Agency'
import Carousel from '@/components/home/carousel/Carousel'

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug('accueil')
  const heroImage = await getLogo('Artichaut')

  if (!homepage) {
    notFound()
  }

  return (
    <main className="top-32 relative w-full overflow-hidden">
      <section className="sm:px-[8.8vw] z-0 relative">
        <TitleHome />
        <ImageHero heroImage={heroImage} />
      </section>
      <section>
        <Agency />
      </section>
      <section className="h-screen overflow-hidden mt-96 w-[200vw] sm:w-screen">
        <Carousel />
      </section>
    </main>
  )
}
