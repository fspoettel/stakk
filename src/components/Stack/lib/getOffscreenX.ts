import { DragDirection } from '../../../types/DragState';

export default function getOffscreenX(direction: DragDirection): number {
  // TODO: resize support
  return (200 + window.innerWidth) * direction;
}
