import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated } from '@react-spring/web';

import GenreSticker from '../GenreSticker';
import Cover from '../Cover';

import css from '../../styles/Stack.module.css';

import { isSpring } from './helpers/constants';
import springToInnerTransform from './helpers/springToInnerTransform';
import springToOuterTransform from './helpers/springToOuterTransform';
import { StackItem } from '../../types/StackItem';
import { ReactEventHandlers } from 'react-use-gesture/dist/types';
import { useEvent } from 'react-use';

type StackMemberProps = {
  // eslint-disable-next-line no-unused-vars
  bind: (i: number) => ReactEventHandlers,
  spring: unknown,
  index: number,
  isPlaying: boolean,
  item: StackItem,
};

function StackMember({
  bind,
  spring,
  index,
  isPlaying,
  item,
}: StackMemberProps) {
  const [w, setW] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);

  // FIXME! remove once Safari supports `aspect-ratio`
  const supportsAspectRatio = CSS.supports('aspect-ratio:  1/ 1');

  const handleResize = useCallback(() => {
    if (innerRef.current && !supportsAspectRatio) {
      setW(innerRef.current.clientHeight);
    }
  }, [supportsAspectRatio]);

  useEffect(() => { handleResize(); }, [handleResize]);
  useEvent('resize', handleResize, window, { passive: true });

  if (!isSpring(spring)) return null;

  return (
    <animated.div
      className={css['stack-item-outer']}
      style={{ transform: springToOuterTransform(spring) }}
    >
      <animated.div
        {...bind(index)}
        ref={innerRef}
        className={css['stack-item-inner']}
        style={{
          transform: springToInnerTransform(spring),
          width: !supportsAspectRatio ? w : undefined
        }}
      >
          <Cover
            title={item.title}
            playing={isPlaying}
            src={item.src}
          >
            <GenreSticker item={item} />
          </Cover>
      </animated.div>
    </animated.div>
  );
}

export default React.memo(StackMember);
