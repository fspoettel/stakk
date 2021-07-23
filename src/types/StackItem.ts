import { ExternalLink } from './ExternalLink';
import { Tracklist } from './Tracklist';

export type StackItem = {
  id: string,
  slug: string,
  index: number,
  title: string,
  tags: string[],
  links?: (ExternalLink|string)[],
  tracklist: Tracklist,
  createdAt: string
};
