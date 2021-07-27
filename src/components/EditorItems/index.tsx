import { ChangeEvent, MouseEventHandler, useCallback, useState } from 'react';
import { faSave, faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetchSpotifyPlaylist from '../../helpers/fetchSpotifyPlaylist';
import { StackItem } from '@stakk/types/StackItem';
import ButtonWithTooltip from '../ButtonWithTooltip';
import Field from '../Form/Field';

import css from './EditorItems.module.css';
import fetchMixcloudShow from '../../helpers/fetchMixcloudShow';
import SortableList from '../SortableList';
import { SortCallback } from '../SortableList/interfaces';
import EditorItem from './EditorItem';

type EditorItemsProps = {
  items: StackItem[],
  onItemAdd: (item: StackItem) => void,
  onItemDelete: MouseEventHandler;
  onSort: SortCallback
};

function EditorItems({ items, onItemAdd, onItemDelete, onSort }: EditorItemsProps) {
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);

  const isSpotifyUrl = /https:\/\/open\.spotify\.com\/playlist\/.*/.test(url);
  const isMixcloudUrl = /https:\/\/(www|m)\.mixcloud\.com\/.*/.test(url);

  const isUrlValid = isSpotifyUrl || isMixcloudUrl;

  const onItemSubmit = useCallback(async () => {
    setFetching(true);

    try {
      const item = isSpotifyUrl
        ? await fetchSpotifyPlaylist(url)
        : await fetchMixcloudShow(url);

      onItemAdd(item);
    } finally {
      setFetching(false);
      setUrl('');
    }

  }, [isSpotifyUrl, onItemAdd, setFetching, url]);

  const onUrlChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  }, [setUrl]);

  return (
    <div className={css['editoritems']}>
      <SortableList items={items} onSort={onSort}>
        {props => <EditorItem {...props} key={props.item?.id} onItemDelete={onItemDelete} />}
      </SortableList>

      <div className={css['editoritems-add']}>
        <Field
          disabled={fetching}
          name='add-item'
          hideLabel
          label='URL'
          onChange={onUrlChange}
          placeholder='enter a (spotify or mixcloud) playlist link...'
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
