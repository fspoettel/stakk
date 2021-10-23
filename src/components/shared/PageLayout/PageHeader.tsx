import Link from 'next/link';
import Logo from '@stakk/components/shared/Logo';

import css from './PageLayout.module.css';

function PageHeader() {
  return (
    <header className={css['page-header']}>
      <h1 className={css['page-title']}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </h1>
    </header>
  );
}

export default PageHeader;
