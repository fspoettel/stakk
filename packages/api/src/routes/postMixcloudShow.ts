import { Request, Response } from 'express';
import storeImage from '../services/backblaze/storeImage';
import getImage from '../lib/getImage';
import { ValidationError } from '../lib/errors';
import { toImageUrl, toStackItem } from '../lib/formatMixcloudShow';
import getShow from '../services/mixcloud/getShow';

async function postMixcloudUrl(req: Request, res: Response) {
  const url: string = req.body.url;
  if (!url) throw new ValidationError('request missing required attribute `url`');

  const show = await getShow(url);

  const stackItem = toStackItem(show);

  const imageUrl = toImageUrl(show);
  if (!imageUrl) throw new ValidationError('no cover associated with this mixcloud show');

  const image = await getImage(imageUrl);
  const imageId = await storeImage(image);

  res.json({ ...stackItem, imageId });
}

export default postMixcloudUrl;
