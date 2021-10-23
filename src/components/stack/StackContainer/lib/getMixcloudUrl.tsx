import { ExternalLink } from '@stakk/types/ExternalLink';
import { StackItem } from '@stakk/types/StackItem';

function isMixcloudUrl(url: ExternalLink | string): url is string {
  return typeof url === 'string' && url.includes('mixcloud');
}

function getMixCloudUrl(playbackItem?: StackItem): string {
  if (!playbackItem || !playbackItem.primaryUrl || !isMixcloudUrl(playbackItem.primaryUrl)) return '';

  const mixcloudUrl = playbackItem.primaryUrl;
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
