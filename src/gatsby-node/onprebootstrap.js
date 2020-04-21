const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const withDefaults = require(`../../utils/default-options`)
const Debug = require(`debug`)

const debug = Debug(`gatsby-theme-blog-core`)

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { folders_to_check } = withDefaults(themeOptions) // recipes are optional

  const dirs = folders_to_check.filter(el => el).map(el => path.join(program.directory, el))
  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}
