import * as React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';
import Layout from '../components/Layout';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-135px-4rem)] w-full flex-1 flex-col items-center justify-center gap-y-6">
        <h1 className="text-3xl font-bold">찾을 수 없는 페이지입니다.</h1>
        <Link
          to="/"
          className="px-2 py-1 border rounded cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          홈으로
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>404 | Sowoon's Space</title>;
