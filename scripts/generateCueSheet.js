/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * generates a cue sheet that can be pasted to mixcloud.
 * usage:
 * ```
 * yarn cue:generate --user dev --mix dev --item test-mix-1
 * ```
 */

const { EOL } = require('os');
const minimist = require('minimist');

const { user, mix, item } = minimist(process.argv.slice(2));

if (!user) throw new Error('required attribute `--user` missing');
if (!mix) throw new Error('required attribute `--mix` missing');

const data = require(`../src/data/${user}/${mix}.json`);
const tracklist = data.items.find(m => m.slug === item).tracklist;

const tracklistStr = tracklist
  .map((t, i) => `${i + 1}. ${t.artist} - ${t.title} ${t.at}`)
  .join(EOL);

console.log(tracklistStr);
