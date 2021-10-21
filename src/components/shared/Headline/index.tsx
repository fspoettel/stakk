import React from 'react';
import cx from 'classnames';
import css from './Headline.module.css';

type HeadlineProps = {
  children: React.ReactNode,
  size?: 'xs'|'sm'|'md'|'lg',
  tag?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',
  variant?: string
};

function Headline({ children, size, tag, variant }: HeadlineProps) {
  const headlineSize = size ?? 'md';

  const Tag = tag || 'h1';

  return (
    <Tag
      className={cx([
        css['headline'],
        css[headlineSize],
        { [css[variant ?? '']]: variant }
      ])}
    >
      {children}
    </Tag>
  );
}

export default Headline;
