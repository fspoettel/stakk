import React, { useEffect, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/pro-solid-svg-icons';
import { StackItem } from '@stakk/types/StackItem';
import ButtonGroup from '@stakk/components/ButtonGroup';
import Headline from '@stakk/components/Headline';

import MixcloudButton from './MixcloudButton';
import LinkButton from './SpotifyButton';
import Description from './Description';

import css from './Details.module.css';

type DetailsProps = {
  hideInitialAnimation?: boolean,
  index: number,
  item: StackItem,
  playbackIndex?: number,
  playbackProgress: number,
  onTogglePlayback: () => void,
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
      duration: 325
    },
    delay: initial && !hideInitialAnimation ? 500 : undefined,
  });

  const playing = index === playbackIndex;

  return transitions(
    (styles, item) => item && (
      <animated.article className={css['details']} style={styles}>
        <header className={css['details-header']}>
          <Headline size='lg'>{item.title}</Headline>
        </header>

        <Description
          item={item}
          playing={playing}
          playbackProgress={playbackProgress}
        />

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
                return (
                  <LinkButton
                    url={link}
                    title={link.includes('album') ? 'Listen' : 'Follow'}
                    icon={faSpotify}
                    key={i}
                  />
                );
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
      </animated.article>
  ));
}

export default React.memo(Details);
