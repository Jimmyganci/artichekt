import {GraphQLResponse, SearchResults} from '../lib/types'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
/**
 * Function to execute a GraphQL query.
 */
export async function fetchGraphQL<T = any>(
  query: string,
  variables?: {[key: string]: any},
  preview = false
): Promise<GraphQLResponse<T>> {
  try {
    // Validate the WordPress GraphQL URL.
    const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL
    if (!graphqlUrl) {
      throw new Error('Missing WordPress GraphQL URL environment variable!')
    }

    // Get the refresh token.
    const refreshToken = process.env.NEXTJS_AUTH_REFRESH_TOKEN

    // Prepare headers.
    const headers: {[key: string]: string} = {
      'Content-Type': 'application/json'
    }

    // If preview mode is enabled and we have a token.
    if (preview && refreshToken) {
      // Add refresh token to fetch headers.
      headers['Authorization'] = `Bearer ${refreshToken}`
    }

    // Get the slug.
    const slug = variables?.slug || variables?.id || 'graphql'

    // Fetch data from external API.
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables
      }),
      next: {
        tags: ['graphql']
      }
    })

    // If the response status is not 200, throw an error.
    if (!response.ok) {
      console.error('Response Status:', response.status)
      throw new Error(response.statusText)
    }

    // Read the response as JSON.
    const data = await response.json()

    // Throw an error if there was a GraphQL error.
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      throw new Error('Error executing GraphQL query')
    }

    // Finally, return the data.
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Search the WordPress REST API for posts matching the query.
 *
 * @see https://developer.wordpress.org/rest-api/reference/search-results/
 */
export async function searchQuery(query: string): Promise<SearchResults[]> {
  // Sanitize the search query.
  query = encodeURIComponent(query.trim())

  try {
    // If there is no URL, throw an error.
    if (!process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL) {
      throw new Error('Missing WordPress REST API URL environment variable!')
    }

    // Always fetch fresh search results.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}/search?search=${query}&subtype=any&per_page=100`
    )

    // If the response status is not 200, throw an error.
    if (!response.ok) {
      console.error('Response Status:', response.status)
      throw new Error(response.statusText)
    }

    // Read the response as JSON.
    const data = await response.json()

    // Verify data has posts.
    if (!data || data.length === 0) {
      throw new Error('No posts found.')
    }

    // Return the data.
    return data as SearchResults[]
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export function isMobile() {
  
  return window.innerWidth <= 640
}


export function gsapTo(elements: string, coef: number) {
  const elementArray = gsap.utils.toArray(elements)
      elementArray.forEach((span: any, index) => {

        return gsap.to(span, {
          y: !isMobile()
            ? (0.1 * index + coef) * ScrollTrigger.maxScroll(window)
            : (0.1 * index + coef / 2) * ScrollTrigger.maxScroll(window),
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'bottom',
            invalidateOnRefresh: true,
            scrub: 0, 
          }
        })
      })
  
} 

export function getRandomNumberWithOneDecimal(min:number, max: number) {
  const randomNum = Math.random() * (max - min) + min;
  const roundedNum = Math.round(randomNum * 10) / 10;
  return roundedNum;
}

export function chunkArray(array: any[], size: number) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, size + i));
  }
  return chunked;
}