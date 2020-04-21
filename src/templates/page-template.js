import React from 'react'

import { useQuery } from '../queries/page-query'
import { StructurePage } from '../components/structure-page'

export const Page = ({ type = 'page', page, ...props }) => {
  const { thePath, basePath, wallpaper } = page
  const { wallpapers } = wallpaper && useQuery()

  const images = {
    wallpapers: (wallpapers && wallpapers.edges) || '',
  }

  return (
    <StructurePage
      type={type}
      blogPage={{
        thePath: thePath,
        basePath: basePath,
        images: images,
        page,
        ...props,
      }}
    />
  )
}
