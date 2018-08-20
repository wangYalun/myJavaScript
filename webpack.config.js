var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


module.exports = {
  entry: {
    main: './React/index.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'React/dist')
  },
  output: {
    path: path.resolve(__dirname, 'React/dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ title: '学习用' })
  ]
};
