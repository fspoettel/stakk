import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveform } from '@fortawesome/pro-regular-svg-icons';

import { StackItem } from '@stakk/types/StackItem';

import getCurrentTrack from './lib/getCurrentTrack';

import css from './Details.module.css';

type DetailsProps = {
  item: StackItem;
  playing: boolean;
  playbackProgress: number;
};

function Description({ item, playing, playbackProgress }: DetailsProps) {
  const currentTrack =
    playing && item.tracklist && playbackProgress > 0
      ? getCurrentTrack(item.tracklist, playbackProgress)
      : null;

  if (playing && currentTrack) {
    return (
      <p className={css['details-artists']}>
        <FontAwesomeIcon icon={faWaveform} />
        Current Track:{' '}
        <strong>
          {currentTrack.artist} - {currentTrack.title}
        </strong>
      </p>
    );
  }

  if (item.description) {
    return (
      <p
        className={css['details-artists']}
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
    );
  }

  return null;
}

export default Description;
