import { ChangeEventHandler, ReactNode } from 'react';
import cx from 'classnames';

import css from './Form.module.css';

type FieldProps = {
  children: (props: ChildrenProps) => ReactNode;
  disabled?: boolean;
  hideLabel?: boolean,
  label: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  size?: 'small';
  value?: string;
};

type ChildrenProps = Omit<FieldProps, 'children'|'label'|'size'|'hideLabel'>;

function Field({
  children,
  disabled,
  hideLabel,
  label,
  name,
  onChange,
  placeholder,
  required,
  size,
  value
}: FieldProps) {
  return (
    <div className={cx([
      css['field'],
      { [css[size ?? '']]: !!size }
    ])}>

      <label
        className={cx([{ [css['hidden']]: hideLabel }])}
        htmlFor={name}
      >
        {label}{required && '*'}
      </label>

      {children({
        disabled,
        name,
        onChange,
        placeholder,
        required,
        value
      })}
    </div>
  );
}

export default Field;
