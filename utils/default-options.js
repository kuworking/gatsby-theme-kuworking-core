module.exports = themeOptions => {
  return {
    postsPerPage: themeOptions.postsPerPage || 50,
    basePath: themeOptions.basePath || `/`,
    tagsPath: themeOptions.tagsPath,
    createTags: themeOptions.createTags,

    postsPath: themeOptions.postsPath,
    postImagesPath: themeOptions.postImagesPath,
    wallpapersPath: themeOptions.wallpapersPath,
    pagesPath: themeOptions.pagesPath,

    do_not_count_type_for_pagination: themeOptions.do_not_count_type_for_pagination || [],
    do_not_include_type_in_lists: themeOptions.do_not_include_type_in_lists || [],
    do_not_create_tag_page_for: themeOptions.do_not_create_tag_page_for || [],
    do_not_include_type_in_related_posts: themeOptions.do_not_include_type_in_related_posts || [],
    type_that_have_images: themeOptions.type_that_have_images || [],

    mdx: themeOptions.mdx,
    folders_to_check: themeOptions.folders_to_check,

    manifest: themeOptions.manifest,
    sitemap: themeOptions.sitemap,
    feeds: themeOptions.feeds,
    tagmanager: themeOptions.tagmanager,
  }
}
