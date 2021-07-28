import React, { MouseEventHandler } from 'react';
import cx from 'classnames';
import { faGripVertical, faPencil, faTrash } from '@fortawesome/pro-solid-svg-icons';

import css from './EditorItems.module.css';

import { RenderProps } from '../SortableList/interfaces';
import ButtonGroup from '../ButtonGroup';
import ButtonWithTooltip from '../ButtonWithTooltip';
import Button from '../Button';

type EditorItemProps = {
  onItemDelete: MouseEventHandler;
  onItemEdit: MouseEventHandler;
} & RenderProps;

function EditorItem({ item, dragging, listeners, onItemDelete, onItemEdit }: EditorItemProps) {
  if (!item || typeof item.title === undefined) return null;

  return (
    <div
      className={cx([
        css['editoritem'],
        { [css.dragging]: dragging }
      ])}
      key={item.id}
    >
        <Button
          className={css['editoritem-handle']}
          {...(listeners ?? {})}
          size='sm'
          icon={faGripVertical}
        />
      <span>{typeof item.title === 'string' ? item.title : item.id}</span>
      <ButtonGroup className={css['editoritem-actions']}>
      <ButtonWithTooltip
        data-id={item.id}
        icon={faPencil}
        onClick={onItemEdit}
        size='sm'
        tooltip='edit item'
        />
        <ButtonWithTooltip
          data-id={item.id}
          icon={faTrash}
          onClick={onItemDelete}
          size='sm'
          tooltip='delete item'
        />
      </ButtonGroup>
    </div>
  );
}

export default React.memo(EditorItem);