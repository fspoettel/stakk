import React from 'react';
import { MixcloudPlayer } from '@stakk/types/MixcloudPlayer';
import loadScript from '@stakk/lib/loadScript';

interface CustomWindow extends Window {
  Mixcloud: {
    // eslint-disable-next-line no-unused-vars
    PlayerWidget(ref: HTMLIFrameElement): MixcloudPlayer;
  }
}

declare let window: CustomWindow;

type PlayerProps = {
  url: string,
  // eslint-disable-next-line no-unused-vars
  onProgress: (progress: number) => void,
  onEnded: () => void,
};

type PlayerState = {
  loaded: boolean,
};

class Player extends React.Component<PlayerProps, PlayerState> {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  player?: MixcloudPlayer;

  constructor(props: PlayerProps) {
    super(props);

    this.iframeRef = React.createRef();

    this.state = {
      loaded: false,
    };

    this.player = undefined;

    this.onEnded = this.onEnded.bind(this);
    this.onFrameLoad = this.onFrameLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  componentWillUnmount() {
    this.cleanup();
  }

  componentDidUpdate() {
    if (!this.state.loaded && this.props.url !== '') {
      loadScript('https://widget.mixcloud.com/media/js/widgetApi.js', window.Mixcloud)
      .then(() => {
        this.setState({ loaded: true });
      })
      .catch(err => {
        console.error(err);
      });
    } else if (this.state.loaded && this.props.url === '') {
      this.cleanup();
    }
  }

  shouldComponentUpdate(nextProps: PlayerProps, nextState: PlayerState) {
    return nextProps.url !== this.props.url
      || nextState.loaded !== this.state.loaded;
  }

  cleanup() {
    this.player?.events?.ended.off(this.onEnded);
    this.player?.events?.progress.off(this.onProgress);
  }

  onEnded() {
    this.props.onEnded();
    this.cleanup();
  }

  onProgress(progress: number) {
    this.props?.onProgress(progress);
  }

  onFrameLoad() {
    const { url } = this.props;

    if (
      window.Mixcloud
        && url !== ''
        && this.iframeRef.current
    ) {
      const instance = window.Mixcloud.PlayerWidget(this.iframeRef.current);

      instance.ready.then(() => {
        instance.events.ended.on(this.onEnded);
        instance.events.progress.on(this.onProgress);
        this.player = instance;
      });
    }
  }

  render() {
    if (!this.state.loaded) return null;
    if (this.props.url === '') return null;

    return (
      <iframe
        allow='autoplay'
        id='mixcloud-player'
        key={this.props.url}
        onLoad={this.onFrameLoad}
        ref={this.iframeRef}
        width='100%'
        height='60'
        frameBorder='0'
        src={this.props.url}
        title='mixcloud-player'
      />
    );
  }
}

export default Player;