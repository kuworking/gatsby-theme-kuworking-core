import React from 'react'
import styled from '@emotion/styled'
import { Styled } from 'theme-ui'

import { SEO } from './seo'
import { Switch } from './elements/switch'

const grid_maxwidth = '1000px'
const post_maxwidth = '800px'

export const Structure = ({ type, blogGrid, blogPost, blogPage }) => {
  const { images, canonical } = blogGrid || blogPost || blogPage
  const { page, children, main_maxwidth, main_background } = blogPage || ''
  const { posts, pagination, tags } = blogGrid || ''
  const { post, structure: { post_related_images, tags_related_posts } = {} } = blogPost || ''

  const maxWidth = (blogPost && post_maxwidth) || main_maxwidth || grid_maxwidth

  return (
    <Main main_background={main_background}>
      <SEO type={type} blogGrid={blogGrid} blogPost={blogPost} blogPage={blogPage} />

      <Container maxWidth={maxWidth}>
        <Switch aria-label="Toggle color modes" />

        {(type === 'grid' && (
          <Grid>
            <Styled.h1>GRID</Styled.h1>
            <Lorem />
          </Grid>
        )) ||
          (type === 'mdx' && (
            <Post>
              <Styled.h1>POST</Styled.h1>
              <Lorem />
            </Post>
          )) ||
          ((type === 'page' || type === 'tool') && (
            <Page>
              <Styled.h1>PAGE</Styled.h1>
              {children}
              <Lorem />
            </Page>
          ))}
      </Container>
    </Main>
  )
}

const Main = styled.main`
  background: ${props => props.main_background || 'unset'};
  display: flex;
  min-height: 100vh; /* needed for the sticky footer */
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  transition: font-size 0.5s ease, background-color 0.5s ease;
`

const Container = styled.div`
  max-width: ${props => props.maxWidth};
  width: 100%;
  padding: 0px 10px;
`

const common = `
padding: 10px;
`
const Grid = styled.div`
  ${common}
`
const Post = styled.div`
  ${common}
`
const Page = styled.div`
  ${common}
`

const Lorem = () => (
  <>
    <Styled.h1>HTML Ipsum Presents</Styled.h1>
    <Styled.p>
      <Styled.strong>Pellentesque habitant morbi tristique</Styled.strong> senectus et netus et malesuada fames ac
      turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
      amet quam egestas semper. <Styled.em>Aenean ultricies mi vitae est.</Styled.em> Mauris placerat eleifend leo.
      Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,{' '}
      <Styled.code>commodo vitae</Styled.code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt
      condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.{' '}
      <Styled.a href="#">Donec non enim</Styled.a> in turpis pulvinar facilisis. Ut felis.
    </Styled.p>
    <Styled.h2>Header Level 2</Styled.h2>
    <Styled.ol>
      <Styled.li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Styled.li>
      <Styled.li>Aliquam tincidunt mauris eu risus.</Styled.li>
    </Styled.ol>
    <Styled.blockquote>
      <Styled.p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a
        est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est
        malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
      </Styled.p>
    </Styled.blockquote>
    <Styled.h3>Header Level 3</Styled.h3>
    <Styled.ul>
      <Styled.li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</Styled.li>
      <Styled.li>Aliquam tincidunt mauris eu risus.</Styled.li>
    </Styled.ul>
  </>
)
