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
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement
} from '@dnd-kit/modifiers';
import SortableItem from './SortableItem';
import { RenderProps, SortableItemData, SortCallback } from './interfaces';

type SortableListProps = {
  children: (props: RenderProps) => ReactNode;
  items: SortableItemData[];
  onSort: SortCallback;
}

function SortableList({ items, onSort, children }: SortableListProps) {
  const [activeId, setActiveId] = useState<string|null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (active.id !== over?.id) onSort(event);
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(item => (
          <SortableItem
            key={item.id}
            item={item}
            renderItem={children}
          />
        ))}
      </SortableContext>
      <DragOverlay modifiers={[restrictToParentElement]}>
        {activeId ? children({
          item: items.find(item => item.id === activeId),
          dragging: true,
        }) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default SortableList;
