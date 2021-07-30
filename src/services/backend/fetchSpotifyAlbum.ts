import { StackItem } from '@stakk/types/StackItem';
import { makeRequest } from './apiClient';

async function fetchSpotifyAlbum(url: string): Promise<StackItem> {
  return makeRequest<StackItem>('/spotify_album', { url });
}

export default fetchSpotifyAlbum;
