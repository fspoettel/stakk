import React, { ReactNode, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import SortableItem from './SortableItem';
import { RenderProps, SortableItemData, SortCallback } from './interfaces';

type SortableListProps<T> = {
  children: (props: RenderProps<T>) => ReactNode;
  items: SortableItemData<T>[];
  onSort: SortCallback;
};

function SortableList<T>({ items, onSort, children }: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (active.id !== over?.id) onSort(event);
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} item={item} renderItem={children} />
        ))}
      </SortableContext>
      <DragOverlay modifiers={[restrictToParentElement]}>
        {activeId && activeItem
          ? children({
              item: activeItem,
              dragging: true,
            })
          : null}
      </DragOverlay>
    </DndContext>
  );
}

export default SortableList;
