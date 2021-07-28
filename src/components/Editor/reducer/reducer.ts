import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import slugify from 'slugify';
import { AuthorKey, ColorKey, Stack } from '@stakk/types/Stack';
import { StackItem } from '@stakk/types/StackItem';
import { EditorState } from './getInitialState';

export type TitleChangeAction = {
  type: 'titleChange';
  value: string;
};

export type ColorChangeAction = {
  type: 'colorChange';
  value: string;
  key: ColorKey;
};

export type AuthorChangeAction = {
  type: 'authorChange';
  value: string;
  key: AuthorKey;
};

export type ItemDeleteAction = {
  type: 'itemDelete',
  id?: string,
};

export type ItemEditAction = {
  type: 'itemEdit',
  id?: string,
};

export type ItemAddAction = {
  type: 'itemAdd',
  item: StackItem
};

export type ItemsSortAction = {
  type: 'itemsSort',
  event: DragEndEvent
};

export type StackLoadAction = {
  type: 'loadStack',
  stack: Stack
};

export type StackLoaderOpenAction = { type: 'stackLoaderOpen' };

export type StackLoaderCloseAction = { type: 'stackLoaderClose' };

export type AnyAction = TitleChangeAction
  | ColorChangeAction
  | AuthorChangeAction
  | ItemDeleteAction
  | ItemEditAction
  | ItemAddAction
  | ItemsSortAction
  | StackLoadAction
  | StackLoaderCloseAction
  | StackLoaderOpenAction;

function reducer(state: EditorState, action: AnyAction): EditorState {
  switch (action.type) {
    case 'titleChange': {
      return {
        ...state,
        stack: {
          ...state.stack,
          title: action.value,
          slug: slugify(action.value),
        }
      };
    }

    case 'colorChange': {
      return {
        ...state,
        stack: {
          ...state.stack,
          theme: { ...state.stack.theme, [action.key]: action.value }
        }
      };
    }

    case 'authorChange': {
      const isSlugEdit = action.key === 'slug';

      if (isSlugEdit) {
        return {
          ...state,
          slugEdited: true,
          stack: {
            ...state.stack,
            author: {
              ...state.stack.author,
              slug: action.value,
            },
          },
        };
      }

      return {
        ...state,
        stack: {
          ...state.stack,
          author: {
            ...state.stack.author,
            [action.key]: action.value,
            slug: action.key === 'name' && !state.slugEdited
              ? slugify(action.value).toLowerCase()
              : state.stack.author.slug
          }
        }
      };
    }

    case 'itemDelete': {
      if (!action.id) return state;

      const index = state.stack.items.findIndex(item => item.id === action.id);
      if (index === -1) return state;

      const nextItems = Array.from(state.stack.items);
      nextItems.splice(index, 1);

      return {
        ...state,
        stack: { ...state.stack, items: nextItems }
      };
    }

    case 'itemEdit': {
      if (!action.id) return { ...state, editItem: undefined};

      const editItem = state.stack.items.find(item => item.id === action.id);
      if (!editItem) return { ...state, editItem: undefined };

      return { ...state, editItem };
    }

    case 'itemAdd': {
      return {
        ...state,
        stack: { ...state.stack, items: [...state.stack.items, action.item] },
      };
    }

    case 'itemsSort': {
      const { active, over } = action.event;
      if (!over?.id) return state;

      const items = state.stack.items;
  
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);

      const nextItems = arrayMove(items, oldIndex, newIndex);

      return {
        ...state,
        stack: { ...state.stack, items: nextItems },
      };
    }

    case 'stackLoaderOpen': {
      return { ...state, stackLoaderOpen: true };
    }

    case 'stackLoaderClose': {
      return { ...state, stackLoaderOpen: false };
    }

    case 'loadStack': {
      return {
        ...state,
        stackLoaderOpen: false,
        stack: action.stack,
      };
    }
  }
}

export default reducer;
