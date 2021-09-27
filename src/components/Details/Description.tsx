import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveform } from '@fortawesome/pro-regular-svg-icons';

import { StackItem } from '@stakk/types/StackItem';
import formatDateString from '@stakk/lib/formatDateString';
import getArtistString from '@stakk/lib/getArtistString';

import getCurrentTrack from './lib/getCurrentTrack';

import css from './Details.module.css';

type DetailsProps = {
  item: StackItem,
  playing: boolean,
  playbackProgress: number,
};

function Description({ item, playing, playbackProgress }: DetailsProps) {
  const [artists, setArtists] = useState(getArtistString(item.tracklist));

  useEffect(() => {
    setArtists(getArtistString(item.tracklist));
  }, [item]);

  const currentTrack = playing && item.tracklist && playbackProgress > 0
    ? getCurrentTrack(item.tracklist, playbackProgress)
    : null;

  if (playing && currentTrack) {
    return (
      <p className={css['details-artists']}>
        <FontAwesomeIcon icon={faWaveform} />
        Current Track: <strong>{currentTrack.artist} - {currentTrack.title}</strong>
      </p>
    );
  }

  const hasTracklist = item.tracklist && item.tracklist.length > 0;

  const isMixcloud = typeof item.links?.[0] === 'string'
    && item.links[0].includes('mixcloud');

  if (item.description && !(isMixcloud && hasTracklist)) {
    return (
      <p
        className={css['details-artists']}
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
    );
  }

  if (hasTracklist) {
    return (
      <p className={css['details-artists']}>{formatDateString(item.createdAt)} / with {artists}</p>
    );
  }

  return null;
}


export default Description;
