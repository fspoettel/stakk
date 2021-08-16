import React, { MouseEventHandler, useCallback, useState } from 'react';
import { Stack } from '@stakk/types/Stack';
import Modal from '@stakk/components/Modal';
import ModalPortal from '@stakk/components/ModalPortal';

import css from './LoadStackModal.module.css';

type LoadStackModalProps = {
  open?: boolean,
  onClose: MouseEventHandler,
  onConfirmLoad: (value: Stack) => void,
};

function LoadStackModal({ open, onConfirmLoad, onClose }: LoadStackModalProps) {
  const [value, setValue] = useState('');

  const load = useCallback(() => {
    try {
      // TODO: add type check here
      const parsed: Stack = JSON.parse(value);
      onConfirmLoad(parsed);
      setValue('');
    } catch (err) {
      console.warn('not a stack');
    }
  }, [value, onConfirmLoad]);

  return (
    <ModalPortal>
      <Modal
        title='Load Stack'
        open={open}
        onClose={onClose}
        onConfirm={load}
      >
        <textarea
          className={css['loadstackinput']}
          onChange={evt => setValue(evt.target.value)}
          value={value}
        ></textarea>
      </Modal>
    </ModalPortal>
  );
}

export default LoadStackModal;
