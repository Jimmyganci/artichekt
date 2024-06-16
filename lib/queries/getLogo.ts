import {fetchGraphQL} from '../functions'
import {Page} from '../types'

/**
 * Fetch all pages.
 */
export default async function getLogo(name: string) {
  const query = `
  query GetSiteLogo($name: String!) {
      mediaItems(where: {name: $name}) {
        nodes {
          mediaItemUrl
          altText
          mediaDetails {
            height
            width
          }
        }
      }
    }
  `;

  const variables = {
    name: name
  };

  const response = await fetchGraphQL(query, variables)

  return response.data.mediaItems.nodes[0]
}
