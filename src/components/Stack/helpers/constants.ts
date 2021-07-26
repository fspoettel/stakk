import { SpringConfig } from '@react-spring/web';

export const ITEM_OFFSET = 6;

export type Spring = {
  delay?: number,
  x: number,
  y: number,
  rot: number,
  scale: number,
  config: SpringConfig,
  from: Partial<Spring>,
};

export function isSpring(x: unknown): x is Spring {
  return typeof x === 'object'
    && (Object.hasOwnProperty.call(x, 'x') || Object.hasOwnProperty.call(x, 'y'));
}

export type AnimationConfig = {
  delay: number,
  from: Partial<Spring>,
};
