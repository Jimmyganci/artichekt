import Estimate from '@/components/estimate/Estimate'
import Book from '@/components/method/Book'
import Projects from '@/components/projects/Projects'
import TargetedLocations from '@/components/targeted-locations/TargetedLocations'
import getAllProjects from '@/lib/queries/getAllProjects'
import getAllTargetedLocations from '@/lib/queries/getAllTargetedLocations'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import getAllPosts from '../../lib/queries/getAllPosts'
import getPageBySlug from '../../lib/queries/getPageBySlug'
import { Page, Post } from '../../lib/types'

/**
 * Fetches data from WordPress.
 */
async function fetchData(slug: string) {
  // If the slug is 'blog', fetch all posts.
  if (slug === 'blog') {
    return {posts: await getAllPosts(), context: 'blog'}
  }

  /* eslint-disable no-console */
  console.log(slug)

  // Otherwise, this could be a page.
  const page = await getPageBySlug(slug)
  /* eslint-disable no-console */
  console.log(page)

  // If page data exists, return it.
  if (page) {
    return {post: page}
  }

  // Otherwise, return an error.
  return {error: 'No data found'}
}

/**
 * Render a single page.
 */
function RenderPage({page}: {page: Page}) {
  return (
    <main className="flex flex-col gap-8 mt-20 max-w-[1500px] mx-auto">
      <article>
        {/* <h1 dangerouslySetInnerHTML={{__html: page.title}} /> */}
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
    <main className="flex flex-col gap-8 px-32 max-w-[1500px] mx-auto my-60">
      <div className="flex gap-8">
        <div className="w-1/2">
          <h1 className="capitalize flex flex-col text-[128px] font-fontBold mb-0">
            <span>Le</span>
            <span>Blog</span>{' '}
          </h1>
          <div className="mt-10">
            <p className="bg-primary text-white text-4xl w-fit max-w-[650px] mt-0 mb-1 p-1 font-bold">
              Inspirez-vous,
            </p>
            <p className="bg-primary text-white text-4xl w-fit max-w-[650px] my-0 p-1 mb-5 font-bold">
              découvrez notre univers.
            </p>
          </div>
        </div>

        <div className="p-10 w-1/2">
          <img
            className="my-0 mx-auto"
            src={posts[0].featuredImage.node.sourceUrl}
            alt={posts[0].featuredImage.node.sourceUrl}
          />{' '}
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        {posts.map((post: Post) => (
          <article className="w-72" key={post.databaseId}>
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
export default async function Archive({params}: {params: {slug: string}}) {
  // Get the slug from the params.
  const {slug} = params

  // Fetch data from WordPress.
  const data = await fetchData(slug)

  // If there's an error, return a 404 page.
  if (data.error) {
    notFound()
  }

  if (slug === 'projets') {
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
  if (slug === 'la-methode-artichekt') {
    return (
      <div
        className="min-h-screen w-screen h-screen"
        style={{
          height: '100vh' // Hauteur en viewport
        }}
      >
        <Book />
      </div>
    )
  }

  if (slug === 'les-lieux-cibles') {
    const targetedLocations = await getAllTargetedLocations()
    return (
      <div className="mt-40 px-20">
        <TargetedLocations targetedLocations={targetedLocations} />
      </div>
    )
  }

  if (slug === 'estimer') {
    return (
      <>
        <div className="mt-40 px-32">
          <Estimate />
        </div>
        <div className="bg-grey px-40 pt-10 pb-64">
          <p className="mt-0 text-sm max-w-4xl m-auto">
            ARTICHEKT a développé un outil qui vous permet d’estimer
            approximativement le montant de vos prestations en fonction de la
            nature de votre projet et sa typologie.
          </p>
          <p className="text-sm max-w-4xl mx-auto">
            Cette estimation n’est évidemment pas contractuelle et ne peut se
            substituer a
          </p>
        </div>
      </>
    )
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
