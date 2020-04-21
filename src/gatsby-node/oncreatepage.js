const { urlResolve } = require(`gatsby-core-utils`)
const withDefaults = require(`../../utils/default-options`)
const { replacePath } = require(`./methods`)

exports.onCreatePage = async ({ page, actions }, themeOptions) => {
  const { basePath } = withDefaults(themeOptions)
  const { createPage, deletePage } = actions

  if (page.path.includes('404')) return
  deletePage(page)

  const thePath = urlResolve(replacePath(basePath), replacePath(page.path))

  return createPage({
    ...page,
    path: thePath,
    context: {
      thePath: thePath,
      basePath: basePath,
      ...page.context,
    },
  })
}
