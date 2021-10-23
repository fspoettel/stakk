/* eslint-disable no-unused-vars */
export type MixcloudPlayer = {
  ready: Promise<void>;
  pause(): void;
  events: {
    ended: {
      on(cb: () => void): void;
      off(cb: () => void): void;
    };
    progress: {
      on(cb: (progress: number) => void): void;
      off(cb: (progress: number) => void): void;
    };
  };
};
