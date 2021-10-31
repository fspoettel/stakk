import AWS from 'aws-sdk';

function getS3Client(): AWS.S3 {
  const accessKeyId = process.env.API_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.API_AWS_SECRET_ACCESS_KEY;
  const region = process.env.API_AWS_REGION;

  if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error('bad AWS environment');
  }

  const credentials = new AWS.Credentials({ accessKeyId, secretAccessKey });

  AWS.config.credentials = credentials;
  AWS.config.signatureVersion = 'v4';

  return new AWS.S3({ region });
}

export default getS3Client();
