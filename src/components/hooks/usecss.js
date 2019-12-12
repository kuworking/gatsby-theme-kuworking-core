import { useState, useEffect } from 'react'

// based on https://usehooks.com/useScript/

export const useCss = url => {
  const [cachedCss, setCachedCss] = useState([])

  const [state, setState] = useState({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    const inject_css = stillMounted => {
      if (!stillMounted.value) return

      if (cachedCss.includes(url)) {
        setState({
          loaded: true,
          error: false,
        })
      } else {
        const css = document.createElement('link')
        css.rel = 'stylesheet'
        css.href = url

        const onCssLoad = () => {
          setCachedCss(url, ...cachedCss)
          setState({
            loaded: true,
            error: false,
          })
        }

        const onCssError = () =>
          setState({
            loaded: true,
            error: true,
          })

        css.addEventListener('load', onCssLoad)
        css.addEventListener('error', onCssError)

        document.head.appendChild(css)

        return () => {
          css.removeEventListener('load', onCssLoad)
          css.removeEventListener('error', onCssError)
        }
      }
    }

    const stillMounted = { value: true }
    inject_css(stillMounted)

    return () => {
      stillMounted.value = false
    }
  }, [url, cachedCss])

  return [state.loaded, state.error]
}
