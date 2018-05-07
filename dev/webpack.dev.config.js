/* eslint-disable */

const { resolve } = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// DEVELOPMENT SPECIFIC CONFIGURATION
module.exports = {
  output: {
    filename: 'assets/bundles/[name].bundle.js',
    publicPath: '/',
    path: resolve(__dirname, '../dist'),
  },

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:7071',
      'webpack/hot/only-dev-server',
      './src/js/root.jsx',
    ],
    vendor: [
      'babel-polyfill',
      './src/js/vendor.js',
    ],
  },

  plugins: [
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    new FriendlyErrorsWebpackPlugin(),

    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    // It also updates stylesheets and inline assets without page reloading.
    new webpack.HotModuleReplacementPlugin(),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: '7000',
      proxy: 'http://localhost:7071',
    }, { reload: false }),
  ],
};
