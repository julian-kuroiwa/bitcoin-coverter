import {join} from 'path';

const include = join(__dirname, 'src');

export default {
  mode: 'development',
  entry: './index.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include,
      }
    ]
  }
}
