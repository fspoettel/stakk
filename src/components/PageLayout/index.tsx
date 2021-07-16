import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

import Logo from '../Logo';
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
      <header className={css['page-header']}>
        <h1 className={css['page-title']}>
          <Link href='/'>
            <a><Logo /></a>
          </Link>
        </h1>
      </header>
      {children}
    </div>
  );
}

export default PageLayout;
