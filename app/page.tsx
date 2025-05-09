import Agency from '@/components/home/Agency'
import Approch from '@/components/home/Approch'
import ImageHero from '@/components/home/ImageHero'
import Quote from '@/components/home/Quote'
import Services from '@/components/home/Services'
import TitleHome from '@/components/TitleHome'
import getAllProjects from '@/lib/queries/getAllProjects'
import getAllServices from '@/lib/queries/getAllServices'
import getLogo from '@/lib/queries/getLogo'
import {notFound} from 'next/navigation'
import getPageBySlug from '../lib/queries/getPageBySlug'

import Engagment from '@/components/home/Engagment'
import Guarantee from '@/components/home/Guarantee'
import Laboratory from '@/components/home/Laboratory'
import Method from '@/components/home/Method'
import Projects from '@/components/home/Projects'
import ScrollTitle from '@/components/home/ScrollTitle'
import TargetedLocations from '@/components/home/TargetedLocations'
import Team from '@/components/home/Team'
import SeeAll from '@/components/layouts/SeeAll'
import Spacer from '@/components/Spacer'
import getAllTargetedLocations from '@/lib/queries/getAllTargetedLocations'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
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

  const targetedLocations = await getAllTargetedLocations()

  if (!homepage) {
    notFound()
  }

  return (
    <main className="top-32 relative w-full overflow-hidden">
      <section className="sm:px-[8.8vw] z-0 relative">
        <TitleHome />
        <ImageHero heroImage={heroImage} />
      </section>
      <Agency />
      <Services services={sortedServices} />
      <Spacer h={150} />
      <Approch />
      <Quote />
      <Method />
      <Spacer h={150} />
      <Team />
      <ScrollTitle />
      <Spacer h={150} />
      <Guarantee />
      <Spacer h={150} />
      <TargetedLocations targetedLocations={targetedLocations} />
      <Spacer h={150} />
      <Engagment />
      <Spacer h={150} />
      <Projects project={projects[0]} />
      <SeeAll path="/projects" />
      <Spacer h={150} />
      <Laboratory />
    </main>
  )
}
