import { useSiteMetaData } from '../hooks/useSiteMetaData';
import React from 'react';

export const SEO = ({
  title,
  description,
  keywords,
  children,
}: {
  title?: string;
  description?: string;
  keywords: string[];
  children?: React.ReactNode;
}) => {
  const {
    title: defalutTitle,
    description: defaultDescription,
    author: defaultAuthor,
    siteUrl,
  } = useSiteMetaData();

  const seo = {
    title: title || defalutTitle,
    description: description || defaultDescription,
    author: defaultAuthor,
    keywords: keywords.join(','),
    url: siteUrl,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      <meta name="keywords" content={seo.keywords} />
      <meta lang="ko" />
    </>
  );
};
