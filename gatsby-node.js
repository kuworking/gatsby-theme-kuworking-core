const { onCreatePage } = require(`./src/gatsby-node/oncreatepage`)
exports.onCreatePage = onCreatePage

const { onPreBootstrap } = require(`./src/gatsby-node/onprebootstrap`)
exports.onPreBootstrap = onPreBootstrap

const { onCreateNode } = require(`./src/gatsby-node/oncreatenode`)
exports.onCreateNode = onCreateNode

const { createPages } = require(`./src/gatsby-node/createpages`)
exports.createPages = createPages
