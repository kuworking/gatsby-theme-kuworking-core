const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
const Debug = require(`debug`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { urlResolve } = require(`gatsby-core-utils`)

const debug = Debug(`gatsby-theme-blog-core`)
const withDefaults = require(`./utils/default-options`)

// remove the trailing dashes, still, not well resolved, only applies to pages here
const replacePath = _path => (_path === `/` ? _path : _path.replace(/\/$/, ``))

exports.onCreatePage = async ({ page, actions }, themeOptions) => {
  const { basePath } = withDefaults(themeOptions)
  const { createPage, deletePage } = actions

  if (page.path.includes('404')) return
  deletePage(page)

  const thePath = urlResolve(replacePath(basePath), replacePath(page.path))
  return createPage({
    ...page,
    path: thePath,
    context: {
      thePath: thePath,
      basePath: basePath,
      ...page.context,
    },
  })
}

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { folders_to_check } = withDefaults(themeOptions) // recipes are optional

  const dirs = folders_to_check.map(el => path.join(program.directory, el))
  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNode, createParentChildLink } = actions
  const { postsPath, recipesPath, basePath } = withDefaults(themeOptions)

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) return

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (node.internal.type === `Mdx` && (source === postsPath || source === recipesPath)) {
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

      const changedPath = /^.\d{4}\.\d{2}\.\d{2}\./.test(filePath) ? '/' + filePath.split('.').pop() : filePath
      slug = urlResolve(basePath, changedPath)
    }

    // prettier-ignore
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
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`,
      },
    })
    createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) })
  }
}

// These templates are simply data-fetching wrappers that import components (and allow shadowing)
const PostTemplate = require.resolve(`./src/queries/post-query`)
const PostsTemplate = require.resolve(`./src/queries/posts-query`)
const GlobalQuery = require(`./src/queries/global-query`)

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const {
    basePath,
    postsPerPage,
    tagsPath,
    do_not_count_type_for_pagination,
    do_not_include_type_in_lists,
    do_not_create_tag_page_for,
  } = withDefaults(themeOptions)

  const result = await graphql(GlobalQuery.data)
  if (result.errors) reporter.panic(result.errors)

  // Create pages.
  const posts = result.data.raw_posts.edges
  const wallpapers = result.data.wallpapers.edges
  const post_images = result.data.post_images.edges
  const grid_images = result.data.grid_images.edges

  // Create pages for each post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const { slug, name } = post

    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        thePath: slug,
        raw_posts: posts,
        wallpapers: wallpapers,
        post_images: post_images.filter(({ node: { relativeDirectory } }) => relativeDirectory === name),
        grid_images: grid_images,
        //    grid_images2: grid_images.filter(({ node: { name: imageName } }) => name === imageName.split('---')[0]),
        basePath: basePath,
        pre_path: basePath,
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  // Create the Posts (grid) main page with pagination
  const filtered_posts_by_type = do_not_count_type_for_pagination
    ? posts.filter(({ node: { type } }) => !do_not_count_type_for_pagination.includes(type))
    : posts
  const numPages = Math.ceil(filtered_posts_by_type.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? basePath : `${basePath}${index + 1}`,
      component: PostsTemplate,
      context: {
        thePath: '',
        raw_posts: posts,
        wallpapers: wallpapers,
        post_images: grid_images,
        basePath: basePath,
        pre_path: basePath,
        limit: postsPerPage,
        skip: index * postsPerPage,
        num_of_pages: numPages,
        current_page: index + 1,
        this_is_a_tag_search: false,
        excluded_type: do_not_count_type_for_pagination || [],
      },
    })
  })

  // Create the Tags Posts page with pagination
  // A global array of all employed tags

  const filtered_posts_by_tag = do_not_include_type_in_lists
    ? posts.filter(({ node: { type } }) => !do_not_include_type_in_lists.includes(type))
    : posts

  let global_tags = []
  let counting_by_tags = {}
  filtered_posts_by_tag.forEach(({ node: { tags } }) => {
    global_tags = global_tags.concat(tags)
    tags.forEach(tag => {
      if (!counting_by_tags[tag]) counting_by_tags[tag] = 0
      counting_by_tags[tag]++
    })
  })

  global_tags.filter(tag => tag !== do_not_create_tag_page_for)

  // and the Tags Posts pages
  global_tags = [...new Set(global_tags)] // to eliminate duplicates
  global_tags.forEach(tag => {
    let numPages_perTag = Math.ceil(counting_by_tags[tag] / postsPerPage)

    Array.from({ length: numPages_perTag }).forEach((_, index) => {
      const thePath = index === 0 ? `${basePath}${tagsPath}/${tag}/` : `${basePath}${tagsPath}/${tag}/${index + 1}`
      createPage({
        path: thePath,
        component: PostsTemplate,
        context: {
          thePath: thePath,
          raw_posts: posts,
          wallpapers: wallpapers,
          post_images: grid_images,
          basePath: basePath,
          pre_path: `${basePath}${tagsPath}/${tag}`,
          limit: postsPerPage,
          skip: index * postsPerPage,
          num_of_pages: numPages_perTag,
          current_page: index + 1,
          tag: tag,
          global_tags: global_tags,
          this_is_a_tag_search: true,
        },
      })
    })
  })
}
