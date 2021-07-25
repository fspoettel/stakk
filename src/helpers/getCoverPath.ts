import { StackItemFull } from '../types/StackItem';

export function getCoverPath(
  item: StackItemFull,
  resolution: '1x'|'2x'|'og' = '1x',
  format: 'webp'|'jpg' = 'webp'
) {
  return `/assets/${resolution}/${item.slug}.${format}`;
}
