import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import slugify from 'slugify';
import { AuthorKey, ColorKey } from '@stakk/types/Stack';
import { StackItem } from '@stakk/types/StackItem';
import { EditorState } from './getInitialState';

type TitleChangeAction = {
  type: 'title-change';
  value: string;
};

type ColorChangeAction = {
  type: 'color-change';
  value: string;
  key: ColorKey;
};

type AuthorChangeAction = {
  type: 'author-change';
  value: string;
  key: AuthorKey;
};

type ItemDeleteAction = {
  type: 'item-delete',
  id?: string,
};

type ItemAddAction = {
  type: 'item-add',
  item: StackItem
};

type ItemsSortAction = {
  type: 'items-sort',
  event: DragEndEvent
};

type AnyAction = TitleChangeAction|ColorChangeAction|AuthorChangeAction|ItemDeleteAction|ItemAddAction|ItemsSortAction;

function reducer(state: EditorState, action: AnyAction) {
  switch (action.type) {
    case 'title-change': {
      return {
        ...state,
        stack: {
          ...state.stack,
          title: action.value,
          slug: slugify(action.value),
        }
      };
    }

    case 'color-change': {
      return {
        ...state,
        stack: {
          ...state.stack,
          theme: { ...state.stack.theme, [action.key]: action.value }
        }
      };
    }

    case 'author-change': {
      const isSlugEdit = action.key === 'slug';

      if (isSlugEdit) {
        return {
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

    case 'item-delete': {
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

    case 'item-add': {
      return {
        ...state,
        stack: { ...state.stack, items: [...state.stack.items, action.item] },
      };
    }

    case 'items-sort': {
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

    default: {
      return state;
    }
  }
}

export default reducer;
