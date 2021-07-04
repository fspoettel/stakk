const { EOL } = require('os');

const data = require('../src/data.json');
const { id } = require('minimist')(process.argv.slice(2));

if (!id) throw new Error('required attribute `--id` missing');

const tracklist = data.items.find(m => m.id === id).tracklist;

const tracklistStr = tracklist
  .map((t, i) => `${i + 1}. ${t.artist} - ${t.title} ${t.at}`)
  .join(EOL);

console.log(tracklistStr);
