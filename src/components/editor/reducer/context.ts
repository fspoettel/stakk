import { createContext, Dispatch } from 'react';
import { AnyAction } from './reducer';
import { EditorState } from './getInitialState';

export const FormStateContext = createContext<undefined | EditorState>(undefined);
export const DispatchContext = createContext<undefined | Dispatch<AnyAction>>(undefined);
