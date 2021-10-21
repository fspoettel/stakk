
import { ReactNode } from 'react';
import Headline from '@stakk/components/shared/Headline';

import css from './ContentBlock.module.css';

type ContentBlockProps = {
  children: ReactNode,
  title: string,
  titleTag?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',
  titleSize?: 'sm'|'md'|'lg'
};

function ContentBlock({
  children,
  title,
  titleSize,
  titleTag,
}: ContentBlockProps) {
  return (
    <section className={css['block']}>
      <header className={css['block-header']}>
        <Headline tag={titleTag} size={titleSize}>{title}</Headline>
      </header>
      <div className={css['block-content']}>
        {children}
      </div>
    </section>
  );
}

export default ContentBlock;
