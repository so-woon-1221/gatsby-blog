import * as React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../../components/Layout';

interface Props extends PageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
        description: string;
        category: string[];
      };
      html: string;
    };
  };
}

const PostPage: React.ComponentType<Props> = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <article className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-4xl font-bold md:text-5xl">
            {frontmatter.title}
          </h1>
          <div className="flex gap-x-2">
            {frontmatter.category.map((category, index) => (
              <Link
                to={`/search?category=${category}`}
                key={`category-${index}`}
              >
                <span
                  key={category}
                  className={
                    'cursor-pointer rounded py-2 px-2 text-sm text-slate-600 hover:bg-zinc-100 dark:text-slate-400 dark:hover:bg-zinc-600'
                  }
                >{`#${category}`}</span>
              </Link>
            ))}
          </div>
          <span className={'text-sm text-slate-600 dark:text-slate-400'}>
            {frontmatter.date}
          </span>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`prose max-w-none prose-p:my-0.5 prose-code:rounded prose-code:bg-zinc-100 prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] dark:prose-code:bg-zinc-700`}
        />
      </article>
    </Layout>
  );
};

export const Head: HeadFC<Props> = ({ data }: { data: any }) => {
  return <title>{data.markdownRemark.frontmatter.title}</title>;
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        slug
        title
        description
        category
      }
    }
  }
`;

export default PostPage;
