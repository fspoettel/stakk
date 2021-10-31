import { PlaybackState } from './getInitialState';

export type TrackProgressAction = {
  type: 'playbackProgress';
  progress: number;
};

export type TogglePlaybackAction = {
  type: 'togglePlayback';
  index: number;
};

export type AnyAction = TogglePlaybackAction | TrackProgressAction;

export default function reducer(state: PlaybackState, action: AnyAction): PlaybackState {
  switch (action.type) {
    case 'playbackProgress': {
      const { progress } = action;
      console.log(state);
      return { ...state, progress };
    }

    case 'togglePlayback': {
      const nextIndex = action.index === state.index ? undefined : action.index;
      return { index: nextIndex, progress: 0 };
    }
  }
}
