import { Badge } from '@mantine/core';
import { graphql, Link, PageProps, HeadFC, navigate } from 'gatsby';
import React, { ComponentType, useMemo } from 'react';
import Layout from '../components/Layout';

interface Props extends PageProps {
  data: {
    allContentfulBlogPost: {
      edges: {
        node: {
          id: string;
          title: string;
          date: string;
          description: string;
          category: string[];
          slug: string;
        };
      }[];
    };
  };
  pageContext: {
    skip: number;
    limit: number;
    numPages: number;
    currentPage: number;
    category: string;
    count: number;
  };
}

const PostList: ComponentType<Props> = ({ data, pageContext }) => {
  const posts = useMemo(() => {
    return data.allContentfulBlogPost.edges.map((edge) => {
      return edge.node;
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-y-8">
        <h1 className="flex items-center text-3xl font-bold gap-x-2">
          <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-600">
            # {pageContext.category}
          </span>
          <span>관련글</span>
          <Badge size="xl">{pageContext.count}</Badge>
        </h1>
        <div className="flex flex-col">
          {posts.map((post, index) => (
            <div
              //   to={`/post/${post.slug}`}
              key={`post-${index}`}
              className={`flex cursor-pointer flex-col gap-y-3 rounded py-8 ${
                index != posts.length - 1 ? 'border-b' : ''
              }`}
              onClick={() => {
                navigate(`/post/${post.slug}`);
              }}
            >
              <span className="text-2xl font-bold transition-all">
                {post.title}
              </span>

              {post.category.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-x-2">
                    {post.category.map((category, index2) => {
                      return (
                        <Link
                          to={`/category/${category}`}
                          key={`post-${index}-category-${index2}`}
                          className="rounded bg-zinc-100 px-2 py-1 text-sm transition-all hover:bg-zinc-200 active:scale-[0.95] dark:bg-zinc-600 dark:hover:bg-zinc-500"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          # {category}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <span className={'text-sm text-slate-600 dark:text-slate-400'}>
                {post.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($skip: Int!, $category: String) {
    allContentfulBlogPost(
      limit: 10
      sort: { fields: date, order: DESC }
      skip: $skip
      filter: { category: { in: [$category] } }
    ) {
      edges {
        node {
          id
          title
          date(formatString: "YYYY-MM-DD")
          description
          category
          slug
        }
      }
    }
  }
`;

export const Head: HeadFC<Props> = ({ pageContext }: any) => {
  return <title>{pageContext.category} | Sowoon's Space</title>;
};

export default PostList;
