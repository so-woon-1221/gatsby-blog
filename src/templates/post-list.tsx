import { Badge } from '@mantine/core';
import { graphql, Link, PageProps, HeadFC, navigate } from 'gatsby';
import React, { ComponentType, useMemo } from 'react';
import Layout from '../components/Layout';

interface Props extends PageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            title: string;
            date: string;
            description: string;
            category: string[];
            slug: string;
          };
        };
      }[];
    };
    categories: {
      group: {
        fieldValue: string;
        totalCount: number;
      }[];
    };
  };
  pageContext: {
    skip: number;
    limit: number;
    numPages: number;
    currentPage: number;
  };
}

const PostList: ComponentType<Props> = ({ data, pageContext }) => {
  const posts = useMemo(() => {
    return data.allMarkdownRemark.edges.map((edge) => {
      return edge.node.frontmatter;
    });
  }, []);

  const categoryList = useMemo(() => {
    return data.categories.group.map((d) => {
      return { category: d.fieldValue, count: d.totalCount };
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-y-8">
        <h1 className="py-1 text-3xl font-bold">게시글 목록</h1>
        <div className="grid gap-x-4 md:grid-cols-[600px,calc(100%-600px-1rem)]">
          <div className="flex flex-col">
            {posts.map((post, index) => (
              <div
                // to={`/post/${post.slug}`}
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
                            className="px-2 py-1 text-sm transition-all rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-500 active:scale-[0.95]"
                            onClick={(e) => e.stopPropagation()}
                            // onClick={() => {
                            //   navigate(`/search?category=${category}`);
                            // }}
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

          {categoryList.length > 0 && (
            <div className="sticy top-[75px] hidden md:flex h-fit w-full flex-col gap-y-3 py-8">
              <h3 className="font-bold">태그 리스트</h3>
              <div className="flex flex-col gap-y-1">
                {categoryList.map((category, index) => (
                  <Link
                    to={`/category/${category.category}`}
                    key={`category-${index}`}
                  >
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>{category.category}</span>
                      <Badge>{category.count}</Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($skip: Int!) {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            description
            category
            slug
          }
        }
      }
    }
    categories: allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head: HeadFC = () => {
  return <title>Sowoon's Space</title>;
};

export default PostList;
