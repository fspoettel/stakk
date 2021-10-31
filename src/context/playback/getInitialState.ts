export type PlaybackState = {
  index?: number;
  progress: number;
};

const getInitialState = (): PlaybackState => {
  return {
    index: undefined,
    progress: 0,
  };
};

export default getInitialState;
