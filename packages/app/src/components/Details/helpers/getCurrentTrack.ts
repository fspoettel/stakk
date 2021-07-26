import { Track } from '@stakk/types/Track';
import { Tracklist } from '@stakk/types/Tracklist';

function timestampToSeconds(str: string): number {
  const [minutes, seconds] = str.split(':').map(x => Number.parseInt(x));
  return minutes * 60 + seconds;
}

function getCurrentTrack(tracklist: Tracklist, currentTime: number): Track|null {
  if (!Array.isArray(tracklist) || !tracklist.length) return null;

  let foundItem = null;

  for (let i = 0; i < tracklist.length; i += 1) {
    const item = tracklist[i];
    const nextItem = tracklist[i + 1];

    if (
      !nextItem
      || (currentTime >= timestampToSeconds(item.at) && currentTime <= timestampToSeconds(nextItem.at))
    ) {
      foundItem = item;
      break;
    }
  }

  return foundItem;
}

export default getCurrentTrack;
