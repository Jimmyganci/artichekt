import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import config from '../../../../lib/config'
import getCategoryBySlug from '../../../../lib/queries/getCategoryBySlug'

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: {
  params: {slug: string}
}): Promise<Metadata | null> {
  const slug = params.slug

  return {
    title: `${slug} Archives - ${config.siteName}`,
    description: `The category archive for ${slug}`
  }
}

/**
 * The category archive route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function CategoryArchive({
  params
}: {
  params: {slug: string}
}) {
  // Fetch posts from WordPress.
  const category = await getCategoryBySlug(params.slug)

  // No posts? Bail...
  if (!category) {
    notFound()
  }

  const description = category.category.description || ''

  // On coupe au milieu
  const middle = Math.floor(description.length / 2)

  // On cherche un espace pour couper proprement
  const before = description.lastIndexOf(' ', middle)
  const firstPart = description.slice(0, before)
  const secondPart = description.slice(before + 1)

  return (
    <main className="flex flex-col gap-8 mt-60 px-32 max-w-screen-2xl mx-auto mb-60">
      <h1 className="capitalize text-primary text-8xl mb-0">
        {category.category.name}
      </h1>
      <div className="mt-10 space-y-2">
        <p className="bg-primary text-white text-4xl w-fit max-w-[650px] mt-0 mb-1 p-1 font-bold">
          {firstPart}
        </p>
        <p className="bg-primary text-white text-4xl w-fit max-w-[650px] mt-0 mb-1 p-1 font-bold">
          {secondPart}
        </p>
      </div>
      <div className="flex flex-wrap gap-8">
        {category.posts.map((post) => (
          <article className="w-72" key={post.databaseId}>
            <Image
              alt={post.featuredImage.node.altText}
              height={post.featuredImage.node.mediaDetails.height}
              src={post.featuredImage.node.sourceUrl}
              width={post.featuredImage.node.mediaDetails.width}
              priority={true}
            />
            <Link href={`/blog/${post.slug}`}>
              <h2 dangerouslySetInnerHTML={{__html: post.title}} />
            </Link>
            {/* <p className="text-sm text-gray-500">
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
              href={`/blog/${post.slug}`}
            >
              {"Voir l'article"}
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
