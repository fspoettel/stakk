/* eslint-disable no-undef */
import path from 'path';
import dotenv from 'dotenv';
import getPlaylist from '../src/services/spotify/getPlaylist';
import getAccessToken from '../src/services/spotify/getAccessToken';
import { toImageUrl, toStackItem } from '../src/services/spotify/parsers';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local')
});

(async () => {
  const url = 'https://open.spotify.com/playlist/6LBvAsyp5pGCdkLows6k6c';

  const { accessToken } = await getAccessToken();
  const playlist = await getPlaylist(accessToken, url);

  const stackItem = toStackItem(playlist);
  const imageUrl = toImageUrl(playlist);

  console.log(imageUrl, stackItem);
})();

export default undefined;
