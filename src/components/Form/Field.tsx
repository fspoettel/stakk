import { FormEventHandler, ReactNode } from 'react';

import css from './Form.module.css';

type FieldProps = {
  children: (props: ChildrenProps) => ReactNode;
  name: string;
  label: string;
  onChange: FormEventHandler<HTMLInputElement>;
  required: boolean;
  value: string;
};

type ChildrenProps = Omit<FieldProps, 'children'|'label'>;

function Field({
  children,
  name,
  label,
  onChange,
  required,
  value
}: FieldProps) {
  return (
    <div className={css['field']}>
      <label htmlFor={name}>{label}{required && '*'}</label>
      {children({ name, required, onChange, value })}
    </div>
  );
}

export default Field;
