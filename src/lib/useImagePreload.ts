import { useEffect, useRef, useState } from 'react';
import { StackItem } from '@stakk/types/StackItem';
import getCoverPath from './getCoverPath';
import preloadImage from './preloadImage';

export function useCoverPreload(items: StackItem[]) {
  const cache = useRef(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function run() {
      const itemPaths = [
        '/assets/overlay-600px.webp',
        ...items.map((item) => getCoverPath(item)),
      ].filter((p) => !cache.current.has(p));

      if (itemPaths.length > 0) {
        setLoading(true);
      }

      Promise.all(itemPaths.map(preloadImage)).then(() => {
        setLoading(false);

        itemPaths.forEach((p) => {
          cache.current.add(p);
        });
      });
    }
    run();
  }, [items]);

  return [loading];
}
