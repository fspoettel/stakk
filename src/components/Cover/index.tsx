import React from 'react';
import cx from 'classnames';

import css from '../../styles/Cover.module.css';

type CoverProps = {
  children?: React.ReactNode,
  playing: boolean,
  src: string,
  title: string,
};

function Cover({
  children,
  playing,
  src,
  title,
}: CoverProps) {
  return (
    <figure
      className={cx([
        css.cover,
        { [css['playing']]: playing }
      ])}
    >
      <div className={css['cover-media']}>
        <img
          className={css['cover-media-image']}
          src={src}
          alt={`cover for ${title}`}
        />
      </div>
      {children && (
        <figcaption className={css['cover-media-caption']}>{children}</figcaption>
      )}
    </figure>
  );
}

export default React.memo(Cover);
