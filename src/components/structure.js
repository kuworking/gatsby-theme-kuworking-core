import React from 'react'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'
import { modes } from '../gatsby-plugin-theme-ui/index'
import { SEO, Switch } from 'gatsby-theme-kuworking-core'

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
      <Helmet defer={false}>
        <SEO
          type={type}
          blogGrid={blogGrid}
          blogPost={blogPost}
          blogPage={blogPage}
          config={config}
          seotext={seoText}
        />
      </Helmet>

      <Container maxWidth={maxWidth}>
        <Switch aria-label="Toggle color modes" modes={modes} useColorMode={useColorMode} />

        {(type === 'grid' && (
          <Grid>
            <h1>GRID</h1>
            <Lorem />
          </Grid>
        )) ||
          (type === 'mdx' && (
            <Post>
              <h1>POST</h1>
              <Lorem />
            </Post>
          )) ||
          ((type === 'page' || type === 'tool') && (
            <Page>
              <h1>PAGE</h1>
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
    <h1>HTML Ipsum Presents</h1>
    <p>
      <strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas.
      Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
      egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et
      sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet,
      wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac
      dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.
    </p>
    <h2>Header Level 2</h2>
    <ol>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
    </ol>
    <blockquote>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a
        est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est
        malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
      </p>
    </blockquote>
    <h3>Header Level 3</h3>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
    </ul>
  </>
)
