import got from 'got';

type ShowTag = {
  key: string;
  url: string;
  name: string;
};

export type ShowResponse = {
  created_time: string;
  description?: string;
  key: string;
  name: string;
  tags: ShowTag[];
  url: string;
  pictures: {
    '1024wx1024h': string;
  };
  slug: string;
};

function getShow(url: string): Promise<ShowResponse> {
  const mixcloudURL = new URL(url);
  const mixcloudId = mixcloudURL.pathname;

  return got<ShowResponse>(`https://api.mixcloud.com${mixcloudId}`, {
    headers: {
      Accept: 'application/json',
    },
    responseType: 'json',
    resolveBodyOnly: true,
  });
}

export default getShow;
