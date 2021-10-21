import { MouseEventHandler } from 'react';
import { faPlay, faStop } from '@fortawesome/pro-solid-svg-icons';
import Button from '@stakk/components/shared/Button';

type MixcloudButtonProps = {
  onClick: MouseEventHandler,
  playing: boolean,
};

function MixcloudButton({ onClick, playing }: MixcloudButtonProps) {
  return (
    <Button
    icon={playing ? faStop : faPlay}
    onClick={onClick}
  >
    {playing ? 'Stop' : 'Play'}
  </Button>
  );
}

export default MixcloudButton;
