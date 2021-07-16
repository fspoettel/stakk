import Head from 'next/head';
import { faGhost } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from '../components/PageLayout/PageLayout.module.css';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className={css['page_error']}>
      <Head>
        <title>404 &middot; stakk not found</title>
      </Head>
      <div>
        <div className={css['page_error-icon']}>
          <FontAwesomeIcon icon={faGhost} size='3x' />
        </div>
        <h1 className={css['page_error-text']}>page not found</h1>
        <div className={css['page_error-footer']}>
          <Link href='/'>
            <a>Back</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
