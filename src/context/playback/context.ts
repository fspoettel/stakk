import { createContext, Dispatch } from 'react';
import { AnyAction } from './reducer';
import getInitialState, { PlaybackState } from './getInitialState';

type ContextState = {
  state: PlaybackState;
  dispatch: Dispatch<AnyAction>;
};

export const PlaybackContext = createContext<ContextState>({
  state: getInitialState(),
  dispatch: () => console.warn('no playback context provided'),
});
