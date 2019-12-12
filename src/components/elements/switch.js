import React from 'react'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'
import { modes as colorModes } from '../../gatsby-plugin-theme-ui/index'
import { Sunny as DaySafe } from 'emotion-icons/ion-md'
import { Moon as NightSafe } from 'emotion-icons/fa-regular'

export const Switch = ({ Day, Night, styles }) => {
  const [colorMode, setColorMode] = useColorMode()

  const toggleColorMode = e => {
    const index = colorModes.indexOf(colorMode)
    const next = colorModes[(index + 1) % colorModes.length]
    setColorMode(next)
  }

  const Icons = () =>
    Day ? (
      <>
        <Night />
        <Day />
      </>
    ) : (
      <>
        <NightSafe />
        <DaySafe />
      </>
    )

  return (
    <Square day={colorMode === 'light'} onClick={toggleColorMode} {...styles}>
      <div>
        <div>
          <Icons />
        </div>
      </div>
    </Square>
  )
}

export default Switch

const width = '20px'
const Square = styled.div`
  cursor: pointer;
  margin: 4px;
  color: ${props => (props.day ? '#000' : '#fff')};
  background: ${props => (props.day ? props.dayColor : props.nightColor)};

  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;

  transition: color 0.2s ease, background 0.5s ease;
  &:hover {
    color: ${props => (props.day ? '#fff' : '#000')};
  }

  & > div:first-of-type {
    width: ${width};
    height: ${width};
    overflow: hidden;

    & > div:first-of-type {
      position: relative;
      display: flex;
      flex-direction: column;
      transition: top 0.2s ease-in;
      top: ${props => (props.day ? `-${width}` : '0px')};

      & svg {
        width: ${width};
        height: ${width};
      }
    }
  }
`
