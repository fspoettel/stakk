import { MouseEventHandler, ReactNode } from 'react';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Headline from '../Headline';
import Overlay from './Overlay';

import css from './Modal.module.css';

type ModalProps = {
  children: ReactNode,
  open?: boolean,
  title: string,
  onConfirm: MouseEventHandler,
  onClose: MouseEventHandler
};

function Modal({ children, onClose, onConfirm, open, title }: ModalProps) {
  return (
    <Overlay open={open} onClose={onClose}>
      <article className={css['modal']}>
        <header className={css['modal-header']}>
          <Headline variant='bare' tag='h4'>{title}</Headline>
        </header>
        <div className={css['modal-content']}>
          {children}
        </div>
        <footer className={css['modal-footer']}>
          <ButtonGroup>
            <Button onClick={onConfirm}>Load</Button>
            <Button onClick={onClose} variant='secondary'>Cancel</Button>
          </ButtonGroup>
        </footer>
      </article>
    </Overlay>
  );
}

export default Modal;
