import { Interpolation, to } from '@react-spring/web';
import { Spring } from './constants';

export default function springToInnerTransform(spring: Spring): Interpolation<string, string> {
  return to(
    [spring.rot, spring.scale],
    (r, s) => `perspective(1800px) rotateX(25deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
  );
}
