import getRelatedPosts from '@/lib/queries/getRelatedPosts'
import {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import getAllPosts from '../../../lib/queries/getAllPosts'
import getPostBySlug from '../../../lib/queries/getPostBySlug'

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Get all blog posts.
  const posts = await getAllPosts()

  // No posts? Bail...
  if (!posts) {
    return []
  }

  // Return the slugs for each post.
  return posts.map((post: {slug: string}) => ({
    slug: post.slug
  }))
}

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
  // Get the blog post.
  const post = await getPostBySlug(params.slug)

  // No post? Bail...
  if (!post) {
    return {}
  }

  return {
    title: post.seo.title,
    description: post.seo.metaDesc
  }
}

/**
 * The blog post route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Post({params}: {params: {slug: string}}) {
  // Fetch a single post from WordPress.
  const post = await getPostBySlug(params.slug)

  // No post? Bail...
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(
    post.categories.nodes[0].name, // récupère la catégorie principale
    +post.databaseId // exclut l'article actuel
  )

  return (
    <article className="px-10 sm:px-32 max-w-screen-2xl mx-auto my-60">
      <header>
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="md:w-1/2 ">
            <h1
              className="mt-0 text-4xl md:text-5xl font-bold leading-tight text-gray-900"
              dangerouslySetInnerHTML={{__html: post.title}}
            />
            <ul className="m-0 flex list-none gap-2 p-0">
              {post.categories.nodes.map((category) => (
                <li
                  className="m-0 p-1 bg-primary font-fontBlack"
                  key={category.databaseId}
                >
                  <Link
                    className="text-white"
                    href={`/blog/category/${category.name}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {post.featuredImage && (
            <div className="md:w-1/2">
              <img
                className="mt-0"
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText}
              />
            </div>
          )}
        </div>

        <p className="italic">
          Par {post.author.node.name} le{' '}
          <strong>
            <time>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </strong>
        </p>
      </header>
      <div
        className="content-post md:px-12"
        dangerouslySetInnerHTML={{__html: post.content}}
      />
      {relatedPosts.length > 0 && (
        <section className="mt-20 px-10">
          <h2 className="text-2xl bg-primary text-center text-white w-fit mx-auto mt-0 mb-1 p-1 px-2 font-fontBold">
            Articles liés à cette catégorie
          </h2>
          <div className="flex gap-8 flex-wrap">
            {relatedPosts.map((related) => (
              <article key={related.databaseId} className="w-full md:w-80">
                <Link href={`/blog/${related.slug}`}>
                  {related.featuredImage && (
                    <img
                      src={related.featuredImage.node.sourceUrl}
                      alt={related.featuredImage.node.altText}
                      className="w-full h-48 object-cover mb-4"
                    />
                  )}
                  <h3
                    className="text-xl font-semibold"
                    dangerouslySetInnerHTML={{__html: related.title}}
                  />
                  <div
                    className="text-gray-600 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: related.excerpt.slice(0, 100) + '...'
                    }}
                  />
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
