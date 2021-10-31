import { createContext, Dispatch } from 'react';
import { AnyAction } from './reducer';
import { EditorState } from './getInitialState';

type ContextState = {
  state?: EditorState,
  dispatch?: Dispatch<AnyAction>
};

export const EditorContext = createContext<ContextState>({});
