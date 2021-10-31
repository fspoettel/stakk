import { PlaybackState } from './getInitialState';

export function getPlaybackIndex(state: PlaybackState): number | undefined {
  return state.index;
}

export function getPlaybackProgress(state: PlaybackState): number {
  return state.progress;
}

export function getIsPlaying(state: PlaybackState): boolean {
  return state.index != null;
}
