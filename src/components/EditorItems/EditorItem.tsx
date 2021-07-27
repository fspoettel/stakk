import React, { MouseEventHandler } from 'react';
import cx from 'classnames';
import { faGripVertical, faTrash } from '@fortawesome/pro-solid-svg-icons';

import css from './EditorItems.module.css';

import { RenderProps } from '../SortableList/interfaces';
import ButtonGroup from '../ButtonGroup';
import ButtonWithTooltip from '../ButtonWithTooltip';
import Button from '../Button';

type EditorItemProps = { onItemDelete: MouseEventHandler } & RenderProps;

function EditorItem({ item, dragging, listeners, onItemDelete }: EditorItemProps) {
  if (!item || typeof item.title === undefined) return null;

  console.log('rendering');

  return (
    <div
      className={cx([
        css['editoritem'],
        { [css.dragging]: dragging }
      ])}
      key={item.id}
    >
      <span>{typeof item.title === 'string' ? item.title : item.id}</span>
      <ButtonGroup className={css['editoritem-actions']}>
        <ButtonWithTooltip
          data-id={item.id}
          icon={faTrash}
          onClick={onItemDelete}
          tooltip='delete item'
        />
        <Button
          className={css['editoritem-handle']}
          {...(listeners ?? {})}
          icon={faGripVertical}
        />
      </ButtonGroup>
    </div>
  );
}

export default React.memo(EditorItem);