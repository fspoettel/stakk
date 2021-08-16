import cuid from 'cuid';
import _debug from 'debug';
import FileType from 'file-type';
import sharp from 'sharp';
import upload from './makeS3Upload';

const debug = _debug('stakk:store_image');

function makeVersionKey(id: string, version: string) {
  return `${id}/${version}`;
}

async function storeImage(image: Buffer): Promise<string> {
  const imageId = `${process.env.STAKK_ENV}/${cuid()}`;

  debug(`[${imageId}] start processing...`);

  const fileType = await FileType.fromBuffer(image);
  if (!fileType?.mime.startsWith('image')) throw new TypeError('not an image');

  const original = makeVersionKey(imageId, `source.${fileType.ext}`);
  const optimized = makeVersionKey(imageId, '600x.webp');

  debug(`[${imageId}] generating optimized version...`);

  const processed = await sharp(image)
    .resize(600)
    .webp({ quality: 85 })
    .toBuffer();

  debug(`[${imageId}] uploading to B2...`);

  await Promise.all([
    upload(original, image),
    upload(optimized, processed)
  ]);

  debug(`[${imageId}] successfully stored!`);

  return imageId;
}

export default storeImage;
