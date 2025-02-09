/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`{
    allContentfulBlogPost {
      nodes {
        slug
      }
    }
  }`);
  result.data.allContentfulBlogPost.nodes.forEach((post) => {
    createPage({
      path: `/blog/${post.slug}/`,
      component: require.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.slug,
      },
    });
  });
};