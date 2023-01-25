import * as React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import { SEO } from '../components/seo';

interface Props extends PageProps {
  data: {
    contentfulBlogPost: {
      title: string;
      date: string;
      description: string;
      category: string[];
      post: {
        childMarkdownRemark: {
          html: string;
        };
      };
    };
  };
  pageContext: {
    contentful_id: string;
    slug: string;
  };
}

const PostPage: React.ComponentType<Props> = ({ data }) => {
  const { contentfulBlogPost } = data;
  const { title, date, description, category, post } = contentfulBlogPost;
  const html = post.childMarkdownRemark.html;

  return (
    <Layout>
      <article className="flex flex-col gap-y-12">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>

          <span className="w-full overflow-hidden text-sm text-slate-600 dark:text-slate-400 text-ellipsis whitespace-nowrap">
            {description}
          </span>

          <div className="flex gap-x-2">
            {category.map((category, index) => (
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
            {date}
          </span>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`prose max-w-none prose-p:my-0.5 prose-code:rounded prose-code:p-1 prose-code:before:content-[''] prose-code:after:content-[''] dark:prose-code:bg-zinc-700`}
        />
      </article>
    </Layout>
  );
};

export const Head: HeadFC<Props> = ({ data }: { data: any }) => {
  return (
    <SEO
      title={`${data.contentfulBlogPost.title} | Sowoon's Space`}
      keywords={data.contentfulBlogPost.category}
      description={data.contentfulBlogPost.description}
    />
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    contentfulBlogPost(contentful_id: { eq: $id }) {
      title
      date(formatString: "YYYY-MM-DD")
      description
      category
      post {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

export default PostPage;
