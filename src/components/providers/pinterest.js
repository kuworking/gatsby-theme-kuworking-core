import React from 'react'
import { useScript } from '../hooks/usescript'

export const Pinterest = ({ src }) => (
  <a aria-label="Pinterest" data-pin-do="embedPin" data-pin-width="large" data-pin-build="doBuild" href={src}></a>
)

export const PinterestScript = () => {
  const [loaded, error] = useScript('//assets.pinterest.com/js/pinit.js')
  return <>{loaded && window.doBuild && window.doBuild()}</>
}
