const webpack = require('webpack');
const path = require('path');

const serverDirectory = path.resolve(__dirname, '../server');
const builtDirectory = path.resolve(__dirname, '../dist');
const baseSetting = {
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      Server: serverDirectory,
      Controllers: serverDirectory + '/controllers',
      Routers: serverDirectory + '/routers', 
      Static: serverDirectory + '/static',
      Views: serverDirectory + '/views',
      Sql: serverDirectory + '/sql',
      Utilities: serverDirectory + '/utilities',
      Model: serverDirectory + '/model'
    }
  }
};

const definePlugin = new webpack.DefinePlugin({});

module.exports = {
  baseSetting,
  definePlugin,
  serverDirectory,
  builtDirectory
};
