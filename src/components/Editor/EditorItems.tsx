import { faPlus, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { MouseEventHandler } from 'react';
import { StackItem } from '../../types/StackItem';
import ButtonGroup from '../ButtonGroup';
import ButtonWithTooltip from '../ButtonWithTooltip';

import css from './EditorItems.module.css';

type EditorItemsProps = {
  items: StackItem[],
  onItemAdd: MouseEventHandler,
  onItemDelete: MouseEventHandler;
};

function EditorItems({ items, onItemAdd, onItemDelete }: EditorItemsProps) {
  return (
    <div className={css['editoritems']}>
      <ol className={css['editoritems-listing']}>
        {items.map((item) => (
          <li className={css['editoritems-item']} key={item.id}>
            <span>{item.title}</span>
            <ButtonGroup className={css['editoritems-item-actions']}>
              <ButtonWithTooltip
                data-id={item.id}
                icon={faTrash}
                onClick={onItemDelete}
                tooltip='delete item'
              />
            </ButtonGroup>
          </li>
        ))}
      </ol>
      <ButtonWithTooltip
        icon={faPlus}
        onClick={onItemAdd}
        tooltip='add item'
      />
    </div>
  );
}

export default EditorItems;
