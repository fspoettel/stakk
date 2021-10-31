import { useContext } from 'react';
import * as stackSelectors from '@stakk/lib/stackSelectors';
import { ColorKey } from '@stakk/types/Stack';
import Field from '@stakk/components/shared/Form/Field';
import * as actions from '@stakk/context/editor/actions';
import { EditorContext } from '@stakk/context/editor/context';

type ColorFieldProps = {
  label: string;
  name: ColorKey;
};

export function ColorField({ label, name }: ColorFieldProps) {
  const { dispatch, state } = useContext(EditorContext);
  const onColorChange = actions.changeColor(dispatch, name);

  return (
    <Field
      name={name}
      label={label}
      onChange={onColorChange}
      required
      value={stackSelectors.getColor(state.stack, name) ?? ''}
    >
      {(props) => <input {...props} type="color" />}
    </Field>
  );
}
