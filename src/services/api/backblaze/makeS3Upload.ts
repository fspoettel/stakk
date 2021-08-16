import s3Client from './s3Client';

async function upload(filename: string, buffer: Buffer): Promise<void> {
  if (!process.env.B2_BUCKET) throw new Error('bad b2 environment');

  const params = {
    Bucket: process.env.B2_BUCKET,
    Key: filename,
    Body: buffer,
  };

  await s3Client.upload(params).promise();
}

export default upload;
