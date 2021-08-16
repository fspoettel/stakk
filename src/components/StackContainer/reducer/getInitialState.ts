import { StackItem } from '@stakk/types/StackItem';
import { DragState } from '@stakk/types/DragState';
import { HiddenState } from '@stakk/types/HiddenState';

export type StackState = {
  // todo: try to get rid of this
  items: StackItem[],
  loading: boolean,
  stack: {
    activeIndex: number,
    animationLock: boolean,
    dragState: DragState,
    hasInteraction: boolean,
    hiddenItems: Record<string, HiddenState>,
  },
  playback: {
    index?: number,
    progress: number,
  }
};

const getInitialState = (items: StackItem[]): StackState => {
  return {
    /** global state */
    items,
    loading: true,
    /** stack state */
    stack: {
      activeIndex: items.length - 1,
      animationLock: false,
      dragState: { dragging: false },
      hasInteraction: false,
      hiddenItems: {},
    },
    /** playback state */
    playback: {
      index: undefined,
      progress: 0,
    },
  };
};

export default getInitialState;
