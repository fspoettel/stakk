import { ExternalLink } from './ExternalLink';
import { Tracklist } from './Tracklist';

export type StackItem = {
  id: string,
  slug: string,
  imageId?: string,
  title: string,
  tags: string[],
  links?: (ExternalLink|string)[],
  tracklist: Tracklist,
  createdAt: string
};

export type StackItemFull = StackItem & { index: number };
