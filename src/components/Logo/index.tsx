import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlbumCollection } from '@fortawesome/pro-regular-svg-icons';

import css from '../../styles/Logo.module.css';

function Logo() {
  return (
    <>
    <FontAwesomeIcon
      className={css['logo']}
      transform="rotate-180"
      icon={faAlbumCollection}
    />
      stakk
    </>
  );
}

export default Logo;
