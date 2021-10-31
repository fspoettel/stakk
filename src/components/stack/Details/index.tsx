import React, { useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { faBandcamp, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { StackItem } from '@stakk/types/StackItem';
import ButtonGroup from '@stakk/components/shared/ButtonGroup';
import Headline from '@stakk/components/shared/Headline';

import MixcloudButton from './MixcloudButton';
import LinkButton from './SpotifyButton';
import Description from './Description';

import css from './Details.module.css';

function getIconForUrl(url: string) {
  if (url.includes('spotify.com')) return faSpotify;
  if (url.includes('youtube.com') || url.includes('youtu.be')) return faYoutube;
  if (url.includes('bandcamp.com')) return faBandcamp;
  return faLink;
}

type DetailsProps = {
  hideInitialAnimation?: boolean;
  index: number;
  item: StackItem;
  playbackIndex?: number;
  playbackProgress: number;
  onTogglePlayback: () => void;
};

function Details({
  hideInitialAnimation,
  item,
  index,
  playbackIndex,
  playbackProgress,
  onTogglePlayback,
}: DetailsProps) {
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    setInitial(false);
  }, []);

  const transitions = useTransition(item, {
    from: { opacity: 0, transform: 'translateY(1rem)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    config: {
      duration: 325,
    },
    delay: initial && !hideInitialAnimation ? 500 : undefined,
  });

  const playing = index === playbackIndex;

  return transitions(
    (styles, item) =>
      item && (
        <animated.article className={css['details']} style={styles}>
          <header className={css['details-header']}>
            <Headline size="lg">{item.title}</Headline>
          </header>

          <Description item={item} playing={playing} playbackProgress={playbackProgress} />

          <nav className={css['details-actions']}>
            <ButtonGroup>
              {item.primaryUrl.includes('mixcloud') && (
                <MixcloudButton onClick={onTogglePlayback} playing={playing} />
              )}
              {item.primaryUrl.includes('spotify') && (
                <LinkButton
                  url={item.primaryUrl}
                  title={item.primaryUrl.includes('album') ? 'Listen' : 'Follow'}
                  icon={faSpotify}
                />
              )}

              {item.secondaryUrls.map((link) => (
                <LinkButton
                  url={link.url}
                  icon={getIconForUrl(link.url)}
                  title={link.title ?? 'Follow'}
                  key={link.url}
                />
              ))}
            </ButtonGroup>
          </nav>
        </animated.article>
      ),
  );
}

export default React.memo(Details);
