import apiClient from './apiClient';
import { authTokenBearer } from './auth';

function parseAlbumId(url: string): string {
  const id = url.split('https://open.spotify.com/album/')[1];
  if (!id) throw new TypeError('url does not look like a spotify URL');
  return id.split('?')[0];
}

function getAlbum(
  accessToken: string,
  albumUrl: string
) {
  return apiClient<SpotifyApi.AlbumObjectFull>(
    `albums/${parseAlbumId(albumUrl)}`,
    {
      headers: {
        Authorization: authTokenBearer(accessToken),
      },
      resolveBodyOnly: true,
      responseType: 'json'
    }
  );
}

export default getAlbum;
