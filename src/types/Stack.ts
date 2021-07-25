import { StackItem } from './StackItem';

export type Stack = {
  id: string,
  slug: string,
  author: {
    name: string,
    url: string,
    slug: string,
  },
  theme: {
    background: string|null,
    text: string|null,
  },
  title: string,
  items: StackItem[],
};
