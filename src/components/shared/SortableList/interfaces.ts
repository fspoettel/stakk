import { DragEndEvent, DraggableSyntheticListeners } from '@dnd-kit/core';

export type SortableItemData<T> = { id: string } & T;

export interface RenderProps<T> {
  item: SortableItemData<T>;
  dragging?: boolean;
  listeners?: DraggableSyntheticListeners;
}

export type SortCallback = (event: DragEndEvent) => void;
