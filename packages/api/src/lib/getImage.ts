import got from 'got';

async function getImage(url: string): Promise<Buffer> {
  const image = await got.get(url, {
    encoding: 'binary'
  });

  return image.rawBody;
}

export default getImage;
