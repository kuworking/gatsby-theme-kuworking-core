// v2020.03.31

import { useState, useEffect } from 'react'

export const useWindowResize = () => {
  let stillMounted = { value: false } // in order to prevent the memory leak
  useEffect(() => {
    stillMounted.value = true
    return () => (stillMounted.value = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [resized, rerender] = useState()
  const repaint = () => stillMounted.value && rerender({})

  let doit
  const resize = () => {
    clearTimeout(doit) // eliminate previous timeouts, as a buffer
    doit = setTimeout(repaint, 2000) // if it is not resizing for 2s, timeout won't be cleared
  }

  typeof window !== 'undefined' && window.addEventListener('resize', resize)

  return resized
}
