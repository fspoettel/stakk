import { StackItem } from '@stakk/types/StackItem';

async function fetchSpotifyPlaylist(spotify_url: string): Promise<StackItem> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spotify_playlist`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ spotify_url }),
  });
  const item: StackItem = await res.json();
  return item;
}

export default fetchSpotifyPlaylist;
