import { DragState } from '@stakk/types/DragState';
import { HiddenState } from '@stakk/types/HiddenState';
import { Spring } from './constants';
import springDragging from './springs/springDragging';
import springHidden from './springs/springHidden';
import springPlaying from './springs/springPlaying';
import springStacked from './springs/springStacked';

type UpdateSpringPayload = {
  hiddenItem?: HiddenState,
  index: number,
  isPlaying: boolean,
  shouldAnimate: boolean,
  stackSize: number,
};

export function updateRestingSpring({
  hiddenItem,
  index,
  isPlaying,
  shouldAnimate,
  stackSize
}: UpdateSpringPayload): Partial<Spring> {
  if (hiddenItem) return springHidden({ direction: hiddenItem.direction });
  if (isPlaying) return springPlaying({ index, shouldAnimate });
  return springStacked({ index, stackSize, shouldAnimate });
}

type UpdateDraggingSpringPayload = {
  hiddenItem?: HiddenState,
  dragState: DragState,
};

export function updateDraggingSpring({ hiddenItem, dragState }: UpdateDraggingSpringPayload): Partial<Spring> {
  const { xDelta, mouseDown } = dragState;
  const hidden = !!hiddenItem;
  return springDragging({ hidden, xDelta, mouseDown });
}
