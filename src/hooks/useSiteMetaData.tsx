import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetaData = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
