
import { ReactNode } from 'react';
import Headline from '../Headline';

import css from '../..//styles/ContentBlock.module.css';

type ContentBlockProps = {
  title: string,
  children: ReactNode,
};

function ContentBlock({
  children,
  title,
}: ContentBlockProps) {
  return (
    <section className={css['block']}>
      <header className={css['block-header']}>
        <Headline tag='h2'>{title}</Headline>
      </header>
      <div className={css['block-content']}>
        {children}
      </div>
    </section>
  );
}

export default ContentBlock;
