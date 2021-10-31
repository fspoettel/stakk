import { createContext, Dispatch } from 'react';
import { AnyAction } from './reducer';
import getInitialState, { StackState } from './getInitialState';
import { Stack } from '@stakk/types/Stack';

type ContextState = {
  state: StackState;
  dispatch: Dispatch<AnyAction>;
};

export const StackContext = createContext<ContextState>({
  state: getInitialState({ sortOrder: [] } as unknown as Stack, false),
  dispatch: () => console.warn('no stack context provided'),
});
