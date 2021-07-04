import React from 'react';
import { animated, useSprings } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import { StackItem } from '../../types/StackItem';
import { DragDirection, DragState } from '../../types/DragState';
import { HiddenState } from '../../types/HiddenState';
import useDidMountEffect from '../../helpers/useDidMountEffect';
import css from '../../styles/Stack.module.css';
import GenreSticker from '../GenreSticker';
import Cover from '../Cover';

import exceedsDragThreshold from './helpers/exceedsDragThreshold';
import getDirectionFromDelta from './helpers/getDirectionFromDelta';
import getStackCSSVariables from './helpers/getStackCSSVariables';
import springToInnerTransform from './helpers/springToInnerTransform';
import springToOuterTransform from './helpers/springToOuterTransform';
import { isSpring } from './helpers/constants';
import { updateDraggingSpring, updateRestingSpring } from './helpers/updateSprings';
import { toSpringStacked } from './helpers/springs/springStacked';

type StackProps = {
  activeIndex: number,
  animationLock: boolean,
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
  hiddenItems,
  dragState,
  items,
  playbackIndex,
  onDragCommit,
  onDrag,
}: StackProps) {
  const stackSize = items.length;
  const [springs, api] = useSprings(items.length, toSpringStacked(stackSize, true));

  const shouldAnimateChanges = !dragState.dragging
    && activeIndex === items.length - 1
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
    if (index !== activeIndex) return;

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
      {springs.map((spring, i: number) => {
        if (!isSpring(spring)) return null;

        return (
          <animated.div
            key={i}
            className={css['stack-item-outer']}
            style={{ transform: springToOuterTransform(spring) }}
          >
            <animated.div
              {...bind(i)}
              className={css['stack-item-inner']}
              style={{ transform: springToInnerTransform(spring) }}
            >
              <Cover
                title={items[i].title}
                playing={playbackIndex === i}
                src={items[i].src}
              >
                <GenreSticker item={items[i]} />
              </Cover>
            </animated.div>
          </animated.div>
        );
      })}
    </section>
  );
}

// we need to memoize here to avoid re-renders due to high-frequency
// updates in the parent that do not concern the component (e.g. playback progress)
// these can cause the intro animation to update in an infinite loop.
export default React.memo(Stack);
