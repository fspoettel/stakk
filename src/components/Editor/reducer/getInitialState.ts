import cuid from 'cuid';
import { Stack } from '@stakk/types/Stack';

export type EditorState = {
  slugEdited: boolean;
  stack: Stack;
};

function getInitialState() {
  return {
    slugEdited: false,
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
}

export default getInitialState;
