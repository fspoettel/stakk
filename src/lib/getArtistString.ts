import { Track } from '@stakk/types/Track';

function getArtistString(tracklist: Track[], count = 3): string {
  if (!Array.isArray(tracklist)) return '';

  const uniqArtists = new Set(tracklist.map(t => t.artist));
  const artists = Array.from(uniqArtists);

  if (artists.length === 1) return artists[0];
  if (artists.length === 2) return artists.join(' & ');

  if (artists.length === count) {
    const results = artists.slice(0, count);
    const finalResult = results.pop();
    return `${results.join(', ')} & ${finalResult}`;  
  }

  const results = artists.slice(0, count);
  return `${results.join(', ')} and more.`;

}

export default getArtistString;
