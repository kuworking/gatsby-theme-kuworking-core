import { useState, useEffect } from 'react'

// based on https://usehooks.com/useScript/

export const useScript = (src, dataset) => {
  const [cachedScripts, setCachedScripts] = useState([])

  const [state, setState] = useState({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    if (!src || (dataset && dataset.abort)) return
    const inject_script = stillMounted => {
      if (!stillMounted.value) return

      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        })
      } else {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = src
        dataset && Object.entries(dataset).map(([key, value]) => (script.dataset[key] = value))

        const onScriptLoad = () => {
          setCachedScripts(src, ...cachedScripts)
          setState({
            loaded: true,
            error: false,
          })
        }

        const onScriptError = () =>
          setState({
            loaded: true,
            error: true,
          })

        script.addEventListener('load', onScriptLoad)
        script.addEventListener('error', onScriptError)

        document.body.appendChild(script)

        return () => {
          script.removeEventListener('load', onScriptLoad)
          script.removeEventListener('error', onScriptError)
        }
      }
    }

    const stillMounted = { value: true }
    inject_script(stillMounted)

    return () => {
      stillMounted.value = false
    }
  }, [src, cachedScripts])

  return [state.loaded, state.error]
}
