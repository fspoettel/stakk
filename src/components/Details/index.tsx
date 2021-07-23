import React, { useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { faWaveform } from '@fortawesome/pro-regular-svg-icons';
import ButtonGroup from '../ButtonGroup';
import formatDateString from '../../helpers/formatDateString';
import getArtistString from '../../helpers/getArtistString';

import css from './Details.module.css';
import { StackItem } from '../../types/StackItem';
import getCurrentTrack from './helpers/getCurrentTrack';
import Headline from '../Headline';
import MixcloudButton from './MixcloudButton';
import LinkButton from './SpotifyButton';

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
            {item.links && item.links.map((link, i) =>  {
              if (typeof link !== 'string') {
                return (
                  <LinkButton
                    url={link.url}
                    icon={faLink}
                    title={link.title ?? 'Follow'}
                    key={link.url}
                  />
                );
              }

              if (link.includes('mixcloud')) {
                return <MixcloudButton onClick={onTogglePlayback} playing={playing} key={i} />;
              }

              if (link.includes('spotify')) {
                return <LinkButton url={link} title={'Follow'} icon={faSpotify} key={i} />;
              }

              return (
                <LinkButton
                  key={i}
                  url={link}
                  title={'Follow'}
                  icon={faLink}
                />
              );
            })}
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
