import { Dispatch } from 'react';
import { DragState } from '@stakk/types/DragState';
import { HiddenState } from '@stakk/types/HiddenState';
import {
  ClearAction,
  DragStateAction,
  NextAction,
  PrevAction,
  ReinitAction,
  ResetAction,
  StopPlaybackAction,
  ToAction,
  TogglePlaybackAction,
  TrackProgressAction
} from './reducer';
import { Stack } from '@stakk/types/Stack';

export function reinit(dispatch: Dispatch<ReinitAction>, data: Stack, hideInitialAnimation: boolean) {
  dispatch({ type: 'reinit', data, hideInitialAnimation });
}

type NextPayload = {
  activeIndex: number,
  item?: HiddenState,
};

export function next(
  dispatch: Dispatch<NextAction>,
  { activeIndex, item }: NextPayload) {
  dispatch({
    type: 'stackNext',
    item: item?.direction ? item : { index: activeIndex, direction: 1 },
  });
}

export function prev(dispatch: Dispatch<PrevAction>) {
  dispatch({ type: 'stackPrev' });
}

type ResetPayload = {
  data: Stack,
  playbackIndex?: number,
};

export function reset(
  dispatch: Dispatch<ResetAction|ToAction|ClearAction>,
  { data, playbackIndex }: ResetPayload
) {
  if (playbackIndex != null) {
    dispatch({ type: 'stackTo', index: playbackIndex });
  } else {
    dispatch({ type: 'stackClear' });

    setTimeout(() => {
      dispatch({ type: 'reset', data });
    }, 200);
  }
}

export function setDragState(
  dispatch: Dispatch<DragStateAction>,
  { dragState }: { dragState: DragState }
) {
  dispatch({ type: 'stackDragState', dragState });
}

export function togglePlayback(dispatch: Dispatch<TogglePlaybackAction>) {
  dispatch({ type: 'togglePlayback' });
}

export function stopPlayback(dispatch: Dispatch<StopPlaybackAction>) {
  dispatch({ type: 'stopPlayback' });
}

export function setTrackProgress(
  dispatch: Dispatch<TrackProgressAction>,
  { progress }: { progress: number }
) {
  dispatch({ type: 'playbackProgress', progress });
}
