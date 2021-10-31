import { useContext } from 'react';
import Field from '@stakk/components/shared/Form/Field';
import { AuthorKey } from '@stakk/types/Stack';
import * as stackSelectors from '@stakk/lib/stackSelectors';
import * as actions from '@stakk/context/editor/actions';
import { EditorContext } from '@stakk/context/editor/context';

type AuthorFieldProps = {
  label: string;
  name: AuthorKey;
};

export function AuthorField({ label, name }: AuthorFieldProps) {
  const { dispatch, state } = useContext(EditorContext);

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
