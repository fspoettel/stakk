import cuid from 'cuid';
import slugify from 'slugify';
import { StackItem } from '../../types/StackItem';

export function toStackItem(playlist: SpotifyApi.PlaylistObjectFull): StackItem {
  return {
    createdAt: new Date().toISOString(),
    id: cuid(),
    title: playlist.name,
    slug: slugify(playlist.name).toLowerCase(),
    tags: [],
    links: [playlist.external_urls.spotify],
    tracklist: playlist.tracks.items.map(({ track }) => ({
      title: track.name,
      artist: track.artists.map(a => a.name).join(' & ')
    })),
  };
}

export function toImageUrl(playlist: SpotifyApi.PlaylistObjectFull): string|null {
  return playlist.images?.[0]?.url ?? null;
}
