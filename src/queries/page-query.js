import { useStaticQuery, graphql } from 'gatsby'

export const useQuery = () =>
  useStaticQuery(graphql`
    query PageQuery {
      wallpapers: allFile(filter: { sourceInstanceName: { eq: "content/wallpapers" } }) {
        edges {
          node {
            relativeDirectory
            childImageSharp {
              fluid(maxWidth: 2000) {
                originalName
                src
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  `)
