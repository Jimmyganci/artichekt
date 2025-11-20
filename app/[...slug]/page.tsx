import Breadcrumb from '@/components/Breadcrumb'
import Contact from '@/components/contact/Contact'
import Book from '@/components/method/Book'
import BookMobile from '@/components/method/BookMobile'
import Projects from '@/components/projects/Projects'
import TargetedLocations from '@/components/targeted-locations/TargetedLocations'
import getAllProjects from '@/lib/queries/getAllProjects'
import getAllTargetedLocations from '@/lib/queries/getAllTargetedLocations'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import getAllPosts from '../../lib/queries/getAllPosts'
import getPageBySlug from '../../lib/queries/getPageBySlug'
import { Page, Post } from '../../lib/types'

/**
 * Fetches data from WordPress.
 */
async function fetchData(slugPath: string) {
  // If the slug is 'blog', fetch all posts.
  if (slugPath === '/blog/') {
    return {posts: await getAllPosts(), context: 'blog'}
  }

  const page = await getPageBySlug(slugPath)

  // If page data exists, return it.
  if (page) {
    return {post: page}
  }

  // Otherwise, return an error.
  return {error: 'No data found'}
}

export async function generateMetadata({
  params
}: {
  params: {slug: string[]}
}): Promise<Metadata> {
  const slugPath = '/' + params.slug.join('/') + '/'

  const page = await getPageBySlug(slugPath)

  if (!page) {
    return {
      title: 'Page introuvable',
      description: 'La page que vous cherchez est introuvable.'
    }
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.metaDesc || ''
  }
}

/**
 * Render a single page.
 */
function RenderPage({page}: {page: Page}) {
  return (
    <main className="flex flex-col gap-8 mt-40 sm:mt-60 mx-auto">
      <article>
        {/* <h1 dangerouslySetInnerHTML={{__html: page.title}} /> */}
        <div className="max-w-screen-2xl mx-auto px-10 sm:px-32">
          <Breadcrumb />
        </div>

        <div
          className="text-2xl"
          dangerouslySetInnerHTML={{__html: page.content}}
        />
      </article>
    </main>
  )
}

/**
 * Render posts list.
 */
function RenderPostsList({posts, context}: {posts: Post[]; context: string}) {
  return (
    <main className="flex flex-col gap-8 px-10 sm:px-32 max-w-[1500px] mx-auto my-60">
      <Breadcrumb />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-1/2">
          <h1 className="capitalize flex flex-col text-7xl lg:text-[128px] font-fontBold mb-0">
            <span>Le</span>
            <span>Blog</span>
          </h1>
          <div className="mt-10">
            <p className="bg-primary text-white text-xl lg:text-4xl w-fit max-w-[650px] mt-0 mb-1 p-1 font-bold">
              Inspirez-vous,
            </p>
            <p className="bg-primary text-white text-xl lg:text-4xl w-fit max-w-[650px] my-0 p-1 mb-5 font-bold">
              découvrez notre univers.
            </p>
          </div>
        </div>

        <div className="hidden md:block lg:p-10 w-1/2">
          <img
            className="my-0 mx-auto"
            src={posts[0].featuredImage.node.sourceUrl}
            alt={posts[0].featuredImage.node.sourceUrl}
          />{' '}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-8">
        {posts.map((post: Post) => (
          <article className="lg:w-72" key={post.databaseId}>
            {post.featuredImage && (
              <Image
                alt={post.featuredImage.node.altText}
                height={post.featuredImage.node.mediaDetails.height}
                src={post.featuredImage.node.sourceUrl}
                width={post.featuredImage.node.mediaDetails.width}
                priority={true}
              />
            )}
            <Link href={`/${context}/${post.slug}`}>
              <h2
                className="mt-0"
                dangerouslySetInnerHTML={{__html: post.title}}
              />
            </Link>
            {/* <p className="text-sm text-gray-500 mt-0">
              {post.commentCount} Comments
            </p> */}
            <div
              className="mt-0"
              dangerouslySetInnerHTML={{
                __html: post.excerpt.slice(0, 130) + '...'
              }}
            />
            <Link
              className="button hover:bg-primary hover:text-white font-fontBold"
              href={`/${context}/${post.slug}`}
            >
              {"Voir l'article"}
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}

/**
 * Catch-all Archive Page route.
 */
export default async function Archive({params}: {params: {slug: string[]}}) {
  // Get the slug from the params.

  const slugPath = '/' + params.slug.join('/') + '/' // → ex: "/a-propos/les-valeurs-artichekt/"
  const data = await fetchData(slugPath)

  // Vérifie que le chemin correspond exactement à celui de WordPress
  if (data.post && data.post.uri !== slugPath) {
    return notFound()
  }
  const lastSlug = params.slug.at(-1)

  // If there's an error, return a 404 page.
  if (data.error) {
    return notFound()
  }

  if (lastSlug === 'projets') {
    const projects = await getAllProjects()
    return (
      <div
        className="min-h-screen w-screen h-screen"
        style={{
          height: '100vh' // Hauteur en viewport
        }}
      >
        <Projects projects={projects} />
      </div>
    )
  }
  if (lastSlug === 'la-methode-artichekt') {
    return (
      <div
        className="min-h-screen w-screen h-screen"
        style={{
          height: '100vh' // Hauteur en viewport
        }}
      >
        <div className="hidden lg:block">
          <Book />
        </div>
        <div className="lg:hidden">
          <BookMobile />
        </div>
      </div>
    )
  }

  if (lastSlug === 'les-lieux-cibles') {
    const targetedLocations = await getAllTargetedLocations()
    return (
      <div className="mt-40 px-10 sm:px-20 max-w-screen-2xl mx-auto">
        <div className="max-w-screen-2xl mx-auto">
          <Breadcrumb />
        </div>
        <TargetedLocations targetedLocations={targetedLocations} />
      </div>
    )
  }

  if (lastSlug === 'estimez-le-cout-de-nos-services') {
    return notFound();
    // return (
    //   <div>
    //     <div className="mt-40 px-10 sm:px-32">
    //       <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
    //         <h1 className="flex flex-col gap-1 sm:text-[64px] font-fontBold lg:w-2/5 lg:min-w-[400px]">
    //           <span className="bg-primary w-fit text-white p-1">Outil de</span>
    //           <span className="bg-primary w-fit text-white p-1">calcul</span>
    //           <span className="bg-primary w-fit text-white p-1">des</span>
    //           <span className="bg-primary w-fit text-white p-1">
    //             prestations
    //           </span>
    //         </h1>
    //         <div className="lg:w-3/5 sm:text-lg">
    //           <p className="mt-0">
    //             ARTICHEKT a développé un outil qui vous permet d’estimer
    //             approximativement le montant de vos prestations en fonction de
    //             la nature de votre projet, sa typologie et le niveau de
    //             prestations souhaité.
    //           </p>
    //           <p className="mt-0 ">
    //             Cette estimation n’est évidemment pas contractuelle et ne peut
    //             se substituer a une étude donnant lieu à une offre de service
    //             personnalisée et détaillée.
    //           </p>
    //           <p className="mt-0 ">
    //             <strong className="font-fontBold">Bon à savoir</strong> : si
    //             vous souhaitez faire appel à ARTICHEKT uniquement dans le cadre
    //             d’une demande d’autorisation d’urbanisme (déclaration préalable
    //             ou permis de construire pour des surfaces n’excédant pas 150 m²)
    //             nous vous invitons à consulter la rubrique conception.
    //           </p>
    //         </div>
    //       </div>
    //       <div className="max-w-screen-2xl mx-auto">
    //         <Breadcrumb />
    //       </div>

    //       <Estimate />
    //     </div>
    //     <div className="bg-grey px-10 sm:px-32 pt-10 pb-64 text-xl">
    //       <div className="max-w-screen-2xl mx-auto text-sm sm:text-xl">
    //         <p className="mt-0  m-auto">
    //           Le détail de chaque prestation est expliqué dans l’onglet
    //           conception.
    //         </p>
    //         <p className=" mx-auto">
    //           Le calcul de nos honoraires diffère selon la nature de la
    //           prestation. Nos honoraires pour la phase de conception ne
    //           dépendent d’aucune façon du montant des travaux, ils sont calculés
    //           à partir d’une estimation du temps affecté à chaque phase de
    //           conception. En revanche, nos honoraires pour la direction des
    //           opérations de chantier sont ajustés en fonction du coût réel des
    //           travaux et leur complexité.
    //         </p>
    //         <p className=" mx-auto">
    //           Pour toute demande particulière, vous pouvez nous adresser un mail
    //           via le formulaire de contact ci-dessous. Chaque demande fait
    //           l’objet d’une réponse attentive dans un délai raisonnable.
    //         </p>
    //         <p className=" mx-auto">
    //           Nous refusons tout projet dont la demande porte uniquement sur des
    //           missions de décoration intérieure. Le traitement esthétique des
    //           volumes fait partie intégrante de nos propositions d’aménagement
    //           dans le cadre des prestations de niveau 2 et 3.
    //         </p>
    //         <p className="mx-auto">
    //           Egalement, il est important de noter que les niveaux 2 et 3
    //           nécessitent une gestion de projet méthodique et rigoureuse dès le
    //           démarrage de votre projet d’architecture intérieure. Pour nous
    //           aider dans cette tâche, nous avons élaboré des outils
    //           méthodologiques uniques et performants que nous prenons en compte
    //           dans le calcul des prestations.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // )
  }

  if (lastSlug === 'contact') {
    return <Contact />
  }

  // If this is a single page, render the page.
  if (data.post) {
    return <RenderPage page={data.post} />
  }

  // Otherwise, this must be an archive. Render the posts list.
  if (data.posts && data.posts.length > 0) {
    return <RenderPostsList posts={data.posts} context={data.context} />
  }

  // Otherwise, return a 404 page.
  notFound()
}
