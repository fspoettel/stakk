import { config } from '@react-spring/web';
import { ITEM_OFFSET, Spring } from '../constants';
import getAnimationConfig from '../getAnimationConfig';

type SpringPlayingPayload = {
  index: number,
  shouldAnimate: boolean,
};

export default function springPlaying({ index, shouldAnimate }: SpringPlayingPayload): Partial<Spring> {
  const to = {
    x: 0,
    y: index * ITEM_OFFSET * -1,
    scale: 1.05,
    rot: 0,
    config: config.gentle,
  };

  return shouldAnimate
    ? { ...to, ...getAnimationConfig(index) }
    : to;
}
