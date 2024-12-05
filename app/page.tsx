import getLogo from '@/lib/queries/getLogo'
import getPageBySlug from '../lib/queries/getPageBySlug'
import {notFound} from 'next/navigation'
import TitleHome from '@/components/TitleHome'
import ImageHero from '@/components/home/ImageHero'
import Agency from '@/components/home/Agency'
import getAllProjects from '@/lib/queries/getAllProjects'
import Services from '@/components/home/Services'
import Approch from '@/components/home/Approch'
import Skew from '@/components/layouts/Skew'
import getAllServices from '@/lib/queries/getAllServices'
import Quote from '@/components/home/Quote'

import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Method from '@/components/home/Method'
import Team from '@/components/home/Team'
import Projects from '@/components/home/Projects'
import ScrollTitle from '@/components/home/ScrollTitle'
gsap.registerPlugin(ScrollTrigger)

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

  const services = await getAllServices()
  const sortedServices = services.sort((a, b) => a.order - b.order)

  if (!homepage) {
    notFound()
  }

  return (
    <main className="top-32 relative w-full overflow-hidden">
      <section className="sm:px-[8.8vw] z-0 relative">
        <TitleHome />
        <ImageHero heroImage={heroImage} />
        <div className="absolute top-12 right-0 flex flex-col gap-16">
          <Skew />
          <Skew />
          <Skew />
        </div>
      </section>
      <section>
        <Agency />
      </section>
      <section className="mb-32">
        <Services services={sortedServices} />
      </section>
      <section>
        <Approch />
      </section>
      <section>
        <Quote />
      </section>
      <section>
        <Method />
      </section>
      <section className="mt-80 mb-36">
        <Team />
      </section>
      <section>
        <ScrollTitle />
      </section>
      <section className="h-screen">
        {/* <Projects project={projects[0]} /> */}
      </section>
    </main>
  )
}
