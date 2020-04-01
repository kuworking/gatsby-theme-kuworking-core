// v2020.03.31

import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { useWindowResize } from '../hooks/usewindowresize'
import { useInView } from 'react-intersection-observer'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const BImg = props => <Img {...props} background={true} />

export const Img = ({
  image: [standard, set],
  component,
  alt = 'image',
  background = false,
  lazy = true,
  adjustMasonry = null,
}) => {
  /**
   * 1. selects image based on clientWidth among the images provided
   * 2. Expects image:
   *                [
   *                url,
   *                // optional
   *                {
   *                  400px: url,
   *                  600px: url,
   *                  800px, 1000px, 1200px, 1800px
   *                }
   *                ]
   * 3. It doesn't take into account density of pixels
   * 4. loads lazy through useInView
   */

  const trueRef = useRef()
  const [ref, inView, entry] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    threshold: 0,
  })
  const handleRef = node => {
    // in order to have a real reference since the ref from useInView doesn't have a current value
    // https://github.com/thebuilder/react-intersection-observer/issues/186
    ref(node)
    trueRef.current = node
  }
  const [src, setSrc] = useState('')
  const resize = useWindowResize()

  useEffect(() => {
    const clientWidth = trueRef.current.clientWidth
    const bestImage = set
      ? clientWidth < 400
        ? set['400px'] || standard
        : clientWidth < 600
        ? set['600px'] || standard
        : clientWidth < 800
        ? set['800px'] || standard
        : clientWidth < 1000
        ? set['1000px'] || standard
        : clientWidth < 1200
        ? set['1200px'] || standard
        : clientWidth < 1800
        ? set['1800px'] || standard
        : standard
      : standard
    setSrc(bestImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resize]) // changes when window is resized

  useEffect(() => {
    if (adjustMasonry) adjustMasonry()
    setTimeout(adjustMasonry, 2000) // just in case, sometimes (cannot reproduce!) the function seems not to be executed

    if (!lazy) return // if !lazy we'll never be here
    ;(async () => {
      if (inView) {
        await wait(200)
        entry.target.style.opacity = 1 // in sync with styled below
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return background ? (
    <BackgroundImage
      style={{ opacity: '0' }}
      component={component}
      src={inView || !lazy ? src : null}
      ref={lazy ? handleRef : null}
      alt={alt}
    />
  ) : (
    <Image
      style={{ opacity: '0' }}
      component={component}
      src={inView || !lazy ? src : null}
      ref={lazy ? handleRef : null}
      alt={alt}
    />
  )
}

const Image = styled.img`
  ${props => props.component}
  transition: opacity 0.5s ease-in;
`

const BackgroundImage = styled.div`
  ${props => props.component}
  transition: opacity 0.5s ease-in;
  background-image: ${props => `url(${props.src})`};
`
