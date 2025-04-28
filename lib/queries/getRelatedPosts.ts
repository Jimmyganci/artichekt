import {fetchGraphQL} from '../../lib/functions'
import {Post} from '../../lib/types'

export default async function getRelatedPosts(
  categorySlug: string,
  excludePostId: number,
  limit: number = 3
) {
  const query = `
    query GetRelatedPosts($slug: String!, $exclude: ID!) {
      posts(
        where: {
          categoryName: $slug,
          notIn: [$exclude],
          status: PUBLISH
        },
        first: ${limit}
      ) {
        nodes {
          databaseId
          title(format: RENDERED)
          slug
          excerpt(format: RENDERED)
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    slug: categorySlug,
    exclude: excludePostId
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.posts.nodes as Post[]
}
