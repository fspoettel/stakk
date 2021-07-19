import { StackItem } from '../types/StackItem';

function getCoverPath(item: StackItem) {
  return `/assets/1x/${item.slug}.webp`;
}

export default getCoverPath;
