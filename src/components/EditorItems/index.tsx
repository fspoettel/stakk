import { MouseEventHandler } from 'react';
import { StackItem } from '@stakk/types/StackItem';

import css from './EditorItems.module.css';
import SortableList from '../SortableList';
import { SortCallback } from '../SortableList/interfaces';
import EditorItem from './EditorItem';
import AddItem from './AddItem';

type EditorItemsProps = {
  items: StackItem[],
  onItemAdd: (item: StackItem) => void,
  onItemDelete: MouseEventHandler;
  onSort: SortCallback
};

function EditorItems({ items, onItemAdd, onItemDelete, onSort }: EditorItemsProps) {
  return (
    <div className={css['editoritems']}>
      <SortableList items={items} onSort={onSort}>
        {props => <EditorItem {...props} key={props.item?.id} onItemDelete={onItemDelete} />}
      </SortableList>
      <AddItem onItemAdd={onItemAdd} />
    </div>
  );
}

export default EditorItems;
