import AWS from 'aws-sdk';

function getS3Client(): AWS.S3 {
  const {
    API_AWS_ACCESS_KEY_ID,
    API_AWS_SECRET_ACCESS_KEY,
    API_AWS_REGION
  } = process.env;

  if (
    !API_AWS_ACCESS_KEY_ID ||
    !API_AWS_SECRET_ACCESS_KEY ||
    !API_AWS_REGION
  ) {
    throw new Error('bad AWS environment');
  }

  const credentials = new AWS.Credentials({
    accessKeyId: API_AWS_ACCESS_KEY_ID,
    secretAccessKey: API_AWS_SECRET_ACCESS_KEY,
  });

  AWS.config.credentials = credentials;
  AWS.config.signatureVersion = 'v4';

  return new AWS.S3({
    region: API_AWS_REGION
  });
}

export default getS3Client();
