const HtmlWebPackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const scssLintPlugin = new StyleLintPlugin({
  failOnError: false,
  emitErrors: true,
  syntax: 'scss',
});

module.exports = {
  output: {
    path: __dirname + '../../dist',
    filename: 'app.js',
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
  plugins: [htmlPlugin, scssLintPlugin],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
