import { config } from '@react-spring/web';
import { DragDirection } from '@stakk/types/DragState';
import { Spring } from '../constants';
import getOffscreenX from '../getOffscreenX';

type SpringHiddenPayload = { direction: DragDirection };

export default function springHidden({ direction }: SpringHiddenPayload): Partial<Spring> {
  return {
    x: getOffscreenX(direction),
    config: config.gentle,
  };
}
