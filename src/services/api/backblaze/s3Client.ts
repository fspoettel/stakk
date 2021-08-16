import AWS from 'aws-sdk';

function getS3Client(): AWS.S3 {
  const {
    API_AWS_ACCESS_KEY_ID,
    API_AWS_SECRET_ACCESS_KEY,
    B2_ENDPOINT
  } = process.env;

  if (!B2_ENDPOINT || !API_AWS_ACCESS_KEY_ID || !API_AWS_SECRET_ACCESS_KEY) {
    throw new Error('bad b2 environment');
  }

  const credentials = new AWS.Credentials({
    accessKeyId: API_AWS_ACCESS_KEY_ID,
    secretAccessKey: API_AWS_SECRET_ACCESS_KEY,
  });

  AWS.config.credentials = credentials;

  const region =  B2_ENDPOINT.split('.')[1];
  AWS.config.signatureVersion = 'v4';

  const endpoint = new AWS.Endpoint(B2_ENDPOINT);
  return new AWS.S3({ endpoint, region });
}

export default getS3Client();
