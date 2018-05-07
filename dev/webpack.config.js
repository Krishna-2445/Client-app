const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

module.exports = (env) => {
  console.log('+--> env = ' + JSON.stringify(env));

  if (env.prod) {
    console.log('+--> Running Production Build');
    return merge(baseConfig(env), prodConfig);
  }

  console.log('+--> Running Development Build');
  return merge(baseConfig(env), devConfig);
};
