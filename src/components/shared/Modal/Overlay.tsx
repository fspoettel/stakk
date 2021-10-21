import { MouseEventHandler, ReactNode, useEffect } from 'react';
import cx from 'classnames';

import css from './Modal.module.css';

type OverlayProps = {
  children: ReactNode,
  open?: boolean,
  onClose: MouseEventHandler
};

function Overlay({ children, onClose, open }: OverlayProps) {
  useEffect(() => {
    const body = document?.body;
    if (body) {
      if (open) body.classList.add('modal-open');
      else body.classList.remove('modal-open');
    }
  }, [open]);

  return (
    <div className={cx(css['overlay'], { [css.open]: open })}>
      {children}
      <div className={css['overlay-backdrop']} onClick={onClose} />
    </div>
  );
}

export default Overlay;
