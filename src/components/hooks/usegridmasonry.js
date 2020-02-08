// v2020.02.08

import React, { useRef, useState, useLayoutEffect } from 'react'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const useGridMasonry = (row_unit, grid_gap, [repaint, setRepaint]) => {
  const refs = useRef([])
  const [gridAutoRows, setGridAutoRows] = useState(200) // starting grid-auto-rows

  const adjustMasonry = () => {
    if (!refs.current) return // the component is unmounted

    // I change here the row gap since otherwise, with a gap of 20 (or so) and without the images (still loading),
    // ... all images would trigger the intersection and would be loaded
    // But, once changed, it is changed with the same number so it does not repaint
    // so I make sure of the repaint with the setRepaint
    setGridAutoRows(row_unit)

    refs.current.forEach(el => {
      const span =
        'span ' + Math.ceil((el.children[0].getBoundingClientRect().height + grid_gap) / (row_unit + grid_gap))
      if (span === el.style.gridRowEnd) return
      el.style.gridRowEnd = span
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
    adjustMasonry()
    setRepaint(!repaint)

    window.addEventListener('resize', adjustMasonry)
    return () => window.removeEventListener('resize', adjustMasonry)
  }, [])

  const assignRef = r => {
    if (!r) return
    return refs.current.includes(r) || refs.current.push(r)
  }

  return [gridAutoRows, assignRef, updateGrid]
}
