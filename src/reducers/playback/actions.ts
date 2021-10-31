import { Dispatch } from 'react';
import { TogglePlaybackAction, TrackProgressAction } from './reducer';

export function togglePlayback(dispatch: Dispatch<TogglePlaybackAction>, index: number) {
  dispatch({ type: 'togglePlayback', index });
}
export function setTrackProgress(
  dispatch: Dispatch<TrackProgressAction>,
  { progress }: { progress: number },
) {
  dispatch({ type: 'playbackProgress', progress });
}
