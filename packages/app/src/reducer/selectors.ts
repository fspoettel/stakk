import { StackItem } from '@stakk/types/StackItem';
import exceedsDragThreshold from '../components/Stack/helpers/exceedsDragThreshold';
import { StackState } from './getInitialState';

export function getActiveIndex(state: StackState): number {
  return state.stack.activeIndex;
}

export function getPlaybackIndex(state: StackState): number|undefined {
  return state.playback.index;
}

export function getIsLoading(state: StackState): boolean {
  return state.loading;
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

export function getPlaybackProgress(state: StackState): number {
  return state.playback.progress ?? 0;
}

export function getHasPlayer(state: StackState): boolean {
  return state.items
    .some(
      item => item.links && item.links.some(l => typeof l === 'string' && l.includes('mixcloud'))
    );
}