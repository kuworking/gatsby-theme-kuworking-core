import React from 'react'

import { useQuery } from '../queries/page-query'
import { Structure } from '../components/structure'

export const Page = ({ type = 'page', page, ...props }) => {
  const { wallpapers } = useQuery()
  const { thePath, basePath } = page
  const images = {
    wallpapers: wallpapers.edges || '',
  }

  return (
    <Structure
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
