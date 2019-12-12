module.exports = themeOptions => {
  const recipesPath = themeOptions.recipesPath || null
  const recipesImagesPath = themeOptions.recipesImagesPath || null
  const recipeFolders = (themeOptions.recipesPath && [`content/recipes/images`, `content/recipes`]) || []

  return {
    basePath: themeOptions.basePath || `/`,
    postsPath: themeOptions.postsPath || `content/posts`,
    postImagesPath: themeOptions.postImagesPath || `content/posts/images`,
    recipesPath,
    recipesImagesPath,
    iconsPath: themeOptions.iconsPath || `content/icons`,
    wallpapersPath: themeOptions.wallpapersPath || `content/wallpapers`,
    pagesPath: themeOptions.pagesPath || `content/pages`,
    tagsPath: themeOptions.tagsPath || `tags`,
    do_not_count_type_for_pagination: themeOptions.do_not_count_type_for_pagination || [],
    do_not_include_type_in_lists: themeOptions.do_not_include_type_in_lists || [],
    do_not_create_tag_page_for: themeOptions.do_not_create_tag_page_for || [],
    mdx: themeOptions.mdx || true,
    postsPerPage: themeOptions.postsPerPage || 50,
    folders_to_check: themeOptions.folders_to_check || [
      'content/posts',
      'content/posts/images',
      'content/icons',
      'content/wallpapers',
      'content/pages',
      ...recipeFolders,
    ],

    manifest: themeOptions.manifest,
    sitemap: themeOptions.sitemap,
    feeds: themeOptions.feeds,
    tagmanager: themeOptions.tagmanager,
  }
}
