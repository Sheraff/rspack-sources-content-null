// Returns the code unchanged with a map that has no `sourcesContent`.
module.exports = function (code) {
  this.callback(null, code, {
    version: 3,
    sources: [this.resourcePath],
    names: [],
    mappings: 'AAAA',
  })
}
