import {fetchGraphQL} from '../functions'
import {Post} from '../types'

/**
 * Fetch all blog posts.
 */
export default async function getAllServices() {
  const query = `
    query GetAllServices {
      services(where: {status: PUBLISH}) {
        nodes {
          databaseId
          date
          modified
          title
          slug
          excerpt(format: RENDERED)
          featuredImage {
            node {
              altText
              sourceUrl
              mediaDetails {
                  height
                  width
              }
            }
          }
          seo {
            metaDesc
            title
          }
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  return response.data.services.nodes as Post[]
}
