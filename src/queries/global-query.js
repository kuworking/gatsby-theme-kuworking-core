// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyImageSharpFluid_noBase64 = `
  aspectRatio
  src
  srcSet
  sizes
`

module.exports.data = `{
      raw_posts: allMdxBlogPost
      (
       sort: { fields: [date, title], order: DESC }, 
       limit: 500
      )
      {
        edges {
          node {
            id
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            snippet
            abstract
            type
            ... on MdxBlogPost {
              parent {
                ... on Mdx {
                  body
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
      wallpapers: allFile
      (
        filter: { sourceInstanceName: { eq: "content/wallpapers" } }
      )
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
      post_images: allFile
      (
        filter: { sourceInstanceName: { regex: "/content/.*/images/" } }
      )
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
