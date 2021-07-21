import React, { useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faPlay, faStop } from '@fortawesome/pro-solid-svg-icons';
import { faWaveform } from '@fortawesome/pro-regular-svg-icons';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import formatDateString from '../../helpers/formatDateString';
import getArtistString from '../../helpers/getArtistString';
import getSpotifyPlaylistUrl from './helpers/getSpotifyUrl';

import { StackItem } from '../../types/StackItem';
import css from './Details.module.css';
import getCurrentTrack from './helpers/getCurrentTrack';
import Headline from '../Headline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DetailsProps = {
  item: StackItem,
  playbackIndex?: number,
  playbackProgress: number,
  onTogglePlayback: () => void,
};

function Details({
  item,
  playbackIndex,
  playbackProgress,
  onTogglePlayback,
}: DetailsProps) {
  const [initial, setInitial] = useState(true);
  const [artists, setArtists] = useState(getArtistString(item.tracklist));
  
  useEffect(() => {
    setInitial(false);
  }, []);

  useEffect(() => {
    setArtists(getArtistString(item.tracklist));
  }, [item]);

  const transitions = useTransition(item, {
    from: { opacity: 0, transform: 'translateY(1rem)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    config: {
      duration: 325
    },
    delay: initial ? 500 : undefined,
  });

  const playing = item.index === playbackIndex;

  const currentTrack = playing && item.tracklist && playbackProgress > 0
    ? getCurrentTrack(item.tracklist, playbackProgress)
    : null;

  return transitions(
    (styles, item) => item && (
      <animated.article className={css['details']} style={styles}>
        <header className={css['details-header']}>
          <Headline size='lg'>{item.title}</Headline>
        </header>

        <nav className={css['details-actions']}>
          <ButtonGroup>
            {item.mixcloudId && (
              <Button
                icon={playing ? faStop : faPlay}
                onClick={onTogglePlayback}
              >
                {playing ? 'Stop' : 'Play'}
              </Button>
            )}
            {item.spotifyId && (
              <Button
                href={getSpotifyPlaylistUrl(item.spotifyId)}
                icon={faSpotify}
                rel='noreferrer nofollow'
                target='_blank'
                variant='secondary'
              >
                Follow
              </Button>
            )}
          </ButtonGroup>
        </nav>
        {!playing && item.tracklist && (
          <p className={css['details-artists']}>{formatDateString(item.createdAt)} / with {artists}</p>
        )}
        {currentTrack && (
          <p className={css['details-artists']}>
            <FontAwesomeIcon icon={faWaveform} />
            Current Track: <strong>{currentTrack.artist} - {currentTrack.title}</strong>
          </p>
        )}
      </animated.article>
  ));
}

export default React.memo(Details);
