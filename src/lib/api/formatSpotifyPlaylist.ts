import cuid from 'cuid';
import slugify from 'slugify';
import { StackItem } from '@stakk/types/StackItem';
import { stripHtml } from './stripHtml';

export function toStackItem(playlist: SpotifyApi.PlaylistObjectFull): StackItem {
  const tracks = playlist.tracks.items.filter((t) => t != null);

  return {
    createdAt: new Date().toISOString(),
    description: stripHtml(playlist.description),
    id: cuid(),
    title: playlist.name,
    slug: slugify(playlist.name).toLowerCase(),
    tags: [],
    primaryUrl: playlist.external_urls.spotify,
    secondaryUrls: [],
    tracklist: tracks.map(({ track }) => ({
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      at: '00:00',
    })),
  };
}

export function toImageUrl(playlist: SpotifyApi.PlaylistObjectFull): string | null {
  return playlist.images?.[0]?.url ?? null;
}
