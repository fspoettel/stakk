import fsPromises from 'fs/promises';
import path from 'path';

function fileExists(filePath: string): Promise<boolean> {
  return fsPromises
    .access(filePath)
    .then(() => true)
    .catch(() => false);
}

async function ensureDirectory(filePath: string): Promise<string | undefined> {
  const dirname = path.dirname(filePath);
  if (await fileExists(dirname)) return dirname;
  return fsPromises.mkdir(dirname, { recursive: true });
}

async function writeRSSToFile(feedPath: string, feed: string): Promise<void> {
  const pathOnDisk = path.join(process.cwd(), 'public', `${feedPath}`);

  await ensureDirectory(pathOnDisk);
  await fsPromises.writeFile(pathOnDisk, feed);
}

export default writeRSSToFile;
