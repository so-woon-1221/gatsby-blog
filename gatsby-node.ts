import { CreatePageArgs } from 'gatsby';
import path from 'path';

export const createPages = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: any;
  actions: CreatePageArgs['actions'];
  reporter: CreatePageArgs['reporter'];
}) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            contentful_id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const posts = result.data.allContentfulBlogPost.edges;
  const blogList = path.resolve(`src/templates/post-list.tsx`);
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      // path: i === 0 ? `/` : `/=${i}`,
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ node }: any) => {
    createPage({
      path: `/post/${node.slug}`,
      component: path.resolve(`src/templates/post-page.tsx`),
      context: {
        id: node.contentful_id,
      },
    });
  });

  const categoryList = await graphql(`
    query {
      allContentfulBlogPost {
        group(field: { category: SELECT }) {
          fieldValue
          count: totalCount
        }
      }
    }
  `);

  if (categoryList.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const categories = categoryList.data.allContentfulBlogPost.group;
  const categoryTemplate = path.resolve(`src/templates/category.tsx`);
  const categoryPostsPerPage = 10;
  const categoryNumPages = Math.ceil(categories.length / categoryPostsPerPage);
  categories.forEach((category: any) => {
    Array.from({ length: categoryNumPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/category/${category.fieldValue}`
            : `/category/${category.fieldValue}/page/${i + 1}`,
        component: categoryTemplate,
        context: {
          category: category.fieldValue,
          limit: categoryPostsPerPage,
          skip: i * categoryPostsPerPage,
          numPages: categoryNumPages,
          currentPage: i + 1,
          count: category.count,
        },
      });
    });
  });
};
