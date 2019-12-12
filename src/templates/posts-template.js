import React from 'react'
import { get_image_versions, post_structure, get_last_slug } from './methods-template'
import { Structure } from '../components/structure'

export default ({ location, pageContext, data }) => {
  const { post_images } = data
  const images = {
    images: post_images.edges || '',
  }

  const allPosts = data.allTagPosts ? data.allTagPosts.edges : data.allBlogPost.edges
  const posts = []

  allPosts.forEach(({ node: post }, index) => {
    const image = get_image_versions(images.images, get_last_slug(post.slug))
    posts.push({
      ...post_structure(post, image),
      key: 'post_' + index,
    })
  })

  const { tag, global_tags, pre_path, basePath, num_of_pages, current_page, all_posts } = pageContext

  return (
    <Structure
      type="grid"
      blogGrid={{
        images: images,
        posts: posts,
        all_posts: all_posts,
        pagination: {
          basePath,
          pre_path,
          num_of_pages,
          current_page,
          isFirst: current_page === 1,
          isLast: current_page === num_of_pages,
          prev_page: current_page - 1 === 1 ? `${pre_path}/` : `${pre_path}/` + (current_page - 1).toString(),
          next_page: `${pre_path}/` + (current_page + 1).toString(),
        },
        tags: {
          tags_grid: data.allTagPosts ? true : false,
          tag: tag,
          global_tags: global_tags,
        },
      }}
    />
  )
}
