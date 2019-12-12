import React from 'react'
import styled from '@emotion/styled'

export const Youtube = ({ src, component }) => {
  const youtube_src = /embed\/(.*?)(?:\?|$)/.exec(src)[1]
  const youtube_img = `https://img.youtube.com/vi/${youtube_src}/hqdefault.jpg`
  const srcdoc = `
  <style>
* {padding:0;margin:0;overflow:hidden}
html,body {height:100%}
img,span {position:absolute;width:100%;top:0;bottom:0;margin:auto}
span.label {
  height:1.5em;
  text-align:center;
  font:40px/1.5 sans-serif;
  color:white;
}
span.arrow {
  text-shadow:0 0 0.5em black;
  transform: rotate(45deg);
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-width: 10px 10px 0 0;
  border-style: solid;
  margin: 10px;
}
</style>
<a href="${src}">
  <img
    src="${youtube_img}"
    alt="Youtube"
  />
  <span class="label"><span class="arrow"></span>YouTube</span>
</a>
  `

  return (
    <Frame
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameborder="0"
      allowfullscreen
      component={component}
      title="Youtube"
      src={`data:text/html, ${srcdoc}`}
    />
  )
}

const Frame = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  ${props => props.component}
`
