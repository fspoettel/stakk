import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { MouseEvent } from 'react';
import ButtonWithTooltip from '../ButtonWithTooltip';
import Combobox from '../Combobox';

import css from './Form.module.css';

type TagFieldProps = {
  label: string;
  onChange: (items: string[]) => void;
  placeholder?: string;
  value: string[];
};

export function TagField({ label, onChange, placeholder, value }: TagFieldProps) {
  const onAdd = (str: string) => {
    onChange([...value, str]);
  };

  const onRemove = (evt: MouseEvent<HTMLButtonElement>) => {
    const target = evt.currentTarget as HTMLElement;
    if (target && target.dataset?.index != null) {
      const { index } = target.dataset;
      const nextVal = [...value];
      nextVal.splice(Number.parseInt(index), 1);
      onChange(nextVal);
    }
  };

  return (
    <Combobox<string>
      label={label}
      onAdd={onAdd}
      placeholder={placeholder}
      resolveInput={(str) => Promise.resolve(str)}
      value={value}
    >
      {(props) => (
        <ul className={css['tagfield-list']}>
          {props.value.map((val, i) => (
            <li className={css['tagfield-listitem']} key={i}>
              {val}
              <ButtonWithTooltip
                data-index={i}
                onClick={onRemove}
                icon={faTimes}
                strategy="fixed"
                tooltip="remove tag"
                size="sm"
              />
            </li>
          ))}
        </ul>
      )}
    </Combobox>
  );
}
