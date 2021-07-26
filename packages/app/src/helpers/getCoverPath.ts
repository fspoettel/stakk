import { StackItem } from '@stakk/types/StackItem';

export function getCoverPath(
  item: StackItem,
  resolution: '1x'|'2x'|'og' = '1x',
  format: 'webp'|'jpg' = 'webp'
) {
  if (item.imageId) {
    return `https://i.stakk.ltd/file/stakk-cdn/${item.imageId}/600x.webp`;
  }

  return `/assets/${resolution}/${item.slug}.${format}`;
}
