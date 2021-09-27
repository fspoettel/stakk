import s3Client from './s3Client';

async function upload(filename: string, buffer: Buffer): Promise<void> {
  const { API_AWS_BUCKET } = process.env;

  if (!API_AWS_BUCKET) throw new Error('bad AWS environment');

  await s3Client.upload({
    Bucket: API_AWS_BUCKET,
    Key: filename,
    Body: buffer,
    ACL: 'public-read',
  }).promise();
}

export default upload;
