import React,{ useCallback, useEffect, useReducer } from 'react';
import { useKey } from 'react-use';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronSquareLeft, faChevronSquareRight, faRedo, faSpinner, faStop } from '@fortawesome/pro-solid-svg-icons';
import { Stack as StackData } from '../../types/Stack';

import preloadImage from '../../helpers/preloadImage';
import getMixCloudUrl from './helpers/getMixcloudUrl';
import Details from '../Details';
import Header from '../Header';
import Player from '../Player';
import Stack from '../Stack';

import * as actions from '../../reducer/actions';
import * as selectors from '../../reducer/selectors';
import getInitialState from '../../reducer/getInitialState';
import stackReducer from '../../reducer/reducer';

import css from '../../styles/StackContainer.module.css';
import { HiddenState } from '../../types/HiddenState';

type StackContainerProps = {
  children?: React.ReactNode,
  data: StackData;
};

function StackContainer({ children, data }: StackContainerProps) {
  const [state, dispatch] = useReducer(stackReducer, getInitialState(data));

  const activeIndex = selectors.getActiveIndex(state);
  const playbackIndex = selectors.getPlaybackIndex(state);
  const activeItem = selectors.getActiveItem(state);
  const items = selectors.getItems(state);
  const loading = selectors.getIsLoading(state);
  const playbackProgress = selectors.getPlaybackProgress(state);

  useEffect(() => {
    function run() {
      Promise.all([
        preloadImage('/assets/overlay-600px.png'),
        ...items.map(item => preloadImage(item.src).catch(err => console.error(err))),
      ])
      .then(() => actions.load(dispatch));
    }

    run();
  }, [items]);

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
        { [css['playing']]: playbackIndex != null }
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
            icon: faStop
          },
          {
            key: 'prev',
            disabled: loading || selectors.getIsFirstItem(state),
            onClick: onPrev,
            icon: faChevronSquareLeft,
          },
          {
            key: 'next',
            disabled: loading,
            onClick: onNextGeneric,
            icon: faChevronSquareRight
          },
          {
            key: 'reset',
            disabled: loading,
            onClick: onReset,
            icon: faRedo
          },
        ]}
      />

      {children}

      {!loading && (
        <div className={css.audioplayer}>
          <Player
            url={getMixCloudUrl(
              playbackIndex != null
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
