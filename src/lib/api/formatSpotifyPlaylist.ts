import cuid from 'cuid';
import slugify from 'slugify';
import { StackItem } from '@stakk/types/StackItem';

export function toStackItem(playlist: SpotifyApi.PlaylistObjectFull): StackItem {
  const tracks = playlist.tracks.items.filter(t => t != null);

  return {
    createdAt: new Date().toISOString(),
    description: playlist.description ?? '',
    id: cuid(),
    title: playlist.name,
    slug: slugify(playlist.name).toLowerCase(),
    tags: [],
    links: [playlist.external_urls.spotify],
    tracklist: tracks.map(({ track }) => ({
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      at: '00:00'
    })),
  };
}

export function toImageUrl(playlist: SpotifyApi.PlaylistObjectFull): string|null {
  return playlist.images?.[0]?.url ?? null;
}
