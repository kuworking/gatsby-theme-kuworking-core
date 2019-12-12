import React from 'react'
import styled from '@emotion/styled'

export const Video = ({ src, component }) => (
  <Frame
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    frameborder="0"
    allowfullscreen
    component={component}
    title="Video"
    src={src}
  />
)

const Frame = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  ${props => props.component}
`
