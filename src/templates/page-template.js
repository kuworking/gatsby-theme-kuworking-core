import React from 'react'

import { useQuery } from '../queries/page-query'
import { Structure } from '../components/structure'
import { get_last_slug } from './methods-template'

export const Page = ({ type = 'page', page, ...props }) => {
  const { wallpapers } = useQuery()
  const images = {
    wallpapers: wallpapers.edges || '',
  }

  return (
    <Structure
      type={type}
      blogPage={{
        canonical: get_last_slug(typeof window !== 'undefined' && window.location.pathname),
        images: images,
        page,
        ...props,
      }}
    />
  )
}
