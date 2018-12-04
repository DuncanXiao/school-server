const _externals = require('externals-dependencies');
const common = require('./server-common.config');

const setting = {
  target: 'node',
  node: {
    __dirname: true,
    path: true
  },
  externals: _externals(),
  entry: {
    index: ['babel-polyfill', common.serverDirectory + '/app.js']
  },
  output: {
    path: common.builtDirectory,
    filename: '[name]-server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'eslint-loader'
        }
      }
    ]
  },
  plugins: [
    common.definePlugin
  ]
};
const configs = Object.assign({}, common.baseSetting, setting);
module.exports = configs;