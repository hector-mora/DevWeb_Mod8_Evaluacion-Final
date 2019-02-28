
const config = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/public/assets',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
