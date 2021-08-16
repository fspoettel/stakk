import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import stream from 'stream';
import { promisify } from 'util';
import decompress from 'decompress';
import dotenv from 'dotenv';
import got from 'got';
import _rimraf from 'rimraf';

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local')
});

const pipeline = promisify(stream.pipeline);
const rimraf = promisify(_rimraf);

(async () => {
  console.debug('re-creating `./content`...');

  const contentPath = path.join(process.cwd(), 'content');
  const zipPath = path.join(contentPath, 'data.zip');

  await rimraf(contentPath);
  await fsPromises.mkdir(contentPath);

  console.debug('downloading content repository...');

  const request = got.stream(`https://api.github.com/repos/${process.env.GH_REPO}/zipball/${process.env.GH_BRANCH ?? 'master'}`);

  await pipeline(request, fs.createWriteStream(zipPath));

  console.debug('unzipping content repository...');
  await decompress(zipPath, contentPath, { strip: 1 });

  console.debug('cleaning up...');
  await rimraf(zipPath);
})();

export default undefined;
