#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const marked = require('marked');


const isDir = fname => fs.statSync(path.join(__dirname, fname)).isDirectory();


const main = (cb) => {
  const dirs = fs.readdirSync(__dirname).filter(isDir);
  const posts = dirs.map((dir) => {
    const indexPath = path.join(__dirname, dir, 'index.md');

    if (!fs.statSync(indexPath)) {
      return;
    }

    const contents = fs.readFileSync(indexPath, 'utf8');
    const tokens = marked.lexer(contents);

    if (tokens[0].type !== 'heading' && tokens[0].depth === 1) {
      throw new Error('Post must start with H1');
    }

    const { meta, body } = tokens.slice(1).reduce((memo, token) => {
      if (memo.body) {
        return { ...memo, body: [...memo.body, token] };
      } else if (token.type === 'hr') {
        return { ...memo, body: [] };
      } else if (token.type === 'list') {
        return {
          ...memo,
          meta: token.items.reduce(
            (prev, item) => (
              /^URL:\s/.test(item.text)
                ? { ...prev, url: item.text.slice(4).trim() }
                : /^Tags:\s/.test(item.text)
                  ? {
                    ...prev,
                    tags: item.text.slice(5).trim().split(',').map(
                      item => item.replace(/`/g, '').trim()
                    ),
                  }
                  : /^Author:\s/.test(item.text)
                    ? { ...prev, author: item.text.slice(7).trim() }
                    : /^Published on:\s/.test(item.text)
                      ? { ...prev, publishedAt: item.text.slice(13).trim() }
                      : prev
            ),
            memo.meta,
          ),
        };
      }
      return memo;
    }, {
      meta: {
        id: dir,
        title: tokens[0].text,
        url: '',
        tags: [],
        author: '',
        publishedAt: null,
      },
      body: false,
    });

    body.links = tokens.links;
    const html = marked.parser(body);

    return { ...meta, body: html };
  }).sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    } else if (a.publishedAt > b.publishedAt) {
      return -1;
    } else {
      return 0;
    }
  });

  fs.writeFileSync(
    path.join(__dirname, '../src/data/posts.json'),
    JSON.stringify(posts, null, 2),
  );
};


main((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
