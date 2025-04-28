import {fetchGraphQL} from '../../lib/functions'
import {Post} from '../../lib/types'

/**
 * Fetch a category archive by slug.
 */
export default async function getCategoryBySlug(
  slug: string,
  limit: number = 10
) {
  const query = `
    query GetCategoryBySlug($slug: ID!) {
  category(id: $slug, idType: SLUG) {
    name
    description
    posts(first: 100) {
      nodes {
        databaseId
        date
        excerpt(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        seo {
          metaDesc
          title
        }
        slug
      }
    }
  }
}

  `

  const variables = {slug}

  const response = await fetchGraphQL(query, variables)

  if (!response.data.category) {
    return null
  }

  return {
    category: {
      name: response.data.category.name as string,
      description: response.data.category.description as string
    },
    posts: response.data.category.posts.nodes as Post[]
  }
}
