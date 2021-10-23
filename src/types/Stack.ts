import { StackItem } from './StackItem';

export type Stack = {
  id: string,
  slug: string,
  author: {
    name: string,
    slug: string,
    url?: string,
  },
  theme?: {
    background?: string,
    text?: string,
  },
  data: Record<string, StackItem>,
  sort: string[],
  title: string,
};

export type ColorKey = 'background'|'text';
export type AuthorKey = 'url'|'name'|'slug';
