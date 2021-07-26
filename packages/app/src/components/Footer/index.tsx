import Link from 'next/link';
import css from './Footer.module.css';

type FooterProps = {
  isPlaying?: boolean,
};

function Footer({ isPlaying }: FooterProps) {
  const linkTarget = isPlaying ? '_blank' : undefined;
  return (
    <footer className={css.footer}>
      <span>&copy; {new Date().getUTCFullYear()}</span>
      <nav className={css['footer-nav']}>
        <Link href='/about'>
          <a target={linkTarget}>About</a>
        </Link>
        <Link href='/privacy'>
          <a target={linkTarget}>Privacy</a>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
