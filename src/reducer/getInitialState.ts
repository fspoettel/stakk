import { DragState } from '../types/DragState';
import { HiddenState } from '../types/HiddenState';
import { Stack } from '../types/Stack';
import { StackItem } from '../types/StackItem';

export type StackState = {
  author: {
    name: string,
    url: string,
  },
  title: string,
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

const getInitialState = (data: Stack): StackState => {
  return {
    /** global state */
    author: data.author,
    title: data.title,
    items: data.items.map((d, i) => ({ ...d, index: i })),
    loading: true,
    /** stack state */
    stack: {
      activeIndex: data.items.length - 1,
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
