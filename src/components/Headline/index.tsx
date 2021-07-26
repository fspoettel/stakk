import React from 'react';
import cx from 'classnames';
import css from './Headline.module.css';

type HeadlineProps = {
  children: React.ReactNode,
  size?: 'sm'|'md'|'lg',
  tag?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',
};

function Headline({ children, size, tag }: HeadlineProps) {
  const headlineSize = size ?? 'md';

  const Tag = tag || 'h1';

  return (
    <Tag
      className={cx([css['headline'], css[headlineSize]])}
    >
      {children}
    </Tag>
  );
}

export default Headline;
