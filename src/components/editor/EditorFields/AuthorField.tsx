import { useContext } from 'react';
import Field from '@stakk/components/shared/Form/Field';
import { AuthorKey } from '@stakk/types/Stack';
import * as stackSelectors from '@stakk/lib/stackSelectors';
import * as actions from '../reducer/actions';
import { DispatchContext, FormStateContext } from '../reducer/context';

type AuthorFieldProps = {
  label: string;
  name: AuthorKey;
};

export function AuthorField({ label, name }: AuthorFieldProps) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(FormStateContext);

  if (!dispatch || !state) return null;

  const onChange = actions.changeAuthor(dispatch, name);

  return (
    <Field
      name={name}
      label={label}
      onChange={onChange}
      required
      value={stackSelectors.getAuthor(state.stack, name) ?? ''}
    >
      {(props) => <input {...props} type="text" />}
    </Field>
  );
}
