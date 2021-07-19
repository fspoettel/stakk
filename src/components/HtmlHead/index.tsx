import Head from 'next/head';
import { Stack } from '../../types/Stack';

type HtmlHeadProps = {
  data: Stack,
  targetItemSlug?: string
};

const postfix = (str: string) => {
  if (str.endsWith('x') || str.endsWith('s')) return `${str}'`;
  return `${str}'s`;
};

export default function HtmlHead({ data, targetItemSlug }: HtmlHeadProps) {
  const baseUrl = 'https://stakk.ltd';
  const authorName = data.author.name;

  const description = `flip through ${postfix(authorName)} ${data.title} stakk`;
  const title = `${data.title} by ${authorName}`;

  const mixPath = `/${data.author.slug}/${data.slug}`;
  const canonicalPath = targetItemSlug ? `${mixPath}/${targetItemSlug}` : mixPath;

  const slug = targetItemSlug ?? data.items[data.items.length - 1].slug;

  return (
    <Head>
      <title>stakk &middot; {title}</title>
      <meta name='description' content={description} />

      <meta property='og:image' content={`${baseUrl}/assets/og/${slug}.jpg`} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={`${baseUrl}${canonicalPath}`} />

      <link rel='canonical' href={`${baseUrl}${canonicalPath}`} />
    </Head>
  );
}
