import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useScript } from '../hooks/usescript'

export const CodeLink = props => <CodePen {...props} playground={false} />

export const useCodePenScript = () => {
  const [scr, setScr] = useState()
  useScript(scr)
  return () => setScr('https://static.codepen.io/assets/embed/ei.js')
}

export const CodePen = ({
  playground = true,
  height = 600,
  tab = 'js,result',
  html,
  _css, // css likely is a protected word
  js,
  scripts = '',
}) => {
  const html_complete = html ? html : ''
  const js_complete = js ? js : ''
  const css_complete = _css ? _css : ''

  const isThisReact = scripts.trim() === 'react'
  const scripts_complete = isThisReact && [
    'https://cdnjs.cloudflare.com/ajax/libs/react/16.8.4/umd/react.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.4/umd/react-dom.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/styled-components/3.4.10/styled-components.min.js',
  ]
  const tabs = isThisReact ? tab.replace(/js/, 'javascript') : tab

  const data = {
    title: 'CodePen',
    description: 'CodePen',
    tags: ['javascript'],
    html_classes: [],
    head: '<meta name="viewport" content="width=device-width, initial-scale=1"></meta>',
    stylesheets: '',
    scripts: scripts_complete || [],
  }

  const boilerplate = isThisReact
    ? { js_pre_processor: 'babel', js_external: scripts_complete.join(';') }
    : { css_external: '', js_external: '' }
  let data_link = {
    title: 'CodePen',
    description: 'CodePen',
    html: html_complete,
    css: css_complete,
    js: js_complete,
    editors: 1011,
    ...boilerplate,
  }

  /*
   useScript already monitors whether the script has been loaded or not
   And I make sure that it is added at the end, even though it is already ensured since it uses useEffect
  */

  return (
    <>
      {playground && (
        <div
          className="codepen"
          data-prefill={JSON.stringify(data)}
          data-height={height}
          data-theme-id="dark"
          data-default-tab={tabs}
          data-editable="true"
          data-preview="true"
          style={{
            height: height + 'px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid',
            margin: '1em 0',
            padding: '1em',
          }}
          data-pen-title="CodePen"
        >
          <pre data-lang="html">{html_complete}</pre>
          <pre data-lang="css">{css_complete}</pre>
          {isThisReact ? <pre data-lang="babel">{js_complete}</pre> : <pre data-lang="js">{js_complete}</pre>}
        </div>
      )}

      <CodePenForm action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value={JSON.stringify(data_link)} />
        <input type="submit" value="IR A EDITOR CODEPEN" />
      </CodePenForm>
      {useScript('https://static.codepen.io/assets/embed/ei.js', { abort: !playground })}
    </>
  )
}

const CodePenForm = styled.form`
  cursor: pointer;
  font-size: 1em;
  margin-top: 5px;
  border-radius: 8px;
  background-color: #ff7d00;
  display: inline-block;
  padding: 5px;
  & > input {
    cursor: pointer;
    font-size: 1em;
    background-color: unset;
    color: #fff;
    font-weight: 700;
  }
`
