import { SITE_URL } from '../constants';
import { Stack } from '@stakk/types/Stack';

export type StackMetadata = {
  canonicalUrl: string,
  description: string,
  rssPath: string,
  title: string,
};

function postfix(str: string) {
  if (str.endsWith('x') || str.endsWith('s')) return `${str}'`;
  return `${str}'s`;
}

function getStackMetadata(data: Stack): StackMetadata {
  const authorName = data.author.name;
  const canonicalPath = `/${data.author.slug}/${data.slug}`;

  return {
    canonicalUrl: `${SITE_URL}${canonicalPath}`,
    description: `flip through ${postfix(authorName)} ${data.title} stakk`,
    rssPath: `/rss${canonicalPath}.xml`,
    title: `${data.title} by ${authorName}`,
  };
}

export default getStackMetadata;
