// v2020.02.03

import React, { useRef, useState, useEffect } from 'react'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const useMasonry = (row_unit, grid_gap, [repaint, setRepaint]) => {
  const refs = useRef([])
  const [gridAutoRows, setGridAutoRows] = useState(200) // starting grid-auto-rows

  let signals = 0
  const adjustMasonry = async stillMounted => {
    signals++
    const last_signal = signals
    await wait(200) // time for other images to say IM HERE with signals
    if (signals !== last_signal) return // means another instance has added a signal, so I discard this one
    if (stillMounted && !stillMounted.value) return

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

  useEffect(() => {
    const stillMounted = { value: true }
    adjustMasonry(stillMounted)
    setRepaint(!repaint)

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
