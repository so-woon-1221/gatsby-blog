import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/Layout';

const IndexPage: React.FC<PageProps> = () => {
  return <Layout>메인</Layout>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Sowoon's Space</title>;
