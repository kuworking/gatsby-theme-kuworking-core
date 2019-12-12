import React from 'react'
import styled from '@emotion/styled'

export const Spinner01 = () => (
  <Spinning>
    <div></div>
    <div></div>
    <div></div>
  </Spinning>
)

const spinner = '10px'
const orbit = '1'
const angle = 320 * (Math.PI / 180)
const border = '0px'
const delay = '-0.04s'
const Spinning = styled.div`
  display: inline-block;
  position: relative;
  width: ${spinner};
  height: ${spinner};
  border: ${border} solid #ff6c00;
  border-radius: 50%;
  margin-right: 10px;

  & div {
    animation: lds-roller 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: calc(${spinner} / 2) calc(${spinner} / 2);
    margin-left: -${border};
    margin-top: -${border};
  }

  & div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #ff6c00;
  }

  & div:nth-of-type(1) {
    animation-delay: calc(1 * ${delay});
  }
  & div:nth-of-type(2) {
    animation-delay: calc(5 * ${delay});
  }
  & div:nth-of-type(3) {
    animation-delay: calc(10 * ${delay});
  }
  & div:nth-of-type(n):after {
    top: ${orbit * Math.sin(angle)}px;
    left: ${orbit * Math.cos(angle)}px;
  }

  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
