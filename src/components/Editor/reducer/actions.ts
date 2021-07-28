import { DragEndEvent } from '@dnd-kit/core';
import { AuthorKey, ColorKey, Stack } from '@stakk/types/Stack';
import { StackItem } from '@stakk/types/StackItem';
import { ChangeEvent, Dispatch, MouseEvent } from 'react';
import {
  AuthorChangeAction,
  ColorChangeAction,
  ItemAddAction,
  ItemDeleteAction,
  ItemEditAction,
  ItemsSortAction,
  StackLoadAction,
  StackLoaderCloseAction,
  StackLoaderOpenAction,
  TitleChangeAction
} from './reducer';

export function sortItems(dispatch: Dispatch<ItemsSortAction>, event: DragEndEvent) {
  dispatch({ type: 'itemsSort', event });
}

export function addItem(dispatch: Dispatch<ItemAddAction>, item: StackItem) {
  dispatch({ type: 'itemAdd', item });
}

export function deleteItem(dispatch: Dispatch<ItemDeleteAction>, evt: MouseEvent) {
  if (evt.currentTarget instanceof HTMLButtonElement) {
    const id = evt.currentTarget.dataset.id;
    dispatch({ type: 'itemDelete', id });
  }
}

export function editItem(dispatch: Dispatch<ItemEditAction>, evt: MouseEvent) {
  if (evt.currentTarget instanceof HTMLButtonElement) {
    const id = evt.currentTarget.dataset.id;
    dispatch({ type: 'itemEdit', id });
  }
}

export function cancelEdit(dispatch: Dispatch<ItemEditAction>) {
    dispatch({ type: 'itemEdit', id: undefined });
}

export function changeTitle(dispatch: Dispatch<TitleChangeAction>, evt: ChangeEvent<HTMLInputElement>) {
  dispatch({ type: 'titleChange', value: evt.target.value });
}

export function makeChangeColor(key: ColorKey) {
  return (dispatch: Dispatch<ColorChangeAction>, evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'colorChange', value: evt.target.value, key });
  };
}

export function makeChangeAuthor(key: AuthorKey) {
  return (dispatch: Dispatch<AuthorChangeAction>, evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'authorChange', value: evt.target.value, key });
  };
}

export function loadStack(dispatch: Dispatch<StackLoadAction>, stack: Stack) {
  dispatch({ type: 'loadStack', stack });
}

export function openStackLoader(dispatch: Dispatch<StackLoaderOpenAction>) {
  dispatch({ type: 'stackLoaderOpen' });
}

export function closeStackLoader(dispatch: Dispatch<StackLoaderCloseAction>) {
  dispatch({ type: 'stackLoaderClose' });
}
