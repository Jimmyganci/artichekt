import getLogo from '@/lib/queries/getLogo'
import getPageBySlug from '../lib/queries/getPageBySlug'
import {notFound} from 'next/navigation'
import TitleHome from '@/components/TitleHome'
import ImageHero from '@/components/home/ImageHero'
import Agency from '@/components/home/Agency'
import Carousel from '@/components/home/carousel/Carousel'
import getAllProjects from '@/lib/queries/getAllProjects'
import Projects from '@/components/home/Projects'
import Services from '@/components/home/Services'
import Team from '@/components/home/Team'
import Approch from '@/components/home/Approch'

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug('accueil')
  const heroImage = await getLogo('Artichaut')

  const projects = await getAllProjects()

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
      <section className="h-screen overflow-hidden mt-[70vh] mb-7">
        <Projects project={projects[0]} />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Approch />
      </section>
      <section className="my-[70vh]">
        <Team />
      </section>
    </main>
  )
}
