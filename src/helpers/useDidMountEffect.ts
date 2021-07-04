import { useEffect, useRef } from 'react';

function useDidMountEffect(func: () => void, deps: unknown[] = []): void {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, ...deps]);
}

export default useDidMountEffect;
