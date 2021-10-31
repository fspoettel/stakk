import { EditorState } from './getInitialState';

export function getStack(state: EditorState) {
  return state.stack;
}

export function getStackLoaderOpen(state: EditorState) {
  return state.stackLoaderOpen;
}

export function getIsEditingItem(state: EditorState, id: string) {
  return state.editingIds.includes(id);
}
