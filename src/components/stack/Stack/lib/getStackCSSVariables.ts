import { ITEM_OFFSET } from './constants';

export default function getStackCSSVariables(stackSize: number): Record<string, string> {
  return {
    '--item-width': '32.5rem',
    '--item-height': '32.5rem',
    '--item-count': `${stackSize}`,
    '--item-offset': `${ITEM_OFFSET}px`,
  };
}
