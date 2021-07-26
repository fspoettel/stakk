import { Interpolation, to } from '@react-spring/web';
import { Spring } from './constants';

export default function springToOuterTransform(spring: Spring): Interpolation<string, string> {
  return to(
    [spring.x, spring.y],
    (x, y) => `translate3d(${x}px,${y}px,0)`
  );
}
