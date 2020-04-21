const withDefaults = require(`./utils/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)

  return {
    plugins: [
      options.mdx && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [{ resolve: `gatsby-remark-copy-linked-files` }],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.postsPath || `content/posts/entries`,
          name: options.postsPath || `content/posts/entries`,
        },
      },
      options.postImagesPath && {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.postImagesPath || `content/posts/images`,
          name: options.postImagesPath || `content/posts/images`,
        },
      },
      options.wallpapersPath && {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.wallpapersPath || `content/posts/wallpapers`,
          name: options.wallpapersPath || `content/posts/wallpapers`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `content/pages/wallpapers`,
          name: `content/pages/wallpapers`,
        },
      },
      options.pagesPath && {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: options.pagesPath || `content/pages`,
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-robots-txt`,
      options.feeds && {
        resolve: `gatsby-plugin-feed`,
        options: { feeds: [options.feeds] },
      },
      options.sitemap && {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          exclude: options.sitemap,
        },
      },
      options.tagmanager && {
        resolve: `gatsby-plugin-google-tagmanager`,
        options: {
          id: options.tagmanager,
          includeInDevelopment: false,
        },
      },
      options.manifest && {
        resolve: `gatsby-plugin-manifest`,
        options: options.manifest,
      },
      `gatsby-plugin-offline`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-theme-ui`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
    ].filter(Boolean),
  }
}
