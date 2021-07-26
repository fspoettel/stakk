import { ReactNode } from 'react';
import Head from 'next/head';

import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import css from './PageLayout.module.css';

type PageLayoutProps = {
  children: ReactNode,
  title: string,
};

function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className={css['page']}>
      <Head>
        <title>stakk &middot; {title}</title>
      </Head>
      <PageHeader />
      <main className={css['page-content']}>
        {children}
      </main>
      <PageFooter />
    </div>
  );
}

export default PageLayout;
