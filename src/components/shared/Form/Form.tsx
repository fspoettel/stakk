import { FormEventHandler, ReactNode } from 'react';
import cx from 'classnames';
import Headline from '@stakk/components/shared/Headline';

import css from './Form.module.css';

type FormProps = {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  onSubmit?: FormEventHandler;
  title?: string;
};

function Form({ children, className, footer, onSubmit, title }: FormProps) {
  return (
    <form className={cx([css['form'], { [className ?? '']: className }])} onSubmit={onSubmit}>
      {title && (
        <header className={css['form-header']}>
          <Headline tag="h3" size="md">
            {title}
          </Headline>
        </header>
      )}
      {children}
      {footer && <footer className={css['form-footer']}>{footer}</footer>}
    </form>
  );
}

export default Form;
