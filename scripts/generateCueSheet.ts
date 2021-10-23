/**
 * generates a cue sheet that can be pasted to mixcloud.
 * usage:
 * ```
 * yarn cue:generate --user dev --mix dev --item test-mix-1
 * ```
 */

import { EOL } from 'os';
import minimist from 'minimist';
import { Stack } from '@stakk/types/Stack';

(async () => {
  const { user, mix, item } = minimist(process.argv.slice(2));

  if (!user) throw new Error('required attribute `--user` missing');
  if (!mix) throw new Error('required attribute `--mix` missing');

  const data: Stack = await import(`../content/data/${user}/${mix}.json`);

  const target = Object.values(data.data).find((m) => m.slug === item);
  if (!target) throw new Error('could not find the specified --item');

  const tracklistStr = target.tracklist
    .map((t, i) => `${i + 1}. ${t.artist} - ${t.title} ${t.at}`)
    .join(EOL);

  console.log(tracklistStr);
})();

export default undefined;
