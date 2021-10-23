import { StackItem } from '@stakk/types/StackItem';

function getCoverPath(item: StackItem, variant: '600x.webp' | 'source.jpg' = '600x.webp') {
  return `${process.env.NEXT_PUBLIC_ASSET_URL}/${item.imageId}/${variant}`;
}

export default getCoverPath;
