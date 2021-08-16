import _debug from 'debug';
import { NextApiRequest, NextApiResponse } from 'next';
import storeImage from '@stakk/services/api/backblaze/storeImage';
import getAccessToken from '@stakk/services/api/spotify/getAccessToken';
import getPlaylist from '@stakk/services/api/spotify/getPlaylist';
import getImage from '@stakk/lib/api/getImage';
import { ValidationError } from '@stakk/lib/api/errors';
import { toImageUrl, toStackItem } from '@stakk/lib/api/formatSpotifyPlaylist';
import wrapErrorHandler from '@stakk/lib/api/wrapErrorHandler';

async function postSpotifyPlaylist(req: NextApiRequest, res: NextApiResponse) {
  const { url } = JSON.parse(req.body);
  if (!url) throw new ValidationError('request missing required attribute `url`');

  const debug = _debug('stakk:spotify_playlist');

  debug('retrieving access token...');
  const { accessToken } = await getAccessToken();

  debug('retrieving playlist...');
  const playlist = await getPlaylist(accessToken, url);

  const stackItem = toStackItem(playlist);

  const imageUrl = toImageUrl(playlist);
  if (!imageUrl) throw new ValidationError('no cover associated with this spotify playlist');

  debug('retrieving image...');
  const image = await getImage(imageUrl);

  debug('storing image...');
  const imageId = await storeImage(image);

  res.json({ ...stackItem, imageId });
}

export default wrapErrorHandler(postSpotifyPlaylist);
