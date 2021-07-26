import React from 'react';
import { StackItem } from '@stakk/types/StackItem';
import css from './TagSticker.module.css';

type TagStickerProps = {
  item: StackItem,
};

function TagSticker({ item }: TagStickerProps) {
  if (item.tags.length === 0) return null;

  return (
    <ul className={css['tagsticker']}>
      {item.tags.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
    </ul>
  );
}

export default React.memo(TagSticker);
