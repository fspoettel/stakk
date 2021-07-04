import { StackItem } from './StackItem';

export type Stack = {
  author: {
    name: string,
    url: string,
  },
  title: string,
  items: Omit<StackItem, 'index'>[],
};
