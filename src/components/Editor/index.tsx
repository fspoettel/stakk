import { FormEvent, useCallback, useReducer } from 'react';
import { useCopyToClipboard } from 'react-use';
import * as stackSelectors from '@stakk/lib/stackSelectors';

import ButtonGroup from '@stakk/components/ButtonGroup';
import EditorItems from '@stakk/components/EditorItems';
import EditorPreview from '@stakk/components/EditorPreview';
import Field from '@stakk/components/Form/Field';
import FieldGroup from '@stakk/components/Form/FieldGroup';
import Form from '@stakk/components/Form/Form';
import reducer from './reducer/reducer';
import Button from '@stakk/components/Button';
import LoadStackModal from '@stakk/components/LoadStackModal';

import getInitialState from './reducer/getInitialState';
import * as actions from './reducer/actions';
import * as selectors from './reducer/selectors';

import css from './Editor.module.css';

function Editor() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [clipboardState, copyToClipboard] = useCopyToClipboard();

  const stack = selectors.getStack(state);

  const onFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    copyToClipboard(JSON.stringify(stack, null, 4));
    return false;
  }, [copyToClipboard, stack]);

  const onTitleChange = useCallback(evt => actions.changeTitle(dispatch, evt), []);
  const onColorBgChange = useCallback(evt => actions.makeChangeColor('background')(dispatch, evt), []);
  const onColorTextChange = useCallback(evt => actions.makeChangeColor('text')(dispatch, evt), []);

  const onAuthorNameChange = useCallback(evt => actions.makeChangeAuthor('name')(dispatch, evt), []);
  const onAuthorSlugChange = useCallback(evt => actions.makeChangeAuthor('slug')(dispatch, evt), []);
  const onAuthorUrlChange = useCallback(evt => actions.makeChangeAuthor('url')(dispatch, evt), []);

  const onItemAdd = useCallback(item => actions.addItem(dispatch, item), []);
  const onItemDelete = useCallback(id => actions.deleteItem(dispatch, id), []);
  const onItemsSort = useCallback(evt => actions.sortItems(dispatch, evt), []);

  const onLoadStack = useCallback((stack) => actions.loadStack(dispatch, stack), []);
  const onOpenLoader = useCallback(() => actions.openStackLoader(dispatch), []);
  const onCloseLoader = useCallback(() => actions.closeStackLoader(dispatch), []);

  return (
    <main className={css['editor']}>
      <Form
        className={css['editor-form']}
        footer={(
          <>
            <ButtonGroup>
              <Button type='submit'>Get Code</Button>
              <Button onClick={onOpenLoader}>Load Stack</Button>
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
          label='Title'
          required
          onChange={onTitleChange}
          value={stackSelectors.getTitle(stack)}
        >
          {(props) => <input {...props} type='text' />}
        </Field>

        <FieldGroup title='Colors'>
          <Field
            name='background-color'
            label='Background'
            onChange={onColorBgChange}
            required
            value={stackSelectors.getBackgroundColor(stack) ?? ''}
          >
            {props => <input {...props} type='color' />}
          </Field>
          <Field
            name='text-color'
            label='Text'
            onChange={onColorTextChange}
            required
            value={stackSelectors.getTextColor(stack) ?? ''}
          >
            {props => <input {...props} type='color' />}
          </Field>
        </FieldGroup>

        <FieldGroup title='Author' full>
          <Field
            name='author-name'
            label='Display Name'
            onChange={onAuthorNameChange}
            required
            value={stackSelectors.getAuthorName(stack)}
          >
            {props => <input {...props} type='text' />}
          </Field>
          <Field
            name='author-slug'
            label='User Name'
            onChange={onAuthorSlugChange}
            required
            value={stackSelectors.getAuthorSlug(stack)}
          >
            {props => <input {...props} type='text' />}
          </Field>
          <Field
            name='author-url'
            label='Profile URL'
            placeholder='your website / insta / tik-tok'
            onChange={onAuthorUrlChange}
            value={stackSelectors.getAuthorUrl(stack) ?? ''}
          >
            {props => <input {...props} type='text' />}
          </Field>
        </FieldGroup>

        <FieldGroup title='Items' full>
          <EditorItems
            items={stackSelectors.getItems(stack)}
            onItemAdd={onItemAdd}
            onItemDelete={onItemDelete}
            onSort={onItemsSort}
          />
        </FieldGroup>
      </Form>

      <EditorPreview data={stack} />

      <LoadStackModal
        open={selectors.getStackLoaderOpen(state)}
        onConfirmLoad={onLoadStack}
        onClose={onCloseLoader}
      />
    </main>
  );
}

export default Editor;
