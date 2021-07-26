import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RenderProps, SortableItemData } from './interfaces';

type SortableItemProps = {
  item: SortableItemData;
  renderItem: (props: RenderProps) => ReactNode;
}

function SortableItem({ item, renderItem }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform) ?? undefined,
    transition: transition ?? undefined,
    zIndex: transform ? 999 : undefined
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      {renderItem({ item, listeners })}
    </div>
  );
}

export default SortableItem;
