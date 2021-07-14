import React from 'react';
import cx from 'classnames';

import css from '../../styles/Cover.module.css';

type CoverProps = {
  children?: React.ReactNode,
  playing: boolean,
  src: string,
  title: string,
};

interface CoverStyle extends React.CSSProperties {
  '--cover': string;
}

function Cover({
  children,
  playing,
  src,
}: CoverProps) {
  const style: CoverStyle = {
    '--cover': `url(${src})`,
  };

  return (
    <figure
      className={cx([
        css.cover,
        { [css['playing']]: playing }
      ])}
    >
      <div
        className={css['cover-media']}
        style={style}
      />
      {children && (
        <figcaption className={css['cover-media-caption']}>{children}</figcaption>
      )}
    </figure>
  );
}

export default React.memo(Cover);
