var path = require('path')
module.exports = {
  context: path.join(__dirname, 'try'),
  entry: '../try-freezr.js',
  output: {
    filename: 'try-freezr.js',
    publicPath: '/assets'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  }
}
