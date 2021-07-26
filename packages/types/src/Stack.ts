import { StackItem } from './StackItem';

export type Stack = {
  id: string,
  slug: string,
  author: {
    name: string,
    slug: string,
    url?: string,
  },
  theme: {
    background: string|null,
    text: string|null,
  },
  title: string,
  items: StackItem[],
};

export type ColorKey = 'background'|'text';
export type AuthorKey = 'url'|'name'|'slug';
