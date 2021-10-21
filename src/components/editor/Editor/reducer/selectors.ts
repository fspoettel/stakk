import { EditorState } from './getInitialState';

export function getStack(state: EditorState) {
  return state.stack;
}

export function getStackLoaderOpen(state: EditorState) {
  return state.stackLoaderOpen;
}
