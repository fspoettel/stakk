import { KeyFilter } from 'react-use/lib/useKey';

function notInputTarget(event: KeyboardEvent): boolean {
  const inputFocused = event.target instanceof Element
  && ['INPUT', 'TEXTAREA'].includes(event.target.tagName);

  return !inputFocused;
}

function matchShortcutKey(key: string): KeyFilter {
  return (event: KeyboardEvent): boolean => {
    return event.key === key && notInputTarget(event);
  };
}

export default matchShortcutKey;
