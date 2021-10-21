import { DragDirection } from '@stakk/types/DragState';

export default function getDirectionFromDelta(delta: number): DragDirection {
  return delta < 0 ? -1 : 1;
}
