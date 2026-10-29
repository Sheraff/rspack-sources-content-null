# Rspack writes `""` for a missing `sourcesContent` entry

_Written with the help of an AI coding agent (Claude)._

`src/b.js` goes through `loader.js`, whose map has no `sourcesContent`. `src/index.js` has text, so the chunk map has a `sourcesContent` array.

```sh
npm install
npm run repro
```

```
rspack: sourcesContent for b.js = ""
webpack: sourcesContent for b.js = null
```
