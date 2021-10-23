import { useContext } from 'react';
import Field from '@stakk/components/shared/Form/Field';
import * as stackSelectors from '@stakk/lib/stackSelectors';
import * as actions from '../reducer/actions';
import { DispatchContext, FormStateContext } from '../reducer/context';

export function TitleField() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(FormStateContext);

  if (!dispatch || !state) return null;

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
