import React from 'react';

import { StackItem } from '../../types/StackItem';
import css from './GenreSticker.module.css';

type GenreStickerProps = {
  item: StackItem,
};

function GenreSticker({ item }: GenreStickerProps) {
  if (item.genres.length === 0) return null;

  return (
    <ul className={css['genresticker']}>
      {item.genres.map((genre, i) => (
        <li key={i}>{genre}</li>
      ))}
    </ul>
  );
}

export default React.memo(GenreSticker);
