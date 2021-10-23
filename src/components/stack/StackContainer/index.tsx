import React, { useCallback, useEffect, useReducer } from 'react';
import { useKey } from 'react-use';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronSquareLeft,
  faChevronSquareRight,
  faSpinner,
  faStop,
  faUndo,
} from '@fortawesome/pro-solid-svg-icons';
import { Stack as StackData } from '@stakk/types/Stack';
import { HiddenState } from '@stakk/types/HiddenState';

import { getAuthor, getColor, getTitle } from '@stakk/lib/stackSelectors';
import matchShortcutKey from '@stakk/lib/matchShortcutKey';

import Details from '@stakk/components/stack/Details';
import Footer from '@stakk/components/stack/Footer';
import Header from '@stakk/components/stack/Header';
import Player from '@stakk/components/stack/Player';
import Stack from '@stakk/components/stack/Stack';

import getMixCloudUrl from './lib/getMixcloudUrl';
import * as actions from './reducer/actions';
import * as selectors from './reducer/selectors';
import getInitialState from './reducer/getInitialState';
import stackReducer from './reducer/reducer';
import css from './StackContainer.module.css';
import { useCoverPreload } from '@stakk/lib/useImagePreload';

type StackContainerProps = {
  data: StackData;
  hideDragIndicator?: boolean;
  hideInitialAnimation?: boolean;
};

interface StackContainerStyle extends React.CSSProperties {
  '--color'?: string;
  '--background-color'?: string;
}

function StackContainer({ data, hideDragIndicator, hideInitialAnimation }: StackContainerProps) {
  const [state, dispatch] = useReducer(stackReducer, getInitialState(data, !!hideInitialAnimation));

  useEffect(() => {
    actions.reinit(dispatch, data, !!hideInitialAnimation);
  }, [data, hideInitialAnimation]);

  const { items } = state;
  const [loading] = useCoverPreload(items);

  const activeIndex = selectors.getActiveIndex(state);
  const activeItem = selectors.getActiveItem(state);

  const hasPlayer = selectors.getHasPlayer(state);
  const playbackIndex = selectors.getPlaybackIndex(state);
  const playbackProgress = selectors.getPlaybackProgress(state);
  const isPlaying = playbackIndex != null;
  const isStatic = items.length <= 1;

  const onPrev = useCallback(() => {
    actions.prev(dispatch);
  }, []);

  const onNext = useCallback(
    (item?: HiddenState) => {
      actions.next(dispatch, { activeIndex, item });
    },
    [activeIndex],
  );

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

  useKey(matchShortcutKey('ArrowRight'), onNextGeneric, {}, [onNext]);
  useKey(matchShortcutKey('ArrowLeft'), onPrev, {}, [onPrev]);

  // TODO: move this to `getInitialProps` once we query items from a database.
  // We currently implement this way to avoid rehydration problems with SSR.
  const [isEmbed, setIsEmbed] = React.useState(false);

  useEffect(() => {
    setIsEmbed(typeof window !== 'undefined' && window.location.search.includes('embed'));
  }, []);

  const stackContainerStyle: StackContainerStyle = {
    '--color': getColor(data, 'text') ?? undefined,
    '--background-color': getColor(data, 'background') ?? undefined,
  };

  return (
    <div
      className={cx([css.stackcontainer, { [css['playing']]: isPlaying }])}
      style={stackContainerStyle}
    >
      <main className={css.content}>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} pulse size="4x" />
        ) : (
          <>
            <Stack
              {...state.stack}
              hasInteraction={!!hideDragIndicator || state.stack.hasInteraction}
              hideInitialAnimation={isEmbed || hideInitialAnimation}
              isStatic={isStatic}
              items={items}
              onDrag={onSetDrageState}
              onDragCommit={onNext}
              playbackIndex={playbackIndex}
            />
            {activeItem && (
              <Details
                animationLock={state.stack.animationLock}
                hideInitialAnimation={isEmbed || hideInitialAnimation}
                index={activeIndex}
                item={selectors.getActiveOrNextItem(state)}
                onTogglePlayback={onTogglePlayback}
                playbackIndex={playbackIndex}
                playbackProgress={playbackProgress}
              />
            )}
          </>
        )}
      </main>
      <Header
        authorName={getAuthor(data, 'name') ?? ''}
        authorUrl={getAuthor(data, 'url')}
        title={getTitle(data)}
        actions={
          isStatic
            ? []
            : [
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
                  disabled:
                    loading ||
                    (isPlaying ? playbackIndex === activeIndex : selectors.getIsFirstItem(state)),
                  onClick: onReset,
                  icon: faUndo,
                  tooltip: isPlaying ? 'back to playing item' : 'back to first item',
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
              ]
        }
      />

      {!isEmbed && <Footer isPlaying={isPlaying} />}

      {!loading && hasPlayer && (
        <div className={css.audioplayer}>
          <Player
            url={getMixCloudUrl(
              isPlaying && playbackIndex != null
                ? selectors.getItemByIndex(state, playbackIndex)
                : undefined,
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
