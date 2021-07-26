import cuid from 'cuid';
import sharp from 'sharp';
import { Readable, PassThrough, pipeline as _pipeline } from 'stream';
import { promisify } from 'util';
import makeS3Upload from './makeS3Upload';

const pipeline = promisify(_pipeline);

function makeVersion(id: string, version: string) {
  const key = `${id}/${version}`;
  const writableStream = new PassThrough();

  const upload = makeS3Upload(key);
  const promise = Promise.all([
    pipeline(writableStream, upload.writeStream),
    upload.promise,
  ]);

  return { writableStream, promise };
}

async function storeImage(image: Buffer): Promise<string> {
  const sourceStream = Readable.from(image);

  const imageId = cuid();

  const original = makeVersion(imageId, 'source.jpg');
  const optimized = makeVersion(imageId, '600x.webp');

  const processor = sharp().resize(600).webp();

  await Promise.all([
    pipeline(sourceStream, original.writableStream),
    pipeline(sourceStream, processor, optimized.writableStream),
    original.promise,
    optimized.promise,
  ]);

  return imageId;
}

export default storeImage;
