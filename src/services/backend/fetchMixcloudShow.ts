import { StackItem } from '@stakk/types/StackItem';
import { makeRequest } from './apiClient';

async function fetchMixcloudShow(url: string): Promise<StackItem> {
  return makeRequest<StackItem>('/mixcloud_show', { url });
}

export default fetchMixcloudShow;
