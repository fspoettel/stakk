import { StackItem } from './StackItem';

export type Stack = {
  author: {
    name: string,
    url: string,
  },
  colors: {
    background: string|null,
    text: string|null,
  },
  title: string,
  items: Omit<StackItem, 'index'>[],
};
