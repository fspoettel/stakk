import cx from 'classnames';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from './Button.module.css';

export type ButtonProps = {
  children?: React.ReactNode,
  href?: string,
  icon?: IconProp,
  popperRef?: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  size?: 'sm'|'md'|'lg',
  variant?: string,
} & React.ComponentPropsWithoutRef<'button'> & React.ComponentPropsWithoutRef<'a'>;

function Button({
  children,
  className,
  href,
  icon,
  popperRef,
  size,
  variant,
  ...rest
}: ButtonProps) {
  const Tag = href ? 'a' : 'button';

  const cssVariant = (icon && !children)
    ? 'icon'
    : variant ?? '';

  return (
    <Tag
      {...rest}
      href={href}
      className={cx([
        css.button,
        css[size ?? 'md'],
        { [css[cssVariant]]: cssVariant !== '' },
        { [className ?? '']: className }
      ])}
      ref={popperRef}
      type={Tag === 'button' ? (rest.type ?? 'button') : undefined}
    >
      {icon && (
        <FontAwesomeIcon
          className={css['button-icon']}
          icon={icon}
        />
      )}
      {children && (
        <span className={css['button-content']}>{children}</span>
      )}
    </Tag>
  );
}

export default Button;
