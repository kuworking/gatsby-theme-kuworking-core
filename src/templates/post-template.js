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
  const { raw_posts, wallpapers, post_images, grid_images, pre_path, basePath } = pageContext
  const { current: post } = data
  const pageName = get_last_slug(post.slug)

  const image_versions = get_image_versions(post_images, pageName)
  const grid_image_versions = get_image_versions(grid_images, pageName)
  const images = {
    image: image_versions.standard,
    image_versions: image_versions,
    images: post_images || '',
    grid_image: grid_image_versions.standard,
    grid_image_versions: grid_image_versions,
    grid_images: grid_images,
    wallpapers: wallpapers || '',
  }

  fill_related_posts(post, raw_posts, images)

  return (
    <Structure
      type="mdx"
      blogPost={{
        canonical: href && href.split('?')[0], // remove the `?whatever` part, href not present in build
        basePath,
        pre_path,
        images: images,
        post: post_structure(post, images.image_versions, images.grid_image_versions),
        structure: {
          post_related_images: get_folder_image(images.images, pageName),
          tags_related_posts: get_posts_with_the_same_tags(post, raw_posts, images),
          posts: raw_posts,
        },
      }}
    />
  )
}
