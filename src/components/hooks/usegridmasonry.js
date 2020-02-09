// v2020.02.09

import React, { useRef, useState, useLayoutEffect } from 'react'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const useGridMasonry = (row_unit, grid_gap) => {
  const refs = useRef([])
  const [gridAutoRows, setGridAutoRows] = useState(600) // starting grid-auto-rows

  const adjustMasonry = () => {
    if (!refs.current) return // the component is unmounted

    // I change here the row gap since otherwise, with a gap of 20 (or so) and without the images (still loading),
    // ... all images would trigger the intersection and would be loaded
    // But, once changed, it is changed with the same number so it does not repaint
    // It does not have to repaint since images will only change the span
    setGridAutoRows(row_unit)

    refs.current.forEach(el => {
      const span =
        'span ' + Math.ceil((el.children[0].getBoundingClientRect().height + grid_gap) / (row_unit + grid_gap))
      // not changing all of them every time
      if (span !== el.style.gridRowEnd) el.style.gridRowEnd = span
    })
  }

  let active = false
  const updateGrid = async () => {
    if (active) return
    active = true
    await wait(500)
    adjustMasonry()
    active = false
  }

  useLayoutEffect(() => {
    updateGrid()
    window.addEventListener('resize', updateGrid)
    return () => window.removeEventListener('resize', updateGrid)
  }, [])

  const assignRef = r => r && (refs.current.includes(r) || refs.current.push(r))

  return [gridAutoRows, assignRef, updateGrid]
}
