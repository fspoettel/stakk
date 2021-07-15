import Link from 'next/link';
import css from '../../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <nav className={css['footer-nav']}>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
