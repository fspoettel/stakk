import { StackItem } from '@stakk/types/StackItem';
import exceedsDragThreshold from '@stakk/lib/exceedsDragThreshold';
import { StackState } from './getInitialState';

export function getItems(state: StackState): StackItem[] {
  return state.items;
}

export function getStackState(state: StackState) {
  return state.stack;
}

export function getActiveIndex(state: StackState): number {
  return state.stack.activeIndex;
}

export function getItemByIndex(state: StackState, index: number): StackItem {
  return state.items[index];
}

export function getActiveItem(state: StackState): StackItem {
  return getItemByIndex(state, getActiveIndex(state));
}

export function getIsFirstItem(state: StackState): boolean {
  return getActiveIndex(state) === state.items.length - 1;
}

export function getIsLastItem(state: StackState): boolean {
  return getActiveIndex(state) === 0;
}

function getExceedsDragThreshold(state: StackState): boolean {
  const dragState = state.stack.dragState;
  if (!dragState || !dragState.dragging) return false;
  return exceedsDragThreshold(dragState);
}

export function getActiveOrNextItem(state: StackState): StackItem {
  return getExceedsDragThreshold(state) && !getIsLastItem(state)
    ? getItemByIndex(state, getActiveIndex(state) - 1)
    : getActiveItem(state);
}

export function getSupportsPlayback(state: StackState): boolean {
  return state.items.some((item) => item.primaryUrl && item.primaryUrl.includes('mixcloud'));
}

export function getIsStatic(state: StackState): boolean {
  return state.items.length <= 1;
}
