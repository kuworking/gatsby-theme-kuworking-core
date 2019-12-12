import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from 'react-share'
import styled from '@emotion/styled'

export const SocialShare = ({ title, url, image, size = 32 }) => (
  <Social>
    <FacebookShareButton url={url} quote={title} additionalProps={{ 'aria-label': 'Facebook Share' }}>
      <FacebookIcon size={size} round />
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title} additionalProps={{ 'aria-label': 'Twitter Share' }}>
      <TwitterIcon size={size} round />
    </TwitterShareButton>
    <PinterestShareButton
      url={url}
      media={image}
      windowWidth={1000}
      windowHeight={730}
      additionalProps={{ 'aria-label': 'Pinterest Share' }}
    >
      <PinterestIcon size={size} round />
    </PinterestShareButton>
  </Social>
)

const Social = styled.div`
  display: flex;
  max-width: 100%;

  & .social-icon {
    cursor: pointer;
  }

  & .social-icon:hover {
    opacity: 0.75;
  }
`
