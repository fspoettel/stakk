import { createContext, Dispatch } from 'react';
import { AnyAction } from './reducer';
import getInitialState, { EditorState } from './getInitialState';

type ContextState = {
  state: EditorState;
  dispatch: Dispatch<AnyAction>;
};

export const EditorContext = createContext<ContextState>({
  state: getInitialState(),
  dispatch: (val) => console.warn('no editor context provided'),
});
