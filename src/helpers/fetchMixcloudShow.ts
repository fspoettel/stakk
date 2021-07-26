import { StackItem } from '@stakk/types/StackItem';

async function fetchMixcloudShow(url: string): Promise<StackItem> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mixcloud_show`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ url }),
  });

  const item: StackItem = await res.json();
  return item;
}

export default fetchMixcloudShow;
