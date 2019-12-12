import React from 'react'
import { useScript } from '../hooks/usescript'
import { useCss } from '../hooks/usecss'

export const Prism = ({ styling }) => {
  const [loadedCSS, errorCSS] = useCss(`/prism/${styling}.css`)
  const [loadedJS, errorJS] = useScript('/prism/prism.js', { manual: true })
  return <>{loadedJS && loadedCSS && window.Prism && window.Prism.highlightAll()}</>
}
