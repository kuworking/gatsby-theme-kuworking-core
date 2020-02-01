// v2020.01.03

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const useMasonry = (row_unit, grid_gap) => {
  const refs = useRef([])
  const [imageLoaded, setImageLoader] = useState(0)
  const [gridAutoRows, setGridAutoRows] = useState(200) // starting grid-auto-rows

  let signals = 0
  const adjustMasonry = async stillMounted => {
    signals++
    const last_signal = signals
    await wait(200) // time for other images to say IM HERE with signals
    if (signals !== last_signal) return // means another instance has added a signal, so I discard this one
    if (stillMounted && !stillMounted.value) return

    // I change here the row gap since otherwise all images are lazy-loaded because all the grid is in the viewport with such a narrow row gap
    setGridAutoRows(row_unit)

    refs.current.forEach(el => {
      const span =
        'span ' + Math.ceil((el.children[0].getBoundingClientRect().height + grid_gap) / (row_unit + grid_gap))
      if (span === el.style.gridRowEnd) return
      el.style.gridRowEnd = span
    })
  }

  useEffect(() => {
    const stillMounted = { value: true }
    adjustMasonry(stillMounted)

    const adjustMasonryEvent = () => adjustMasonry(stillMounted)
    window.addEventListener('resize', adjustMasonryEvent)
    return () => {
      window.removeEventListener('resize', adjustMasonryEvent)
      stillMounted.value = false
    }
  }, [])

  const assignRef = r => {
    if (!r) return
    return refs.current.includes(r) || refs.current.push(r)
  }

  return [gridAutoRows, assignRef, adjustMasonry]
}
