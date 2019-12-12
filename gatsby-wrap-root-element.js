import React from 'react'
import { Styled } from 'theme-ui'

/*
 Because wrapRootElement doesn’t render when the page changes it’s a good fit for context providers...
 ... that don’t need the page like theme or global application state providers
 */
export const wrapRootElement = ({ element }) => <>{element}</>

/*
 wrapPageElement renders every time the page changes making it ideal for complex page transitions...
 ... or for stuff that need the page path, like an internationalization context provider for example
*/
export const wrapPageElement = ({ element }) => <Styled.root>{element}</Styled.root>

export const onRouteUpdate = () => {}
