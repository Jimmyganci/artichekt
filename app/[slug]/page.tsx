import getAllPosts from '../../lib/queries/getAllPosts'
import getPageBySlug from '../../lib/queries/getPageBySlug'
import {Page, Post} from '../../lib/types'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import getAllProjects from '@/lib/queries/getAllProjects'
import Projects from '@/components/projects/Projects'
import Book from '@/components/method/Book'
import getAllTargetedLocations from '@/lib/queries/getAllTargetedLocations'
import TargetedLocations from '@/components/targeted-locations/TargetedLocations'

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
    <main className="flex flex-col gap-8">
      <h1 className="capitalize">Latest {context}</h1>
      <div className="flex flex-wrap gap-8">
        {posts.map((post: Post) => (
          <article className="w-72" key={post.databaseId}>
            <Image
              alt={post.featuredImage.node.altText}
              height={post.featuredImage.node.mediaDetails.height}
              src={post.featuredImage.node.sourceUrl}
              width={post.featuredImage.node.mediaDetails.width}
              priority={true}
            />
            <Link href={`/${context}/${post.slug}`}>
              <h2 dangerouslySetInnerHTML={{__html: post.title}} />
            </Link>
            <p className="text-sm text-gray-500">
              {post.commentCount} Comments
            </p>
            <div dangerouslySetInnerHTML={{__html: post.excerpt}} />
            <Link className="button" href={`/${context}/${post.slug}`}>
              View Post
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

  console.log(slug)

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
