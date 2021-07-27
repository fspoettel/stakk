import { ExternalLink } from './ExternalLink';
import { Track } from './Track';

export type StackItem = {
  id: string,
  slug: string,
  imageId?: string,
  title: string,
  tags: string[],
  links?: (ExternalLink|string)[],
  tracklist: Track[],
  createdAt: string
};

export type StackItemFull = StackItem & { index: number };
