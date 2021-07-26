import { ChangeEvent, FormEvent, MouseEvent, useReducer } from 'react';
import { StackItem } from '@stakk/types/StackItem';
import { AuthorKey, ColorKey } from '@stakk/types/Stack';
import EditorItems from '../EditorItems';
import EditorPreview from '../EditorPreview';
import Field from '../Form/Field';
import FieldGroup from '../Form/FieldGroup';
import Form from '../Form/Form';
import reducer from './reducer/reducer';
import getInitialState from './reducer/getInitialState';

import css from './Editor.module.css';
import Button from '../Button';
import { useCopyToClipboard } from 'react-use';
import ButtonGroup from '../ButtonGroup';
import { SortCallback } from '../SortableList/interfaces';

function Editor() {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const onItemAdd = (item: StackItem) => {
    dispatch({ type: 'item-add', item });
  };

  const onItemDelete = (evt: MouseEvent) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      const id = evt.currentTarget.dataset.id;
      dispatch({ type: 'item-delete', id });
    }
  };

  const onItemsSort: SortCallback = (event) => {
    dispatch({ type: 'items-sort', event });
  };

  const onTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'title-change', value: evt.target.value });
  };

  const makeOnColorChange = (key: ColorKey) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'color-change', value: evt.target.value, key });
  };

  const makeOnAuthorChange = (key: AuthorKey) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'author-change', value: evt.target.value, key });
  };

  const [clipboardState, copyToClipboard] = useCopyToClipboard();

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    copyToClipboard(JSON.stringify(state.stack, null, 4));
    return false;
  };

  return (
    <main className={css['editor']}>
      <Form
        className={css['editor-form']}
        footer={(
          <>
            <ButtonGroup>
              <Button type='submit'>Get Code</Button>
              <Button disabled>Load Stack</Button>
            </ButtonGroup>
            {clipboardState.error
              ? <p>Unable to copy value: {clipboardState.error.message}</p>
              : clipboardState.value && <p>Copied to clipboard!</p>}
          </>
        )}
        onSubmit={onFormSubmit}
        title='Stack Editor'
      >
        <Field
          name='title'
          label="Title"
          required
          onChange={onTitleChange}
          value={state.stack.title}
        >
          {(props) => <input {...props} type='text' />}
        </Field>

        <FieldGroup title='Colors'>
          <Field
            name='background-color'
            label='Background'
            onChange={makeOnColorChange('background')}
            required
            value={state.stack.theme.background ?? ''}
          >
            {props => <input {...props} type='color' />}
          </Field>
          <Field
            name='text-color'
            label='Text'
            onChange={makeOnColorChange('text')}
            required
            value={state.stack.theme.text ?? ''}
          >
            {props => <input {...props} type='color' />}
          </Field>
        </FieldGroup>

        <FieldGroup title='Author' full>
          <Field
            name='author-name'
            label='Display Name'
            onChange={makeOnAuthorChange('name')}
            required
            value={state.stack.author.name ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
          <Field
            name='author-slug'
            label='User Name'
            onChange={makeOnAuthorChange('slug')}
            required
            value={state.stack.author.slug ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
          <Field
            name='author-name'
            label='Profile URL'
            placeholder='your website / insta / tik-tok'
            onChange={makeOnAuthorChange('url')}
            value={state.stack.author.url ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
        </FieldGroup>

        <FieldGroup title='Items' full>
          <EditorItems
            items={state.stack.items}
            onItemAdd={onItemAdd}
            onItemDelete={onItemDelete}
            onSort={onItemsSort}
          />
        </FieldGroup>
      </Form>

      <EditorPreview data={state.stack} />
    </main>
  );
}

export default Editor;
