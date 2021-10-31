import React, { useEffect, useReducer } from 'react';
import { useKey } from 'react-use';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronSquareLeft,
  faChevronSquareRight,
  faSpinner,
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

import * as stackActions from '@stakk/context/stack/actions';
import * as stackSelectors from '@stakk/context/stack/selectors';
import getInitialStackState from '@stakk/context/stack/getInitialState';
import stackReducer from '@stakk/context/stack/reducer';

import * as playbackActions from '@stakk/context/playback/actions';
import * as playbackSelectors from '@stakk/context/playback/selectors';
import getInitialPlaybackState from '@stakk/context/playback/getInitialState';
import playbackReducer from '@stakk/context/playback/reducer';

import getMixCloudUrl from './lib/getMixcloudUrl';
import css from './StackContainer.module.css';
import { useCoverPreload } from '@stakk/lib/useImagePreload';
import { DragState } from '@stakk/types/DragState';

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
  const [stackState, stackDispatch] = useReducer(
    stackReducer,
    getInitialStackState(data, !!hideInitialAnimation),
  );
  const [playbackState, playbackDispatch] = useReducer(playbackReducer, getInitialPlaybackState());

  useEffect(() => {
    stackActions.reinit(stackDispatch, data, !!hideInitialAnimation);
  }, [data, hideInitialAnimation]);

  const items = stackSelectors.getItems(stackState);

  const [loading] = useCoverPreload(items);

  const activeIndex = stackSelectors.getActiveIndex(stackState);
  const activeItem = stackSelectors.getActiveItem(stackState);
  const hasPlayer = stackSelectors.getSupportsPlayback(stackState);
  const stack = stackSelectors.getStackState(stackState);
  const isStatic = stackSelectors.getIsStatic(stackState);

  const playbackIndex = playbackSelectors.getPlaybackIndex(playbackState);
  const playbackProgress = playbackSelectors.getPlaybackProgress(playbackState);
  const isPlaying = playbackSelectors.getIsPlaying(playbackState);

  const onReset = () => stackActions.reset(stackDispatch, { data, playbackIndex });
  const onPrev = () => stackActions.prev(stackDispatch);
  const onNextGeneric = () => stackActions.next(stackDispatch, { activeIndex });

  const onNext = (item?: HiddenState) => {
    stackActions.next(stackDispatch, { activeIndex, item });
  };

  const onSetDrageState = (dragState: DragState) => {
    stackActions.setDragState(stackDispatch, { dragState });
  };

  const onTogglePlayback = () => {
    stackActions.setAnimationLock(stackDispatch);
    playbackActions.togglePlayback(playbackDispatch, activeIndex);
  };

  const onPlaybackProgress = (progress: number) =>
    playbackActions.setTrackProgress(playbackDispatch, { progress });

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
              {...stack}
              hasInteraction={!!hideDragIndicator || stack.hasInteraction}
              hideInitialAnimation={isEmbed || !!hideInitialAnimation}
              isStatic={isStatic}
              items={items}
              onDrag={onSetDrageState}
              onDragCommit={onNext}
              playbackIndex={playbackIndex}
            />
            {activeItem && (
              <Details
                hideInitialAnimation={isEmbed || hideInitialAnimation}
                index={activeIndex}
                item={stackSelectors.getActiveOrNextItem(stackState)}
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
          isStatic || isPlaying
            ? []
            : [
                {
                  key: 'reset',
                  disabled: loading || stackSelectors.getIsFirstItem(stackState),
                  onClick: onReset,
                  icon: faUndo,
                  tooltip: isPlaying ? 'back to playing item' : 'back to first item',
                },
                {
                  key: 'prev',
                  disabled: loading || stackSelectors.getIsFirstItem(stackState),
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
                ? stackSelectors.getItemByIndex(stackState, playbackIndex)
                : undefined,
            )}
            onEnded={onTogglePlayback}
            onProgress={onPlaybackProgress}
          />
        </div>
      )}
    </div>
  );
}

export default StackContainer;
