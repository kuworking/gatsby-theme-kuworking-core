import React from 'react'
import { StructurePost } from '../components/structure-post'

export default ({ pageContext, data }) => {
  const { thePath, post, post_images, related_posts, wallpapers, basePath, pre_path } = pageContext
  post.content = data.current.parent.body

  return (
    <StructurePost
      type="mdx"
      blogPost={{
        thePath,
        basePath,
        pre_path,
        post_images,
        post,
        related_posts,
        wallpapers,
      }}
    />
  )
}


  /*
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
*/
