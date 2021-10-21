import { DragEndEvent, DraggableSyntheticListeners } from '@dnd-kit/core';

export type SortableItemData = { id: string } & Record<string, unknown>;

export interface RenderProps {
  item?: SortableItemData;
  dragging?: boolean;
  listeners?: DraggableSyntheticListeners
}

export type SortCallback = (event: DragEndEvent) => void;
