import { Stack } from '@stakk/types/Stack';
import { StackItem } from '@stakk/types/StackItem';
import { DragState } from '@stakk/types/DragState';
import { HiddenState } from '@stakk/types/HiddenState';
import { getItems } from '@stakk/lib/stackSelectors';

export type StackState = {
  items: StackItem[];
  stack: {
    activeIndex: number;
    animationLock: boolean;
    dragState: DragState;
    hasInteraction: boolean;
    hiddenItems: Record<string, HiddenState>;
  };
};

const getInitialState = (stack: Stack, initialAnimationLock: boolean): StackState => {
  const items = getItems(stack);

  return {
    /** global state */
    items,
    /** stack state */
    stack: {
      activeIndex: items.length - 1,
      animationLock: initialAnimationLock,
      dragState: { dragging: false },
      hasInteraction: false,
      hiddenItems: {},
    },
  };
};

export default getInitialState;
