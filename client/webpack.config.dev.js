import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const srcPath = path.resolve(__dirname, './src/');

export default {
  devtool: 'source-map',
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: Object.assign({}, {
      'components': path.join(srcPath, 'components'),
      'constants': path.join(srcPath, 'constants'),
      'widgets': path.join(srcPath, 'widgets'),
      'reducers': path.join(srcPath, 'reducers'),
      'config': path.join(srcPath, 'config'),
      'service': path.join(srcPath, 'service'),
      'util': path.join(srcPath, 'util'),
    }),
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader'] },
      { test: /\.(png|jpg|gif)$/, use: [{ loader: 'file-loader' }] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
  ],
};