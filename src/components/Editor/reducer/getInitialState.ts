import cuid from 'cuid';
import { Stack } from '@stakk/types/Stack';
import { StackItem } from '@stakk/types/StackItem';

export type EditorState = {
  slugEdited: boolean;
  stackLoaderOpen: boolean;
  editItem?: StackItem;
  stack: Stack;
};

function getInitialState(): EditorState {
  const state: EditorState = {
    slugEdited: false,
    stackLoaderOpen: false,
    editItem: undefined,
    stack: {
      id: cuid(),
      title: 'New Stack',
      slug: 'new-stack',
      author: {
        name: 'user',
        slug: 'user',
        url: '',
      },
      theme: {
        background: '#ffd700',
        text: '#25292c'
      },
      items: [],
    },
  };

  return state;
}

export default getInitialState;
