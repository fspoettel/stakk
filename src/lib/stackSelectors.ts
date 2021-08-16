import { Stack } from '@stakk/types/Stack';

export function getTitle(stack: Stack) {
  return stack.title;
}

export function getBackgroundColor(stack: Stack) {
  return stack?.theme?.background ?? undefined;
}

export function getTextColor(stack: Stack) {
  return stack?.theme?.text ?? undefined;
}

export function getAuthorName(stack: Stack) {
  return stack.author.name;
}

export function getAuthorSlug(stack: Stack) {
  return stack.author.slug;
}

export function getAuthorUrl(stack: Stack) {
  return stack.author.url;
}

export function getItems(stack: Stack) {
  return stack.items;
}