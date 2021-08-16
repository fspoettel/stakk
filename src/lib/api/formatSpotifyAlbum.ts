import cuid from 'cuid';
import slugify from 'slugify';
import { StackItem } from '../../types/StackItem';

export function toStackItem(album: SpotifyApi.AlbumObjectFull): StackItem {
  const albumArtists = album.artists.map(a => a.name).join(', ');

  return {
    createdAt: new Date().toISOString(),
    description: `by ${albumArtists}`,
    id: cuid(),
    title: album.name,
    slug: slugify(album.name).toLowerCase(),
    tags: [],
    links: [album.external_urls.spotify],
    tracklist: album.tracks.items.map((track) => ({
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      at: '00:00'
    })),
  };
}

export function toImageUrl(playlist: SpotifyApi.AlbumObjectFull): string|null {
  return playlist.images?.[0]?.url ?? null;
}
