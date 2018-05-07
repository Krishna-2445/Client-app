/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js')({});
var https = require('https');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/api/**": {
      target: 'http://localhost:8081/zuul-proxy',
      changeOrigin: true,
      secure: false,
    },
  },
  contentBase: config.output.path,
  publicPath: config.output.publicPath
})

  .listen(7071, 'localhost', function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Webpack Dev Server is fired up!!');
  });
