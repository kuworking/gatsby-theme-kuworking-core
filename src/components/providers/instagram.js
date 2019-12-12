import React from 'react'
import styled from '@emotion/styled'

export const Instagram = ({ src, component }) => (
  <a aria-label="Instagram" href={src + '?utm_source=ig_web_copy_link'}>
    <Img component={component} alt="Instagram" src={src + 'media/?size=l'} />
  </a>
)

const Img = styled.img`
  width: 100%;
  ${props => props.component}
`
