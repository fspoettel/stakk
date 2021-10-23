import { useReducer } from 'react';

import EditorItems from '@stakk/components/editor/EditorItems';
import EditorPreview from '@stakk/components/editor/EditorPreview';
import FieldGroup from '@stakk/components/shared/Form/FieldGroup';
import Form from '@stakk/components/shared/Form/Form';

import reducer from '../reducer/reducer';
import getInitialState from '../reducer/getInitialState';

import css from './Editor.module.css';
import { DispatchContext, FormStateContext } from '../reducer/context';
import { TitleField } from '../EditorFields/TitleField';
import { ColorField } from '../EditorFields/ColorField';
import { AuthorField } from '../EditorFields/AuthorField';
import { EditorActions } from '../EditorActions';

function Editor() {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <DispatchContext.Provider value={dispatch}>
      <FormStateContext.Provider value={state}>
        <main className={css['editor']}>
          <Form className={css['editor-form']}>
            <FieldGroup>
              <EditorActions />
            </FieldGroup>
            <FieldGroup title="Details" full>
              <TitleField />
            </FieldGroup>

            <FieldGroup title="Colors">
              <ColorField name="background" label="Background" />
              <ColorField name="text" label="Text" />
            </FieldGroup>

            <FieldGroup title="Author" full>
              <AuthorField name="name" label="Display Name" />
              <AuthorField name="slug" label="User Name" />
              <AuthorField name="url" label="Profile Url" />
            </FieldGroup>

            <FieldGroup title="Items" full>
              <EditorItems />
            </FieldGroup>
          </Form>

          <EditorPreview />
        </main>
      </FormStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default Editor;
