import React,{ useCallback, useEffect, useReducer } from 'react';
import { useKey } from 'react-use';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronSquareLeft, faChevronSquareRight, faSpinner, faStop, faUndo } from '@fortawesome/pro-solid-svg-icons';

import { HiddenState } from '../../types/HiddenState';
import { Stack as StackData } from '../../types/Stack';
import { rafPromise } from '../../helpers/rafPromise';
import setRootCSSVariable from '../../helpers/setRootCSSVariable';
import preloadImage from '../../helpers/preloadImage';
import getMixCloudUrl from './helpers/getMixcloudUrl';
import Details from '../Details';
import Footer from '../Footer';
import Header from '../Header';
import Player from '../Player';
import Stack from '../Stack';

import * as actions from '../../reducer/actions';
import * as selectors from '../../reducer/selectors';
import getInitialState from '../../reducer/getInitialState';
import stackReducer from '../../reducer/reducer';

import css from './StackContainer.module.css';
import { getCoverPath } from '../../helpers/getCoverPath';

type StackContainerProps = {
  data: StackData;
};

function StackContainer({ data }: StackContainerProps) {
  const [state, dispatch] = useReducer(stackReducer, getInitialState(data));

  const items = selectors.getItems(state);
  const loading = selectors.getIsLoading(state);

  useEffect(() => {
    setRootCSSVariable('--color', data?.theme?.text);
    setRootCSSVariable('--background-color', data?.theme?.background);
  }, [data]);

  useEffect(() => {
    function run() {
      Promise.all([
        preloadImage('/assets/overlay-600px.webp'),
        ...items.map(item => preloadImage(getCoverPath(item)).catch(err => console.error(err))),
      ])
      .then(rafPromise)
      .then(() => actions.load(dispatch));
    }

    run();
  }, [items]);

  const activeIndex = selectors.getActiveIndex(state);
  const activeItem = selectors.getActiveItem(state);

  const hasPlayer = selectors.getHasPlayer(state);
  const playbackIndex = selectors.getPlaybackIndex(state);
  const playbackProgress = selectors.getPlaybackProgress(state);
  const isPlaying = playbackIndex != null;

  const onPrev = useCallback(() => {
    actions.prev(dispatch);
  }, []);

  const onNext = useCallback((item?: HiddenState) => {
    actions.next(dispatch, { activeIndex, item });
  }, [activeIndex]);

  const onNextGeneric = useCallback(() => {
    actions.next(dispatch, { activeIndex });
  }, [activeIndex]);

  const onReset = useCallback(() => {
    actions.reset(dispatch, { data, playbackIndex });
  }, [data, playbackIndex]);

  const onSetDrageState = useCallback((dragState) => {
    actions.setDragState(dispatch, { dragState });
  }, []);

  const onTogglePlayback = useCallback(() => {
    actions.togglePlayback(dispatch);
  }, []);

  const onStopPlayback = useCallback(() => {
    actions.stopPlayback(dispatch);
  }, []);

  const onPlaybackProgress = useCallback((progress) => {
    actions.setTrackProgress(dispatch, { progress });
  }, []);

  useKey('ArrowRight', onNextGeneric, {}, [onNext]);
  useKey('ArrowLeft', onPrev, {}, [onPrev]);

  return (
    <div
      className={cx([
        css.stackcontainer,
        { [css['playing']]: isPlaying }
      ])}
    >
      <main className={css.content}>
        {loading
          ? (
            <FontAwesomeIcon
              icon={faSpinner}
              pulse
              size='4x'
            />
          )
          : (
            <>
              <Stack
                {...state.stack}
                items={items}
                playbackIndex={playbackIndex}
                onDragCommit={onNext}
                onDrag={onSetDrageState}
              />
              {activeItem && (
                <Details
                  item={selectors.getActiveOrNextItem(state)}
                  playbackIndex={playbackIndex}
                  playbackProgress={playbackProgress}
                  onTogglePlayback={onTogglePlayback}
                />
              )}
            </>
          )
        }
      </main>
      <Header
        authorName={selectors.getAuthorName(state)}
        authorUrl={selectors.getAuthorUrl(state)}
        title={selectors.getTitle(state)}
        actions={[
          {
            key: 'stopPlayback',
            visible: playbackIndex != null,
            disabled: false,
            onClick: onStopPlayback,
            icon: faStop,
            tooltip: 'stop playback',
          },
          {
            key: 'reset',
            disabled: loading || (
              isPlaying
                ? playbackIndex === activeIndex
                : selectors.getIsFirstItem(state)
            ),
            onClick: onReset,
            icon: faUndo,
            tooltip: isPlaying ? 'back to playing item' : 'back to first item'
          },
          {
            key: 'prev',
            disabled: loading || selectors.getIsFirstItem(state),
            onClick: onPrev,
            icon: faChevronSquareLeft,
            tooltip: 'prev. item',
          },
          {
            key: 'next',
            disabled: loading,
            onClick: onNextGeneric,
            icon: faChevronSquareRight,
            tooltip: 'next item',
          },
        ]}
      />

      <Footer isPlaying={isPlaying} />

      {!loading && hasPlayer && (
        <div className={css.audioplayer}>
          <Player
            url={getMixCloudUrl(
              isPlaying && playbackIndex != null
                ? selectors.getItemByIndex(state, playbackIndex)
                : undefined
            )}
            onEnded={onStopPlayback}
            onProgress={onPlaybackProgress}
          />
        </div>
      )}
    </div>
  );
}

export default StackContainer;
