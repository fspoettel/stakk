import React from 'react';
import cx from 'classnames';

import css from './ButtonGroup.module.css';

type ButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
};

function ButtonGroup({ children, className }: ButtonGroupProps) {
  return <div className={cx([css.buttongroup, { [className ?? '']: className }])}>{children}</div>;
}

export default ButtonGroup;
