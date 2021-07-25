import { ReactNode } from 'react';
import Headline from '../Headline';

import css from './Form.module.css';

type FormProps = {
  children: ReactNode;
  title: string;
};

function Form({ children, title }: FormProps) {
  return (
    <form className={css['form']}>
      <header className={css['form-header']}>
        <Headline tag='h3' size='md'>{title}</Headline>
      </header>
      {children}
    </form>
  );
}

export default Form;
