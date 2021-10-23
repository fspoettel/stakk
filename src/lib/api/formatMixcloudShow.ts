import cuid from 'cuid';
import { StackItem } from '@stakk/types/StackItem';
import { ShowResponse } from '@stakk/services/api/mixcloud/getShow';
import { stripHtml } from './stripHtml';

export function toStackItem(show: ShowResponse): StackItem {
  return {
    createdAt: new Date().toISOString(),
    description: stripHtml(show.description),
    id: cuid(),
    links: [show.url],
    title: show.name,
    slug: show.slug,
    tags: show.tags.slice(1).map(t => t.name),
    // TODO: pull tracklist from mixcloud
    tracklist: [],
  };
}

export function toImageUrl(show: ShowResponse): string|null {
  return show.pictures['1024wx1024h'];
}
