import { StackItem } from '@stakk/types/StackItem';

function getCoverPath(
  item: StackItem,
  resolution: '1x'|'2x'|'og' = '1x',
  format: 'webp'|'jpg' = 'webp'
) {
  if (item.imageId) {
    return `${process.env.NEXT_PUBLIC_ASSET_URL}/${item.imageId}/600x.webp`;
  }

  return `/assets/${resolution}/${item.slug}.${format}`;
}

export default getCoverPath;
