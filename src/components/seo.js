import React from 'react'
import { Helmet } from 'react-helmet'

import { Config, SeoText } from '../utils/config'

export const SEO = ({
  type,
  schemaType = 'WebPage',
  itemList = [],
  wholeSchema = null,
  blogGrid,
  blogPost,
  blogPage,
  extra = null,
}) => {
  const { canonical } = blogGrid || blogPost || blogPage
  const { page, image: imagePage } = blogPage || ''
  const { tags, image: imageGrid } = blogGrid || ''
  const { post, image: imagePost } = blogPost || ''

  const title = (
    (page && page.title) ||
    (post && SeoText.post.before + post.title + SeoText.post.after) ||
    (tags && tags.tags_grid && SeoText.grid_tags.title + tags.tag) ||
    SeoText.grid.title
  ).replace(/#/g, '')

  const description = (
    (page && page.description) ||
    (post && post.description) ||
    (tags && tags.tags_grid && SeoText.grid_tags.description + tags.tag) ||
    SeoText.grid.description
  ).replace(/#/g, '')

  const keywords = (page && page.keywords) ||
    (post && [...SeoText.generic_keywords, ...post.tags.map(el => el.replace(/_/g, ' '))]) ||
    (tags && tags.tags_grid && [...SeoText.generic_keywords, tags.tag]) || [...SeoText.generic_keywords]

  // const image = (post && (Config.url + post.full_image).replace(/(?<!:)\/\//, '/')) || '' // negative lookbehing is only Chrome-supported as today
  const image = (page && imagePage) || (post && imagePost) || (imageGrid && imageGrid) || '' // alternative
  const canonical_url = canonical || Config.url
  const robots = (page && page.robots) || 'index, follow'

  const content_type_og = type === 'mdx' ? 'article' : type === 'page' ? 'website' : 'website'

  const schemaOrgJSONLD = wholeSchema || [
    {
      '@context': 'https://schema.org',
      '@type': schemaType,
      url: canonical_url,
      name: title,
      headline: title,
      description: description,
      image: image,
      sameAs: Object.values(Config.social),
      author: {
        '@type': 'Person',
        name: Config.user,
      },
      publisher: {
        '@type': 'Organization',
        name: Config.user,
      },
      mainEntityOfPage: {
        '@type': schemaType,
        '@id': canonical_url,
      },
      itemListElement: itemList,
    },
  ]

  return (
    <Helmet defer={false}>
      <html lang={Config.site_lang} />
      <title>{title}</title>

      {/* Canonical */}
      <link rel="canonical" href={canonical_url} key={canonical_url} />

      {/* General tags */}
      <meta name="viewport" content={'width=device-width, initial-scale=1'} />
      <meta charset="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.length > 0 ? keywords.join(`, `) : ''} />
      <meta name="robots" content={robots} />

      {/* Extra tags */}
      {extra && <meta {...extra} />}

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:site_name " content={Config.user} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={content_type_og} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical_url} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={Config.social.twitter} />
      <meta name="twitter:site" content={Config.social.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:domain" content={canonical_url} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
