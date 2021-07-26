import { Request, Response } from 'express';
import storeImage from '../services/backblaze/storeImage';
import getAccessToken from '../services/spotify/getAccessToken';
import getImage from '../lib/getImage';
import getPlaylist from '../services/spotify/getPlaylist';
import { ValidationError } from '../lib/errors';
import { toImageUrl, toStackItem } from '../lib/formatSpotifyPlaylist';

async function postSpotifyUrl(req: Request, res: Response) {
  const url: string = req.body.url;
  console.log(typeof url);
  if (!url) throw new ValidationError('request missing required attribute `url`');

  const { accessToken } = await getAccessToken();
  const playlist = await getPlaylist(accessToken, url);

  const stackItem = toStackItem(playlist);

  const imageUrl = toImageUrl(playlist);
  if (!imageUrl) throw new ValidationError('no cover associated with this spotify playlist');

  const image = await getImage(imageUrl);
  const imageId = await storeImage(image);

  res.json({ ...stackItem, imageId });
}

export default postSpotifyUrl;
