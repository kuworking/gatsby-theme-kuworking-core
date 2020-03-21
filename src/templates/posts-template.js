import React from 'react'
import { get_image_versions, post_structure, get_last_slug } from './methods-template'
import { Structure } from '../components/structure'

export default ({ pageContext, data }) => {
  const {
    tag,
    global_tags,
    pre_path,
    basePath,
    thePath,
    num_of_pages,
    current_page,
    raw_posts,
    wallpapers,
    post_images,
  } = pageContext

  const images = {
    images: post_images || '',
  }

  const allPosts = data.allTagPosts ? data.allTagPosts.edges : data.allBlogPost.edges
  const posts = []

  allPosts.forEach(({ node: post }, index) => {
    const image = get_image_versions(post_images, get_last_slug(post.slug))
    posts.push({
      ...post_structure(post, image),
      key: 'post_' + index,
    })
  })

  return (
    <Structure
      type="grid"
      blogGrid={{
        images: images,
        posts: posts,
        raw_posts: raw_posts,
        thePath: thePath,
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
