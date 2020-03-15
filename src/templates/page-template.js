import React from 'react'

import { useQuery } from '../queries/page-query'
import { Structure } from '../components/structure'
import { get_last_slug } from './methods-template'

export const Page = ({ type = 'page', page, ...props }) => {
  const { wallpapers } = useQuery()
  const { canonical } = page
  const images = {
    wallpapers: wallpapers.edges || '',
  }

  return (
    <Structure
      type={type}
      blogPage={{
        canonical: canonical || window.location.href.split('?')[0], // remove the ?whatever part
        images: images,
        page,
        ...props,
      }}
    />
  )
}
