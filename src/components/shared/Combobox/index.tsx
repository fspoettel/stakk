import { ChangeEvent, KeyboardEvent, ReactNode, useState } from 'react';
import { faPlusCircle, faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ButtonWithTooltip from '@stakk/components/shared/ButtonWithTooltip';
import Field from '@stakk/components/shared/Form/Field';

import css from './Combobox.module.css';

type ChildProps<T> = {
  value: T[];
};

type ComboboxProps<T = string> = {
  children: (props: ChildProps<T>) => ReactNode;
  disabled?: boolean;
  label: string;
  onAdd: (item: T) => void;
  placeholder?: string;
  resolveInput: (val: string) => Promise<T | undefined>;
  validateInput?: (val: string) => boolean;
  value: T[];
};

function Combobox<T = string>({
  children,
  disabled,
  label,
  onAdd,
  placeholder,
  resolveInput,
  validateInput,
  value,
}: ComboboxProps<T>) {
  const [resolving, setResolving] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addDisabled = disabled || (validateInput && !validateInput(inputValue));

  const onAddItem = async () => {
    if (addDisabled) return;
    try {
      setResolving(true);
      const resolved = await resolveInput(inputValue);
      if (resolved) onAdd(resolved);
    } catch (err) {
      // TODO: display error
      console.error(err);
    } finally {
      setResolving(false);
      setInputValue('');
    }
  };

  const onInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      onAddItem();
    }
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  return (
    <div className={css['combobox']}>
      <div className={css['combobox-input']}>
        <Field
          disabled={disabled}
          name="add-item"
          hideLabel
          label={label}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          value={inputValue}
        >
          {(props) => <input type="text" {...props} />}
        </Field>

        {resolving ? (
          <FontAwesomeIcon
            className={css['combobox-input-spinner']}
            icon={faSpinner}
            pulse
            size="1x"
          />
        ) : (
          <ButtonWithTooltip
            disabled={addDisabled}
            icon={faPlusCircle}
            onClick={onAddItem}
            tooltip="add item"
            variant="secondary"
          />
        )}
      </div>
      {children && <div className={css['combobox-value']}>{children({ value })}</div>}
    </div>
  );
}

export default Combobox;
