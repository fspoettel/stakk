import Head from 'next/head';
import { SITE_URL } from '../../constants';
import getStackMetadata from '../../helpers/getStakkMetadata';
import { Stack } from '../../types/Stack';

type HtmlHeadProps = {
  data: Stack,
  targetItemSlug?: string
};

export default function HtmlHead({ data, targetItemSlug }: HtmlHeadProps) {
  const metadata = getStackMetadata(data);

  const mixUrl = metadata.canonicalUrl;
  const canonicalUrl = targetItemSlug ? `${mixUrl}/${targetItemSlug}` : mixUrl;

  const slug = targetItemSlug ?? data.items[data.items.length - 1].slug;

  return (
    <Head>
      <title>stakk &middot; {metadata.title}</title>
      <meta name='description' content={metadata.description} />

      <meta property='og:image' content={`${SITE_URL}/assets/og/${slug}.jpg`} />
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
