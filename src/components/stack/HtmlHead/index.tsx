import Head from 'next/head';
import { Stack } from '@stakk/types/Stack';
import getStackMetadata from '@stakk/lib/getStackMetadata';
import getCoverPath from '@stakk/lib/getCoverPath';

type HtmlHeadProps = {
  data: Stack,
  targetItemSlug?: string
};

export default function HtmlHead({ data, targetItemSlug }: HtmlHeadProps) {
  const metadata = getStackMetadata(data);

  const mixUrl = metadata.canonicalUrl;
  const canonicalUrl = targetItemSlug ? `${mixUrl}/${targetItemSlug}` : mixUrl;
  const canonicalItem = data.items[data.items.length - 1];

  return (
    <Head>
      <title>stakk &middot; {metadata.title}</title>
      <meta name='description' content={metadata.description} />

      <meta property='og:image' content={getCoverPath(canonicalItem, 'source.jpg')} />
      <meta property='og:title' content={metadata.title} />
      <meta property='og:description' content={metadata.description} />
      <meta property='og:url' content={canonicalUrl} />

      {!targetItemSlug && (
        <link
          rel='alternate'
          type='application/rss+xml'
          title={`RSS Feed for ${metadata.title}`}
          href={metadata.rssPath}
        />
      )}

      <link rel='canonical' href={canonicalUrl} />
    </Head>
  );
}
