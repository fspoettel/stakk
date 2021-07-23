import { StackItem } from '../../../types/StackItem';

function getMixCloudUrl(playbackItem?: StackItem): string {
  if (!playbackItem || !playbackItem.links) return '';

  const mixcloudUrl = playbackItem.links.find(url => url.includes('mixcloud'));
  if (!mixcloudUrl) return '';

  const mixcloudURL = new URL(mixcloudUrl);
  const mixcloudId = mixcloudURL.pathname;

  const url = new URL('https://www.mixcloud.com/widget/iframe/');
  url.searchParams.set('mini', '1');
  url.searchParams.set('hide_artwork', '0');
  url.searchParams.set('autoplay', '1');
  url.searchParams.set('feed', mixcloudId);
  return url.href;
}

export default getMixCloudUrl;
