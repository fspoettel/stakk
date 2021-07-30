import { StackItem } from '@stakk/types/StackItem';
import { makeRequest } from './apiClient';

async function fetchSpotifyPlaylist(url: string): Promise<StackItem> {
  return makeRequest<StackItem>('/spotify_playlist', { url });
}

export default fetchSpotifyPlaylist;
