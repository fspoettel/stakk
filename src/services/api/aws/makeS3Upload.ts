import s3Client from './s3Client';

async function upload(filename: string, buffer: Buffer): Promise<void> {
  const bucket = process.env.API_AWS_BUCKET;

  if (!bucket) throw new Error('bad AWS environment');

  await s3Client
    .upload({
      Bucket: bucket,
      Key: filename,
      Body: buffer,
      ACL: 'public-read',
    })
    .promise();
}

export default upload;
