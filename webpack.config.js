const path = require('path');

module.exports = {
  entry: './src/octo.js',  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'octo.js',
    library: 'octo',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },

    ],
  },

  mode: 'production',
 // devtool: 'source-map',
};
