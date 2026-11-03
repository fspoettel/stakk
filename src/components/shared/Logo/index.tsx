import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlbumCollection } from '@stakk/components/shared/icons/regular';

import css from './Logo.module.css';

type LogoProps = {
  hideTitle?: boolean;
};

function Logo({ hideTitle }: LogoProps) {
  return (
    <>
      <FontAwesomeIcon className={css['logo']} transform="rotate-180" icon={faAlbumCollection} />
      {!hideTitle && 'stakk'}
    </>
  );
}

export default Logo;
