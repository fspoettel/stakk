import { StackItem } from '@stakk/types/StackItem';
import { DragState } from '@stakk/types/DragState';
import { HiddenState } from '@stakk/types/HiddenState';
import getInitialState, { StackState } from './getInitialState';
import { getActiveIndex, getIsFirstItem, getIsLastItem, getPlaybackIndex } from './selectors';

export type ReinitAction = {
  type: 'reinit',
  data: StackItem[]
};

export type LoadAction = {
  type: 'load',
};

export type NextAction = {
  type: 'stackNext',
  item: HiddenState,
};

export type PrevAction = {
  type: 'stackPrev',
};

export type ResetAction = {
  type: 'reset',
  items: StackItem[],
};

export type ToAction = {
  type: 'stackTo',
  index: number,
};

export type ClearAction = {
  type: 'stackClear',
};

export type DragStateAction = {
  type: 'stackDragState',
  dragState: DragState,
};

export type TogglePlaybackAction = {
  type: 'togglePlayback',
};

export type StopPlaybackAction = {
  type: 'stopPlayback',
};

export type TrackProgressAction = {
  type: 'playbackProgress',
  progress: number,
};

type AnyAction = ReinitAction|LoadAction|NextAction|PrevAction|ResetAction|ToAction|ClearAction|DragStateAction|TogglePlaybackAction|StopPlaybackAction|TrackProgressAction;

export default function reducer(state: StackState, action: AnyAction): StackState {
  switch (action.type) {
    case 'reset': {
      const initialState = getInitialState(action.items);
      return {
        ...initialState,
        stack: {
          ...initialState.stack,
          hasInteraction: true,
        },
        loading: false,
      };
    }

    case 'reinit': {
      const initialState = getInitialState(action.data);
      return initialState;
    }

    case 'load': {
      return {
        ...state,
        loading: false,
      };
    }

    case 'togglePlayback': {
      const activeIndex = getActiveIndex(state);
      const playbackIndex = getPlaybackIndex(state);
      
      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          hasInteraction: true,
        },
        playback: playbackIndex === activeIndex
          ? { ...state.playback, index: undefined }
          : { index: activeIndex, progress: 0 }
      };
    }

    case 'stopPlayback': {
      return {
        ...state,
        playback: { index: undefined, progress: 0 },
      };
    }

    case 'playbackProgress': {
      return {
        ...state,
        playback: { ...state.playback, progress: action.progress }
      };
    }

    case 'stackDragState': {
      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          hasInteraction: true,
          dragState: action.dragState,
        }
      };
    }

    case 'stackNext': {
      const activeIndex = getActiveIndex(state);
      if (action.item.index !== activeIndex) return state;

      if (getIsLastItem(state)) {
        return {
          ...state,
          stack: {
            activeIndex: state.items.length - 1,
            animationLock: false,
            dragState: { dragging: false },
            hasInteraction: true,
            hiddenItems: {},
          },
          playback: state.playback,
          loading: false
        };
      }

      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          activeIndex: activeIndex - 1,
          hasInteraction: true,
          hiddenItems: {
            ...state.stack.hiddenItems,
            [activeIndex]: action.item ?? { direction: 1 }
          }
        },
      };
    }

    case 'stackPrev': {
      if (getIsFirstItem(state)) return state;

      const activeIndex = getActiveIndex(state);

      const nextHiddenItems = { ...state.stack.hiddenItems };
      delete nextHiddenItems[activeIndex];

      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          activeIndex: activeIndex + 1,
          hasInteraction: true,
          hiddenItems: nextHiddenItems,
        },
      };
    }

    case 'stackTo': {
      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          activeIndex: action.index ?? state.items.length - 1,
          hasInteraction: true,
          hiddenItems: Object.entries(state.stack.hiddenItems)
            .filter(([key]) => Number.parseInt(key, 10) < action.index)
            .reduce((acc, curr) => ({ ...acc, curr }), {}),
        }
      };
    }

    case 'stackClear': {
      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          activeIndex: -1,
          hasInteraction: true,
          hiddenItems: {
            ...state.items
              .map((_, i) => ({ index: i, direction: 1 }))
              .reduce((acc, curr) => ({ ...acc, curr }), {}),
            ...state.stack.hiddenItems,
          },
        },
      };
    }

    default: {
      throw new Error();
    }
  }
}
