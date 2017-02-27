var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
 // devtool: 'cheap-source-map',
  entry: [
    path.resolve(__dirname, 'app/sdk/data.client.js'),
  ],
  output: {
    path: __dirname + '/app/sdk',
    publicPath: '/',
    filename: './data.client.min.js'
  },
  module: {
    loaders: [
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
