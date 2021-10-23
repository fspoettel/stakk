import { config } from '@react-spring/web';
import { ITEM_OFFSET, Spring } from '../constants';
import getAnimationConfig from '../getAnimationConfig';

type SpringStackedPayload = {
  index: number;
  stackSize: number;
  shouldAnimate: boolean;
};

export default function springStacked({
  index,
  stackSize,
  shouldAnimate,
}: SpringStackedPayload): Partial<Spring> {
  const to = {
    x: 0,
    y: index * ITEM_OFFSET * -1,
    scale: 1,
    rot: (index / stackSize) * 10 * (index % 3 ? 1 : -1),
    config: config.gentle,
  };

  return shouldAnimate ? { ...to, ...getAnimationConfig(index) } : to;
}

export function toSpringStacked(stackSize: number, shouldAnimate = false) {
  return (index: number) => springStacked({ index, stackSize, shouldAnimate });
}
