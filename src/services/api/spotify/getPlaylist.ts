import apiClient from './apiClient';
import { authTokenBearer } from './auth';

function parsePlaylistId(url: string): string {
  const id = url.split('https://open.spotify.com/playlist/')[1];
  if (!id) throw new TypeError('url does not look like a spotify URL');
  return id.split('?')[0];
}

function getPlaylist(
  accessToken: string,
  playlistUrl: string
): Promise<SpotifyApi.PlaylistObjectFull> {
  return apiClient<SpotifyApi.PlaylistObjectFull>(
    `playlists/${parsePlaylistId(playlistUrl)}`,
    {
      headers: {
        Authorization: authTokenBearer(accessToken),
      },
      resolveBodyOnly: true,
      responseType: 'json'
    }
  );
}

export default getPlaylist;
