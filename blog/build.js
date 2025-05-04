#! /usr/bin/env node

import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parser = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

const splitMetaAndContent = (text) => {
  const lines = text.split('\n');

  if (lines[0] !== '---') {
    return [null, text];
  }

  const metaEndIdx = lines.slice(1).findIndex(line => line === '---');

  if (metaEndIdx < 0) {
    throw new Error('Meta section must be closed with a "---"');
  }

  return [
    lines.slice(1, metaEndIdx + 1).join('\n').trim(),
    lines.slice(metaEndIdx + 2).join('\n').trim(),
  ];
};

const main = async () => {
  const sourceDir = path.join(__dirname);
  const destinationDir = path.join(__dirname, '../public/data');
  const files = await readdir(sourceDir);
  const dirs = await Promise.all(files.map(file => stat(path.join(sourceDir, file))))
    .then(stats => stats.reduce(
      (memo, stat, idx) => {
        if (!stat.isDirectory()) {
          return memo;
        }
        return memo.concat(files[idx]);
      },
      [],
    ));

  const posts = await Promise.all(dirs.map(async (dir) => {
    const fname = path.join(sourceDir, dir, 'index.md');
    const text = await readFile(fname, 'utf8');
    const trimmed = (text || '').trim();

    if (!trimmed) {
      throw new Error(`${fname} is empty`);
    }

    const [metaText, contentText] = splitMetaAndContent(trimmed);
    const rootNode = parser.parse(contentText);
    const meta = !metaText ? null : yaml.load(metaText);
    const [firstChild] = rootNode.children;

    if (firstChild.type !== 'heading' || firstChild.depth !== 1) {
      throw new Error(`${fname} is missing title (heading 1 at start)`);
    }

    return {
      id: dir.slice(11),
      title: firstChild.children[0].value,
      ...meta,
      body: parser.stringify(await parser.run({
        type: 'root',
        children: rootNode.children.slice(1),
      })),
    };
  }));

  const sorted = posts.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    }
    if (a.publishedAt > b.publishedAt) {
      return -1;
    }
    return 0;
  });


  // Write posts index (collection)
  await writeFile(
    path.join(destinationDir, 'posts.json'),
    JSON.stringify(sorted.map(({ body, ...rest }) => rest), null, 2),
  );

  // Write individual posts
  await mkdir(path.join(destinationDir, 'posts'), { recursive: true });

  await Promise.all(sorted.map(async (post) => {
    const postFname = path.join(destinationDir, `posts/${post.id}.json`);
    await writeFile(postFname, JSON.stringify(post, null, 2));
  }));
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
