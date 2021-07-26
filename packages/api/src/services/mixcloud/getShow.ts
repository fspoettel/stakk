import got from 'got';

type ShowTag = {
  key: string;
  url: string;
  name: string;
};

export type ShowResponse = {
  key: string;
  url: string;
  name: string;
  tags: ShowTag[];
  created_time: string;
  pictures: {
    extra_large: string;
  },
  slug: string;
  description: string;
};

function getShow(url: string): Promise<ShowResponse> {
  const mixcloudURL = new URL(url);
  const mixcloudId = mixcloudURL.pathname;

  return got<ShowResponse>(`https://api.mixcloud.com${mixcloudId}`, {
    headers: {
      Accept: 'application/json'
    },
    responseType: 'json',
    resolveBodyOnly: true,
  });
}

export default getShow;
