// v2020.02.08

import React, { useRef, useLayoutEffect } from 'react'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const useFlexMasonry = (column_width, num_items) => {
  const container_ref = useRef()
  const refs = useRef([]) // un array vacio

  const createStructure = () => {
    if (!container_ref.current) return // the component is unmounted

    // calculate number of columns
    const columns = Math.ceil(container_ref.current.getBoundingClientRect().width / column_width)

    // if not changed, return
    if (container_ref.current.dataset.columns === columns - 1) return

    // store the number of columns for the next time
    container_ref.current.dataset.columns = columns - 1

    // create virtual structure
    const virtual_structure = Array.from({ length: columns - 1 }, () => ({
      num: 0,
      height: 0,
      cells: [],
    }))

    // locate each item to the column with the lowest height
    refs.current.forEach(it => {
      const lowerHeight = Math.min(...virtual_structure.map(col => col.height))
      const shortestColumn = virtual_structure.find(col => col.height === lowerHeight)
      const style = getComputedStyle(it)

      if (it.style.flexBasis) it.style.flexBasis = '0px'

      const height = it.getBoundingClientRect().height + parseInt(style.marginTop) + parseInt(style.marginBottom)
      it.dataset.height = height
      shortestColumn.cells.push({
        el: it,
        height: height,
      })
      shortestColumn.height += height
    })

    const highestHeight = Math.max(...virtual_structure.map(col => col.height))
    container_ref.current.style.maxHeight = highestHeight + 1 + 'px'

    // establish order and flex-basis
    let order = 0
    virtual_structure.forEach(col => {
      col.cells.forEach(cell => {
        cell.el.style.order = order++
        cell.el.style.flexBasis = 0
      })

      const lastEl = col.cells[col.cells.length - 1]
      const flexBasis = lastEl.height + highestHeight - col.height - 1 + 'px'
      lastEl.el.style.flexBasis = flexBasis
    })
  }

  let active = false
  const updateGrid = async () => {
    if (active) return
    active = true
    await wait(500)
    createStructure()
    active = false
  }

  useLayoutEffect(() => {
    //refs.current = refs.current.slice(0, num_items)
    createStructure()

    window.addEventListener('resize', createStructure)
    return () => window.removeEventListener('resize', createStructure)
  }, [])

  const assignRef = r => {
    if (!r) return
    return refs.current.includes(r) || refs.current.push(r)
  }

  return [container_ref, assignRef, updateGrid]
}
