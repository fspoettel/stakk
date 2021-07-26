import { faSave, faSpinner, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import fetchSpotifyPlaylist from '../../helpers/fetchSpotifyPlaylist';
import { StackItem } from '@stakk/types/StackItem';
import ButtonGroup from '../ButtonGroup';
import ButtonWithTooltip from '../ButtonWithTooltip';
import Field from '../Form/Field';

import css from './EditorItems.module.css';

type EditorItemsProps = {
  items: StackItem[],
  onItemAdd: (item: StackItem) => void,
  onItemDelete: MouseEventHandler;
};

function EditorItems({ items, onItemAdd, onItemDelete }: EditorItemsProps) {
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);

  const isUrlValid = /https:\/\/open\.spotify\.com\/playlist\/.*/.test(url);

  const onItemSubmit = useCallback(async () => {
    setFetching(true);

    try {
      const item = await fetchSpotifyPlaylist(url);
      onItemAdd(item);
    } finally {
      setFetching(false);
      setUrl('');
    }

  }, [onItemAdd, setFetching, url]);

  const onUrlChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  }, [setUrl]);

  return (
    <div className={css['editoritems']}>
      <ol className={css['editoritems-listing']}>
        {items.map((item) => (
          <li className={css['editoritems-item']} key={item.id}>
            <span>{item.title}</span>
            <ButtonGroup className={css['editoritems-item-actions']}>
              <ButtonWithTooltip
                data-id={item.id}
                icon={faTrash}
                onClick={onItemDelete}
                tooltip='delete item'
              />
            </ButtonGroup>
          </li>
        ))}
      </ol>

      <div className={css['editoritems-add']}>
        <Field
          disabled={fetching}
          name='add-item'
          hideLabel
          label='URL'
          size='small'
          onChange={onUrlChange}
          placeholder='enter a spotify playlist link...'
          value={url}
        >
          {(props) => (<input type='text' {...props} />)}
        </Field>
        {fetching ? (
          <FontAwesomeIcon
            className={css['editoritems-add-spinner']}
            icon={faSpinner}
            pulse
            size='1x'
          />
        ) : (
          <ButtonWithTooltip
            disabled={!isUrlValid}
            icon={faSave}
            onClick={onItemSubmit}
            tooltip='add item'
          />
        )}
      </div>
    </div>
  );
}

export default EditorItems;
