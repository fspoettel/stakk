import AWS from 'aws-sdk';

function getS3Client(): AWS.S3 {
  const { B2_ENDPOINT } = process.env;
  if (!B2_ENDPOINT) {
    throw new Error('bad b2 environment');
  }

  const region =  B2_ENDPOINT.split('.')[1];
  AWS.config.signatureVersion = 'v4';

  const endpoint = new AWS.Endpoint(B2_ENDPOINT);
  return new AWS.S3({ endpoint, region });
}

export default getS3Client();
