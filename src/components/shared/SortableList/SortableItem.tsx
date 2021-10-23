import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RenderProps, SortableItemData } from './interfaces';

type SortableItemProps<T> = {
  item: SortableItemData<T>;
  renderItem: (props: RenderProps<T>) => ReactNode;
};

function SortableItem<T>({ item, renderItem }: SortableItemProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform) ?? undefined,
    transition: transition ?? undefined,
    zIndex: transform ? 999 : undefined,
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      {renderItem({ item, listeners })}
    </div>
  );
}

export default SortableItem;
