import { ReactNode } from 'react';
import cx from 'classnames';
import Headline from '@stakk/components/shared/Headline';

import css from './Form.module.css';

type FieldGroupProps = {
  children: ReactNode;
  full?: boolean;
  title?: string;
};

function FieldGroup({ children, full, title }: FieldGroupProps) {
  return (
    <section className={cx(css['fieldgroup'], { [css['full']]: full })}>
      {title && (
        <header className={css['fieldgroup-header']}>
          <Headline tag="h4" size="sm">
            {title}
          </Headline>
        </header>
      )}
      <div className={css['fieldgroup-fields']}>{children}</div>
    </section>
  );
}

export default FieldGroup;
