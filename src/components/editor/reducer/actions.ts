import { DragEndEvent } from '@dnd-kit/core';
import { AuthorKey, ColorKey, ItemKey, Stack } from '@stakk/types/Stack';
import { StackItem } from '@stakk/types/StackItem';
import { ChangeEvent, Dispatch, MouseEvent } from 'react';
import {
  AuthorChangeAction,
  ColorChangeAction,
  ItemAddAction,
  ItemDeleteAction,
  ItemToggleEditAction,
  ItemsSortAction,
  StackLoadAction,
  StackLoaderCloseAction,
  StackLoaderOpenAction,
  TitleChangeAction,
  ItemChangeAction,
} from './reducer';

export function sortItems(dispatch: Dispatch<ItemsSortAction>) {
  return (event: DragEndEvent) => {
    dispatch({ type: 'itemsSort', event });
  };
}

export function addItem(dispatch: Dispatch<ItemAddAction>) {
  return (item: StackItem) => dispatch({ type: 'itemAdd', item });
}

export function deleteItem(dispatch: Dispatch<ItemDeleteAction>) {
  return (evt: MouseEvent) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      const id = evt.currentTarget.dataset.id;
      dispatch({ type: 'itemDelete', id });
    }
  };
}

export function toggleItemEdit(dispatch: Dispatch<ItemToggleEditAction>) {
  return (evt: MouseEvent) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      const id = evt.currentTarget.dataset.id;
      dispatch({ type: 'itemToggleEdit', id });
    }
  };
}

export function changeItemField(dispatch: Dispatch<ItemChangeAction<string>>) {
  return (id: string, key: ItemKey) => (evt: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: 'itemChange',
      id,
      key,
      value: evt.target.value,
    });
}

export function changeItemFieldGeneric<T>(dispatch: Dispatch<ItemChangeAction<T>>) {
  return (id: string, key: ItemKey) => (value: T) =>
    dispatch({
      type: 'itemChange',
      id,
      key,
      value,
    });
}

export function changeTitle(dispatch: Dispatch<TitleChangeAction>) {
  return (evt: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'titleChange', value: evt.target.value });
}

export function changeColor(dispatch: Dispatch<ColorChangeAction>, key: ColorKey) {
  return (evt: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'colorChange', value: evt.target.value, key });
}

export function changeAuthor(dispatch: Dispatch<AuthorChangeAction>, key: AuthorKey) {
  return (evt: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'authorChange', value: evt.target.value, key });
}

export function loadStack(dispatch: Dispatch<StackLoadAction>) {
  return (stack: Stack) => dispatch({ type: 'loadStack', stack });
}

export function openStackLoader(dispatch: Dispatch<StackLoaderOpenAction>) {
  return () => dispatch({ type: 'stackLoaderOpen' });
}

export function closeStackLoader(dispatch: Dispatch<StackLoaderCloseAction>) {
  return () => dispatch({ type: 'stackLoaderClose' });
}
