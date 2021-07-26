import AWS from 'aws-sdk';
import { PassThrough, Writable } from 'stream';
import s3Client from './s3Client';

export type S3Upload = {
  writeStream: Writable,
  promise: Promise<AWS.S3.ManagedUpload.SendData>,
};

function makeS3Upload(filename: string): S3Upload {
  if (!process.env.B2_BUCKET) throw new Error('bad b2 environment');

  const stream = new PassThrough();

  const params = {
    Bucket: process.env.B2_BUCKET,
    Key: filename,
    Body: stream,
  };

  return {
    writeStream: stream,
    promise: s3Client.upload(params).promise(),
  };
}

export default makeS3Upload;
