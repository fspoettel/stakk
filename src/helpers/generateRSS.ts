import { SITE_OPERATOR, SITE_URL } from '../constants';
import { Stack } from '../types/Stack';
import { StackItem } from '../types/StackItem';
import { getCoverPath } from './getCoverPath';
import getArtistString from './getArtistString';
import getStackMetadata, { StackMetadata } from './getStackMetadata';

function generateRSSItem(item: StackItem, metadata: StackMetadata): string {
  const content = `
        <![CDATA[ 
        <p><img src="${SITE_URL}${getCoverPath(item, 'og', 'jpg')}" /></p>
        <p>with ${getArtistString(item.tracklist)}</p>
        ]]>
      `;

  return `
    <item>
      <guid isPermaLink="false">${item.id}</guid>
      <title>${item.title}</title>
      <description>${content}</description>
      <link>${metadata.canonicalUrl}/${item.slug}</link>
      <pubDate>${new Date(item.createdAt).toUTCString()}</pubDate>
    </item>
    `;
}

function generateRSS(data: Stack): string {
  const metadata = getStackMetadata(data);
  const date = new Date();

  const latestItem = data.items[data.items.length - 1];
  const pubDate = new Date(latestItem.createdAt).toUTCString();

  const items = data.items
    .map((item) => generateRSSItem(item, metadata))
    .reverse()
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${metadata.title}</title>
    <description>${metadata.description}</description>
    <language>en-us</language>
    <link>${metadata.canonicalUrl}</link>
    <copyright>${date.getFullYear()} ${SITE_OPERATOR} All rights reserved</copyright>
    <lastBuildDate>${date.toUTCString()}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>1800</ttl>
    <atom:link href="${SITE_URL}${metadata.rssPath}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>
`;
}

export default generateRSS;

