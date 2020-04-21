const path = require(`path`)
const crypto = require(`crypto`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { urlResolve } = require(`gatsby-core-utils`)

const withDefaults = require(`../../utils/default-options`)
const { replacePath } = require(`./methods`)

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNode, createParentChildLink } = actions
  const { postsPath, basePath } = withDefaults(themeOptions)

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) return

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && source === postsPath) {
    let slug

    if (node.frontmatter.slug) {
      // typically I don't add a slug, I infere it here
      if (path.isAbsolute(node.frontmatter.slug)) {
        // absolute paths take precedence
        slug = node.frontmatter.slug
      } else {
        // otherwise a relative slug gets turned into a sub path
        slug = urlResolve(basePath, node.frontmatter.slug)
      }
    } else {
      // otherwise use the filepath function from gatsby-source-filesystem
      const filePath = createFilePath({
        node: fileNode,
        getNode,
        basePath: source,
      })

      /** remove the date of each file, useful to sort them by date in a folder */
      const changedPath = /^.\d{4}\.\d{2}\.\d{2}\./.test(filePath) ? '/' + filePath.split('.').pop() : filePath
      slug = urlResolve(basePath, changedPath)
    }

    const tags = node.frontmatter.tags
      ? node.frontmatter.tags.split(',').map(el =>
          el
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ /g, '-')
        )
      : []

    slug = replacePath(slug)

    const fieldData = {
      title: node.frontmatter.title,
      tags,
      slug,
      name: slug.charAt(0) === '/' ? slug.substring(1) : slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
      type: node.frontmatter.type || '',
      snippet: node.frontmatter.snippet || '',
      abstract: node.frontmatter.abstract || '',
      sourceInstanceName: source,
    }

    const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`)
    await createNode({
      ...fieldData,
      // Required fields.
      id: mdxBlogPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxBlogPost`,
        contentDigest: crypto.createHash(`md5`).update(JSON.stringify(fieldData)).digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) })
  }
}
