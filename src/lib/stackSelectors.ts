import { AuthorKey, ColorKey, Stack } from '@stakk/types/Stack';

export function getTitle(stack: Stack) {
  return stack.title;
}

export function getColor(stack: Stack, key: ColorKey) {
  return stack.theme?.[key] ?? undefined;
}

export function getAuthor(stack: Stack, key: AuthorKey) {
  return stack.author[key];
}

export function getItems(stack: Stack) {
  return stack.sortOrder.map((id) => stack.data[id]);
}
