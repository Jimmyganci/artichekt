import {fetchGraphQL} from '../../lib/functions'
import {Menu} from '../../lib/types'

/**
 * Fetch a menu by slug.
 */
export default async function getMenuBySlug(slug: string) {
  const query = `
    query GetMenuBySlug($slug: ID = "URI") {
      menu(id: $slug, idType: SLUG) {
        menuItems(first: 100) {
          edges {
            node {
              id
              uri
              label
              databaseId
              parentId
            }
          }
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.menu as Menu
}
