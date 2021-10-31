import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import slugify from 'slugify';
import { AuthorKey, ColorKey, ItemKey, Stack } from '@stakk/types/Stack';
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
  type: 'itemDelete';
  id?: string;
};

export type ItemAddAction = {
  type: 'itemAdd';
  item: StackItem;
};

export type ItemChangeAction<T> = {
  type: 'itemChange';
  id: string;
  key: ItemKey;
  value: T;
};

export type ItemToggleEditAction = {
  type: 'itemToggleEdit';
  id?: string;
};

export type ItemsSortAction = {
  type: 'itemsSort';
  event: DragEndEvent;
};

export type StackLoadAction = {
  type: 'loadStack';
  stack: Stack;
};

export type StackLoaderOpenAction = { type: 'stackLoaderOpen' };

export type StackLoaderCloseAction = { type: 'stackLoaderClose' };

export type AnyAction =
  | TitleChangeAction
  | ColorChangeAction
  | AuthorChangeAction
  | ItemChangeAction<unknown>
  | ItemDeleteAction
  | ItemAddAction
  | ItemToggleEditAction
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
        },
      };
    }

    case 'colorChange': {
      return {
        ...state,
        stack: {
          ...state.stack,
          theme: { ...state.stack.theme, [action.key]: action.value },
        },
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
            slug:
              action.key === 'name' && !state.slugEdited
                ? slugify(action.value).toLowerCase()
                : state.stack.author.slug,
          },
        },
      };
    }

    case 'itemChange': {
      if (!action.id) return state;

      const itemState = state.stack.data[action.id];

      return {
        ...state,
        stack: {
          ...state.stack,
          data: {
            ...state.stack.data,
            [action.id]: {
              ...itemState,
              [action.key]: action.value,
            },
          },
        },
      };
    }

    case 'itemDelete': {
      if (!action.id) return state;

      const nextData = { ...state.stack.data };
      delete nextData[action.id];

      return {
        ...state,
        stack: {
          ...state.stack,
          data: nextData,
          sortOrder: state.stack.sortOrder.filter((id) => id !== action.id),
        },
      };
    }

    case 'itemToggleEdit': {
      if (!action.id) return state;

      const index = state.editingIds.indexOf(action.id);

      if (index > -1) {
        const editingIds = [...state.editingIds];
        editingIds.splice(index, 1);
        return { ...state, editingIds };
      }

      return { ...state, editingIds: state.editingIds.concat(action.id) };
    }

    case 'itemAdd': {
      return {
        ...state,
        stack: {
          ...state.stack,
          data: { ...state.stack.data, [action.item.id]: action.item },
          sortOrder: [...state.stack.sortOrder, action.item.id],
        },
      };
    }

    case 'itemsSort': {
      const { active, over } = action.event;
      if (!over?.id) return state;

      const sort = state.stack.sortOrder;

      const oldIndex = sort.findIndex((item) => item === active.id);
      const newIndex = sort.findIndex((item) => item === over.id);

      const nextItems = arrayMove(sort, oldIndex, newIndex);

      return {
        ...state,
        stack: { ...state.stack, sortOrder: nextItems },
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
