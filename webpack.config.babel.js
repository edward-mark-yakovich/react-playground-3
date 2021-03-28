/* eslint-disable no-console */
import webpack from 'webpack';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import htmlWebpackTemplate from 'html-webpack-template';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const nodeModules = path.resolve(__dirname, 'node_modules');
const finalOutputPathDirName = 'dist';

// Modules requiring transpilation for IE11 support
const autobindDecoratorModule = path.resolve(__dirname, 'node_modules/autobind-decorator');
const querystringModule = path.resolve(__dirname, 'node_modules/query-string');
const stricturiencodeModule = path.resolve(__dirname, 'node_modules/strict-uri-encode');

module.exports = (env = {}) => {
  const isProd = env.prod === 'true';
  const isIE11 = env.ie11 === 'true';
  const isDev = env.dev === 'true';
  const isWildWest = env.wildwest === 'true';
  const isPrev = env.prev === 'true';
  const isLocal = !isDev && !isProd && !isPrev && !isWildWest;
  const runOptimized = env.optimize === 'true';
  const isMaintenanceMode = env.maintenance === 'true';
  const isPartialMaintenanceMode = env.partialMaintenance === 'true';
  const NODE_ENV = isProd ? JSON.stringify("production") : JSON.stringify("development");

  let envDir;

  if (isProd) {
    envDir = '../config/env.prod.js';
  } else {
    envDir = '../config/env.js';
  }

  const config = {
    mode: isProd ? 'production' : 'development',
    ...!isProd && {devtool: 'eval-source-map'},
    ...isIE11 && {devtool: 'none'},
    context: path.join(__dirname, 'src'),

    entry: {
      env: envDir,
      webpack: [
        'core-js',
        'regenerator-runtime/runtime',
        './index.js'
      ],
    },

    optimization: {
      ...isProd && {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true
          }),
          new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css\?v=([0-9a-zA-Z]+)appcss$/g,
          }),
        ],
        splitChunks: {
          chunks: 'all',
          name: true,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              reuseExistingChunk: true
            },
            main: {
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
        runtimeChunk: true,
      },
      ...!isProd && {
        splitChunks: {
          chunks: 'all',
        }
      }
    },
    output: {
      path: path.join(__dirname, finalOutputPathDirName),
      publicPath: '/',
      filename: "[name].js?v=[hash]",
      chunkFilename: "[name].js?v=[hash]",
      sourceMapFilename: "webpack.map",
      ...isProd && {publicPath: '/test/react-test-03/'}
    },

    resolve: {
      alias: {
        '@components': path.join(__dirname, 'src', 'components'),
        '@pages': path.join(__dirname, 'src', 'pages'),
        '@css_global': path.join(__dirname, 'src', 'css_global'),
        '@utils': path.join(__dirname, 'src', 'utils'),
        '@store': path.join(__dirname, 'src', 'store'),
      }
    },

    devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      contentBase: path.join(__dirname, finalOutputPathDirName),
      ...isProd && {compress: true}
    },

    plugins: [
      new CleanWebpackPlugin([finalOutputPathDirName]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        Promise: 'exports-loader?global.Promise!es6-promise'
      }),
      new CopyPlugin([
        {
          from: 'assets/images/**/*.*',
          to: '.'
        },
        {
          from: 'assets/shared/**/*.*',
          to: '.'
        }
      ]),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV,
          dev: isDev,
          prev: isPrev,
          wildwest: isWildWest,
          prod: isProd,
          optimize: runOptimized,
          maintenance: isMaintenanceMode,
          partialMaintenance: isPartialMaintenanceMode
        }
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      ...(!isLocal) ? [
        new MiniCssExtractPlugin({
          filename: `style.css${!isLocal ? '?v=[hash]appcss' : ''}`,
          chunkFilename: `[name].css${!isLocal ? '?v=[hash]appcss' : ''}`
        })
      ] : [],
      new CompressionPlugin(),
      ...isProd ? [
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require(path.resolve(finalOutputPathDirName, 'vendorPrime.json'))
        })
      ] : [],
      new HtmlWebpackPlugin({
        inject: true,
        template: htmlWebpackTemplate,
        filename: 'index.html',
        title: isLocal ? 'local-site' : 'prod-site',
        appMountIds: ['app', 'dialogs'],
        mobile: true
      }),
      new FaviconsWebpackPlugin({
        logo: './assets/favicons/favicon.png',
        cache: true,
        title: 'prod-site',
        background: 'transparent'
      })
    ],

    stats: {children: false},

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: {
            test: nodeModules,
            exclude: [
              autobindDecoratorModule,
              querystringModule,
              stricturiencodeModule
            ]
          },
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: isLocal
            ? [
                "style-loader",
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } }
              ]
            : [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {}
                },
                "css-loader", 'sass-loader'
              ]
        },
        {test: /\.(gif|png|jpe?g|svg)$/i, use: [
          "file-loader",
          "image-webpack-loader"
        ]}
      ]
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  };

  return config;
};
