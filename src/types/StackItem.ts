import { Tracklist } from './Tracklist';

export type StackItem = {
  id: string,
  slug: string,
  index: number,
  title: string,
  src: string,
  genres: string[],
  mixcloudId?: string,
  spotifyId?: string,
  tracklist: Tracklist,
  createdAt: number|string
};
