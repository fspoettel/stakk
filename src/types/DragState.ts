export type DragState = {
  dragging: boolean,
  xDelta?: number,
  velocity?: number,
  index?: number,
  mouseDown?: boolean,
};

export type DragDirection = 1 | -1;
