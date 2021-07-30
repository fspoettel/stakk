import { DragState } from '@stakk/types/DragState';

function getRootFontSize(): number {
  let fontSize;
  if (typeof window !== 'undefined') {
    fontSize = Number.parseFloat(window?.getComputedStyle(document.documentElement).fontSize) ?? 16;
  } else {
    fontSize = 16;
  }

  return fontSize;
}

export default function exceedsDragThreshold(dragState: DragState): boolean {
  const { xDelta } = dragState;
  if (!xDelta) return false;

  const fontSize = getRootFontSize();

  const dragCommitThreshold = window.innerWidth > 600
    ? (32.5 * fontSize / 2) + fontSize * 2
    : window.innerWidth / 3;

  return xDelta > dragCommitThreshold || xDelta < dragCommitThreshold * -1;
}
