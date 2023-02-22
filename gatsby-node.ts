import { CreatePageArgs } from 'gatsby';
import path from 'path';

/**
 * GraphQL 쿼리를 통해 페이지를 동적으로 생성합니다.
 */
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

  // 모든 Post를 가져옴.
  const allPosts = await graphql(`
    query {
      allContentfulBlogPost(sort: { date: DESC }) {
        edges {
          node {
            contentful_id
            slug
          }
        }
      }
    }
  `);

  // 에러가 발생하면 빌드를 중단.
  if (allPosts.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const posts = allPosts.data.allContentfulBlogPost.edges;
  const postList = path.resolve(`src/templates/post-list.tsx`);
  const postPage = path.resolve(`src/templates/post-page.tsx`);
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: postList,
      // 각종 정보를 context에 담아서 전달.
      // pageContext는 페이지 컴포넌트에서 props로 받을 수 있음.
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(
    ({ node }: { node: { slug: string; contentful_id: string } }) => {
      createPage({
        path: `/post/${node.slug}`,
        component: postPage,
        context: {
          id: node.contentful_id,
        },
      });
    },
  );

  const categoryList = await graphql(`
    query {
      allContentfulBlogPost {
        group(field: { category: SELECT }) {
          category: fieldValue
          count: totalCount
        }
      }
    }
  `);

  if (categoryList.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const categories = (
    categoryList.data.allContentfulBlogPost.group as {
      category: string;
      count: number;
    }[]
  ).sort((a, b) => b.count - a.count);
  const categoryTemplate = path.resolve(`src/templates/category.tsx`);
  const categoryPostsPerPage = 10;
  const categoryNumPages = Math.ceil(categories.length / categoryPostsPerPage);
  categories.forEach((category) => {
    Array.from({ length: categoryNumPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/category/${category.category}`
            : `/category/${category.category}/page/${i + 1}`,
        component: categoryTemplate,
        context: {
          category: category.category,
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
