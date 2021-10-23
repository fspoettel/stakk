const { resolve } = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

function migrate(stakk) {
  const items = stakk.items;

  const data = items.reduce((acc, curr) => {
    const item = { ...curr };
    const [primary, ...rest] = item.links;
    item.primaryUrl = primary;

    item.secondaryUrls = rest.map((l) => {
      return typeof l === 'string' ? { url: l, title: 'Follow' } : l;
    });

    delete item.links;

    return {
      ...acc,
      [curr.id]: item,
    };
  }, {});

  const sortOrder = items.map((i) => i.id);

  delete stakk.items;

  return {
    ...stakk,
    data,
    sortOrder,
  };
}

(async () => {
  for await (const f of getFiles('./content')) {
    if (f.endsWith('json')) {
      const content = JSON.parse(await readFile(f, 'utf-8'));
      const migrated = migrate(content);
      await writeFile(f, JSON.stringify(migrated, null, 2));
    }
  }
})();
