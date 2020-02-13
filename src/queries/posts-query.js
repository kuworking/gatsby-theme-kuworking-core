import { graphql } from 'gatsby'
import PostsPage from '../templates/posts-template'

export default PostsPage

export const query = graphql`
  query PostsQuery(
    $this_is_a_tag_search: Boolean!
    $tag: String
    $skip: Int!
    $limit: Int!
    $excluded_type: [String!] = []
  ) {
    allTagPosts: allMdxBlogPost(
      skip: $skip
      filter: { tags: { in: [$tag] } }
      sort: { fields: [date, title], order: DESC }
      limit: $limit
    ) @include(if: $this_is_a_tag_search) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          snippet
          abstract
          tags
          type
        }
      }
    }
    allBlogPost: allMdxBlogPost(
      skip: $skip
      sort: { fields: [date, title], order: DESC }
      limit: $limit
      filter: { type: { nin: $excluded_type } }
    ) @skip(if: $this_is_a_tag_search) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          snippet
          abstract
          tags
          type
        }
      }
    }
  }
`

/*
          childImageSharp {
            fluid(maxWidth: 1000, quality: 92) {
              originalName
              src
              ...GatsbyImageSharpFluid_noBase64
            }
            fixed(width: 400, quality: 50) {
              originalName
              src
              ...GatsbyImageSharpFixed_noBase64
            }
          }

*/
