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

import ApprochMobile from '@/components/home/ApprochMobile'
import Engagment from '@/components/home/Engagment'
import GoogleReview from '@/components/home/GoogleReview'
import Guarantee from '@/components/home/Guarantee'
import Laboratory from '@/components/home/Laboratory'
import Method from '@/components/home/Method'
import MethodMobile from '@/components/home/MethodMobile'
import Projects from '@/components/home/Projects'
import ProjectsMobile from '@/components/home/ProjectsMobile'
import ScrollTitle from '@/components/home/ScrollTitle'
import TargetedLocations from '@/components/home/TargetedLocations'
import Team from '@/components/home/Team'
import TeamMobile from '@/components/home/TeamMobile'
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
      <ApprochMobile />
      <Quote />
      <Method />
      <MethodMobile />
      <Spacer h={150} />
      <Team />
      <TeamMobile />
      <ScrollTitle />
      <Spacer h={150} />
      <Guarantee />
      <Spacer h={150} />
      <TargetedLocations targetedLocations={targetedLocations} />
      <Spacer h={150} />
      <Engagment />
      <Spacer h={150} />
      <div className="hidden xl:block">
        <Projects project={projects[0]} />
      </div>
      <div className="xl:hidden w-[100vw] overflow-hidden">
        <ProjectsMobile project={projects[0]} />
      </div>
      <SeeAll path="/projets" />
      <Spacer h={150} />
      <Laboratory />
      <SeeAll path="/le-lab" />
      <Spacer h={250} />
      <GoogleReview />
    </main>
  )
}
