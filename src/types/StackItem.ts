import { ExternalLink } from './ExternalLink';
import { Track } from './Track';

export type StackItem = {
  createdAt: string;
  description?: string;
  id: string;
  imageId?: string;
  primaryUrl: string;
  secondaryUrls: ExternalLink[];
  slug: string;
  tags: string[];
  title: string;
  tracklist: Track[];
};

export type StackItemFull = StackItem & { index: number };
