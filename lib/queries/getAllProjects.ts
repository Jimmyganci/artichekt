import {fetchGraphQL} from '../../lib/functions'
import {Post} from '../../lib/types'

/**
 * Fetch all blog posts.
 */
export default async function getAllProjects() {
  const query = `
    query GetAllProjects {
      projects(where: {status: PUBLISH}) {
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
          imagesGalleries {
            images {
              id
              title
              caption
              full_image_url
              thumbnail_image_url
              large_srcset
              medium_srcset
              media_details
              alt_text
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

  return response.data.projects.nodes as Post[]
}
