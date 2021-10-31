import { Stack } from '@stakk/types/Stack';
import { DragState } from '@stakk/types/DragState';
import { HiddenState } from '@stakk/types/HiddenState';
import getInitialState, { StackState } from './getInitialState';
import { getActiveIndex, getIsFirstItem, getIsLastItem } from './selectors';

export type ReinitAction = {
  type: 'reinit';
  data: Stack;
  hideInitialAnimation: boolean;
};

export type NextAction = {
  type: 'stackNext';
  item: HiddenState;
};

export type PrevAction = {
  type: 'stackPrev';
};

export type ResetAction = {
  type: 'reset';
  data: Stack;
};

export type ToAction = {
  type: 'stackTo';
  index: number;
};

export type ClearAction = {
  type: 'stackClear';
};

export type DragStateAction = {
  type: 'stackDragState';
  dragState: DragState;
};

export type SetAnimationLockAction = {
  type: 'setAnimationLock';
};

export type AnyAction =
  | ReinitAction
  | NextAction
  | PrevAction
  | ResetAction
  | ToAction
  | ClearAction
  | SetAnimationLockAction
  | DragStateAction;

export default function reducer(state: StackState, action: AnyAction): StackState {
  switch (action.type) {
    case 'reset': {
      // when resetting, we always want to animate.
      const initialState = getInitialState(action.data, false);

      return {
        ...initialState,
        stack: {
          ...initialState.stack,
          hasInteraction: true,
        },
      };
    }

    case 'reinit': {
      const initialState = getInitialState(action.data, action.hideInitialAnimation);

      // the reinit case currently is only relevant in the editor where the user might be editing an individual item.
      // to avoid the preview jumping back to the first item, we reinit the new stack to the previous stack state.
      // TODO: the first check is a bit naive here - if stacks can change arbitrarily, it needs to be more exhaustive.
      if (
        state.items.length === initialState.items.length &&
        state.stack.activeIndex !== -1 &&
        state.stack.activeIndex !== state.items.length - 1
      ) {
        initialState.stack = state.stack;
      }

      return initialState;
    }

    case 'stackDragState': {
      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
          hasInteraction: true,
          dragState: action.dragState,
        },
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
            [activeIndex]: action.item ?? { direction: 1 },
          },
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
        },
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

    case 'setAnimationLock': {
      return {
        ...state,
        stack: {
          ...state.stack,
          animationLock: true,
        },
      };
    }

    default: {
      throw new Error();
    }
  }
}
