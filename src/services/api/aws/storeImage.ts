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

  debug(`[${imageId}] generating optimized version...`);

  const resized = await sharp(image).resize(600);

  const [webp, jpeg] = await Promise.all([
    resized.webp({ quality: 85 }).toBuffer(),
    resized.jpeg({ quality: 85 }).toBuffer(),
  ]);

  debug(`[${imageId}] uploading to AWS...`);

  await Promise.all([
    upload(makeVersionKey(imageId, `source.${fileType.ext}`), image),
    upload(makeVersionKey(imageId, '600x.webp'), webp),
    upload(makeVersionKey(imageId, '600x.jpg'), jpeg),
  ]);

  debug(`[${imageId}] successfully stored!`);

  return imageId;
}

export default storeImage;
