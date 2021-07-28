import { StackItem } from '@stakk/types/StackItem';
import React, { MouseEventHandler, useState } from 'react';
import Field from '../Form/Field';
import Modal from '../Modal';
import ModalPortal from '../ModalPortal';

type EditItemModalProps = {
  item?: StackItem,
  onClose: MouseEventHandler,
};

function EditItemModal({ item, onClose }: EditItemModalProps) {
  if (!item) return null;

  const id = item.id;

  return (
    <ModalPortal>
      <Modal
        confirmLabel='Save'
        title='Edit item'
        open
        onClose={onClose}
        onConfirm={() => {}}
      >
        <Field
          name={`${id}-title`}
          label='Title'
          value={item.title}
        >
          {props => <input readOnly type='text' {...props} />}
        </Field>
      </Modal>
    </ModalPortal>
  );
}

export default EditItemModal;
