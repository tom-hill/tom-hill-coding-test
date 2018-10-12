const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const scssLintPlugin = new StyleLintPlugin({
  failOnError: false,
  emitErrors: true,
  syntax: 'scss',
});

const copyAssets = new CopyWebpackPlugin([
    { from: './src/assets', to: './assets' }
]);

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]',
              sourceMap: true,
              minimize: false,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('development')
    }
  }), htmlPlugin, scssLintPlugin, copyAssets],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    'pusher': "Pusher"
  }
};
