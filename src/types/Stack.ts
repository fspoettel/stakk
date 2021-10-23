import { StackItem } from './StackItem';

export type Stack = {
  id: string;
  slug: string;
  author: {
    name: string;
    slug: string;
    url?: string;
  };
  theme?: {
    background?: string;
    text?: string;
  };
  data: Record<string, StackItem>;
  /**
   * Stack order is stored **bottom-to-top**. The animation logic expects this structure
   * and is considered the hot path here.
   * We reverse sort direction in the editor to make drag'n'drop more natural.
   */
  sortOrder: string[];
  title: string;
};

export type ColorKey = 'background' | 'text';
export type AuthorKey = 'url' | 'name' | 'slug';
export type ItemKey = 'title' | 'description' | 'tags';
