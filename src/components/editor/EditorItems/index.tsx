import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMixcloud, faSpotify } from '@fortawesome/free-brands-svg-icons';
import Headline from '@stakk/components/shared/Headline';
import Combobox from '@stakk/components/shared/Combobox';
import SortableList from '@stakk/components/shared/SortableList';
import fetchStackItem from '@stakk/services/client/fetchStackItem';
import { getItems } from '@stakk/lib/stackSelectors';
import { StackItem } from '@stakk/types/StackItem';

import EditorItem from './EditorItem';

import { DispatchContext, FormStateContext } from '../reducer/context';
import * as actions from '../reducer/actions';

import css from './EditorItems.module.css';

function isSpotifyPlaylist(str: string) {
  return /^https:\/\/open\.spotify\.com\/playlist\/.*$/.test(str);
}

function isSpotifyAlbum(str: string) {
  return /^https:\/\/open\.spotify\.com\/album\/.*$/.test(str);
}

function isMixcloudShow(str: string) {
  return /^https:\/\/(www|m)\.mixcloud\.com\/.*$/.test(str);
}

function validateInput(str: string) {
  return isSpotifyPlaylist(str) || isSpotifyAlbum(str) || isMixcloudShow(str);
}

async function resolveInput(url: string) {
  let item = undefined;

  if (isSpotifyPlaylist(url)) {
    item = await fetchStackItem('spotify_playlist', { url });
  } else if (isSpotifyAlbum(url)) {
    item = await fetchStackItem('spotify_album', { url });
  } else if (isMixcloudShow(url)) {
    item = await fetchStackItem('mixcloud_show', { url });
  }

  return item;
}

function EditorItems() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(FormStateContext);

  if (!dispatch || !state) return null;

  return (
    <div className={css['editoritems']}>
      <div className={css['editoradd-container']}>
        <article className={css['editoradd-supported']}>
          <Headline tag="h5" size="xs" variant="bare">
            Currently supported:
          </Headline>
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

      <Combobox<StackItem>
        onAdd={actions.addItem(dispatch)}
        label="URL"
        placeholder="enter url"
        resolveInput={resolveInput}
        validateInput={validateInput}
        value={getItems(state.stack).reverse()}
      >
        {(comboboxProps) => (
          <SortableList<StackItem> items={comboboxProps.value} onSort={actions.sortItems(dispatch)}>
            {(props) => <EditorItem {...props} key={props.item?.id} />}
          </SortableList>
        )}
      </Combobox>
    </div>
  );
}

export default EditorItems;
