export const get_last_slug = str =>
  str &&
  str
    .replace(/\/.*\//g, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')

export const get_image = (images, name) => images.filter(el => el.node.name === name)[0]
export const get_image_versions = (images, name) =>
  Object.assign(
    {},
    ...images
      .filter(el => el.node.name.split('---')[0] === name)
      .map(el => ({ [el.node.name.split('---')[1] || 'standard']: el.node.publicURL }))
  )

export const get_folder_image = (images, name) =>
  images
    .filter(el => el.node.relativeDirectory === name)
    .reduce((acc, { node: { name, publicURL } }) => {
      const [nme, variant] = name.split('---')
      const number = parseInt(nme) - 1 // to make 0-index
      if (!acc[number]) acc[number] = {}
      acc[number][variant || 'standard'] = publicURL
      return acc
    }, [])

export const fill_related_posts = (post, posts, images) => {
  let this_is_the_own_post

  posts.forEach(({ node: this_post }, i) => {
    this_post.name = this_post.slug.replace(/^\//, '')
    const image = get_image_versions(images.images, get_last_slug(this_post.slug))
    this_post.full_image = image && image.standard
    this_post.image_versions = image || ''
    //    this_post.fluid_image = image && image.node.childImageSharp && image.node.childImageSharp.fluid
    //    this_post.fixed_image = image && image.node.childImageSharp && image.node.childImageSharp.fixed
    this_post.description = this_post.snippet
    if (this_post.title === post.title) this_is_the_own_post = i
  })

  posts.splice(this_is_the_own_post, 1) // remove the same post from the array
}

export const get_posts_with_the_same_tags = (post, allPosts, images) => {
  let posts_with_the_same_tags = []

  post.tags.forEach(tag => {
    const these_posts = [...allPosts.edges.filter(el => el.node.tags.includes(tag))]
    fill_related_posts(post, these_posts, images)
    posts_with_the_same_tags.push(...these_posts)
  })

  posts_with_the_same_tags = Array.from(new Set(posts_with_the_same_tags)) // duplicates are removed
  return posts_with_the_same_tags
}

export const post_structure = (post, image) => ({
  date: post.date,
  tags: post.tags,
  timeToRead: post.parent ? post.parent.timeToRead : '',
  words: post.parent ? post.parent.wordCount.words : '',
  abstract: post.abstract
    .replace(/_(.*?)_/g, '<i>$1</i>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/__(.*?)__/g, '<b>$1</b>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'),
  content: (post.parent && post.parent.body) || '',
  title: post.title,
  type: post.type,
  description: post.snippet,
  name: post.slug.replace(/^\//, ''), // needed for the 1st slash, the last one is already removed
  full_image: image && image.standard,
  image_versions: image || '',
  //  fluid_image: image && image.node.childImageSharp && image.node.childImageSharp.fluid,
  //  fixed_image: image && image.node.childImageSharp && image.node.childImageSharp.fixed,
})
