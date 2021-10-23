import { ChangeEventHandler, KeyboardEventHandler, ReactNode } from 'react';
import cx from 'classnames';

import css from './Form.module.css';

type FieldProps<T = string> = {
  children: (props: ChildrenProps<T>) => ReactNode;
  disabled?: boolean;
  hideLabel?: boolean;
  label: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  size?: 'sm';
  value?: T;
};

type ChildrenProps<T> = Omit<FieldProps<T>, 'children' | 'label' | 'size' | 'hideLabel'>;

function Field<T>({
  children,
  disabled,
  hideLabel,
  label,
  name,
  onChange,
  onKeyDown,
  placeholder,
  required,
  size,
  value,
}: FieldProps<T>) {
  return (
    <div className={cx([css['field'], { [css[size ?? '']]: !!size }])}>
      <label className={cx([{ [css['hidden']]: hideLabel }])} htmlFor={name}>
        {label}
        {required && '*'}
      </label>

      {children({
        disabled,
        name,
        onChange,
        onKeyDown,
        placeholder,
        required,
        value,
      })}
    </div>
  );
}

export default Field;
