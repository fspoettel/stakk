import got from 'got';

function authTokenBearer(token: string) {
  return `Bearer ${token}`;
}

function parsePlaylistId(url: string): string {
  const id = url.split('https://open.spotify.com/playlist/')[1];
  if (!id) throw new TypeError('url does not look like a spotify URL');
  return id.split('?')[0];
}

function getPlaylist(
  accessToken: string,
  playlistUrl: string
): Promise<SpotifyApi.PlaylistObjectFull> {
  return got<SpotifyApi.PlaylistObjectFull>(
    `https://api.spotify.com/v1/playlists/${parsePlaylistId(playlistUrl)}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: authTokenBearer(accessToken),
      },
      resolveBodyOnly: true,
      responseType: 'json'
    }
  );
}

export default getPlaylist;
