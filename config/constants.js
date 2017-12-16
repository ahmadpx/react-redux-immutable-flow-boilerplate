const path = require('path')

module.exports = {
  srcPath: path.join(path.dirname(__dirname), 'src'),
  publicPath: path.join(path.dirname(__dirname), 'public'),
  buildPath: path.join(path.dirname(__dirname), 'build')
}
