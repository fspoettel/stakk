import { Spring } from '../constants';
import getDirectionFromDelta from '../getDirectionFromDelta';
import getOffscreenX from '../getOffscreenX';

type SpringDraggingPayload = {
  hidden: boolean,
  xDelta?: number,
  mouseDown?: boolean,
};

export default function springDragging({ hidden, xDelta, mouseDown }: SpringDraggingPayload): Partial<Spring> {
  const direction = getDirectionFromDelta(xDelta ?? 0);

  return {
    x: hidden
      ? getOffscreenX(direction)
      : mouseDown ? xDelta : 0,
    rot: (xDelta ?? 0) / 100,
    scale: mouseDown ? 1.1 : 1,
    delay: undefined,
    config: { friction: 50, tension: mouseDown ? 800 : hidden ? 200 : 500 }
  };
}
