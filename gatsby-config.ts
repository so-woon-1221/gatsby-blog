import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Sowoon's Space`,
    siteUrl: `https://sowoon.xyz`,
    description: `Sowoon's Space | Sowoon's Blog
    제가 경험을 기록하는 공간입니다. 가볍게 봐주세요.`,
    author: `Sowoon`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'posts',
    //     path: './src/posts/',
    //   },
    // },
    'gatsby-plugin-postcss',
    'gatsby-plugin-mantine',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'lt5xz3qlcma2',
        accessToken: '0hkIXWClqzsJqQg0sn9ftYxid8KZ4cIBIwKJg9oWqDw',
      },
    },
  ],
};

export default config;
