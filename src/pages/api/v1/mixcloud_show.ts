import _debug from 'debug';
import { NextApiRequest, NextApiResponse } from 'next';
import storeImage from '@stakk/services/api/aws/storeImage';
import getShow from '@stakk/services/api/mixcloud/getShow';
import getImage from '@stakk/lib/api/getImage';
import { ValidationError } from '@stakk/lib/api/errors';
import { toImageUrl, toStackItem } from '@stakk/lib/api/formatMixcloudShow';
import wrapErrorHandler from '@stakk/lib/api/wrapErrorHandler';

const debug = _debug('stakk:mixcloud_url');

async function postMixcloudUrl(req: NextApiRequest, res: NextApiResponse) {
  const { url } = JSON.parse(req.body);
  if (!url) throw new ValidationError('request missing required attribute `url`');

  debug('retrieving show...');
  const show = await getShow(url);

  const stackItem = toStackItem(show);

  const imageUrl = toImageUrl(show);
  if (!imageUrl) throw new ValidationError('no cover associated with this mixcloud show');

  debug('retrieving image...');
  const image = await getImage(imageUrl);

  debug('storing image...');
  const imageId = await storeImage(image);

  res.json({ ...stackItem, imageId });
}

export default wrapErrorHandler(postMixcloudUrl);
