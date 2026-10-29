const path = require('node:path')
const fs = require('node:fs')

const bundlers = { rspack: require('@rspack/core'), webpack: require('webpack') }

for (const [name, bundler] of Object.entries(bundlers)) {
  const outDir = path.join(__dirname, 'dist', name)
  const compiler = bundler({
    context: __dirname,
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: { path: outDir },
    // `b.js` goes through a loader whose map has no `sourcesContent`.
    module: { rules: [{ test: /b\.js$/, use: path.join(__dirname, 'loader.js') }] },
  })
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      throw err ?? new Error(stats.toString())
    }
    const map = JSON.parse(fs.readFileSync(path.join(outDir, 'main.js.map'), 'utf8'))
    const i = map.sources.findIndex((source) => source.endsWith('/src/b.js'))
    console.log(`${name}: sourcesContent for b.js = ${JSON.stringify(map.sourcesContent[i])}`)
  })
}
