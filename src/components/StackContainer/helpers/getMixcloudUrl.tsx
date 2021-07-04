import { StackItem } from '../../../types/StackItem';

function getMixCloudUrl(playbackItem?: StackItem): string {
  if (!playbackItem) return '';

  const url = new URL('https://www.mixcloud.com/widget/iframe/');
  url.searchParams.set('mini', '1');
  url.searchParams.set('hide_artwork', '0');
  url.searchParams.set('autoplay', '1');
  if (playbackItem?.mixcloudId) url.searchParams.set('feed', playbackItem.mixcloudId);
  return url.href;
}

export default getMixCloudUrl;
