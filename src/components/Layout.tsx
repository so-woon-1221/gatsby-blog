import React, { ComponentType } from 'react';
import Footer from './common/Footer';
import Header from './common/Header';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

interface Props {
  children: React.ReactNode;
}

const Layout: ComponentType<Props> = ({ children }) => {
  return (
    <div className={'flex flex-col gap-y-8'}>
      <Header />
      <main
        className={
          'mx-auto min-h-[calc(100vh-135px-4rem)] w-full max-w-[768px] px-4 md:p-0'
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
