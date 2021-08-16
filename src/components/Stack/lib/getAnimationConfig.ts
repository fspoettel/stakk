import { AnimationConfig } from './constants';

export default function getAnimationConfig(index: number): AnimationConfig {
  return {
    delay: index * 33,
    from: {
      x: 0,
      rot: 0,
      scale: 1.1,
      y: -1000,
    }
  };
}