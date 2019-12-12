import React from 'react'
import {
  get_image_versions,
  get_folder_image,
  get_posts_with_the_same_tags,
  fill_related_posts,
  post_structure,
  get_last_slug,
} from './methods-template'
import { Structure } from '../components/structure'

export default ({ location: { href }, pageContext, data }) => {
  const { allPosts, current: post, post_images, wallpapers } = data
  const pageName = get_last_slug(post.slug)

  const image_versions = get_image_versions(post_images.edges, pageName)
  const images = {
    image: image_versions.standard,
    image_versions: image_versions,
    images: post_images.edges || '',
    wallpapers: wallpapers.edges || '',
  }

  const { pre_path, basePath } = pageContext
  let globalPosts = [...allPosts.edges]
  fill_related_posts(post, globalPosts, images)

  return (
    <Structure
      type="mdx"
      blogPost={{
        canonical: href,
        basePath,
        pre_path,
        images: images,
        post: post_structure(post, images.image_versions),
        structure: {
          post_related_images: get_folder_image(images.images, pageName),
          tags_related_posts: get_posts_with_the_same_tags(post, allPosts, images),
          posts: globalPosts,
        },
      }}
    />
  )
}
