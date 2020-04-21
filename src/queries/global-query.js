// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyImageSharpFluid_noBase64 = `
  aspectRatio
  src
  srcSet
  sizes
`

module.exports.data = `query forGatsbyNode ($wallpapers: String!, $posts: String!, $images: String!){
    raw_posts: allMdxBlogPost
      (
       sort: { fields: [date, title], order: DESC }, 
       limit: 1000,
       filter: { sourceInstanceName: { eq: $posts } }
       )
      {
        edges {
          node {
            id
            slug
            name
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            snippet
            abstract
            type
            sourceInstanceName
            ... on MdxBlogPost {
              parent {
               ... on Mdx {
                 timeToRead
                 wordCount {
                   words
                 }
               }
              }
            }
          }
        }
      }
      wallpapers: allFile(filter: { sourceInstanceName: { eq: $wallpapers } })
      {
        edges {
          node {
            publicURL
            relativeDirectory
            childImageSharp {
              fluid(maxWidth: 2000) {
                originalName
                src
                ${GatsbyImageSharpFluid_noBase64}
              }
            }
          }
        }
      }
      post_images: allFile(filter: { sourceInstanceName: { eq: $images } })
      {
        edges {
          node {
            publicURL
            name
            relativeDirectory
          }
        }
      }
    }`
