import React from 'react';
import { useSprings } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper, faUndo } from '@fortawesome/pro-solid-svg-icons';

import { DragDirection, DragState } from '../../types/DragState';
import { HiddenState } from '../../types/HiddenState';
import useDidMountEffect from '../../helpers/useDidMountEffect';
import css from './Stack.module.css';


import exceedsDragThreshold from './helpers/exceedsDragThreshold';
import getDirectionFromDelta from './helpers/getDirectionFromDelta';
import getStackCSSVariables from './helpers/getStackCSSVariables';
import { updateDraggingSpring, updateRestingSpring } from './helpers/updateSprings';
import { toSpringStacked } from './helpers/springs/springStacked';
import StackMember from './StackMember';
import { StackItem } from '../../types/StackItem';

type StackProps = {
  activeIndex: number,
  animationLock: boolean,
  hasInteraction: boolean,
  hiddenItems: Record<string, HiddenState>,
  dragState: DragState,
  items: StackItem[],
  playbackIndex?: number,
  // eslint-disable-next-line no-unused-vars
  onDragCommit: (payload: { direction: DragDirection, index: number }) => void,
  // eslint-disable-next-line no-unused-vars
  onDrag: (payload: DragState) => void,
};

/**
 * This component works the following:
 * each item in the stack is split into two layers:
 *  1. an `outer` layer that takes full width / height of the container
 *  2. an `inner` layer that renders the target item (via the `children` render function)
 * the outer layer is used to modulate `y` and create the illusion of a stack of items.
 * the inner layer is used to modulate rotation and scale of the image during the initial animation. `perspective` is applied here to
 * create the illusion of depth.
 */
function Stack({
  activeIndex,
  animationLock,
  hasInteraction,
  hiddenItems,
  dragState,
  items,
  playbackIndex,
  onDragCommit,
  onDrag,
}: StackProps) {
  const stackSize = items.length;
  const [springs, api] = useSprings(items.length, toSpringStacked(stackSize, true));

  const isFirstItem = activeIndex === items.length - 1;
  const isLastItem = activeIndex === 0;
  const isStatic = items.length === 1;

  const shouldAnimateChanges = !dragState.dragging
    && isFirstItem
    && !animationLock;

  useDidMountEffect(() => {
    const { index } = dragState;

    api.start(i => {
      const hiddenItem = i > activeIndex
        ? hiddenItems[i] ?? { direction: 1, index: i }
        : undefined;

      return index === i && dragState.dragging
        ? updateDraggingSpring({ hiddenItem, dragState })
        : updateRestingSpring({
          hiddenItem,
          index: i,
          isPlaying: playbackIndex === i,
          shouldAnimate: shouldAnimateChanges,
          stackSize,
        });
    });
  }, [
    activeIndex,
    api,
    hiddenItems,
    playbackIndex,
    dragState,
    stackSize,
    shouldAnimateChanges,
  ]);

  const bind = useDrag(({
    args: [index],
    dragging,
    down: mouseDown,
    movement: [xDelta],
    velocity
  }) => {
    if (index !== activeIndex || isStatic) return;

    const dragState = {
      dragging,
      index,
      mouseDown,
      velocity,
      xDelta,
    };

    onDrag(dragState);
    if (!dragging && (velocity > 0.5 || exceedsDragThreshold(dragState))) {
      onDragCommit({
        direction: getDirectionFromDelta(xDelta),
        index,
      });
    }
  });

  return (
    <section className={css['stack']} style={getStackCSSVariables(items.length)}>
      {springs.map((spring, i: number) => (
        <StackMember
          bind={bind}
          key={i}
          index={i}
          item={items[i]}
          isPlaying={playbackIndex === i}
          spring={spring}
        />
      ))}

      {isLastItem && exceedsDragThreshold(dragState) && (
        <div className={css['stack-instructions']}>
          <div className={css['stack-instructions-icon']}>
            <FontAwesomeIcon icon={faUndo} size="2x" />
          </div>
          <p>back to first item</p>
        </div>
      )}

      {!hasInteraction && !isStatic && (
        <FontAwesomeIcon
          className={css['stack-drag-indicator']}
          icon={faHandPaper}
          size='3x'
        />
      )}
    </section>
  );
}

// we need to memoize here to avoid re-renders due to high-frequency
// updates in the parent that do not concern the component (e.g. playback progress)
// these can cause the intro animation to update in an infinite loop.
export default React.memo(Stack);
