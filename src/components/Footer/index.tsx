import Link from 'next/link';
import css from './Footer.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
      <span>&copy; {new Date().getUTCFullYear()}</span>
      <nav className={css['footer-nav']}>
        <Link href='/about'>
          <a target="_blank">About</a>
        </Link>
        <Link href='/privacy'>
          <a target="_blank">Privacy</a>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
