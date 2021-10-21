import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Button from '@stakk/components/shared/Button';

type LinkButtonProps = {
  icon: IconProp,
  title: string,
  url: string,
};

function LinkButton({ icon, url, title }: LinkButtonProps) {
  return (
    <Button
      href={url}
      icon={icon}
      rel='noreferrer nofollow'
      target='_blank'
      variant='secondary'
    >
      {title}
    </Button>
  );
}

export default LinkButton;
