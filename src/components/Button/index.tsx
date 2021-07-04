import cx from 'classnames';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import css from '../../styles/Button.module.css';

type ButtonProps = {
  children?: React.ReactNode,
  href?: string,
  icon?: IconProp,
  variant?: string,
} & React.ComponentPropsWithoutRef<'button'> & React.ComponentPropsWithoutRef<'a'>;

function Button({
  children,
  href,
  icon,
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
      className={cx([
        css.button,
        { [css[cssVariant]]: cssVariant != null }
      ])}
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
