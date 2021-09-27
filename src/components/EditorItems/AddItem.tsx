import { ChangeEvent, useCallback, useState } from 'react';
import { faSave, faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMixcloud, faSpotify } from '@fortawesome/free-brands-svg-icons';
import ButtonWithTooltip from '@stakk/components/ButtonWithTooltip';
import Field from '@stakk/components/Form/Field';
import Headline from '@stakk/components/Headline';
import fetchStackItem from '@stakk/services/client/fetchStackItem';
import { StackItem } from '@stakk/types/StackItem';

import css from './EditorItems.module.css';

type AddItemProps = {
  onItemAdd: (item: StackItem) => void,
};

function AddItem({ onItemAdd }: AddItemProps) {
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);

  const isSpotifyPlaylist = /https:\/\/open\.spotify\.com\/playlist\/.*/.test(url);
  const isSpotifyAlbum = /https:\/\/open\.spotify\.com\/album\/.*/.test(url);
  const isMixcloud = /https:\/\/(www|m)\.mixcloud\.com\/.*/.test(url);
  const isUrlValid = isSpotifyPlaylist || isSpotifyAlbum || isMixcloud;

  const onItemSubmit = useCallback(async () => {
    setFetching(true);

    try {
      let item;

      if (isSpotifyPlaylist) {
        item = await fetchStackItem('spotify_playlist', { url });
      } else if (isSpotifyAlbum) {
        item = await fetchStackItem('spotify_album', { url });
      } else if (isMixcloud) {
        item = await fetchStackItem('mixcloud_show', { url });
      }

      if (item) onItemAdd(item);
    } finally {
      setFetching(false);
      setUrl('');
    }

  }, [
    isSpotifyPlaylist,
    isSpotifyAlbum,
    isMixcloud,
    onItemAdd,
    setFetching,
    url
  ]);

  const onUrlChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  }, [setUrl]);


  return (
    <div className={css['editoradd-container']}>
      <div className={css['editoradd']}>
        <Field
          disabled={fetching}
          name='add-item'
          hideLabel
          label='URL'
          onChange={onUrlChange}
          placeholder='enter or paste a URL'
          value={url}
        >
          {(props) => (<input type='text' {...props} />)}
        </Field>
        {fetching ? (
          <FontAwesomeIcon
            className={css['editoradd-spinner']}
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
            variant='secondary'
          >
            Save
          </ButtonWithTooltip>
        )}
      </div>
      <article className={css['editoradd-supported']}>
        <Headline tag='h5' size='xs' variant='bare'>Currently supported:</Headline>
        <ul className={css['editoradd-supported-list']}>
          <li>
            <FontAwesomeIcon icon={faSpotify} />
            Spotify albums &amp; playlists
          </li>
          <li>
            <FontAwesomeIcon icon={faMixcloud} />
            Mixcloud shows
          </li>
        </ul>
      </article>
    </div>
  );
}

export default AddItem;
