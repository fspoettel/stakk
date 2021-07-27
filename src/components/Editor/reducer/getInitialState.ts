import cuid from 'cuid';
import { Stack } from '@stakk/types/Stack';

export type EditorState = {
  slugEdited: boolean;
  stackLoaderOpen: boolean;
  stack: Stack;
};

function getInitialState(): EditorState {
  const state: EditorState = {
    slugEdited: false,
    stackLoaderOpen: false,
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
