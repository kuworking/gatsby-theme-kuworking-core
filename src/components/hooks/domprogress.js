import React from 'react'
import styled from '@emotion/styled'

const wait = ms => new Promise((r, j) => setTimeout(r, ms))

const reset = async st => {
  st.transition = 'none'
  await wait(100)
  st.width = '0%'
  st.opacity = '1'
  await wait(100)
}

const increment = (st, i) => {
  const width = parseInt(st.width) + i
  st.width = (width > 100 ? 100 : width) + '%'
}

const transition_slow = async st => {
  st.transition = 'width 10000ms cubic-bezier(0.010, 0.880, 0.000, 1.005)'
  await wait(100)
}

const transition_fast = async st => {
  st.transition = 'width 500ms cubic-bezier(1.000, -0.030, 0.990, 0.045), opacity 2000ms ease'
  await wait(100)
}

export const progress = {
  element: props => (
    <Bar id="kuworking_nprogress" {...props}>
      <div></div>
    </Bar>
  ),
  start: async () => {
    const st = document.getElementById('kuworking_nprogress').firstElementChild.style
    await reset(st)
    await transition_slow(st)
    st.width = '60%'
  },
  done: async () => {
    const st = document.getElementById('kuworking_nprogress').firstElementChild.style
    await reset(st)
    increment(st, 20)
    await transition_fast(st)
    st.width = '100%'
    st.opacity = '0'
  },
}

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  & > div {
    height: 2px;
    background: #000;
  }
`
