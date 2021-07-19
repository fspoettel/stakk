import fsPromises from 'fs/promises';
import path from 'path';
import { Stack } from '../types/Stack';

async function scan(directoryName: string, results: string[]): Promise<string[]> {
  const files = await fsPromises.readdir(directoryName);

  for (const f of files) {
      const fullPath = path.join(directoryName, f);
      
      const stat = await fsPromises.stat(fullPath);
      if (stat.isDirectory()) {
          await scan(fullPath, results);
      } else {
          results.push(fullPath);
      }
  }
  return results;
}

export async function getDataForAllMixes(): Promise<Stack[]> {
  const dir = path.join(
    process.cwd(),
    'src',
    'data',
  );

  const paths = await scan(dir, []);

  const files = await Promise.all(
    paths.map(path => fsPromises.readFile(path, { encoding: 'utf-8' }))
  );

  return files.map(str => JSON.parse(str));
}

export async function getMixData(user: string, name: string): Promise<Stack> {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    user,
    `${name}.json`,
  );

  const content = await fsPromises.readFile(filePath, {
    encoding: 'utf-8',
  })

  return JSON.parse(content);
}
