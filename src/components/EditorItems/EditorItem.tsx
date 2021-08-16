import React, { MouseEventHandler } from 'react';
import cx from 'classnames';
import { faGripVertical, faTrash } from '@fortawesome/pro-solid-svg-icons';

import { RenderProps } from '@stakk/components/SortableList/interfaces';
import ButtonGroup from '@stakk/components/ButtonGroup';
import ButtonWithTooltip from '@stakk/components/ButtonWithTooltip';
import Button from '@stakk/components/Button';

import css from './EditorItems.module.css';

type EditorItemProps = {
  onItemDelete: MouseEventHandler;
} & RenderProps;

function EditorItem({ item, dragging, listeners, onItemDelete }: EditorItemProps) {
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