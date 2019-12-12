import React from 'react'
import { useScript } from '../hooks/usescript'
import { useCss } from '../hooks/usecss'

export const Highlight = ({ styling }) => {
  const [loadedCSS, errorCSS] = useCss(`/highlight/${styling}.css`)
  const [loadedJS, errorJS] = useScript('/highlight/highlight.pack.js')
  return <>{loadedJS && loadedCSS && apply_highlight()}</>
}

export const apply_highlight = () =>
  document.querySelectorAll('pre code').forEach(block => window.hljs && window.hljs.highlightBlock(block))
