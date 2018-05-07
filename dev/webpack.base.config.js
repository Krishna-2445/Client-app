const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');

module.exports = (env) => {
  console.log(`+--> base config env : ${JSON.stringify(env)}`);

  const config = {
    devtool: env.prod ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
    context: resolve(__dirname, '..'),
    bail: env.prod,
    watch: !env.prod,
    recordsPath: join(__dirname, '..', '.webpack', 'chunk-manifest.json'),

    resolve: {
      extensions: ['.js', '.jsx', '.less'],
    },

    module: {
      rules: [
        { test: /\.(jsx?)$/,
          include: [
            /src/,
          ],
          use: [
            { loader: 'babel-loader' },
            { loader: 'eslint-loader' },
          ],
        },
        { test: /\.less$/,
          include: [
            /src/,
          ],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'resolve-url-loader' },
              { loader: 'less-loader',
                options: {
                  sourceMap: true,
                  lessPlugins: [new CleanCSSPlugin({ advanced: true })],
                },
              },
            ],
          }),
        },
        { test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
            ],
          }),
        },
        { test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            { loader: 'url-loader', options: { limit: 10000 } },
            { loader: 'img-loader', options: { progressive: true } },
          ],
        },
        { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'file-loader',
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(['bundles'], {
        root: join(__dirname, '..', '/dist/'),
        verbose: true,
      }),

      new CopyWebpackPlugin([
        { from: 'src/images', to: 'assets/images' },
      ]),

      // Setting the environment for production so that we get the
      // optimized builds for React and Redux
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: env.prod ?
            JSON.stringify('production') :
            JSON.stringify('development'),
        },
      }),

      new ExtractTextPlugin({
        filename: '[name].[chunkhash].css',
        disable: !env.prod,
        allChunks: true,
      }),

      // Automatically move all modules defined outside of application directory to vendor bundle.
      // If you are using more complicated project structure,
      // consider to specify common chunks manually.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'inline',
        filename: 'inline.js',
      }),

      // Injects bundles in your index.html instead of wiring all manually.
      // It also adds hash to all injected assets so we don't have problems
      // with cache purging during deployment.
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: env.prod ? '../index.html' : 'index.html',
      }),
    ],
  };

  return config;
};
