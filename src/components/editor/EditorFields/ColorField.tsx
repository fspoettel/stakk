import { useContext } from 'react';
import * as stackSelectors from '@stakk/lib/stackSelectors';
import { ColorKey } from '@stakk/types/Stack';
import Field from '@stakk/components/shared/Form/Field';
import * as actions from '../reducer/actions';
import { DispatchContext, FormStateContext } from '../reducer/context';

type ColorFieldProps = {
  label: string;
  name: ColorKey;
};

export function ColorField({ label, name }: ColorFieldProps) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(FormStateContext);

  if (!dispatch || !state) return null;

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
