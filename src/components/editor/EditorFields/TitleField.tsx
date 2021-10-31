import { useContext } from 'react';
import Field from '@stakk/components/shared/Form/Field';
import * as stackSelectors from '@stakk/lib/stackSelectors';
import * as actions from '@stakk/context/editor/actions';
import { EditorContext } from '@stakk/context/editor/context';

export function TitleField() {
  const { dispatch, state } = useContext(EditorContext);
  const onTitleChange = actions.changeTitle(dispatch);

  return (
    <Field
      name="title"
      label="Title"
      required
      onChange={onTitleChange}
      value={stackSelectors.getTitle(state.stack)}
    >
      {(props) => <input {...props} type="text" />}
    </Field>
  );
}
